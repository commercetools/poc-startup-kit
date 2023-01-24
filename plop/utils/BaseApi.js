import fetch from "node-fetch";

class BaseApi {
    initialize = async (clientId, clientSecret, projectName) => {
        this.projectName = projectName;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        await this.getAccessToken();
    };

    getAccessToken = async () => {
        const res = await fetch(
            `https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:${this.projectName}`,
            {
                method: "post",
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${this.clientId}:${this.clientSecret}`
                    ).toString("base64")}`,
                },
            }
        ).then((res) => res.json());
        this.token = res.access_token;
    };

    getProjectSettings = async () => {
        return fetch(
            `https://api.us-central1.gcp.commercetools.com/${this.projectName}`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        ).then(res=>res.json());
    };
}

export default BaseApi;
