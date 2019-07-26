<template>
  <div>
    <!-- type date datetime year month  format yyyy-MM-dd HH-mm range double  -->
    <number-input isFormat/>
    <i-search-option />
    <!-- <date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" /> -->
    <!-- <date-picker type="year" format="yyyy-MM-dd" range />  -->
    <date-time-input/>
  </div>
</template>

<script>

import DateTimeInput from "~/components/parts/DateTimeInput.vue"
import ISearchOption from "~/components/parts/ISearchOption"
import NumberInput from "~/components/parts/NumberInput"

export default {
  components: {
    DateTimeInput,
    ISearchOption,
    NumberInput
  }
};
</script>

<style>
</style>
