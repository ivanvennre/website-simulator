<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    calculatePassiveIncome,
    riskLevels,
    type ChartData,
    type RiskLevels,
  } from "../utils/calculations";

  const dispatch = createEventDispatcher();

  export let chartData: ChartData[] = [];

  let initialInvestment: number | null = null;
  let investmentPeriod: string = "2";
  let annualInvestment: number | null = null;
  let riskLevel: keyof RiskLevels = "moderate";
  let targetAnnualPassiveIncome: number | null = null;

  let passiveIncomeTargetAchieved: boolean | null = null;

  const riskLevelsKeys = Object.keys(riskLevels) as Array<keyof RiskLevels>;

  function formatCurrency(value: number | null): string {
    if (value === null) return "";
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  function parseCurrency(value: string): number | null {
    const parsed = parseFloat(value.replace(/[$,]/g, ""));
    return isNaN(parsed) ? null : parsed;
  }

  function handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    const parsedValue = parseCurrency(target.value);

    switch (field) {
      case "initialInvestment":
        initialInvestment = parsedValue;
        break;
      case "annualInvestment":
        annualInvestment = parsedValue;
        break;
      case "targetAnnualPassiveIncome":
        targetAnnualPassiveIncome = parsedValue;
        break;
    }

    target.value = parsedValue !== null ? formatCurrency(parsedValue) : "";

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

  function handleSelectChange() {
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
    if (targetAnnualPassiveIncome === null) {
      passiveIncomeTargetAchieved = null;
    } else {
      const capitalCalls = chartData.map((data) => data.capitalCall);
      const calculatedPassiveIncome = calculatePassiveIncome(
        capitalCalls,
        riskLevels[riskLevel].percentageValue
      );
      passiveIncomeTargetAchieved =
        calculatedPassiveIncome >= targetAnnualPassiveIncome;
    }
  }
</script>

<div id="w-node-_7a4ce190-b09e-8b65-d8ba-02f9fee9f057-958bf92d">
  <div class="simulator-titles">
    <h4 class="simulator-main-title">Title placeholder</h4>
    <h5 class="simulator-subtitle">Subtitle placeholder goes here in USD</h5>
  </div>
  <div class="simulator-info-banner">
    <div class="simulator-info-banner-title">Our calculator can help you:</div>
    <ul role="list" class="simulator-info-banner-list">
      <li>
        See the potential value of an investment by the time you stop investing
      </li>
      <li>
        Understand how the value of an investment could change with different
        levels of risk
      </li>
      <li>
        Budget how much you should invest to reach your target passive income
      </li>
    </ul>
  </div>
  <div class="simulator-divider"></div>
  <div class="simulator-form-block w-form">
    <form
      id="wf-form-Mini-Simulator"
      name="wf-form-Mini-Simulator"
      data-name="Mini Simulator"
      method="get"
      class="simulator-form"
    >
      <div class="simulator-form-row">
        <div
          id="w-node-ed3b572a-3295-37a6-1543-f2f267ac07e8-958bf92d"
          class="simulator-form-input"
        >
          <label for="initial-investment" class="simulator-input-label"
            >Initial Investment</label
          >
          <input
            class="simulator-input-field w-input"
            id="initial-investment"
            value={initialInvestment !== null
              ? formatCurrency(initialInvestment)
              : ""}
            on:input={(e) => handleInputChange(e, "initialInvestment")}
            placeholder="$10,000"
            type="text"
          />
        </div>
        <div
          id="w-node-_824d78de-dd5e-1654-c8cc-a632aaf2e03d-958bf92d"
          class="simulator-form-input"
        >
          <label for="investment-period" class="simulator-input-label"
            >Investment Period</label
          >
          <select
            id="investment-period"
            bind:value={investmentPeriod}
            on:change={handleSelectChange}
            class="simulator-input-field select w-select"
          >
            <option value="2">2 years</option>
            <option value="5">5 years</option>
          </select>
        </div>
        <div
          id="w-node-b65ca7a4-706f-fd69-4a0f-a635e1dc444b-958bf92d"
          class="simulator-form-input"
        >
          <label for="annual-investment" class="simulator-input-label"
            >Annual Investment</label
          >
          <input
            class="simulator-input-field w-input"
            id="annual-investment"
            value={annualInvestment !== null
              ? formatCurrency(annualInvestment)
              : ""}
            on:input={(e) => handleInputChange(e, "annualInvestment")}
            placeholder="$100,000"
            type="text"
          />
        </div>
        <div
          id="w-node-ee92b5fb-2a56-da48-ce11-426444870fdb-958bf92d"
          class="simulator-form-input"
        >
          <label for="risk-level" class="simulator-input-label"
            >Risk Level</label
          >
          <select
            id="risk-level"
            bind:value={riskLevel}
            on:change={handleSelectChange}
            class="simulator-input-field select w-select"
          >
            {#each riskLevelsKeys as level}
              <option value={level}>{riskLevels[level].label}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="simulator-form-row single">
        <div
          id="w-node-ac37b701-2dda-8978-54ef-78ad360e5dd3-958bf92d"
          class="simulator-form-input"
        >
          <label
            for="target-annual-passive-income"
            class="simulator-input-label">Target Annual Passive Income</label
          >
          <input
            class="simulator-input-field w-input"
            id="target-annual-passive-income"
            value={targetAnnualPassiveIncome !== null
              ? formatCurrency(targetAnnualPassiveIncome)
              : ""}
            on:input={(e) => handleInputChange(e, "targetAnnualPassiveIncome")}
            placeholder="$10,000"
            type="text"
          />
        </div>
      </div>
      {#if passiveIncomeTargetAchieved === true}
        <div class="simulator-info-banner success">
          <div class="simulator-info-banner-title success">
            Achievable target
          </div>
        </div>
      {:else if passiveIncomeTargetAchieved === false}
        <div class="simulator-info-banner danger">
          <div class="simulator-info-banner-title danger">
            Target slightly out of reach...
          </div>
          <div class="simulator-info-banner-text">
            To reach your target annual passive income, you’ll either need to
            increase your total investments or investment period
          </div>
        </div>
      {/if}
    </form>
  </div>
</div>
