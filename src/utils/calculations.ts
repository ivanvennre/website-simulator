export interface RiskLevel {
  label: string;
  percentageValue: number;
}

export interface RiskLevels {
  low: RiskLevel;
  moderate: RiskLevel;
  high: RiskLevel;
  aggressive: RiskLevel;
}

export interface ChartDataArguments {
  initialInvestment: number;
  investmentPeriod: number;
  annualInvestment: number;
  riskLevel: keyof RiskLevels;
}

export interface ChartData {
  year: string;
  capitalCall: number;
  capitalDistribution: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

export const riskLevels: RiskLevels = {
  low: {
    label: "Low",
    percentageValue: 0.091,
  },
  moderate: {
    label: "Moderate",
    percentageValue: 0.1203,
  },
  high: {
    label: "High",
    percentageValue: 0.1259,
  },
  aggressive: {
    label: "Aggressive",
    percentageValue: 0.1433,
  },
};

const numberOfYears = 10;

export default function calculateChartData({
  initialInvestment,
  investmentPeriod,
  annualInvestment,
  riskLevel,
}: ChartDataArguments): ChartData[] {
  let capitalCalls: number[] = [];
  let netCashflows: number[] = [];
  const result = [...Array(numberOfYears)].map((_, i) => {
    const capitalCall = calculateCapitalCalls({
      initialInvestment,
      investmentPeriod,
      annualInvestment,
      currentPeriod: i,
    });
    capitalCalls.push(Math.abs(capitalCall));
    const sumCapitalCalls = capitalCalls.reduce((sum, call) => sum + call, 0);

    const capitalDistribution =
      sumCapitalCalls * riskLevels[riskLevel].percentageValue;

    const netCashFlow = capitalCall + capitalDistribution;
    netCashflows.push(netCashFlow);
    const cumulativeCashFlow = netCashflows.reduce(
      (sum, cashFlow) => sum + cashFlow,
      0
    );

    return {
      year: `${i + 1}y`,
      capitalCall,
      capitalDistribution,
      netCashFlow,
      cumulativeCashFlow,
    };
  });

  return result;
}

export function calculatePassiveIncome(
  capitalCalls: number[],
  riskLevelPercentage: number
) {
  return (
    capitalCalls.reduce((sum, call) => Math.abs(sum) + Math.abs(call), 0) *
    riskLevelPercentage
  );
}

interface InvestmentInputs {
  initialInvestment: number;
  investmentPeriod: number;
  annualInvestment: number;
  currentPeriod: number;
}

function calculateCapitalCalls({
  initialInvestment,
  investmentPeriod,
  annualInvestment,
  currentPeriod,
}: InvestmentInputs): number {
  let result = 0;

  // Subtract initial investment if current period is 0
  if (currentPeriod === 0) {
    result -= initialInvestment;
  }

  // Subtract annual investment if current period is within the investment period
  if (currentPeriod > 0 && currentPeriod <= investmentPeriod) {
    result -= annualInvestment;
  }

  return result;
}
