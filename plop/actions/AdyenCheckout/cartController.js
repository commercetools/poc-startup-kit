const getCartControllerActions = (data) => ([
    {
        data,
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(const emailApi =.*)/gi,
        template: "// $1",
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(const order = await.*)/gi,
        template: "// $1",
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(emailApi.sendOrderConfirmationEmail.*)/gi,
        template: "// $1",
    },
])

export default getCartControllerActions;
