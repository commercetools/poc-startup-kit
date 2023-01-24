import fs from "fs";
import getCartControllerActions from "./plop/actions/AdyenCheckout/cartController.js";
import getNoPaymentAction from "./plop/actions/AdyenCheckout/noPayment.js";
import getProjectSettings from "./plop/actions/CoCoActions/projectSettings.js";
import getFixImageAction from "./plop/actions/CodeFixes/image.js";
import getFixPriceAction from "./plop/actions/CodeFixes/price.js";
import getLocaleActions from "./plop/actions/LocaleActions/index.js";
import getProjectConfigActions from "./plop/actions/projectConfig.js";
import projectSettingsPrompts from "./plop/prompts/projectSettings.js";
import BaseApi from "./plop/utils/BaseApi.js";

const readProvisionFile = (plop) => {
    const pathToProvisionFile =
        plop.getDestBasePath() + "/.customer_provision.yml";
    const content = fs.readFileSync(pathToProvisionFile, {
        encoding: "utf8",
        flag: "r",
    });
    const [_, projectName, projectId] = content.match(
        /customer: "(.*)"\s*project: "(.*)"/
    );
    return { projectName, projectId };
};

export default function (plop) {
    // controller generator
    const { projectId, projectName } = readProvisionFile(plop);
    const configPath = `${projectName}_${projectId}/config/project.yml`;
    const projectPath = `packages/${projectId}`;
    const baseApi = new BaseApi();

    let projectSettings = {};

    plop.setGenerator("Config", {
        description: "CoCo <> CoFe configuration",
        prompts: projectSettingsPrompts,
        actions: getProjectConfigActions({ configPath }),
    });

    plop.setGenerator("Remove Adyen logic", {
        description: "Remove Adyen checkout",
        prompts: [],
        actions: [
            // CartController.ts changes
            ...getCartControllerActions({ projectPath }),
            // Add no payment checkout
            ...getNoPaymentAction({ projectPath }),
        ],
    });

    plop.setGenerator("Code fixes", {
        prompts: [],
        actions: [
            ...getFixPriceAction({ projectPath }),
            ...getFixImageAction({ projectPath }),
        ],
    });

    plop.setGenerator("All", {
        description: "Do everything",
        prompts: projectSettingsPrompts,
        // prompts: [],
        actions: [
            ...getProjectConfigActions({ configPath }),
            ...getCartControllerActions({ projectPath }),
            ...getNoPaymentAction({ projectPath }),
            ...getFixPriceAction({ projectPath }),
            ...getFixImageAction({ projectPath }),
            ...getProjectSettings(plop, {}, baseApi, projectSettings),
            ...getLocaleActions({ projectPath, configPath }),
        ],
    });
}
