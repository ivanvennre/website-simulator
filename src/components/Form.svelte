<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    calculatePassiveIncome,
    riskLevels,
    type ChartData,
    type RiskLevels,
  } from "../utils/calculations";
  import InfoIcon from "./InfoIcon.svelte";

  const dispatch = createEventDispatcher();

  export let chartData: ChartData[] = [];

  let initialInvestment: number | null = 100000;
  let investmentPeriod: string = "3";
  let annualInvestment: number | null = 50000;
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

<div
  id="w-node-_7a4ce190-b09e-8b65-d8ba-02f9fee9f057-958bf92d"
  class="simulator-form-wrapper"
>
  <div class="simulator-info-banner">
    <div class="simulator-info-banner-title">
      <svg
        width="10"
        height="14"
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.99997 0.279297V5.26435H9.56104L4.99997 13.7205V8.73546H0.438477L4.99997 0.279297Z"
          fill="black"
        />
      </svg>Our calculator can help you:
    </div>
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
            >Initial Investment
            <InfoIcon
              message="How much would you like to start investing in?"
            />
          </label>
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
            >Investment Period<InfoIcon
              message="How many years would you like to invest for?"
            /></label
          >
          <select
            id="investment-period"
            bind:value={investmentPeriod}
            on:change={handleSelectChange}
            class="simulator-input-field select w-select"
          >
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6">6 years</option>
            <option value="7">7 years</option>
          </select>
        </div>
        <div
          id="w-node-b65ca7a4-706f-fd69-4a0f-a635e1dc444b-958bf92d"
          class="simulator-form-input"
        >
          <label for="annual-investment" class="simulator-input-label"
            >Annual Investment<InfoIcon
              message="How much money could you invest each year?"
            /></label
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
            >Risk Level<InfoIcon
              message={`
              <p style="margin-bottom: 8px;">Tell us how you feel about risk by selecting one of the options:</p>
              <ul style="padding-left:20px;">
                <li style="margin-bottom:4px;"><strong>Low</strong> - you're generally comfortable with achieving a low level of potential return on your investment coupled with a low level risk of investment loss.</li>
                <li style="margin-bottom:4px;"><strong>Moderate</strong> - you're generally comfortable with achieving a moderate level of potential return on your investment coupled with a moderate risk of investment loss.</li>
                <li style="margin-bottom:4px;"><strong>High</strong> - you're generally comfortable with achieving a high level of potential return on your investment coupled with high risk of investment loss.</li>
                <li><strong>Aggressive</strong> - you're generally comfortable with achieving a very high level of potential return on investment coupled with very high risk of investment loss.</li>
              </ul>
              `}
              tooltipWidth="600px"
            /></label
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
            class="simulator-input-label"
            >Target Annual Passive Income<InfoIcon
              message="How much annual income do you want your investments to generate after the investment period?"
            /></label
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
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.6L4.54839 9L11 1"
                stroke="#74BA11"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Achievable target
          </div>
        </div>
      {:else if passiveIncomeTargetAchieved === false}
        <div class="simulator-info-banner danger">
          <div class="simulator-info-banner-title danger">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.669039 1.45645C0.151742 0.939154 0.939154 0.15429 1.45645 0.669039L6 5.21259L10.5435 0.669039C11.0608 0.151742 11.8483 0.939154 11.331 1.45645L6.78741 6L11.331 10.5435C11.8483 11.0608 11.0608 11.8483 10.5435 11.331L6 6.78741L1.45645 11.331C0.939154 11.8483 0.151742 11.0608 0.669039 10.5435L5.21259 6L0.669039 1.45645Z"
                fill="#F26529"
              />
            </svg>
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
