import chai from 'chai';

chai.should();
let expect = chai.expect;

import { getPaymentPerSchedule } from '../../helpers/mortgage.js';

describe('Mortgage Helper', () => {
    describe('When calling getPaymentPerSchedule with valid inputs', () => {
        const testCases = [{
            input: {
                propertyPrice: 1400000,
                downPayment: 420000,
                interestRate: 0.03,
                amortizationPeriod: 25,
                paymentSchedule: 'MTHLY',
                province: 'BC'
            },
            output: {
                paymentPerSchedule: 4647.27
            }
        }, {
            input: {
                propertyPrice: 500000,
                downPayment: 50000,
                interestRate: 0.03,
                amortizationPeriod: 10,
                paymentSchedule: 'BIWKLY',
                province: 'BC'
            },
            output: {
                paymentPerSchedule: 2004.34
            }
        }, {
            input: {
                propertyPrice: 1400000,
                downPayment: 420000,
                interestRate: 0.005,
                amortizationPeriod: 30,
                paymentSchedule: 'ACC_BIWKLY',
                province: 'BC'
            },
            output: {
                paymentPerSchedule: 1466.03
            }
        }];

        testCases.forEach(testCase => {
            it(`Should return correct mortgage payment of ${testCase.output.paymentPerSchedule} per payment schedule of ${testCase.input.paymentSchedule}`, (done) => {
                let pps = getPaymentPerSchedule(testCase.input);
                pps.should.be.eql(testCase.output.paymentPerSchedule);
                done();
            });
        });
       
    });

    describe('When calling getPaymentPerSchedule with invalid inputs', () => {
        const testCases = [{
            input: {
                propertyPrice: 20000,
                downPayment: 20000,
                interestRate: 0.05,
                amortizationPeriod: 25,
                paymentSchedule: 'MTHLY',
                province: 'BC'
            },
            output: {
                error: 'Invalid property price.  Valid mortgage principal is between 100000 and 2000000.'
            }
        }, {
            input: {
                propertyPrice: 1400000,
                downPayment: 420000,
                interestRate: 0,
                amortizationPeriod: 25,
                paymentSchedule: 'MTHLY',
                province: 'BC'
            },
            output: {
                error: 'Invalid interest rate.  Valid interest rate is between 0.005 and 0.05.'
            }
        }, {
            input: {
                propertyPrice: 500000,
                downPayment: 50000,
                interestRate: 0.03,
                amortizationPeriod: 21,
                paymentSchedule: 'BIWKLY',
                province: 'BC'
            },
            output: {
                error: 'Invalid amortization period. Valid amortization periods are 5, 10, 15, 20, 25, and 30.'
            }
        }, {
            input: {
                propertyPrice: 1400000,
                downPayment: 120000,
                interestRate: 0.005,
                amortizationPeriod: 30,
                paymentSchedule: 'ACC_BIWKLY',
                province: 'BC'
            },
            output: {
                error: 'Down payment amount too low.'
            }
        }, {
            input: {
                propertyPrice: 1400000,
                downPayment: 420000,
                interestRate: 0.005,
                amortizationPeriod: 30,
                paymentSchedule: 'ACC_MTHLY',
                province: 'BC'
            },
            output: {
                error: 'Invalid payment schedule.  Valid payment schedules are: BIWKLY, ACC_BIWKLY, and MTHLY.'
            }
        }];

        testCases.forEach(testCase => {
            it(`Should throw bad request with error message ${testCase.output.error}`, (done) => {
                expect(() => {
                    getPaymentPerSchedule(testCase.input);
                }).to.throw(testCase.output.error);
                done();
            });
        });
    });
});