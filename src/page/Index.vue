<template>
  <div class="home">
    <img @click='jump' src="../assets/qingchuang.jpg" alt="" class="main">
    <img src="../assets/tt.png" alt="" class="tip">
  </div>
</template>

<script>
import api from "../api/api.js";
export default {
  data() {
    return {};
  },
  methods: {
    jump() {
      location.href = "http://www.eeadv.com/";
    }
  },
  components: {},
  async activated() {
    const res = await api.check_auth();
  },
  computed: {},
  async mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.tip {
  position: absolute;
  right: 0.3rem;
  top: 7rem;
  width: 1.72rem;
  height: 1.16rem;
  animation: scale 1s infinite alternate;
}
.main {
  width: 100%;
}
</style>
