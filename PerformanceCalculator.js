module.exports = class PerformanceCalculator
{
    constructor(aPerformance, aPlay)
    {
        this.performance = aPerformance
        this.play = aPlay
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }

    get amount()
    {
        throw new Error("subclass reponsibility")
    }
}