import "dotenv/config";

export default {
    "good-diary-api": {
        input: {
            target: `${process.env.EXPO_BASE_URL}/openapi.json`,
            validation: false
        },
        output: {
            mode: "tags-split",
            target: "./src/services/api/generated/goodDiary.ts",
            schemas: "./src/services/api/generated/model",
            client: "react-query",
            mutator: {
                path: "./src/services/api/custom.instance.ts",
                name: "customInstance"
            }
        }
    }
}