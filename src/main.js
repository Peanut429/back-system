import Vue from 'vue';
import iview from 'iview';
import axios from 'axios';
import App from './App';
import router, {asyncRouter} from './router';
import store from './store';
import Util from './lib/util';
import 'iview/dist/styles/iview.css';
import './stylus/index.styl';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(iview);

// 路由跳转前执行
router.beforeEach((to, from, next) => {
    iview.LoadingBar.start();
    console.log('start and go to:', to.path);
    // 如果用户名已经存在（用户已登录）
    if (store.getters.account) {
        console.log(1);
        if (store.getters.newRouter.length === 0) { // 创建新的动态路由
            console.log('set router');
			let newRouter;
			let permissionArr = store.getters.permission.split(',');
            let newChildren = asyncRouter[0].children.filter(route => {
                return permissionArr.indexOf(route.meta.permission) > -1;
            });
            newRouter = asyncRouter;
			newRouter[0].children = newChildren;
            // 将新的路由添加到路由表中
			router.addRoutes(newRouter);
            // 跳转至目标路由（主页）
            console.log(to.path);
            store.dispatch('createRouter', newRouter).then(res => {
                next({...to});
            }).catch(() => {});
        } else if (to.path === '/login' || to.path === '/') {
            console.log('return home');
            iview.LoadingBar.finish();
            next('/home');
            // location.reload();
        } else if (to.path === '/home') {
            console.log(store.getters.nav, store.getters.sortRule);
            let firstModule = store.getters.nav[store.getters.sortRule[0]].content[0].permission;
            console.log('重定向:' + '/home/' + firstModule);
            next('/home/' + firstModule);
            iview.LoadingBar.finish();
        } else { // 如果新的动态路由已存在 ===>> 跳转至目标地址
            console.log('to:', to.path);
            next();
        }
    } else { // 如果用户名不存在（用户未登录）
        if (['/login'].indexOf(to.path) !== -1) { // 如果是跳转至登录页面则放行
            // Util.title(to.meta.title);
            next();
        } else { // 如果不是跳转至登录页面，则强行跳转至登录页面
            // Util.title(to.meta.title);
            next('/login');
        }
    }
});

router.afterEach((to, from) => {
    console.log('finish');
    Util.title(to.meta.title);
    iview.LoadingBar.finish();
    window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
  });
