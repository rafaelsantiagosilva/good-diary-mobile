import { UserPayload } from "@/types/user-payload";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "good-diary_auth_token";

export const tokenStore = {
    async setToken(token: string) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    },
    async getToken() {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    },
    async clearToken() {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    },
    async getUser(): Promise<UserPayload | null> {
        const token = await this.getToken();

        if (!token) return null;

        try {
            const decoded = jwtDecode<UserPayload>(token);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}
