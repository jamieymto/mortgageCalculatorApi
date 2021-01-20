
// import sinon from 'sinon';
// import calculatorController from '../../controllers/calculatorController.js';
// import mortgage from '../../helpers/mortgage.js';

// describe('Calculator Controller', function () {
//     let req = {
//         body: {
//             propertyPrice: 1400000,
//             downPayment: 420000,
//             interestRate: 0.005,
//             amortizationPeriod: 20,
//             paymentSchedule: 'ACC_MTHLY',
//             province: 'BC'
//         }
//     },
//     error = new Error({ error: "test error" }),
//     res = {}, expectedResult;

//     describe('When calculate', function () {
//         beforeEach(function () {
//             res = {
//                 json: sinon.spy(),
//                 status: sinon.stub().returns({ end: sinon.spy() })
//             };
//         });
//         it('should return valid mortgage payment per schedule', (done) => {
//             expectedResult = req.body
//             sinon.stub(mortgage, 'getPaymentPerSchedule').yields(null, expectedResult);

//             calculatorController.calculate(req, res);

//             // sinon.assert.calledWith(mortgage.getPaymentPerSchedule, req.body);
//             // sinon.assert.calledWith(res.json, sinon.match({
//             //     propertyPrice: 1400000,
//             //     downPayment: 420000,
//             //     interestRate: 0.005,
//             //     amortizationPeriod: 20,
//             //     paymentSchedule: 'ACC_MTHLY',
//             //     province: 'BC'
//             // }));
//             // done();
//         });

//         it('should throw status 400 on validation error', (done) => {
//             sinon.stub(mortgage, 'getPaymentPerSchedule').yields(error);

//             calculatorController.create(req, res);

//             // sinon.assert.calledWith(mortgage.getPaymentPerSchedule, req.body);
//             // sinon.assert.calledWith(res.status, 400);
//             // sinon.assert.calledOnce(res.status(400).end);
//             // done();
//         });
//     });
// });