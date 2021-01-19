# Mortgate Calculator API

## Pre-requisites

* Node v12+
* Npm v6+
* Postman

## Get Started

* To run locally

`npm install`
`npm run local`

## Deploy to Heroku

* Make sure you push the latest changes

`git push heroku main`

* Open the app in your default web browser

`heroku open`

* cURL a POST request to test

`curl --location --request POST 'https://sheltered-escarpment-94741.herokuapp.com/v1/calculator' \
--header 'Content-Type: application/json' \
--data-raw '{
    "propertyPrice": 800000,
    "downPaymentPercent": 10,
    "interestRatePercent": 2.94,
    "amortizationPeriod": 15,
    "paymentSchedule": "MTHLY"
}'`


## Documentation

* Run cmd

`npm run local`

* Navigate to route in browser

`http://localhost:3001/api-docs/`

## Testing

`npm run test:unit`

`npm run test:integration`


