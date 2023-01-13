<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'default-button'
})
</script>

<style scoped>
.button {
  background-color: cornflowerblue;
  border-radius: 4px;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  color: #fff;
}

.button:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}

.button:hover {
  opacity: 0.9;
}
</style>