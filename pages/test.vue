<template>
<div>

<time-select type="datetime" />


</div>
</template>

<script>

import timeSelect from '~/components/timeSelect.vue'
import yearTable from '~/components/yearTable.vue'
import monthTable from '~/components/monthTable.vue'

export default {
  components:{
    timeSelect,
    yearTable,
    monthTable
  }
}
</script>

<style>

</style>
