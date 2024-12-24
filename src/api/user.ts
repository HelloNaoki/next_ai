import Fetch from '@/utils/http';
import { LoginParams, LoginResult } from './model/user';
import { BasicResponse, CommonResponse } from './model/common';


export const LoginApi = (params: LoginParams): Promise<BasicResponse<LoginResult>> => {
    return Fetch.post(
        process.env.USER_API_URL,
        '/api/h5/login',
        params
    )
}
export const LogOutApi = (headers: { [key: string]: string }): Promise<CommonResponse> => {
    return Fetch.post(
        process.env.USER_API_URL,
        '/api/h5/logout',
        null,
        headers
    )
}