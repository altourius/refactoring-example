let plays = require('./plays.json');
let TragedyCalculator = require("./TragedyCalculator")
let ComedyCalculator = require("./ComedyCalculator")

module.exports = function createStatementData(invoice, plays)
{
    const statementData = {}
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)

    return statementData
}

function enrichPerformance(aPerformance)
{
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay)
        case "comedy": return new ComedyCalculator(aPerformance, aPlay)
        default:
            throw new Error(`unknown type: ${aPlay.type}`)
    }
} 

function totalVolumeCredits(data)
{
    let result = 0
    for (let perf of data.performances)
    {
        result += perf.volumeCredits
    }
    return result
}

function totalAmount(data)
{
    let result = 0
    for (let perf of data.performances)
    {
        result += perf.amount
    }
    return result
}

function playFor(aPerformance)
{
    return plays[aPerformance.playID];
}