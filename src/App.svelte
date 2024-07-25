<script lang="ts">
  import Form from "./components/Form.svelte";
  import Chart from "./components/Chart.svelte";
  import { calculatePassiveIncome } from "./utils/calculations";
  import type { ChartData, RiskLevels } from "./utils/calculations";

  interface FormData {
    initialInvestment: string;
    investmentPeriod: string;
    annualInvestment: string;
    riskLevel: keyof RiskLevels;
  }

  let formData: FormData = {
    initialInvestment: "",
    investmentPeriod: "",
    annualInvestment: "",
    riskLevel: "moderate",
  };

  let chartData: ChartData[] = [];

  function handleUpdate(event: CustomEvent<FormData>) {
    formData = event.detail;
  }

  function setChartData(event: CustomEvent<FormData>) {
    chartData = event.detail as unknown as ChartData[];
  }
</script>

<div class="simulator-wrapper">
  <div class="simulator-split">
    <Form {chartData} on:update={handleUpdate} />
    <Chart data={formData} on:chartFinished={setChartData} />
  </div>
</div>

<style>
  .simulator-wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1440px;
  }
</style>
