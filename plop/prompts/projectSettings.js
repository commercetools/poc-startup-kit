const projectSettingsPrompts = [
    {
        type: "input",
        name: "clientId",
        message: "Please provide the Client ID",
        validate(answer) {
            return !!answer;
        },
    },
    {
        type: "input",
        name: "clientSecret",
        message: "Please provide the Client Secret",
        validate(answer) {
            return !!answer;
        },
    },
    {
        type: "input",
        name: "projectName",
        message: "Please provide the projectKey",
        validate(answer) {
            return !!answer;
        },
    },
    {
        type: "input",
        name: "authUrl",
        message: "Please provide the authUrl [Enter to use the suggested]",
        default: "https://auth.us-central1.gcp.commercetools.com",
        validate(answer) {
            return !!answer.match(
                /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
            );
        },
    },
    {
        type: "input",
        name: "hostUrl",
        message: "Please provide the hostUrl [Enter to use the suggested]",
        default: "https://api.us-central1.gcp.commercetools.com",
        validate(answer) {
            return !!answer.match(
                /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
            );
        },
    },
    // b2b yml feature
    // b2b subtrees
    // setup currencies and languages in MC
];

export default projectSettingsPrompts;
