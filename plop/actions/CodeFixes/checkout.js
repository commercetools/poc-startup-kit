const getFixCheckoutAction = (data) => [
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/panels/address.tsx",
        pattern: />\n(\s)*{availableCountryOptions/gm,
        template: `>
        <option value={null} disabled selected></option>
        {availableCountryOptions`
    },
]

export default getFixCheckoutAction;
