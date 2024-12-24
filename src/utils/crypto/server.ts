import CryptoJS from 'crypto-js';

export const defaultKey = "MIIBIjANBgkqhkiG9w"

// 加密函数
export const encrypt = (data: any, key: string = defaultKey) => {
    if (!data) return "";
    try {
        const jsonString = JSON.stringify(data);
        const encryptedJson = CryptoJS.AES.encrypt(jsonString, key).toString();
        return encryptedJson;
    } catch (error) {
        console.log("encrypt error", error);
        return "";
    }
};

// 解密函数
export const decrypt = (data: string | CryptoJS.lib.CipherParams | undefined, key: string = defaultKey) => {
    if (!data) return null;
    try {
        const decryptedJsonBytes = CryptoJS.AES.decrypt(data, key);
        const decryptedJsonString = decryptedJsonBytes.toString(CryptoJS.enc.Utf8);
        const decryptedJson = JSON.parse(decryptedJsonString);
        return decryptedJson;
    } catch (error) {
        console.log("decrypt error", error);
        return null;
    }
};