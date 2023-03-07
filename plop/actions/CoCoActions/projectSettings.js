import locales from "../../locales.js";

const getProjectSettings = (plop, data, baseApi, projectSettings) => {
  plop.setActionType("setupConnection", function (answers) {
    return baseApi.initialize(
      answers.clientId,
      answers.clientSecret,
      answers.projectName,
      answers.authUrl,
      answers.hostUrl
    );
  });

  plop.setActionType("getProjectSettings", function (answers, _, plop) {
    return baseApi.getProjectSettings().then((res) => {
      projectSettings = res;
      return plop.inquirer
        .prompt({
          type: "checkbox",
          name: "countries",
          message: "Select countries",
          choices: locales
            .map((co) => ({
              name: co.alpha2,
              checked: res.countries.includes(co.alpha2),
            }))
            .sort((a) => (a.checked ? -1 : 1)),
        })
        .then(({ countries }) => {
          answers.countries = countries;

          return plop.inquirer
            .prompt({
              type: "list",
              name: "defaultCountry",
              message: "Select the default country",
              choices: countries,
            })
            .then(({ defaultCountry }) => {
              const defaultCountryLocale = locales.find(
                (locale) => locale.alpha2 === defaultCountry
              );
              answers.defaultCountry = defaultCountryLocale;
              return defaultCountry;
            });
        });
    });
  });

  return [
    {
      data,
      type: "setupConnection",
    },
    {
      data,
      type: "getProjectSettings",
    },
  ];
};

export default getProjectSettings;
