const getLocaleActions = (data) => [
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/helpers/hooks/useI18n.ts",
        pattern: "const [country] = useState('DE');",
        template: "const [country] = useState('{{defaultCountry.alpha2}}');",
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/backend/commerce-commercetools/apis/BaseApi.ts",
        pattern: /const defaultCurrency((.|\n)*)en: 'GB',\n};/gm,
        templateFile: "plop/_templates/base-api.hbs"
    },
    {
        data,
        type: "modify",
        path: "{{configPath}}",
        pattern: /languages((.|\n)*)defaultLanguage: en_GB\n/gm,
        template: "languages: \n  - {{defaultCountry.default_locale}} \ndefaultLanguage: {{defaultCountry.default_locale}}\n"
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/project.config.js",
        pattern: /en: 'en_GB',/gm,
        template: "{{defaultCountry.languages.[0]}}: '{{defaultCountry.default_locale}}',"
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/next-i18next.config.js",
        pattern: /defaultLocale((.|\n)*)locales: \['en'\],/gm,
        template: "defaultLocale: '{{defaultCountry.languages.[0]}}',\nlocales: ['{{defaultCountry.languages.[0]}}'],"
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/helpers/currencyHelpers.ts",
        pattern: /'EUR'/gm,
        template: "'{{defaultCountry.currency}}'"
    },
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/helpers/currencyHelpers.ts",
        pattern: /'de-DE'/gm,
        template: "'{{defaultCountry.languages.[0]}}'"
    },
]

export default getLocaleActions;
