<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Chart } from "svelte-echarts";
  import { init, use } from "echarts/core";
  import { BarChart, LineChart } from "echarts/charts";
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from "echarts/components";
  import { CanvasRenderer } from "echarts/renderers";
  import calculateChartData from "../utils/calculations";
  import type {
    ChartDataArguments,
    ChartData,
    RiskLevels,
  } from "../utils/calculations";

  const dispatch = createEventDispatcher();

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
    riskLevel: keyof RiskLevels;
  };

  function formatValue(value: number) {
    if (Math.abs(value) >= 1000) {
      return value < 0
        ? `($${Math.abs(value / 1000).toFixed(0)}k)`
        : `$${(value / 1000).toFixed(0)}k`;
    }
    return value < 0
      ? `($${Math.abs(value).toFixed(0)})`
      : `$${value.toFixed(0)}`;
  }

  function setOptions(data: ChartData[]) {
    let options = {
      tooltip: {
        show: true,
        formatter: (params: { value: any; seriesName: any }) => {
          let value = params.value;
          return `${params.seriesName}: ${formatValue(value)}`;
        },
      },
      title: {
        text: "Years since initial investment",
        left: "center",
        bottom: 40,
        textStyle: {
          color: "#000",
          fontWeight: "normal",
          fontSize: 15,
        },
      },
      legend: {
        show: true,
        bottom: 0,
      },
      grid: {
        bottom: 125, // Adjusted bottom padding to create space for title and legend
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
          show: true,
          axisLabel: {
            formatter: formatValue,
          },
        },
        {
          show: true,
          axisLabel: {
            formatter: formatValue,
          },
        },
      ],
      series: [
        {
          name: "Total Investments",
          type: "bar",
          data: data.map((item) => item.capitalCall),
          itemStyle: {
            color: "#8B9CE9",
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
            color: "#74BA11",
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
      ],
    };
    return options;
  }

  let options: any = null;

  function initializeChart() {
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

  onMount(() => {
    initializeChart();
  });

  $: {
    if (
      (data.annualInvestment || data.initialInvestment) &&
      data.investmentPeriod &&
      data.riskLevel
    ) {
      initializeChart();
    }
  }
</script>

<div class="simulator-chart-wrapper">
  {#if options}
    <Chart {init} {options} />
  {/if}
</div>

<style>
  .simulator-chart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
