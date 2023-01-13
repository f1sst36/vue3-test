<template>
  <div class="chart-wrapper">
    <div class="chart-info">
      <span>{{ +maxPrice.toFixed(6) }}$</span>
      <span>{{ +minPrice.toFixed(6) }}$</span>
    </div>
    <div class="chart">
      <div @mouseover.stop="selectColumn" @mouseout.stop="deselectColumn" :key="index" v-for="(price, index) in prices"
           :style="'height: ' + calculateHeight(price)" class="chart-column-wrapper">
        <div class="chart-column"></div>
        <div class="tooltip">{{ +price.toFixed(6) }}$</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prices: {
      required: true,
      type: Array,
    }
  },
  data() {
    return {
      minPrice: 0,
      maxPrice: 0
    }
  },
  watch: {
    prices(newPriceValue) {
      this.maxPrice = Math.max(newPriceValue) || 0;
      this.minPrice = Math.min(newPriceValue) || 0;
    }
  },
  methods: {
    calculateHeight(price) {
      this.minPrice = Math.min(...this.prices)
      this.maxPrice = Math.max(...this.prices)

      const dif = this.maxPrice - this.minPrice;
      const result = 3 + (price - this.minPrice) / dif * 97;

      return (result || 100) + "%";
    },
    selectColumn(e) {
      const tooltipNode = e.target.querySelector(".tooltip");
      const chartColumnNode = e.target.querySelector(".chart-column");

      if (!tooltipNode || !chartColumnNode) return;
      tooltipNode.classList.add('activeTooltip');
      chartColumnNode.classList.add('activeColumn');
    },
    deselectColumn(e) {
      const tooltipNode = e.target.querySelector(".tooltip");
      const chartColumnNode = e.target.querySelector(".chart-column");

      if (!tooltipNode || !chartColumnNode) return;
      tooltipNode.classList.remove('activeTooltip');
      chartColumnNode.classList.remove('activeColumn');
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  margin-top: 30px;
  display: flex;
  height: 300px;
  gap: 8px;
}

.chart-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-info > span {
  font-size: 12px;
  line-height: 16px;
}

.chart {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  display: flex;
  flex-wrap: wrap;
}

.chart-column-wrapper {
  width: calc(100% / 80);
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  align-self: flex-end;
  transition: all 0.4s ease;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.chart-column {
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: cornflowerblue;
  animation: arriveColumn 0.4s ease;
}

.activeColumn {
  background-color: tomato;
}

.tooltip {
  background-color: #fff;
  padding: 6px 10px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
  transform: translateX(100%);
  right: 0;
  top: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s ease;
}

.activeTooltip {
  visibility: visible;
  opacity: 1;
}

@keyframes arriveColumn {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>