type configType = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any; // 可选
    headers?: { [key: string]: string };
    baseURL?: string | undefined;
};

class Fetch {
    private buildQueryString(params: Record<string, any>): string {
        const query = new URLSearchParams();
        Object.keys(params).forEach(key => {
            (params[key] || params[key] === 0) && query.append(key, params[key]);
        });
        return query.toString();
    }

    async request<T = any>(config: configType) {
        let fetchURL = config.baseURL ? config.baseURL + config.url : config.url;
        console.log("fetchURL", fetchURL);

        const fetchConfig: RequestInit =
            config.method === 'POST' || config.method === 'PUT'
                ? {
                    method: config.method,
                    headers: { 'Content-Type': 'application/json', ...config.headers },
                    body: JSON.stringify(config.data),
                    cache:"no-cache"
                }
                : {
                    method: config.method,
                    cache:"no-cache"
                };

        try {
            const res = await fetch(fetchURL, fetchConfig);
            if (!res.ok) {
                console.error(`HTTP error! status: ${res.status}`);
                return {}
            }
            const data: T = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            return {}
        }
    }

    get<T1 = any, T2 = any>(baseURL: string | undefined, url: string, data?: T2, headers?: { [key: string]: string }): Promise<any> {
        const queryString = data ? `?${this.buildQueryString(data)}` : '';
        return this.request<T1>({ baseURL, url: url + queryString, method: 'GET', headers });
    }

    post<T1 = any, T2 = any>(baseURL: string | undefined, url: string, data?: T2, headers?: { [key: string]: string }): Promise<any> {
        return this.request<T1>({ baseURL, url, method: 'POST', data, headers });
    }

    put<T1 = any, T2 = any>(baseURL: string | undefined, url: string, data?: T2, headers?: { [key: string]: string }): Promise<any> {
        return this.request<T1>({ baseURL, url, method: 'PUT', data, headers });
    }

    delete<T1 = any, T2 = any>(baseURL: string | undefined, url: string, data?: T2, headers?: { [key: string]: string }): Promise<any> {
        return this.request<T1>({ baseURL, url, method: 'DELETE', data, headers });
    }
}

export default new Fetch();