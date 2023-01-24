const getNoPaymentAction = (data) => [
    {
        data,
        type: "add",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/panels/checkout-no-payment.tsx",
        templateFile: "plop/_templates/no-checkout-payment.hbs",
        abortOnFail: true,
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern: /(import Checkout from.*)/gi,
        template:
            "import CheckoutNoPayment from 'components/commercetools-ui/adyen-checkout/panels/checkout-no-payment';\nimport { useRouter } from 'next/router';",
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern:
            "const { data: cartList, updateCart, setShippingMethod } = useCart();",
        template: `const { data: cartList, updateCart, setShippingMethod, checkout } = useCart();
        const router = useRouter();`,
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern:
            "{ name: formatMessage({ id: 'payment', defaultMessage: 'Payment' }), component: <Checkout /> },",
        template: `{
            name: formatMessage({ id: 'payment', defaultMessage: 'Payment' }),
            component: <CheckoutNoPayment onSubmitOrder={createOrder} />,
        },`,
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern: "const steps = [",
        template: `const createOrder = () => {
        checkout();
        router.push('/thank-you');
        };

        const steps = [`,
    },
];

export default getNoPaymentAction;
