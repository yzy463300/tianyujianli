<template>
  <div class="container">
    <div class="title_wrap">
      <div class="title"><div class="text">{{detail.title}}</div><div class="bg"></div></div>
    </div>
    <div class="desc selection">
      <div class="tit"><img src="../assets/miaoshu.png" alt=""></div>
      <div class="head">需求专业：</div>
      <div class="text">{{detail.zhuanye}}</div>
      <div class="head">岗位职责:</div>
      <div class="text" v-html='detail.zhize'></div>
      <div class="head">岗位要求:</div>
      <div class="text"v-html='detail.yaoqiu'></div>
    </div>
    <div class="daiyu selection">
      <div class="tit"><img src="../assets/fuli.png" alt=""></div>
      <div class="text">1、五险一金</div>
      <div class="text">2、节假日福利、生日福利、高温补贴、学历补贴、工龄补贴、企业活动、部门团建等</div>
      <div class="text">3、带薪休假5天</div>
      <div class="text">4、餐费补贴</div>
      <div class="text">5、项目奖、年中、年终奖、绩效奖金、优秀奖金等。</div>
    </div>
    <div class="telme selection">
      <div class="tit"><img src="../assets/lianxi.png" alt=""></div>
      <div class="text">联 系 人：印小姐</div>
      <div class="text" @click="onTel">联系电话：0731-84801250</div>
      <div class="text">联系邮箱：tygg@eeadv.com</div>
      <div class="text">联系地址：湖南省长沙市浏阳河大桥东金鹰大厦3楼</div>
      <div class="button tc"><img :class="[has_delivered ? 'active':'']" @click='toudi' src="../assets/toudi_btn.png" alt=""></div>
      <div class="tip">本次校招您可以投递次数为{{total_chance}}次，<span class="count">剩余{{left_chance}}次</span>，请合理投递</div>
    </div>
  </div>
</template>

<script>
import api from "../api/api";
import data from "../utils/data";
export default {
  data() {
    return {
      id: 0,
      detail: {},
      dataList: data,
      has_uploaded: false,
      has_delivered: false,
      total_chance: 0,
      left_chance: 0,
      openid: ""
    };
  },
  mounted() {},
  activated() {
    this.id = this.$route.query.id;
    this.dataList.forEach((item, index) => {
      if (item.id == this.id) {
        this.detail = item;
      }
    });
    this.get_job_info();
  },
  methods: {
    async get_job_info() {
      const res = await api.get_job_info({ job_id: this.id });
      if (res.error_no == 0) {
        this.has_uploaded = res.data.has_uploaded;
        this.has_delivered = res.data.has_delivered;
        this.total_chance = res.data.total_chance;
        this.left_chance = res.data.left_chance;
        if (+this.left_chance <= 0) {
          this.has_delivered = true;
        }
      }
    },
    toudi() {
      if (!this.has_delivered) {
        this.$router.push({ path: "toudi", query: { id: this.id } });
      }
    },
    onTel() {
      location.href = "tel: 0731-84801250";
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.tip {
  padding: 0 0.16rem;
  width: 6rem;
  margin-top: 0.2rem;
  font-size: 0.2rem;
  .count {
    color: #ff702b;
  }
}
.button {
  margin-top: 0.7rem;
  img {
    width: 6.08rem;
    height: 0.82rem;
  }
  img.active {
    filter: grayscale(100%);
  }
}
.desc {
  .tit {
    img {
      width: 1.8rem;
      height: 0.36rem;
    }
  }
  .head {
    margin-top: 0.4rem;
    margin-bottom: 0.15rem;
    font-weight: bold;
  }
}
.daiyu {
  .tit {
    margin-bottom: 0.4rem;
    img {
      width: 2.02rem;
      height: 0.36rem;
    }
  }
}
.telme {
  .tit {
    margin-bottom: 0.4rem;
    img {
      width: 1.89rem;
      height: 0.36rem;
    }
  }
}
.container {
  padding-bottom: 1.5rem;
  background-color: #f7f7f7;
  .title_wrap {
    position: relative;
    background-color: #fff;
    height: 1.2rem;
    .title {
      position: absolute;
      left: 0.4rem;
      bottom: 0;
      font-size: 0.48rem;
      font-weight: bold;
      color: #393939;
      .text {
        padding: 0 0.15rem;
        position: relative;
        z-index: 1;
      }
      .bg {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #ffdda8;
        width: 100%;
        height: 0.13rem;
      }
    }
  }
}
.selection {
  margin-bottom: 0.16rem;
  padding: 0.55rem;
  background-color: #fff;
  font-size: 0.24rem;
  color: #393939;
  text-align: justify;
  .text {
    line-height: 0.45rem;
  }
}
</style>
