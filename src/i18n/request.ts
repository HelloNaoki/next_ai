import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
    let locale = 'en';
    const cookie = await cookies()
    const cookieLanguage = cookie.get('language')?.value

    if (!cookieLanguage) {
        const headerLanguage = (await headers()).get('accept-language')?.split(',')[0]
        let locale = headerLanguage || 'en';
        locale = ["en", "pt"].includes(locale) ? locale : 'en';
    } else {
        locale = cookieLanguage
    }
    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});