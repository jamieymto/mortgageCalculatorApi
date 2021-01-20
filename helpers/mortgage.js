import { PaymentSchedule } from '../enums/mortgage.js';
import { ValidAlphaCodes, AlphaCode } from '../enums/province.js';
import { bc } from '../validation/mortgage.js';

const validatePropertyPrice = (propertyPrice, province) => {
    let provinceUpper = province.toUpperCase();
    if (provinceUpper === AlphaCode.BRITISH_COLUMBIA) {
        if (propertyPrice < bc().propertyPrice.min || propertyPrice > bc().propertyPrice.max) {
            throw new Error(`Invalid property price.  Valid mortgage principal is between ${bc().propertyPrice.min} and ${bc().propertyPrice.max}.`);
        }
    }

}

const validateDownPayment = (downPayment, propertyPrice, province) => {
    let provinceUpper = province.toUpperCase();
    let remainingPropertyPrice = propertyPrice;
    let minimumDownPayment = 0;

    if (provinceUpper === AlphaCode.BRITISH_COLUMBIA) {
        bc().downPayment.forEach(dp => {
            if (propertyPrice >= dp.lowerBound) {
                remainingPropertyPrice = remainingPropertyPrice - dp.upperBound;
                minimumDownPayment = minimumDownPayment + (propertyPrice * dp.min);
            }
        })
    }

    if (downPayment < minimumDownPayment) {
        throw new Error('Down payment amount too low.  ');
    }
}

const validateInterestRate = (interestRate) => {

}

const validateAmortizationPeriod = (amortizationPeriod, province) => {
    let provinceUpper = province.toUpperCase();
    let isFiveYearIncrement = amortizationPeriod % 5 === 0;
    if (!isFiveYearIncrement || provinceUpper === AlphaCode.BRITISH_COLUMBIA) {
        if (amortizationPeriod < bc().amortizationPeriod.min || amortizationPeriod > bc().amortizationPeriod.max) {
            throw new Error('Invalid amortization period. Valid amortization periods are 5, 10, 15, 20, 25, and 30.');
        }
    }
    // other province validation
}

const validatePaymentSchedule = (paymentSchedule) => {
    const paymentScheduleUpper = paymentSchedule.toUpperCase();
    if (!(paymentScheduleUpper === PaymentSchedule.MONTHLY 
        || paymentScheduleUpper === PaymentSchedule.BIWEEKLY 
        || paymentScheduleUpper === PaymentSchedule.ACCELERATED_BIWEEKLY)) {
            throw new Error('Invalid payment schedule.  Valid payment schedules are: BIWKLY, ACC_BIWKLY, and MTHLY.');
    }
}

const validateProvince = (province) => {
    if (!ValidAlphaCodes.includes(province.toUpperCase())) {
        throw new Error('Invalid province alpha code.  Please use a valid province within Canada.');
    }
}

const calculate = ({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province }) => {
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

export const getPaymentPerSchedule = ({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province }) => {
    validatePropertyPrice(propertyPrice, province);
    validateDownPayment(downPayment, propertyPrice, province);
    validateInterestRate(interestRate);
    validateAmortizationPeriod(amortizationPeriod, province);
    validatePaymentSchedule(paymentSchedule);
    validateProvince(province);

    let paymentPerSchedule = calculate({ propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province });
    return paymentPerSchedule;
}