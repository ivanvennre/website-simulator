<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let initialInvestment: string = "";
  let investmentPeriod: string = "";
  let annualInvestment: string = "";
  let riskLevel: string = "";
  let targetAnnualPassiveIncome: string = "";

  function handleInputChange() {
    const formData = {
      initialInvestment,
      investmentPeriod,
      annualInvestment,
      riskLevel,
      targetAnnualPassiveIncome,
    };
    dispatch("update", formData);
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
          <option value="">Select one...</option>
          <option value="First">First choice</option>
          <option value="Second">Second choice</option>
          <option value="Third">Third choice</option>
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
          <option value="">Select one...</option>
          <option value="First">First choice</option>
          <option value="Second">Second choice</option>
          <option value="Third">Third choice</option>
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
