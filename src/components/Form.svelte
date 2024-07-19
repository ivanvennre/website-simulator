<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    calculatePassiveIncome,
    riskLevels,
    type ChartData,
    type RiskLevels,
  } from "../utils/calculations";
  import Chart from "./Chart.svelte";

  const dispatch = createEventDispatcher();

  export let chartData: ChartData[] = [];

  let initialInvestment: string = "";
  let investmentPeriod: string = "2";
  let annualInvestment: string = "";
  let riskLevel: string = "moderate";
  let targetAnnualPassiveIncome: string = "";

  const riskLevelsKeys = Object.keys(riskLevels) as Array<keyof RiskLevels>;

  function handleInputChange() {
    setTimeout(() => {
      const formData = {
        initialInvestment,
        investmentPeriod,
        annualInvestment,
        riskLevel,
      };
      dispatch("update", formData);
    }, 0);
  }

  $: {
    const capitalCalls = chartData.map((data) => data.capitalCall);
    const passiveIncome = calculatePassiveIncome(
      capitalCalls,
      riskLevels[riskLevel].percentageValue
    );
    targetAnnualPassiveIncome = passiveIncome.toFixed(2);
  }
</script>

<div class="simulator-titles">
  <h4 class="simulator-main-title">Title placeholder</h4>
  <h5 class="simulator-subtitle">Subtitle placeholder goes here in USD</h5>
</div>
<div class="simulator-divider"></div>
<div class="simulator-form-block w-form">
  <form class="simulator-form" on:input={handleInputChange}>
    <div class="simulator-form-row">
      <div class="simulator-form-input">
        <label for="initial-investment" class="simulator-input-label"
          >Initial Investment</label
        >
        <input
          class="simulator-input-field w-input"
          id="initial-investment"
          bind:value={initialInvestment}
          placeholder="ex. 10,000"
          type="text"
        />
      </div>
      <div class="simulator-form-input">
        <label for="investment-period" class="simulator-input-label"
          >Investment Period</label
        >
        <select
          id="investment-period"
          bind:value={investmentPeriod}
          class="simulator-input-field select w-select"
        >
          <option value="2">2 years</option>
          <option value="5">5 years</option>
        </select>
      </div>
      <div class="simulator-form-input">
        <label for="annual-investment" class="simulator-input-label"
          >Annual Investment</label
        >
        <input
          class="simulator-input-field w-input"
          id="annual-investment"
          bind:value={annualInvestment}
          placeholder="ex. 100,000"
          type="text"
        />
      </div>
      <div class="simulator-form-input">
        <label for="risk-level" class="simulator-input-label">Risk Level</label>
        <select
          id="risk-level"
          bind:value={riskLevel}
          class="simulator-input-field select w-select"
        >
          {#each riskLevelsKeys as level}
            <option value={level}>{riskLevels[level].label}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="simulator-form-row single">
      <div class="simulator-form-input">
        <label for="target-annual-passive-income" class="simulator-input-label"
          >Target Annual Passive Income</label
        >
        <input
          class="simulator-input-field w-input"
          id="target-annual-passive-income"
          bind:value={targetAnnualPassiveIncome}
          type="text"
        />
      </div>
    </div>
  </form>
</div>
