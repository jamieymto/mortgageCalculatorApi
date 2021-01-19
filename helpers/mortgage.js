import { PaymentSchedule } from '../enums/mortgage.js';

const validatePropertyPrice = (propertyPrice) => {

}

const validateDownPayment = (downPayment) => {

}

const validateInterestRate = (interestRate) => {

}

const validateAmortizationPeriod = (amortizationPeriod) => {

}

const validatePaymentSchedule = (paymentSchedule) => {

}

const calculate = ({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule }) => {
    let numPaymentsPerYear = paymentSchedule.toUpperCase() === PaymentSchedule.BIWEEKLY ? 26 : 12;
    let principal = propertyPrice - downPayment;
    let interestRatePerSchedule = interestRate/numPaymentsPerYear;
    let totalNumPayment = amortizationPeriod * numPaymentsPerYear;

    let paymentPerSchedule = principal * ((interestRatePerSchedule * Math.pow(1 + interestRatePerSchedule, totalNumPayment) )/(Math.pow(1 + interestRatePerSchedule, totalNumPayment) - 1));
    if (paymentSchedule.toUpperCase() === PaymentSchedule.ACCELERATED_BIWEEKLY) {
        paymentPerSchedule /= 2;
    }
    let roundedInCurrency = parseFloat(paymentPerSchedule).toFixed(2);
    return roundedInCurrency;
}

export const getPaymentPerSchedule = ({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule }) => {
    validatePropertyPrice(propertyPrice);
    validateDownPayment(downPayment);
    validateInterestRate(interestRate);
    validateAmortizationPeriod(amortizationPeriod);
    validatePaymentSchedule(paymentSchedule);

    let paymentPerSchedule = calculate({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule });
    return paymentPerSchedule;
}