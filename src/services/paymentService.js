const paymentModel = require('../models/paymentModel');
const errorHandler = require('../models/errorModel');

export async function createPayment(req, res) {

    try {
        if (req != null && req.body != null && req.body.amount != null && req.body.amount != 0) {
            var payment = paymentModel.addPayment(req.body);
            res.status(201).json(payment);
        } else {
            var message = errorHandler.getMessage('ERR_VALIDATION');
            res.status(400).json(message);
        }
    } catch (err) {
        var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
        res.status(500).json(message);
    }
}

export async function listPayments(req, res) {
    try {
        var list = paymentModel.listPayments(req.body.user_id);
        res.status(200).json(list);
    } catch (err) {
        var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
        res.status(500).json(message);
    }
}

export async function getPayment(req, res) {

    try {
        var userId = req.body.user_id;
        var paymentId = req.params.id;
        var payment = paymentModel.getPayment(userId, paymentId);
        res.status(200).json(payment);
    } catch (err) {
        var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
        res.status(500).json(message);
    }
}

export async function approvePayment(req, res) {

    try {
        var userId = req.body.user_id;
        var paymentId = req.params.id;
        var payment = paymentModel.approvePayment(userId, paymentId);
        if (payment) {
            res.status(200).json();
        } else {
            var message = errorHandler.getMessage('ERR_CANNOT_APPROVE');
            res.status(400).json(message);
        }
    } catch (err) {
        var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
        res.status(500).json(message);
    }
}

export async function cancelPayment(req, res) {

    try {
        var userId = req.body.user_id;
        var paymentId = req.params.id;
        var payment = paymentModel.cancelPayment(userId, paymentId);
        if (payment) {
            res.status(200).json();
        } else {
            var message = errorHandler.getMessage('ERR_CANNOT_CANCEL');
            res.status(400).json(message);
        }
    } catch (err) {
        var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
        res.status(500).json(message);
    }
}