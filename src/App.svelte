<script lang="ts">
  import Form from "./components/Form.svelte";
  import Chart from "./components/Chart.svelte";
  import { calculatePassiveIncome } from "./utils/calculations";
  import type { ChartData } from "./utils/calculations";

  interface FormData {
    initialInvestment: string;
    investmentPeriod: string;
    annualInvestment: string;
    riskLevel: string;
  }

  let formData: FormData = {
    initialInvestment: "",
    investmentPeriod: "",
    annualInvestment: "",
    riskLevel: "",
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
  <Form {chartData} on:update={handleUpdate} />
  <Chart data={formData} on:chartFinished={setChartData} />
</div>

<style>
  .simulator-wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 768px;
  }
</style>
