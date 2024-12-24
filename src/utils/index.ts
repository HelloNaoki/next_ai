/**
 * 获取当前路径参数
 * @param url www.baidu.com?a=3&b=4
 * @returns { object } {a: '3', b: '4'}
 */
export function getUrlParams(url: string) {
    url = url.replace("%3F", "&").replace("%3D", "=");
    const getQueryParams = (temp: { match: (arg0: RegExp) => never[]; }) => {
        const data = temp.match(/([^?=&]+)(=([^&]*))/g) || [];
        return data.reduce(
            (a: { [x: string]: any; }, v: string) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a),
            {}
        );
    };
    const wrapperReplaceParams = (temp: any) => {
        const obj = getQueryParams(temp);
        return obj;
    };
    return wrapperReplaceParams(url);
}

export function utcToLocale(utcDateString: string) {
    // 创建一个 Date 对象
    const utcDate = new Date(utcDateString);

    // 转换为本地时间字符串
    const localString = utcDate.toLocaleString();
    const localDateString = utcDate.toLocaleDateString();

    return { localString, localDateString };
}


export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function (...args: Parameters<T>) {
        // 清除之前的定时器
        if (timeout) {
            clearTimeout(timeout);
        }

        // 设置新的定时器
        timeout = setTimeout(() => {
            func.apply(this, args); // 调用原函数
        }, wait);
    };
}