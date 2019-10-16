// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
// import {AlertPlugin,LoadingPlugin,ToastPlugin,ConfirmPlugin } from 'vux'
import Weixin from './utils/weixin.js'
import 'vant/lib/index.css';
import './style/common.less'
import config from './config/index.js'
import { NavBar, Uploader, SubmitBar, Tab, Tabs, Icon, Search, Cell, Dialog, Toast, Area, Field, CellGroup, Button, Picker, Popup, List, Tabbar, TabbarItem } from 'vant';

Vue.config.productionTip = false
Vue.use(Dialog)
  .use(NavBar)
  .use(Uploader)
  .use(SubmitBar)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Toast)
  .use(Cell)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Area)
  .use(Picker)
  .use(Popup)
  .use(List)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  ;

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    window.routeIndex = 0
  } else if (to.path == '/yingdi') {
    window.routeIndex = 1
  } else if (to.path == '/anli') {
    window.routeIndex = 2
  } else if (to.path == '/center') {
    window.routeIndex = 3
  } else {
    window.routeIndex = 4
  }
  next()
})
/* eslint-disable no-new */
window.$vvue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.canPassive = true
// Weixin()
// document.addEventListener('touchmove', (e) => {
//   console.log(window.canPassive)
//     e.preventDefault();
// }, window.canPassive ? {} : { passive: false } );

document.addEventListener('touchmove', (e) => {
  if (!window.canPassive) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName == 'IMG') e.preventDefault();
}, { passive: false });



$('body').on('blur', 'input,select', function (event) {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
});

var flag = false
$('body').on('focus', 'input,select', function (event) {
  flag = true
});
window.onresize = function () {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  if (isAndroid) {
    if (flag) {
      $('#tabbar').hide()
      flag = false
    } else {
      $('#tabbar').show()
      flag = true
    }
  }
}

Weixin(
  {
    img_url: require("./assets/thumb.jpg"),
    link: "http://h5.bukeyi.net/h5/2019/tyjl/",
    title: "天娱广告—青创计划",
    desc: "校园招聘计划启动"
  }
);