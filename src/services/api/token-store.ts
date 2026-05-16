import * as SecureStore from "expo-secure-store";

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
    }
}
