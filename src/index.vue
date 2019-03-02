<template>
  <div>
    fda
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      arr: [1, 2, 3, 453, 342],
      getArr: []
    }
  },
  methods: {
    checkFun () {
      this.arr.splice(1, 4)
      this.getArr = this.arr
      this.$set(this.$data, 'arr', [])
    }
  },
  beforeUpdate () {
    this.$set(this.$data, 'arr', this.getArr)
  }
}
</script>

<style scoped>
</style>