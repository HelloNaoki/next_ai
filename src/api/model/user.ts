export interface LoginParams {
    appId: string
    email: string
    password: string
}
/**
 * 返回信息
 */
export interface LoginResult {
    /**
     * 应用id
     */
    appId: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 会员到期时间，yyyy.mm.dd
     */
    memberDays: string;
    /**
     * 是否会员，0-不是；1-是
     */
    memberFlag: number;
    /**
     * 登录成功token
     */
    token: string;
    /**
     * 用户id
     */
    userId: string;
    [property: string]: any;
}