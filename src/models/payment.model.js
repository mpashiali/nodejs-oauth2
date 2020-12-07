const uuidv = require('uuidv1');

var payments = [];

export function addPayment(request) {

    var payment = {
        id: uuidv(),
        payeeId: request.payeeId,
        payerId: request.payerId,
        paymentSystem: request.paymentSystem,
        paymentMethod: request.paymentMethod,
        amount: request.amount,
        currency: request.currency,
        created: new Date(),
        updated: new Date(),
        status: 'created',
        comment: request.comment,
        user_id: request.user_id
    }
    payments.push(payment);
    if (payment != null) {
        return payment;
    } else {
        console.log('Problem with payment');
        return null;
    }
}

export function listPayments(userId) {

    var userPayments = payments.filter(function (payment) {
        return payment.user_id === userId;
    });
    return userPayments;
}

export function getPayment(userId, paymentId) {

    var userPayment = payments.filter(function (payment) {
        return payment.user_id === userId && payment.id === paymentId;
    });
    return userPayment[0];
}

export function approvePayment(userId, paymentId) {
    var userPayment = payments.filter(function (payment) {
        return payment.user_id === userId && payment.id === paymentId;
    });

    if (userPayment != null && userPayment[0] != null && userPayment[0].status !== 'canceled') {
        userPayment[0].status = 'approved';
        payments.push(userPayment);
        return true;
    }
    return false;
}

export function cancelPayment(userId, paymentId) {
    var userPayment = payments.filter(function (payment) {
        return payment.user_id === userId && payment.id === paymentId;
    });

    if (userPayment != null && userPayment[0] != null && userPayment[0].status !== 'approved') {
        userPayment[0].status = 'canceled';
        payments.push(userPayment);
        return true;
    }
    return false;
}