<template>
  <div id="app">
    <van-nav-bar :fixed='true' :z-index="888" color="#000" @click-left="onClickLeft" :left-text="navShow ? '返回' :''" :left-arrow='navShow'>
      <div class="title" slot='title'><img src="./assets/logo.png" alt=""></div>
    </van-nav-bar>
  	<keep-alive>
    	<router-view/>
  	</keep-alive>
    <van-tabbar v-if='tabbarShow' route v-model="active" replace='true' active-color="#ff702b">
      <van-tabbar-item
        to="/"
      >
        青创计划
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon[0].active : icon[0].normal"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/yingdi"
      >
        营地等你
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon[1].active : icon[1].normal"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/anli"
      >
        超级案例
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon[2].active : icon[2].normal"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/center"
      >
        个人中心
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon[3].active : icon[3].normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import api from "./api/api";
import { querystring } from "vux";
export default {
  name: "App",
  data() {
    return {
      navShow: false,
      isShow: false,
      tabbarShow: true,
      icon: [
        {
          normal: require("./assets/11.png"),
          active: require("./assets/12.png")
        },
        {
          normal: require("./assets/21.png"),
          active: require("./assets/22.png")
        },
        {
          normal: require("./assets/31.png"),
          active: require("./assets/32.png")
        },
        {
          normal: require("./assets/41.png"),
          active: require("./assets/42.png")
        }
      ],
      active: window.routeIndex
    };
  },
  watch: {
    $route(e) {
      if (e.matched[0].path !== "" && !this.IsPC()) {
        this.navShow = true;
      } else {
        this.navShow = false;
      }
      if (e.path == "/") {
        this.active = 0;
      } else if (e.path == "/yingdi") {
        this.active = 1;
      } else if (e.path == "/anli") {
        this.active = 2;
      } else if (e.path == "/center") {
        this.active = 3;
      } else {
        this.active = 4;
      }
    }
  },
  async created() {
    if (this.IsPC()) {
      this.tabbarShow = false;
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
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>

<style  lang='less' >
.van-nav-bar .van-icon {
  color: #6c6c6c;
}
.van-nav-bar__text {
  color: #6c6c6c;
}
.nav {
  background-color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.title {
  img {
    width: 2.46rem;
    height: 0.5rem;
  }
}
#app {
  padding-bottom: 50px;
  padding-top: 46px;
  /*background-color: #ab0006;*/
}
</style>
