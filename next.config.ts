import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        APP_ID: process.env.APP_ID,
        VIP_URL: process.env.VIP_URL,
        USER_URL: process.env.USER_URL,
        DOCS_URL: process.env.DOCS_URL,
        SERVER_EMAIL: process.env.SERVER_EMAIL,
    },
    experimental: {
        serverActions: {
            allowedOrigins: [process.env.DOMAIN_NAME],
        },
    },
    async rewrites() {
        if (process.env.NODE_ENV !== 'development') return [];
        return [
            {
                source: '/api/configCenter/:path*',
                destination: 'http://configcenter.test-xxl.com/api/configCenter/:path*',
            },
            {
                source: '/store/:path*',
                destination: 'http://test.readpath.com/store/:path*',
            },
            {
                source: '/_store/:path*',
                destination: 'http://test.readpath.com/_store/:path*',
            }, {
                source: '/api/store/:path*',
                destination: 'http://test.readpath.com/api/store/:path*',
            },
            {
                source: '/user/:path*',
                destination: 'http://test.instacloud.com/user/:path*',
            },
            {
                source: '/_user/:path*',
                destination: 'http://test.instacloud.com/_user/:path*',
            }, {
                source: '/api/user/:path*',
                destination: 'http://test.instacloud.com/api/user/:path*',
            },
        ];
    },
};

export default withNextIntl(nextConfig);