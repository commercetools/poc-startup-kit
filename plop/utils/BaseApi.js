import fetch from "node-fetch";

class BaseApi {
  initialize = async (
    clientId,
    clientSecret,
    projectName,
    authUrl,
    hostUrl
  ) => {
    this.projectName = projectName;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.clientSecret = clientSecret;
    this.authUrl = authUrl;
    this.hostUrl = hostUrl;
    await this.getAccessToken();
  };

  getAccessToken = async () => {
    const res = await fetch(
      `${this.authUrl}/oauth/token?grant_type=client_credentials&scope=manage_project:${this.projectName}`,
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
    return fetch(`${this.hostUrl}/${this.projectName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  };
}

export default BaseApi;
