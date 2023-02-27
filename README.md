# STARTUP KIT
Using this little cli you can implement the workarounds in no time!

## Requirements
- A new CoCo-CoFe project (it's better to not have code modifications)
- CoCO API credentials
- Node installed locally
- Basic configuration of CoCo you have to do:
    - Add a product type and some products
    - Enable Storefront search
    - Add Zone(s)
    - Add tax rules
    - Add Shipping methods for Zones/Countries


## Steps

1. In terminal navigate to the root directory of your project.
1. Add this repo as a dependency `yarn add https://github.com/commercetools/poc-startup-kit`
1. In terminal run `yarn poc-startup-kit` and follow the on screen questions.
1. After finishing with the fixes, you have to run `yarn fix` in your frontend directory and run `yarn lint:fix` in your backend directory.
1. remove this repo as dependency `yarn remove https://github.com/commercetools/poc-startup-kit`

### Features
- Add No-checkout-payment step to checkout and remove Adyen
- Fix Ccountry dropdown in checkout
- Fix locales and prices in code
- Fix PDP loading issue

### Upcoming features
- Add locales and currencies directly to CoCo
- Add Zones and shipping methods to CoCo
- Use frontend SDK
- Use B2B BE/FE features 
