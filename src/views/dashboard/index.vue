<template>
  <div class="dashboard-container">
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
   height:100000000px;
    width:100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
