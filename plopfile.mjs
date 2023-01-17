import fs from 'fs';
export default function (plop) {
    // controller generator
    plop.setGenerator('config', {
        description: 'CoCo <> CoFe configuration',
        prompts: [{
            type: 'input',
            name: 'configPath',
            message: 'Please provide the path to config.yml [Enter to use the suggested]',
            default() {
                const pathToProvisionFile = plop.getDestBasePath() + '/.customer_provision.yml';
                const content = fs.readFileSync(pathToProvisionFile, {encoding:'utf8', flag:'r'});
                const [_, projectName, projectId] = content.match(/customer: "(.*)"\s*project: "(.*)"/);
                return `${projectName}_${projectId}/config/project.yml`
            }
        },{
            type: 'input',
            name: 'clientId',
            message: 'Please provide the Client ID',
            validate(answer) {
                return !!answer;
            }
        },{
            type: 'input',
            name: 'clientSecret',
            message: 'Please provide the Client Secret',
            validate(answer) {
                return !!answer;
            }
        },{
            type: 'input',
            name: 'projectKey',
            message: 'Please provide the projectKey',
            validate(answer) {
                return !!answer;
            }
        },{
            type: 'input',
            name: 'authUrl',
            message: 'Please provide the authUrl [Enter to use the suggested]',
            default: 'https://auth.us-central1.gcp.commercetools.com',
            validate(answer) {
                return !!answer.match(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);
            }
        },{
            type: 'input',
            name: 'hostUrl',
            message: 'Please provide the hostUrl [Enter to use the suggested]',
            default: 'https://api.us-central1.gcp.commercetools.com',
            validate(answer) {
                return !!answer.match(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);
            }
        }],
        actions: [{
            type: "modify",
            path: '{{configPath}}',
            pattern: /clientId\: .*\s/gi,
            template: "clientId: {{clientId}}\n",
          },{
            type: "modify",
            path: '{{configPath}}',
            pattern: /clientSecret\: .*\s/gi,
            template: "clientSecret: {{clientSecret}}\n",
          },{
            type: "modify",
            path: '{{configPath}}',
            pattern: /projectKey\: .*\s/gi,
            template: "projectKey: {{projectKey}}\n",
          },{
            type: "modify",
            path: '{{configPath}}',
            pattern: /authUrl\: .*\s/gi,
            template: "authUrl: {{authUrl}}\n",
          },{
            type: "modify",
            path: '{{configPath}}',
            pattern: /hostUrl\: .*\s/gi,
            template: "hostUrl: {{hostUrl}}\n",
          },]
    });

};
