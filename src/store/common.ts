import { getTermsConfigApi } from '@/api/terms';
import { decrypt, encrypt } from '@/utils/crypto/client';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import Cookies from "js-cookie";
import { TermsConfig } from '@/api/model/terms';

export interface Config {
    USER_URL: string;
    VIP_URL: string;
    DOCS_URL: string;
    APP_ID: string;
    SERVER_EMAIL: string
}

interface CommonState {
    config: Config;
    termsConfig: TermsConfig;
    showModal: boolean;
    modalType: string;
    language: string;
    setConfig: (config: Config) => void;
    setTermsConfig: (termsConfig: TermsConfig) => void;
    setShowModal: (showModal: boolean) => void;
    setModalType: (modalType: string) => void;
    setLanguage: (language: string) => void;
    getTermsConfig: () => void;
}

const useCommonStore = create<CommonState>()(
    persist(
        (set, get) => ({
            config: { VIP_URL: "", USER_URL: "", DOCS_URL: "", APP_ID: "", SERVER_EMAIL: "" },
            termsConfig: {},
            showModal: false,
            modalType: "",
            language: "en",
            setConfig: (config: Config) => set({ config }),
            setTermsConfig: (termsConfig: TermsConfig) => set({ termsConfig }),
            setShowModal: (showModal: boolean) => set({ showModal }),
            setModalType: (modalType: string) => set({ modalType }),
            setLanguage: (language: string) => {
                set({ language })
                Cookies.set('language', language)
            },
            getTermsConfig: async () => {
                const { termsConfig, config } = get();
                if (Object.keys(termsConfig).length) return termsConfig;
                const termsData = await getTermsConfigApi(config.APP_ID);
                set({ termsConfig: termsData });
                return termsData;
            },
        }),
        {
            name: 'common-storage',
            storage: createJSONStorage(() => ({
                getItem: (name) => {
                    const encryptedData = sessionStorage.getItem(name);
                    return encryptedData ? decrypt(encryptedData) : null;
                },
                setItem: (name, value) => {
                    const encryptedData = encrypt(value);
                    sessionStorage.setItem(name, encryptedData);
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name)
                }
            })),
        } as PersistOptions<CommonState>
    )
);

export default useCommonStore;