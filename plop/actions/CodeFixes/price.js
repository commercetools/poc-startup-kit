const getFixPriceAction = (data) => [
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/price/index.tsx",
        pattern: /const Price((.*)\s*)+;/gm,
        templateFile: "plop/_templates/price.hbs",
    },
];

export default getFixPriceAction;
