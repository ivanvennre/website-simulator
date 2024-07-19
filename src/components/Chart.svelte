<script lang="ts">
  import { createEventDispatcher } from "svelte";
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
  import calculateChartData from "../utils/calculations";
  import type { ChartDataArguments, ChartData } from "../utils/calculations";

  const dispatch = createEventDispatcher();

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
  };

  // Example data, replace with your dynamic data as needed
  // let years = [
  //   "Year 0",
  //   "Year 1",
  //   "Year 2",
  //   "Year 3",
  //   "Year 4",
  //   "Year 5",
  //   "Year 6",
  //   "Year 7",
  //   "Year 8",
  //   "Year 9",
  //   "Year 10",
  // ];
  // let cumulativeCF = [
  //   -131954, -157894, -177817, -147741, -117665, -87589, -57513, -27437, 2639,
  //   32715, 62791,
  // ];
  // let totalInvestments = [-150000, -50000, -50000, 0, 0, 0, 0, 0, 0, 0];
  // let totalReturns = [
  //   18046, 24061, 30076, 30076, 30076, 30076, 30076, 30076, 30076, 30076, 30076,
  // ];

  function setOptions(data: ChartData[]) {
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
          data: data.map((item) => item.year),
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
          data: data.map((item) => item.cumulativeCashFlow),
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
          data: data.map((item) => item.capitalCall),
          itemStyle: {
            color: "#7ED00A",
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
          data: data.map((item) => item.capitalDistribution),
          itemStyle: {
            color: "#800080",
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
    return options;
  }

  let options = setOptions([]);

  $: {
    if (
      data.annualInvestment &&
      data.initialInvestment &&
      data.investmentPeriod &&
      data.riskLevel
    ) {
      const chartDataProps: ChartDataArguments = {
        initialInvestment: parseFloat(data.initialInvestment) || 0,
        investmentPeriod: parseFloat(data.investmentPeriod) || 0,
        annualInvestment: parseFloat(data.annualInvestment) || 0,
        riskLevel: data.riskLevel,
      };
      const chartData = calculateChartData(chartDataProps);
      options = setOptions(chartData);
      dispatch("chartFinished", chartData);
    }
  }
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
