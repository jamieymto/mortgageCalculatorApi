import { getPaymentPerSchedule } from '../helpers/mortgage.js';

const calculatorController = {};

calculatorController.calculate = async (req, res, next) => {
    try {
        let paymentPerSchedule = getPaymentPerSchedule(req.body);
        return res.send({ paymentPerSchedule });
    } catch (err) {
        return res.status(400).send({ error: err});
    }
}

export default calculatorController;