import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/Index'
import create from '@/page/create'
import detail from '@/page/detail'
import email from '@/page/email'
import qingchuang from '@/page/qingchuang'
import upload from '@/page/upload'
import yingdi from '@/page/yingdi'
import anli from '@/page/anli'
import form from '@/page/form'
import center from '@/page/center'
import toudi from '@/page/toudi'
import emailsuccess from '@/page/emailsuccess'
import success from '@/page/success'
import createUpload from '@/page/createUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Index
    }, {
      path: '/createUpload',
      name: '',
      component: createUpload
    }, {
      path: '/success',
      name: '',
      component: success
    }, {
      path: '/create',
      name: '',
      component: create
    }, {
      path: '/center',
      name: '',
      component: center
    }, {
      path: '/detail',
      name: '',
      component: detail
    }, {
      path: '/email',
      name: '',
      component: email
    }, {
      path: '/qingchuang',
      name: '',
      component: qingchuang
    }, {
      path: '/upload',
      name: '',
      component: upload
    }, {
      path: '/yingdi',
      name: '',
      component: yingdi
    }, {
      path: '/anli',
      name: '',
      component: anli
    }, {
      path: '/form',
      name: '',
      component: form
    }, {
      path: '/toudi',
      name: '',
      component: toudi
    }, {
      path: '/emailsuccess',
      name: '',
      component: emailsuccess
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})