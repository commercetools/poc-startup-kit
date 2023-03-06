import fs from "fs";
import getCartControllerActions from "./plop/actions/AdyenCheckout/cartController.js";
import getNoPaymentAction from "./plop/actions/AdyenCheckout/noPayment.js";
import getProjectSettings from "./plop/actions/CoCoActions/projectSettings.js";
import { getFixCheckoutAction, getFixImageAction, getFixPDPAction, getFixPriceAction } from './plop/actions/CodeFixes/index.js';
import getLocaleActions from "./plop/actions/LocaleActions/index.js";
import getProjectConfigActions from "./plop/actions/projectConfig.js";
import projectSettingsPrompts from "./plop/prompts/projectSettings.js";
import getTheGoodStoreAction from "./plop/actions/TheGoodStore/index.js";
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

    plop.setGenerator("All", {
        description: "Fix all startup workarounds",
        prompts: projectSettingsPrompts,
        // prompts: [],
        actions: [
            ...getProjectConfigActions({ configPath }),
            ...getCartControllerActions({ projectPath }),
            ...getNoPaymentAction({ projectPath }),
            ...getFixImageAction({ projectPath }),
            ...getFixPDPAction({ projectPath }),
            ...getFixCheckoutAction({ projectPath }),
            ...getProjectSettings(plop, {}, baseApi, projectSettings),
            ...getLocaleActions({ projectPath, configPath }),
            ...getFixPriceAction({ projectPath }),
        ],
    });

    plop.setGenerator("The-Good-Store", {
        description: "Apply The-Good-Store look and feel + frontend SDK",
        prompts: projectSettingsPrompts,
        // prompts: [],
        actions: [
            ...getProjectConfigActions({ configPath }),
            getTheGoodStoreAction(),
        ],
    });
}
