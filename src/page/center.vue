<template>
  <div class="container">
    <div class="title"><img src="../assets/geren.png" alt=""></div>
    <div class="context"><img src="../assets/toudi.png" alt=""></div>
    <div class="list">
      <div class="item" v-for="(item,index) in lists" :key='index'>
        <div class="head"><img :src="item.img" alt=""></div>
        <div class="text">
          <div class="t1">{{item.title}}</div>
          <div class="t2">工作地点：{{item.address}}</div>
          <div class="t2">需求专业：{{item.zhuanye}}</div>
        </div>
      </div>
      <div class="nomore tc" v-if="lists.length <=0">暂无投递哦</div>
    </div>
  </div>
</template>
<script>
import api from "../api/api";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          img: require("../assets/img.jpg"),
          title: "销售经理",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 2,
          img: require("../assets/img.jpg"),
          title: "策略、策划",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 3,
          img: require("../assets/img.jpg"),
          title: "短视频文案",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 4,
          img: require("../assets/img.jpg"),
          title: "短视频导演",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 5,
          img: require("../assets/img.jpg"),
          title: "人事专员",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 6,
          img: require("../assets/img.jpg"),
          title: "业务经理",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 7,
          img: require("../assets/img.jpg"),
          title: "策划专员（文旅方向）",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 8,
          img: require("../assets/img.jpg"),
          title: "会计",
          address: "湖南长沙",
          zhuanye: "财会、金融专业"
        }
      ],
      lists: []
    };
  },
  mounted() {},
  async activated() {
    this.lists = [];
    const res = await api.my_job_list();
    if (res.error_no == 0) {
      res.data.forEach((item, i) => {
        this.data.forEach((it, j) => {
          if (item.job_id == it.id) {
            this.lists.push(it);
          }
        });
      });
    }
  },
  methods: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.nomore {
  font-size: 0.26rem;
  color: #ccc;
  padding-top: 0.6rem;
}
.container {
  padding: 0.7rem 0.5rem;
  .list {
    .item {
      width: 6.26rem;
      padding: 0.25rem 0;
      border: 0.02rem solid #d9d9d9;
      border-radius: 0.1rem;
      box-shadow: 0px 0px 3px 0 #d9d9d9;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 0.3rem;
      .t1 {
        color: #393939;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
      }
      .t2 {
        color: #5a5a5a;
        font-size: 0.24rem;
      }
      .head {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        width: 1.15rem;
        height: 1.15rem;
        border: 0.02rem solid #ccc;
        img {
          width: 1.15rem;
          height: 1.15rem;
        }
      }
    }
  }
  .title {
    img {
      width: 2.16rem;
      height: 0.46rem;
    }
  }
  .context {
    padding-top: 0.4rem;
    padding-bottom: 0.3rem;
    img {
      width: 2.54rem;
      height: 0.36rem;
    }
  }
}
</style>
