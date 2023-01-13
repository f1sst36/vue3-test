<template>
  <div class="card" :class="{'isSelected': isSelected}" @click="clickOnTicker(id)">
    <h3>{{ tickerName }}</h3>
    <h4>{{ +price.toFixed(6) }}$</h4>
    <DefaultButton @click.stop="deleteTicker(id)">Delete</DefaultButton>
  </div>
</template>

<script>
import DefaultButton from "@/components/ui/DefaultButton.vue";

export default {
  components: {DefaultButton},
  emits: ['deleteTicker', 'clickOnTicker'],
  props: {
    id: {
      required: true,
      type: [Number, String]
    },
    tickerName: {
      required: true,
      type: String
    },
    price: {
      type: [Number, null],
      default: null
    },
    isSelected: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    deleteTicker(id) {
      this.$emit("deleteTicker", id);
    },
    clickOnTicker(id) {
      this.$emit("clickOnTicker", id)
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.card {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid cornflowerblue;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.isSelected {
  border-color: tomato;
  border-width: 3px;
}

h3, h4 {
  margin-top: unset;
  text-align: center;
  font-weight: 400;
}
</style>