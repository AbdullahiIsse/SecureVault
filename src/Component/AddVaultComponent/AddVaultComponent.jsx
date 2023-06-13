import React, {useState, useContext} from 'react';
import FormInput from '../Form-Input/form-input.jsx';
import {Button, Textarea,Loader} from '@mantine/core';
import './AddVaultComponent.scss';
import {UserContext} from '../../Context/UserContext.jsx';
import SecureVault from '../../abis/SecureVault.json';
import config from '../../../src/config.json';
import {ethers} from 'ethers';
import {AES} from 'crypto-js';
import Cookies from 'js-cookie';
import generateEncryptionKey from '../../Utils/generateEncryptionKey.js';


const defaultFormFields = {
    title: '',
    text: '',
};

const AddVaultComponent = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {title, text} = formFields;
    const {userAddress,provider} = useContext(UserContext);
    const [loading, setLoading] = useState(false);


    let encryptionKey = Cookies.get('encryptionKey');
    if (!encryptionKey) {
        encryptionKey = generateEncryptionKey();
        Cookies.set('encryptionKey', encryptionKey, {secure: true, sameSite: 'strict'});
    }

    const addVault = async (title, text) => {
        const encryptedTitle = AES.encrypt(title, encryptionKey).toString();
        const encryptedText = AES.encrypt(text, encryptionKey).toString();
        const address = config[31337].SecureVault.address;
        const INFURA_ID = "8d3df0f60a2a4ebdb9cbdd53d234d214";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();
        const secureVault = new ethers.Contract(address, SecureVault, signer);
        setLoading(true);
        const tx = await secureVault.createVault(userAddress, encryptedTitle, encryptedText);
        await tx.wait();
        setLoading(false);
    };




    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("goergoperkgpoekgp")
        await addVault(title, text);
        resetFormFields();
        console.log("It's working");
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };


    if(loading) return (
        <Loader color="dark" size="xl" />
    );


    return (
        <div className="add-vault-container">
      <span>
        <strong>Add to your Vault</strong>
      </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Title" type="text" required onChange={handleChange} name="title" value={title}/>

                <Textarea
                    placeholder="Add some text here"
                    label="Text"
                    value={text}
                    onChange={handleChange}
                    required
                    name="text"
                />

                <br/>
                <br/>
                <Button type="submit">Add to the vault</Button>
            </form>
        </div>
    );
};

export default AddVaultComponent;
