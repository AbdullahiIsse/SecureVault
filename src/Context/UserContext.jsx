import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const UserContext = createContext({
    userAddress: "",
    setUserAddress: () => {},
    provider: null,
    setProvider: () => {},
    handleLogin: () => {},
    handleLogout: () => {}
});

const UserProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState("");
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(ethereumProvider);
        }
        const storedUserAddress = localStorage.getItem("userAddress");
        if (storedUserAddress) {
            setUserAddress(storedUserAddress);
        }

        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                setUserAddress(accounts[0]);
                localStorage.setItem("userAddress", accounts[0]);
            } else {
                setUserAddress("");
                localStorage.removeItem("userAddress");
            }
        };

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        }
    }, []);

    const handleLogin = async () => {
        try {
            if (!window.ethereum) {
                alert(" Please install MetaMask and make a MetaMask Wallet to Log In.");
                return;
            }
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await provider.listAccounts();
            const address = accounts[0];
            setUserAddress(address);
            localStorage.setItem("userAddress", address);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogout = () => {
        setUserAddress("");
        localStorage.removeItem("userAddress");
    };

    const value = {
        userAddress,
        setUserAddress,
        provider,
        setProvider,
        handleLogin,
        handleLogout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
