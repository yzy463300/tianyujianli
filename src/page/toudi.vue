<template>
  <div class="container">
    <div class="content">
      <div class="apply">
        <div class="tit"><img src="../assets/zhiwei.png" alt=""></div>
        <div class="select">
          <van-cell title='邮件上传简历' is-link @click="gotoUrl('email')">
            <div class="icon" slot='icon'><img src="../assets/email.png" alt=""></div>
          </van-cell>
          <van-cell title='上传简历' is-link @click="gotoUrl('upload')">
            <div class="icon" slot='icon'><img src="../assets/upload.png" alt=""></div>
          </van-cell>
          <van-cell title='创建简历' is-link @click="gotoUrl('createUpload')">
            <div class="icon" slot='icon'><img src="../assets/upload.png" alt=""></div>
          </van-cell>
        </div>
      </div>
      <div class="poduce">
        <div class="tit"><img src="../assets/guanggao.png" alt=""></div>
        <p class="t1">天娱广告是湖南广播电视台、湖南广播影视集团直属的全媒体融合营销机构，致力于湖南卫视整合运营、互联网数字营销、广告综合代理、影视剧运营、短视频运营、芒果文体旅游、芒果智能、芒果爱豆（智慧销售）等全生态建设。以高质量创意与专业执行，服务于国内外高成长性龙头企业。</p>
        <p class="t1">在这里，只要你想，晋升、年薪、奖金都不是问题。重要的是你可以与500强企业高管朋友霸屏朋友圈、与爱豆高调对话、用脚步丈量天地，打卡整个世界，一起皆有可能，青春将活成你想要的样子！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0
    };
  },
  mounted() {},
  activated() {
    this.id = this.$route.query.id;
  },
  methods: {
    gotoUrl(params) {
      this.$router.push({ path: params, query: { id: this.id } });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.van-cell {
  padding-left: 25px;
}
.icon {
  margin-right: 0.2rem;
  img {
    width: 0.51rem;
    height: 0.51rem;
  }
}
.apply {
  background-color: #fff;
  .tit {
    padding: 0.6rem 25px;
    img {
      width: 2.16rem;
      height: 0.47rem;
    }
  }
}
.poduce {
  background-color: #fff;
  margin-top: 0.16rem;
  padding: 0.7rem 25px;
  color: #5a5a5a;
  font-size: 13px;
  .t1 {
    line-height: 1.6;
    text-indent: 2em;
    margin-bottom: 0.6rem;
  }
  .tit {
    margin-bottom: 0.6rem;
    img {
      width: 3.06rem;
      height: 0.47rem;
    }
  }
}
.content {
  background-color: #f7f7f7;
}
.container {
  background-color: #fff;
}
</style>
