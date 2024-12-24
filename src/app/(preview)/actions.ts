'use server'
import { LoginApi, LogOutApi } from '@/api/user';
import { decrypt, encrypt } from '@/utils/crypto/server';
import getConfig from 'next/config';
import { cookies } from 'next/headers'
import md5 from 'crypto-js/md5';

const USER_INFO_KEY = md5('store_u').toString();

export const getUserInfoAction = async () => {
    try {
        const cookieStore = await cookies()
        const userInfo = decrypt(cookieStore.get(USER_INFO_KEY)?.value)
        return userInfo
    } catch (error) {
        console.log(error);
        return {}
    }
}

export async function loginAction(params: { email: any; password: any; }) {
    try {
        const cookieStore = await cookies()
        const { publicRuntimeConfig } = getConfig();
        const { email, password } = params
        const result = await LoginApi({
            appId: publicRuntimeConfig.APP_ID,
            email,
            password,
        });
        if (result?.returnCode === "0") {
            cookieStore.set(USER_INFO_KEY, encrypt(result.data), { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
        }
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function logOutAction() {
    try {
        const cookieStore = await cookies()
        const userInfo = await getUserInfoAction()
        const result = await LogOutApi({ token: userInfo.token || "" });
        if (result?.returnCode === "0") {
            cookieStore.delete(USER_INFO_KEY)
        }
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}