## nodejs-oauth2-server

Implementing a payments service with JSON API. APIs require authentication with bearer token. 
https://tools.ietf.org/html/rfc6750#section-2.1


oauth2-server was used to get token and authenticate it. Here are the docs:
https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html

There are two main services: oauthService, paymentService.

- Oauthservice, which gets a bearer token from oauth2-server and later authenticates it in order to proceed with the payment requests.
- PaymentService which handles the payment related calls like making a payment, listing payments, approving and canceling.


## Start application

Navigate in folder and execute:
```
npm install
npm run dev
```

## Run Unit test
You can execute unit tests by executing at the main folder:
```
npm install
npm run test
```
## APIs

### Authenticate

- Path: http://localhost:3000/v1/authenticate
- Method: POST

Request:
```
{
    "username": "serious_business",
    "password": "suchPassw0rdSecure"
}
```

Response:
```
{
    "accessToken":"b563dc4d76bc5b7b1c364b301c679766d1f846a7",
    "expiresIn": "2020-12-06T00:15:15.048Z"
}
```

The following payment requests need AccesToken to be present in the headers, in order to authenticate the user:
```
Authorization: Bearer b563dc4d76bc5b7b1c364b301c679766d1f846a7
```
### Make a Payment
 
- Path: http://localhost:3000/v1/payments
- Method: POST

Request:
```
{
    "payeeId": "id",
    "payerId": "id",
    "paymentSystem": "ingenico",
    "paymentMethod": "visa",
    "amount": 32130,
    "currency": "USD",
    "comment": "A comment"
 }
```

Response:
```
{
    "id": "3a7d3830-3748-11eb-80f9-56048e233566",
    "payeeId": "id",
    "payerId": "id",
    "paymentSystem": "ingenico",
    "paymentMethod": "visa",
    "amount": 32130,
    "currency": "USD",
    "created": "2020-12-05T20:21:32.339Z",
    "updated": "2020-12-05T20:21:32.339Z",
    "status": "created",
    "comment": "A comment",
    "user_id": "userid"
}
```

### Approve a Payment
 
- Path: http://localhost:3000/v1/payment/3a7d3830-3748-11eb-80f9-56048e233566/approve
- Method: PUT


### Cancel a Payment
 
- Path: http://localhost:3000/v1/payment/3a7d3830-3748-11eb-80f9-56048e233566/cancel
- Method: PUT


### List Payments
 
- Path: http://localhost:3000/v1/payments
- Method: GET

Response:
```
[
    {
        "id": "3a7d3830-3748-11eb-80f9-56048e233566",
        "payeeId": "id",
        "payerId": "id",
        "paymentSystem": "ingenico",
        "paymentMethod": "visa",
        "amount": 32130,
        "currency": "USD",
        "created": "2020-12-05T20:21:32.339Z",
        "updated": "2020-12-05T20:21:32.339Z",
        "status": "approved",
        "comment": "A comment",
        "user_id": "userid"
    },
    {
        "id": "70f9a000-3749-11eb-89f3-5eb7df163d96",
        "payeeId": "id",
        "payerId": "id",
        "paymentSystem": "ingenico",
        "paymentMethod": "visa",
        "amount": 32130,
        "currency": "USD",
        "created": "2020-12-05T20:30:13.248Z",
        "updated": "2020-12-05T20:30:13.248Z",
        "status": "canceled",
        "comment": "A comment",
        "user_id": "userid"
    }
]
```

### Get a Specific Payment
 
- Path: http://localhost:3000/v1/payments/3a7d3830-3748-11eb-80f9-56048e233566
- Method: GET

Response:
```
{
    "id": "3a7d3830-3748-11eb-80f9-56048e233566",
    "payeeId": "id",
    "payerId": "id",
    "paymentSystem": "ingenico",
    "paymentMethod": "visa",
    "amount": 32130,
    "currency": "USD",
    "created": "2020-12-05T20:21:32.339Z",
    "updated": "2020-12-05T20:21:32.339Z",
    "status": "approved",
    "comment": "A comment",
    "user_id": "userid"
}
```

### Postman collection

You can use node-oauth2.postman_collection.json and import it to postman 