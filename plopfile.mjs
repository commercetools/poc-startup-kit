import fs from "fs";
export default function (plop) {
  // controller generator
  const pathToProvisionFile =
    plop.getDestBasePath() + "/.customer_provision.yml";
  const content = fs.readFileSync(pathToProvisionFile, {
    encoding: "utf8",
    flag: "r",
  });
  const [_, projectName, projectId] = content.match(
    /customer: "(.*)"\s*project: "(.*)"/
  );
  const configPath = `${projectName}_${projectId}/config/project.yml`;
  const projectPath = `packages/${projectId}`;
  //
  plop.setGenerator("config", {
    description: "CoCo <> CoFe configuration",
    prompts: [
      {
        type: "input",
        name: "clientId",
        message: "Please provide the Client ID",
        validate(answer) {
          return !!answer;
        },
      },
      {
        type: "input",
        name: "clientSecret",
        message: "Please provide the Client Secret",
        validate(answer) {
          return !!answer;
        },
      },
      {
        type: "input",
        name: "projectKey",
        message: "Please provide the projectKey",
        validate(answer) {
          return !!answer;
        },
      },
      {
        type: "input",
        name: "authUrl",
        message: "Please provide the authUrl [Enter to use the suggested]",
        default: "https://auth.us-central1.gcp.commercetools.com",
        validate(answer) {
          return !!answer.match(
            /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
          );
        },
      },
      {
        type: "input",
        name: "hostUrl",
        message: "Please provide the hostUrl [Enter to use the suggested]",
        default: "https://api.us-central1.gcp.commercetools.com",
        validate(answer) {
          return !!answer.match(
            /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
          );
        },
      },
      // b2b yml feature
      // b2b subtrees
      // setup currencies and languages in MC
    ],
    actions: [
      {
        data: {
          configPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /clientId\: .*\s/gi,
        template: "clientId: {{clientId}}\n",
      },
      {
        data: {
          configPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /clientSecret\: .*\s/gi,
        template: "clientSecret: {{clientSecret}}\n",
      },
      {
        data: {
          configPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /projectKey\: .*\s/gi,
        template: "projectKey: {{projectKey}}\n",
      },
      {
        data: {
          configPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /authUrl\: .*\s/gi,
        template: "authUrl: {{authUrl}}\n",
      },
      {
        data: {
          configPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /hostUrl\: .*\s/gi,
        template: "hostUrl: {{hostUrl}}\n",
      },
    ],
  });

  plop.setGenerator("Default shipping method", {
    description: "Set default shipping method to empty",
    prompts: [],
    actions: [
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{configPath}}",
        pattern: /clientId\: .*\s/gi,
        template: "clientId: {{clientId}}\n",
      },
    ],
  });

  plop.setGenerator("Remove Adyen logic", {
    description: "Remove Adyen checkout",
    prompts: [],
    actions: [
      // CartController.ts changes
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(const emailApi =.*)/gi,
        template: "// $1",
      },
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(const order = await.*)/gi,
        template: "// $1",
      },
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/actionControllers/CartController.ts",
        pattern: /(emailApi.sendOrderConfirmationEmail.*)/gi,
        template: "// $1",
      },
      // Add no payment checkout
      {
        data: {
          projectPath,
        },
        type: "add",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/panels/checkout-no-payment.tsx",
        templateFile: "_templates/no-checkout-payment.hbs",
        abortOnFail: true,
      },
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern: /(import Checkout from.*)/gi,
        template:
          "import CheckoutNoPayment from 'components/commercetools-ui/adyen-checkout/panels/checkout-no-payment';\nimport { useRouter } from 'next/router';",
      },
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern:
          "const { data: cartList, updateCart, setShippingMethod } = useCart();",
        template: `const { data: cartList, updateCart, setShippingMethod, checkout } = useCart();
                const router = useRouter();`,
      },
      {
        data: {
          projectPath,
        },
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
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/adyen-checkout/index.tsx",
        pattern: "const steps = [",
        template: `const createOrder = () => {
                checkout();
                router.push('/thank-you');
                };

                const steps = [`,
      },
    ],
  });

  plop.setGenerator("Code fixes", {
    prompts: [],
    actions: [
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/frontend/frontastic/lib/image/index.tsx",
        pattern: "let media: MediaItem;",
        template: `
                if (!mediaProp) {
                    return null;
                  }
                  let media: MediaItem;
                `,
      },
      {
        data: {
          projectPath,
        },
        type: "modify",
        path: "{{projectPath}}/frontend/components/commercetools-ui/price/index.tsx",
        pattern: /const Price((.*)\s*)+;/gm,
        templateFile: "_templates/price.hbs",
      },
    ],
  });
}
