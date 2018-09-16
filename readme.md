# paypal-braintree-payment-gateway
Demo Library for Paypal and Braintree Payment Gateway

# Setup

Modified following MERN Boilerplate: https://github.com/keithweaver/MERN-boilerplate

```
npm install
```

For running in dev mode: 

```
npm run start:dev
```

For running in prod mode: 

```
npm start
```

## Lint

```
npm run lint
npm run lintfix
```

## Middlewares

I've used custom middleware to check payload and queries coming from front-end to make sure server only accepts which we specified for the API.