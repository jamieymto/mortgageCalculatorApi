export const bc = () => {
    return {
        propertyPrice: {
            min: 100000,
            max: 2000000
        },
        downPayment: [
            {
                min: 0.05,
                max: 1,
                lowerBound: 0,
                upperBound: 500000
            }, {
                min: 0.1,
                max: 1,
                lowerBound: 500001,
                upperBound: 999999
            }, {
                min: 0.2,
                max: 1,
                lowerBound: 1000000,
                upperBound: 3000000 // maximum residential mortgage
            }
        ],
        interestRate: {
            min: 0.005,
            max: 0.05
        },
        amortizationPeriod: {
            min: 5,
            max: 30
        }
    }
}