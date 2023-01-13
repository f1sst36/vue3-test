<template>
  <input :value="modelValue" @input="updateInput" class="text-field" type="text" />
</template>

<script>
export default {
  props: {
    modelValue: [Number, String]
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  name: 'default-input'
}
</script>

<style scoped>
  .text-field {
    border: 1px solid gray;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    outline: none;
  }
</style>