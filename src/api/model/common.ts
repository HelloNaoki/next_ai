export interface BasicResponse<T> {
    data: T;
    errorMessage: string;
    returnCode: string;
}
export interface CommonResponse {
    /**
     * 错误信息
     */
    errorMessage: string;
    /**
     * 返回编码，200则成功
     */
    returnCode: string;
    [property: string]: any;
}

export interface BaseParams {
    /**
     * 应用id
     */
    appId: string;
    /**
     * 语言，en英语，pt葡语
     */
    appLanguage: string;
    /**
     * 用户id（即邮箱）
     */
    userId: string;
}