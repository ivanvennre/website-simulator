<script lang="ts">
  export let tooltipWidth = "200px";
  export let width: number = 12;
  export let height: number = 12;
  export let message: string = "How much would you like to start investing in?";
</script>

<div class="info-icon-container">
  <svg
    {width}
    {height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 12C2.7 12 0 9.3 0 6C0 2.7 2.7 0 6 0C9.3 0 12 2.7 12 6C12 9.3 9.3 12 6 12ZM6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1ZM6 9C5.75 9 5.5 8.75 5.5 8.5V5.5C5.5 5.25 5.7 5 6 5C6.3 5 6.5 5.2 6.5 5.5C6.5 5.5 6.5 5.5 6.5 5.55V8.55C6.5 8.75 6.3 9 6 9ZM6 4C5.75 4 5.5 3.8 5.5 3.5C5.5 3.2 5.7 3 6 3C6.25 3 6.5 3.2 6.5 3.5C6.5 3.8 6.25 4 6 4Z"
      fill="#001560"
    />
  </svg>
  <div class="tooltip" style="width: {tooltipWidth}">{@html message}</div>
</div>

<style>
  .info-icon-container {
    position: relative;
    display: flex;
    cursor: pointer;
  }

  .tooltip {
    visibility: hidden;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 12px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    margin-left: -100px; /* Center the tooltip */
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
    line-height: 1.5;
    text-align: left;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }

  .info-icon-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>
