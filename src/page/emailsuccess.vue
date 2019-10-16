<template>
  <div class="container tc">
    <p class="title"><img src="../assets/emailsuccess.png" alt=""></p>
    <div class="p1">发送成功</div>
    <div class="p2">我们已经给您的邮箱 <strong class="">{{email}}</strong></div>
    <div class="p2">发送了一份邮件，请您及时根据邮件提示完成操作</div>
    <div class="p2">操作完成后请刷新或重新打开本页面。</div>
    <div class="button" @click="onSubmit">好的，我知道了</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  mounted() {},
  activated() {
    this.email = this.$route.query.email;
  },
  methods: {
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
    width: 1.05rem;
    height: 1.35rem;
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
