module.exports = {
    "good-diary-api": {
        input: {
            target: "http://192.168.15.30:3333/openapi.json",
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