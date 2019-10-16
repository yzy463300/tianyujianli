<template>
  <div class="container">
    <div class="title"><img src="../assets/email_title.png" alt=""></div>
    <div class="input_wrap">
      <input type="text" v-model='email' placeholder="请填写您的邮箱">
    </div>
    <div class="tip">我们将会发送投递链接至您填写的邮箱，请注意查收<span class="red">（邮件发送请使用电脑端）</span></div>
    <div class="button" @click="onSubmit">确认提交</div>
  </div>
</template>

<script>
import api from "../api/api";
export default {
  data() {
    return {
      email: "",
      id: 0
    };
  },
  mounted() {},
  activated() {
    this.id = this.$route.query.id;
  },
  methods: {
    async send_mail() {
      const res = await api.send_mail({ email: this.email, job_id: this.id });
      if (res.error_no == 0) {
        this.$router.replace({
          path: "emailsuccess",
          query: { email: this.email }
        });
      }
    },
    onSubmit() {
      if (!this.email) {
        this.$toast.fail("请填写邮箱");
      } else {
        this.send_mail();
      }
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.tip {
  padding-top: 0.3rem;
  padding-bottom: 0.7rem;
  font-size: 0.24rem;
  color: #5a5a5a;
  .red {
    color: red;
  }
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
}
.title {
  img {
    width: 3.15rem;
    height: 0.46rem;
  }
}
.input_wrap {
  margin-top: 0.9rem;
  border-bottom: 0.02rem solid #cdcdcd;
  padding: 0.2rem 0.1rem;
  input {
    font-size: 0.34rem;
    border: none;
    width: 70%;
  }
}
.container {
  padding: 0.7rem 0.5rem;
}
</style>
