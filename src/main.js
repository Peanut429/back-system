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
        if (to.path === '/login') {
            console.log('return home');
            iview.LoadingBar.finish();
            // next();
            location.reload();
        } else if (store.getters.newRouter.length !== 0) { // 如果新的动态路由已存在 ===>> 跳转至目标地址
            console.log('to:', to.path);
            next();
        } else { // 否则创建新的动态路由
            console.log('set router');
			let newRouter = null;
			let permissionArr = store.getters.permission.split(',');
            let newChildren = asyncRouter[0].children.filter(route => {
                return permissionArr.indexOf(route.meta.permission) > -1;
            });
            newRouter = asyncRouter;
			newRouter[0].children = newChildren;
            // 将新的路由添加到路由表中
			router.addRoutes(newRouter);
            // 跳转至目标路由（主页）
            store.dispatch('createRouter', newRouter).then(res => {
                next({...to});
            }).catch(() => {});
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
