import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext.jsx';
import GetVault from '../../Component/GetVault/GetVault.jsx';
import SecureVault from '../../abis/SecureVault.json';
import config from '../../../src/config.json';
import { ethers } from 'ethers';
import { AES, enc } from 'crypto-js';
import Cookies from 'js-cookie';
import {Loader} from "@mantine/core";

const Vault = () => {
    const [vaultList, setVaultList] = useState([]);
    const { userAddress } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const encryptionKey = Cookies.get('encryptionKey');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const address = config[31337].SecureVault.address;
                const INFURA_ID = '8d3df0f60a2a4ebdb9cbdd53d234d214';
                const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);
                const secureVault = new ethers.Contract(address, SecureVault, provider);
                setLoading(true);
                const encryptedVaultList = await secureVault.getVaultList(userAddress);

                const decryptedVaultList = encryptedVaultList.map((encryptedVault) => {
                    const decryptedTitle = AES.decrypt(encryptedVault.title, encryptionKey).toString(enc.Utf8);
                    const decryptedText = AES.decrypt(encryptedVault.text, encryptionKey).toString(enc.Utf8);

                    return {
                        title: decryptedTitle,
                        text: decryptedText,
                    };
                });

                const nonEmptyVaults = decryptedVaultList.filter((vault) => vault.title !== '' || vault.text !== '');
                setVaultList(nonEmptyVaults);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching vault list:', error);
            }
        };

        fetchData();
    }, [userAddress, encryptionKey]);

    console.log(vaultList);

    if(loading) return (
        <Loader color="dark" size="xl" />
    );

    return (
        <div>
            {userAddress.length !== 0 ? (
                <div>
                    <GetVault data={vaultList} />
                </div>
            ) : (
                <div>
                    <span>Please Log In</span>
                </div>
            )}
        </div>
    );
};

export default Vault;
