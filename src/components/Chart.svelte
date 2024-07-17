<script lang="ts">
  import { Chart } from "svelte-echarts";
  import { init, use } from "echarts/core";
  import { BarChart } from "echarts/charts";
  import { LineChart } from "echarts/charts";
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from "echarts/components";
  import { CanvasRenderer } from "echarts/renderers";

  // Enable tree-shaking
  use([
    BarChart,
    LineChart,
    LegendComponent,
    GridComponent,
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
  ]);

  export let data: {
    initialInvestment: string;
    investmentPeriod: string;
    annualInvestment: string;
    riskLevel: string;
    targetAnnualPassiveIncome: string;
  };

  // Example data, replace with your dynamic data as needed
  let years = [
    "31.12.2023",
    "31.12.2024",
    "31.12.2025",
    "31.12.2026",
    "31.12.2027",
    "31.12.2028",
  ];
  let cumulativeCF = [
    -63339.396120000005, -100551.2913405, -128420.62563329999,
    -59063.98688189998, 28977.773724900035, 53046.744250500036,
  ];
  let totalReturns = [-63339.396120000005, -47504.54709, -47504.54709, 0, 0, 0];
  let totalInvestments = [
    0, 10292.651869500001, 19635.2127972, 69356.63875140001, 88041.76060680002,
    24068.9705256,
  ];

  let options = {
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    xAxis: [
      {
        type: "category",
        data: years.map((year) => year.slice(-4)),
        axisPointer: {
          type: "shadow",
          label: {
            show: false,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        show: false,
      },
      {
        show: false,
      },
    ],
    series: [
      {
        name: "Cumulative Cash Flow",
        type: "line",
        yAxisIndex: 0,
        data: cumulativeCF,
        symbol: "none",
        lineStyle: {
          width: 3,
          color: "#CCCCCC",
        },
        smooth: true,
        itemStyle: {
          color: "#CCCCCC",
        },
        label: {
          show: false,
        },
        animation: true,
        animationDuration: 1500,
        animationEasing: "exponentialInOut",
        z: 1,
      },
      {
        name: "Total Investments",
        type: "bar",
        data: totalInvestments,
        itemStyle: {
          color: "#800080", // Purple color
          borderRadius: 4,
        },
        label: {
          show: false,
        },
        animation: true,
        animationDuration: 1500,
        animationEasing: "exponentialInOut",
        z: 2,
      },
      {
        name: "Total Returns",
        type: "bar",
        data: totalReturns,
        itemStyle: {
          color: "#7ED00A", // Green color
          borderRadius: 4,
        },
        label: {
          show: false,
        },
        animation: true,
        animationDuration: 1500,
        animationEasing: "exponentialInOut",
        z: 2,
      },
    ],
  };

  // Update options data dynamically based on input data
  // $: options.series[0].data = [
  //   parseFloat(data.initialInvestment) || 0,
  //   parseFloat(data.annualInvestment) || 0,
  //   parseFloat(data.targetAnnualPassiveIncome) || 0,
  // ];
</script>

<div class="chart-container">
  <Chart {init} {options} />
</div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>
