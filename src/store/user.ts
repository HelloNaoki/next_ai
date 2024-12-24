import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { decrypt, encrypt } from '@/utils/crypto/client';

interface UserInfo {
    userId: string | null,
    appId: string | null,
    email: string | null,
    token: string | null,
    memberFlag: number,
    memberDays: string | null
}

export const defaultUserInfo = {
    userId: null,
    appId: null,
    email: null,
    token: null,
    memberFlag: 0,
    memberDays: null
}

interface UserState {
    userInfo: UserInfo;
    setUserInfo: (user: UserInfo) => void;
    clearUserInfo: () => void;
}


const useUserStore = create<UserState>()(
    persist((set) => ({
        userInfo: defaultUserInfo,
        setUserInfo: (userInfo: UserInfo) => {
            set({ userInfo });
        },
        clearUserInfo: () => {
            set({ userInfo: defaultUserInfo });
        }
    }
    ), {
        name: 'user-storage',
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
    } as PersistOptions<UserState>
    )
);

export default useUserStore;