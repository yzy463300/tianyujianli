<template>
  <div class="container">
    <div class="top"><img src="../assets/yingdi_thumb.jpg" alt=""></div>
    <div class="content">
      <div class="selection tiyan">
       <div class="tit"><img src="../assets/tiyan.png" alt=""></div>
       <div class="p1"><img src="../assets/xuanjiang.png" alt=""></div>
       <div class="p2">2019年10月29日14:30——16:30  湖南大学 研B202</div>
       <div class="p2">2019年10月31日14:30——16:30  湘潭大学 图书馆报告厅</div>
       <div class="p2">2019年11月4日14:30——16:30  湖南师范大学 文学院311</div>
      </div>
      <div class="selection yingdi">
        <div class="tit"><img src="../assets/yingdi.png" alt=""></div>
        <div class="p1">只要你check以下任意一项，就请戳以下岗位成为我们超级体验官吧！</div>
        <div class="p2">
          <p><img src="../assets/gou.png" alt="">沟通协调能力佳； </p>
          <p><img src="../assets/gou.png" alt="">脑洞大开又不失缜密逻辑；</p>
          <p><img src="../assets/gou.png" alt="">善于分析、谋略自成； </p>
          <p><img src="../assets/gou.png" alt="">胸中自有创意沟壑万千。</p>
        </div>
      </div>
      <div class="selection gangwei">
        <div class="tit"><img src="../assets/gangwei.png" alt=""></div>
        <p class="p1"><img src="../assets/xiaozhao.png" alt=""></p>
        <div class="list">
          <div class="item" v-for="(item,index) in xzList" :key='index' @click='gotoDetail(item.id)'>
            <div class="left">
              <div class="head"><img :src="item.img" alt=""></div>
              <div class="text">
                <div class="t1">{{item.title}}</div>
                <div class="t2">工作地点：{{item.address}}</div>
                <div class="t2">需求专业：{{item.zhuanye}}</div>
              </div>
            </div>
            <div class="right"><img src="../assets/check.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="selection shixi">
        <div class="tit"><img src="../assets/shixi.png" alt=""></div>
                <div class="list">
          <div class="item" v-for="(item,index) in sxList" :key='index' @click='gotoDetail(item.id)'>
            <div class="left">
              <div class="head"><img :src="item.img" alt=""></div>
              <div class="text">
                <div class="t1">{{item.title}}</div>
                <div class="t2">工作地点：{{item.address}}</div>
                <div class="t2">需求专业：{{item.zhuanye}}</div>
              </div>
            </div>
            <div class="right"><img src="../assets/check.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xzList: [
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
        }
      ],
      sxList: [
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
        },
        {
          id: 9,
          img: require("../assets/img.jpg"),
          title: "星探",
          address: "湖南长沙",
          zhuanye: "不限专业"
        },
        {
          id: 10,
          img: require("../assets/img.jpg"),
          title: "网红",
          address: "湖南长沙",
          zhuanye: "不限专业"
        }
      ]
    };
  },
  mounted() {},
  activated() {},
  methods: {
    gotoDetail(id) {
      this.$router.push({ path: "detail", query: { id } });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.list {
  .item {
    padding: 0.45rem 0;
    border-bottom: 0.02rem solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .left {
      display: flex;
      .t1 {
        color: #393939;
        font-size: 0.3rem;
      }
      .t2 {
        color: #5a5a5a;
        font-size: 0.24rem;
      }
      .head {
        margin-right: 0.25rem;
        width: 1.15rem;
        height: 1.15rem;
        border: 1px solid #ccc;
        img {
          width: 1.15rem;
          height: 1.15rem;
        }
      }
    }
    .right {
      img {
        width: 1.64rem;
        height: 0.5rem;
      }
    }
  }
}
.content {
  background-color: #f7f7f7;
  .selection {
    color: #515151;
    padding: 0.7rem 0.55rem;
    background-color: #fff;
    margin-bottom: 0.16rem;
  }
  .tiyan {
    .tit img {
      width: 2.5rem;
      height: 0.51rem;
    }
    .p1 {
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      img {
        width: 2.16rem;
        height: 0.31rem;
      }
    }
    .p2 {
      font-weight: bold;
      font-size: 0.24rem;
    }
  }

  .yingdi {
    .p1 {
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      font-size: 14px;
    }
    .p2 {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      p {
        margin-bottom: 0.1rem;
        width: 45%;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        img {
          width: 0.22rem;
          height: 0.22rem;
          margin-right: 0.1rem;
        }
      }
      p:nth-child(even) {
        width: 55%;
      }
    }
    .tit img {
      width: 2.46rem;
      height: 0.52rem;
    }
  }

  .gangwei {
    .p1 {
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      img {
        width: 1.97rem;
        height: 0.36rem;
      }
    }
    .tit img {
      width: 2.46rem;
      height: 0.62rem;
    }
  }
  .shixi .tit {
    padding-bottom: 0.2rem;
    img {
      width: 1.88rem;
      height: 0.36rem;
    }
  }
}
.top {
  img {
    width: 7.5rem;
    height: 4.2rem;
  }
}
</style>
