let authToken: string | null = null;

export const tokenStore = {
    setToken(token: string) {
        authToken = token;
    },
    getToken() {
        return authToken;
    },
    clearToken() {
        return authToken = null;
    }
}
