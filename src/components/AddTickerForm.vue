<template>
  <form class="form" @submit.prevent @submit="submitForm">
    <div class="inputWrapper">
      <DefaultInput v-model="currencyName" placeholder="Enter the currency"/>
      <DefaultButton :disabled="currencyName === ''" class="add-button">Add</DefaultButton>
    </div>
    <div v-if="isShowHint" class="hint">
      <div @click="clickOnSuitableName(name)" class="suitable-name" :key="name" v-for="name of suitableNames">{{
          name
        }}
      </div>
    </div>
  </form>
</template>

<script>

import DefaultInput from "@/components/ui/DefaultInput.vue";
import DefaultButton from "@/components/ui/DefaultButton.vue";
import {debounce} from "@/utils/debounce";

export default {
  components: {DefaultButton, DefaultInput},
  data() {
    return {
      currencyName: "",
      isShowHint: false,
      suitableNames: []
    }
  },
  props: {
    currencyNames: {
      required: true,
      type: Array
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm', {currencyName: this.currencyName});
      this.currencyName = "";
      this.isShowHint = false;
      this.suitableNames = [];
    },
    clickOnSuitableName(name) {
      this.currencyName = name;
      this.submitForm();
    }
  },
  watch: {
    currencyName(currencyNameInTextField) {
      if (currencyNameInTextField === "") {
        this.isShowHint = false;
        return;
      }
      debounce(() => {
        const namesArray = this.currencyNames.reduce((acc, currencyName) => {
          if (acc.length >= 20) return acc;
          if (currencyName.toUpperCase().includes(currencyNameInTextField.toUpperCase())) acc.push(currencyName);
          return acc;
        }, []);

        this.isShowHint = !!namesArray.length;
        this.suitableNames = namesArray;
      }, 500)();
    }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 30px;
}

.hint {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.suitable-name {
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid dimgrey;
  cursor: pointer;
}

.suitable-name:hover {
  border-color: tomato;
}

.inputWrapper {
  display: flex;
  gap: 12px;
}

.add-button {
  padding-right: 24px;
  padding-left: 24px;
}

</style>