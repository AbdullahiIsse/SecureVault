import React, {useContext} from 'react';
import {UserContext} from "../../Context/UserContext.jsx";
import AddVaultComponent from "../../Component/AddVaultComponent/AddVaultComponent.jsx";

const AddVault = () => {

    const { userAddress } = useContext(UserContext);

    return (
        <div>
            {userAddress.length !== 0 ? (
                <div>
                    <AddVaultComponent/>

                </div>
            ) : (
                <div>
                    <span>Please Log In</span>
                </div>
            )}
        </div>
    );
};

export default AddVault;