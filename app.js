import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const PaymentSchedule = {
    BIWEEKLY: 'BIWKLY',
    ACCELERATED_BIWEEKLY: 'ACC_BIWKLY',
    MONTHLY: 'MTHLY'
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
  });

app.get('/health', (req, res) => res.status(200).send('Mortgage Calculator is healthy'));

app.post('/v1/calculator', (req, res) => {
    try {
        let { propertyPrice, downPaymentPercent, interestRatePercent, amortizationPeriod, paymentSchedule } = req.body;

        let numPaymentsPerYear = paymentSchedule.toUpperCase() === PaymentSchedule.BIWEEKLY ? 26 : 12;
        let principal = propertyPrice - (propertyPrice * (downPaymentPercent/100));
        let interestRatePerSchedule = interestRatePercent/100/numPaymentsPerYear;
        let totalNumPayment = amortizationPeriod * numPaymentsPerYear;

        let paymentPerSchedule = principal * ((interestRatePerSchedule * Math.pow(1 + interestRatePerSchedule, totalNumPayment) )/(Math.pow(1 + interestRatePerSchedule, totalNumPayment) - 1));
        if (paymentSchedule.toUpperCase() === PaymentSchedule.ACCELERATED_BIWEEKLY) {
            paymentPerSchedule /= 2;
        }
        let roundedInCurrency = paymentPerSchedule.toFixed(2);
        return res.send({paymentPerSchedule: roundedInCurrency});
    } catch (err) {
        return res.status(400).send({ error:err});
    }
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});