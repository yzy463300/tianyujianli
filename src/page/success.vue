<template>
  <div class="container tc">
    <p class="title"><img src="../assets/man.png" alt=""></p>
    <div class="p1">发送成功</div>
    <div class="p2">感谢您的投递,我们将尽快与您取得联系</div>
    <div class="button" v-if='returnShow' @click="onSubmit">返回首页</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnShow: true
    };
  },
  mounted() {},
  activated() {
    if (this.IsPC()) {
      this.returnShow = false;
    }
  },
  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      );
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    onSubmit() {
      this.$router.replace("/");
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.title {
  img {
    width: 1.03rem;
    height: 1.64rem;
  }
}
.p1 {
  font-weight: bold;
  padding: 0.2rem;
  padding-bottom: 0.4rem;
  font-size: 0.48rem;
  color: #393939;
}
.p2 {
  line-height: 0.5rem;
}
.button {
  width: 6.38rem;
  height: 0.82rem;
  color: #fff;
  background-color: #ff702b;
  line-height: 0.82rem;
  font-size: 0.36rem;
  border-radius: 0.05rem;
  text-align: center;
  margin-top: 0.4rem;
}
.container {
  padding: 0.7rem 0.5rem;
  color: #5a5a5a;
  font-size: 0.28rem;
}
</style>
