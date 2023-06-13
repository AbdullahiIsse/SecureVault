const generateEncryptionKey = () => {
    const keyLength = 32;
    const characters = '0123456789abcdef';
    let key = '';

    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }

    return key;
};

export default generateEncryptionKey;
