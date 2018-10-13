import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    account: sessionStorage.getItem('ACCOUNT'),
    permission: sessionStorage.getItem('PERMISSION'),
    newRouter: [],
    nav: {}, // 首页导航信息
    sortRule: [], // 导航排列规则
    empname: sessionStorage.getItem('EMPNAME')
};

const mutations = {
    SET_ACCOUNT(state, account) {
        state.account = account;
    },
    SET_PERMISSION(state, permission) {
        state.permission = permission;
    },
    SET_NEWROUTER(state, newRouter) {
        state.newRouter = newRouter;
        // 设置导航信息和导航排列规则
        state.newRouter[0].children.forEach(item => {
            if (!state.nav[item.group]) {
                state.sortRule.push(item.group);
                state.nav[item.group] = {};
                state.nav[item.group].content = [];
                state.nav[item.group].icon = item.icon;
                state.nav[item.group].groupTitle = item.groupTitle;
            }
            if (!item.hidden) {
                state.nav[item.group].content.push({title: item.meta.title, permission: item.meta.permission});
            }
        });
    },
    SET_EMPNAME(state, empname) {
        state.empname = empname;
    }
};

const getters = {
    account: state => state.account,
    permission: state => state.permission,
    newRouter: state => state.newRouter,
    nav: state => state.nav,
    sortRule: state => state.sortRule,
    empname: state => state.empname
};

const actions = {
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            commit('SET_ACCOUNT', userInfo.account);
            sessionStorage.setItem('ACCOUNT', userInfo.account);
            commit('SET_PERMISSION', userInfo.permission);
            sessionStorage.setItem('PERMISSION', userInfo.permission);
            commit('SET_EMPNAME', userInfo.empname);
            sessionStorage.setItem('EMPNAME', userInfo.empname);
            resolve();
        });
    },
    // 创建动态路由
    createRouter({commit}, newrouter) {
        return new Promise((resolve, reject) => {
            commit('SET_NEWROUTER', newrouter); // 存储最新路由
            resolve(newrouter);
        });
    },
    // 获取门店列表
    getStoreList({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/api/storeList').then((response) => {
                if (response.data.errno === 0) {
                    resolve(response.data);
                }
            });
        });
    },
    getStoreDynamic() {
        return new Promise((resolve, reject) => {
            axios.get('/api/storeDynamic').then(response => {
                if (response.data.errno === 0) {
                    resolve(response.data.data);
                }
            });
        });
    },
    // 获取首页订单列表
    getOrderList() {
        return new Promise((resolve, reject) => {
            axios.get('/api/orderList').then(response => {
                if (response.data.errno === 0) {
                    resolve(response.data.data);
                }
            });
        });
    },
    // 获取门店类型
    getStoreType({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/api/storeType').then(res => {
                if (res.data.errno === 0) {
                    // commit('GET_STORETYPE', res.data.data);
                    resolve(res.data.data);
                }
            });
        });
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
