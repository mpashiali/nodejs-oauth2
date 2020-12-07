const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const regeneratorRuntime = require("regenerator-runtime");

const oauthService = require('./services/oauthService');
const paymentService = require('./services/paymentService');

export function runApplication() {
    var app = express();

    //Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    //Routes
    app.post('/v1/authenticate', oauthService.createToken);
    app.post('/v1/payments', oauthService.checkAuthentication, paymentService.createPayment);
    app.get('/v1/payments', oauthService.checkAuthentication, paymentService.listPayments);
    app.get('/v1/payment/:id', oauthService.checkAuthentication, paymentService.getPayment);
    app.put('/v1/payment/:id/approve', oauthService.checkAuthentication, paymentService.approvePayment);
    app.put('/v1/payment/:id/cancel', oauthService.checkAuthentication, paymentService.cancelPayment);

    //Handle Invalid Path
    app.use(function (req, res, next) {
        res.status(404).send("Invalid path!");
    });

    return app;
};
