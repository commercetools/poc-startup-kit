const getProjectConfigActions = (data) => ([
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /clientId\: .*\s/gi,
        template: "clientId: {{clientId}}\n",
    },
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /clientSecret\: .*\s/gi,
        template: "clientSecret: {{clientSecret}}\n",
    },
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /projectKey\: .*\s/gi,
        template: "projectKey: {{projectName}}\n",
    },
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /authUrl\: .*\s/gi,
        template: "authUrl: {{authUrl}}\n",
    },
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /hostUrl\: .*\s/gi,
        template: "hostUrl: {{hostUrl}}\n",
    },
]);

export default getProjectConfigActions;
