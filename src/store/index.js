import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    account: sessionStorage.getItem('ACCOUNT'),
    permission: sessionStorage.getItem('PERMISSION'),
    newRouter: [],
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
    },
    SET_EMPNAME(state, empname) {
        state.empname = empname;
    }
};

const getters = {
    account: state => state.account,
    permission: state => state.permission,
    newRouter: state => state.newRouter,
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
    createRouter({commit}, newrouter) {
        return new Promise((resolve, reject) => {
            commit('SET_NEWROUTER', newrouter); // 存储最新路由
            resolve(newrouter);
        });
    },
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
    getOrderList() {
        return new Promise((resolve, reject) => {
            axios.get('/api/orderList').then(response => {
                if (response.data.errno === 0) {
                    resolve(response.data.data);
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
