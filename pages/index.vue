<template>
  <div class="container">
    <i-input-number v-model="input" suffix-icon @input="onchange" unit="RMB" :precision="4" is-format />
  </div>
</template>

<script>
import comLabel from "~/components/comLabel.vue";
import IInputNumber from "~/components/IInputNumber.vue";
export default {
  data() {
    return {
      input: 123344456.23
    };
  },
  components: {
    comLabel,
    IInputNumber
  }
};
</script>

<style>

</style>
