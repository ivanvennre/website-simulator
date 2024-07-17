<script lang="ts">
  import Form from "./components/Form.svelte";
  import Chart from "./components/Chart.svelte";

  interface FormData {
    initialInvestment: string;
    investmentPeriod: string;
    annualInvestment: string;
    riskLevel: string;
    targetAnnualPassiveIncome: string;
  }

  let formData: FormData = {
    initialInvestment: "",
    investmentPeriod: "",
    annualInvestment: "",
    riskLevel: "",
    targetAnnualPassiveIncome: "",
  };

  function handleUpdate(event: CustomEvent<FormData>) {
    formData = event.detail;
  }
</script>

<main>
  <Form on:update={handleUpdate} />
  <Chart data={formData} />
</main>

<style>
  main {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 768px;
  }
</style>
