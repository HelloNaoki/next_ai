import CryptoJS from 'crypto-js';

export const defaultKey = 'e8b31b82-8f3e-4d9b-8f1f-5f5c1f7e728c'

// HMAC 签名函数
export const signData = (data: any, key: string = defaultKey) => {
    if (!data) return "";
    try {
        const jsonString = JSON.stringify(data);
        const hmac = CryptoJS.HmacSHA256(jsonString, key).toString();
        return hmac;
    } catch (error) {
        console.log("signData error", error);
        return "";
    }
};

// 验证 HMAC 函数
export const verifyData = (data: any, hmac: string, key: string = defaultKey) => {
    const newHmac = signData(data, key);
    return hmac === newHmac;
};

// 加密函数（保持 AES 加密）
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