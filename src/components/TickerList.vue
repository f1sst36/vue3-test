<template>
  <div class="tickers-list">
    <div class="pagination-wrapper">
      <DefaultButton :disabled="!(currentPage > 1)" @click="prevClick">Prev</DefaultButton>
      <DefaultButton :disabled="!hasNextPage" @click="nextClick">Next</DefaultButton>
    </div>
    <div class="pagination-info">
      <span>Current page - {{ currentPage }}</span>
    </div>
    <div class="ticker-grid">
      <TickerCard :key="ticker.id"
                  v-for="ticker in tickersList"
                  :id="ticker.id"
                  :price="ticker.price"
                  :tickerName="ticker.tickerName"
                  :isSelected="selectedTickerId === ticker.id"
                  @deleteTicker="deleteTicker"
                  @clickOnTicker="clickOnTicker"
      />
    </div>
  </div>
</template>

<script>
import TickerCard from "@/components/TickerCard.vue";
import DefaultButton from "@/components/ui/DefaultButton.vue";

export default {
  components: {DefaultButton, TickerCard},
  emits: ['deleteTicker', 'clickOnTicker', 'clickOnPrevButton', 'clickOnNextButton'],
  props: {
    tickersList: {
      required: true,
      type: Array
    },
    selectedTickerId: {
      type: [Number, null],
      default: null
    },
    currentPage: {
      type: [Number],
      required: true
    },
    hasNextPage: {
      type: [Boolean],
      required: true
    }
  },
  methods: {
    deleteTicker(id) {
      this.$emit("deleteTicker", id);
    },
    clickOnTicker(id) {
      this.$emit("clickOnTicker", id)
    },
    prevClick() {
      this.$emit("clickOnPrevButton");
    },
    nextClick() {
      this.$emit("clickOnNextButton");
    }
  }
}
</script>

<style scoped>
.tickers-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.ticker-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  grid-column-start: 1;
  grid-column-end: 3;
}

.pagination-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.pagination-info {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>