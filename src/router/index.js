import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'login'
            },
            component: (resolve) => require(['../views/login.vue'], resolve)
        }
        // {
        //     path: '*',
        //     name: '403',
        //     meta: {
        //         title: '403'
        //     },
        //     component: (resolve) => require(['../views/403.vue'], resolve)
        // }
    ]
});

export const asyncRouter = [
    {
        path: '/home',
        component: (resolve) => require(['../views/home.vue'], resolve),
        children: [
            {
                path: 'overview',
                name: 'overview',
                group: 'index',
                groupTitle: '首页',
                icon: 'home',
                meta: {
                    title: '概览',
                    permission: 'overview'
                },
                component: (resolve) => require(['../components/overview.vue'], resolve)
            },
            {
                path: 'goods',
                name: 'goods',
                group: 'goodsInfo',
                groupTitle: '商品资料',
                icon: 'bag',
                meta: {
                    title: '商品',
                    permission: 'goods'
                },
                component: (resolve) => require(['../components/goods.vue'], resolve)
            },
            {
                path: 'goods-price',
                name: 'goods-price',
                group: 'priceControl',
                groupTitle: '价格管理',
                icon: 'social-yen',
                meta: {
                    title: '商品价格',
                    permission: 'goods-price'
                },
                component: (resolve) => require(['../components/goodsprice.vue'], resolve)
            },
            {
                path: 'promotion',
                name: 'promotion',
                group: 'priceControl',
                groupTitle: '价格管理',
                icon: 'social-yen',
                meta: {
                    title: '促销',
                    permission: 'promotion'
                },
                component: (resolve) => require(['../components/promotion.vue'], resolve)
                // children: [
                //     {
                //         path: 'add',
                //         meta: {
                //             title: '新增促销'
                //         },
                //         component: (resolve) => require(['../components/addpromotion.vue'], resolve)
                //     }
                // ]
            },
            {
                path: 'addpromotion',
                name: 'addpromotion',
                group: 'priceControl',
                groupTitle: '价格管理',
                icon: 'social-yen',
                hidden: true,
                meta: {
                    title: '新增促销',
                    permission: 'promotion',
                    active: 'promotion'
                },
                component: (resolve) => require(['../components/addpromotion.vue'], resolve)
            },
            {
                path: 'inventory',
                name: 'inventory',
                group: 'inventoryControl',
                groupTitle: '库存管理',
                icon: 'ios-keypad',
                meta: {
                    title: '库存',
                    permission: 'inventory'
                },
                component: (resolve) => require(['../components/inventory.vue'], resolve)
            },
            {
                path: 'into-storage',
                name: 'into-storage',
                group: 'inventoryControl',
                groupTitle: '库存管理',
                icon: 'ios-keypad',
                meta: {
                    title: '入库',
                    permission: 'into-storage'
                },
                component: (resolve) => require(['../components/intostorage.vue'], resolve)
            },
            {
                path: 'out-storage',
                name: 'out-storage',
                group: 'inventoryControl',
                groupTitle: '库存管理',
                icon: 'ios-keypad',
                meta: {
                    title: '出库',
                    permission: 'out-storage'
                },
                component: (resolve) => require(['../components/outstorage.vue'], resolve)
            },
            {
                path: 'order-list',
                name: 'order-list',
                group: 'order',
                groupTitle: '销售流水',
                icon: 'ios-list',
                meta: {
                    title: '订单列表',
                    permission: 'order-list'
                },
                component: (resolve) => require(['../components/orderlist.vue'], resolve)
            },
            {
                path: 'user-list',
                name: 'user-list',
                group: 'user',
                groupTitle: '客户管理',
                icon: 'ios-people',
                meta: {
                    title: '客户列表',
                    permission: 'user-list'
                },
                component: (resolve) => require(['../components/userlist.vue'], resolve)
            },
            {
                path: 'return-unprocess',
                name: 'return-unprocess',
                group: 'returnProcess',
                groupTitle: '退货处理',
                icon: 'arrow-return-left',
                meta: {
                    title: '未处理',
                    permission: 'return-unprocess'
                },
                component: (resolve) => require(['../components/returnunprocess.vue'], resolve)
            },
            {
                path: 'return-processed',
                name: 'return-processed',
                group: 'returnProcess',
                groupTitle: '退货处理',
                icon: 'arrow-return-left',
                meta: {
                    title: '已处理',
                    permission: 'return-processed'
                },
                component: (resolve) => require(['../components/returnprocessed.vue'], resolve)
            },
            {
                path: 'equipment-manage',
                name: 'equipment-manage',
                group: 'equipmentMonitoring',
                groupTitle: '设备监控',
                icon: 'monitor',
                meta: {
                    title: '监控管理',
                    permission: 'equipment-manage'
                },
                component: (resolve) => require(['../components/equipmentmanage.vue'], resolve)
            },
            {
                path: 'store',
                name: 'store',
                group: 'settings',
                groupTitle: '系统设置',
                icon: 'ios-cog',
                meta: {
                    title: '门店',
                    permission: 'store'
                },
                component: (resolve) => require(['../components/store.vue'], resolve)
            },
            {
                path: 'role',
                name: 'role',
                group: 'settings',
                groupTitle: '系统设置',
                icon: 'ios-cog',
                meta: {
                    title: '角色',
                    permission: 'role'
                },
                component: (resolve) => require(['../components/role.vue'], resolve)
            },
            {
                path: 'empolyee',
                name: 'empolyee',
                group: 'settings',
                groupTitle: '系统设置',
                icon: 'ios-cog',
                meta: {
                    title: '员工',
                    permission: 'empolyee'
                },
                component: (resolve) => require(['../components/empolyee.vue'], resolve)
            },
            {
                path: 'sysmessage',
                name: 'sysmessage',
                group: 'messages',
                groupTitle: '消息管理',
                icon: 'ios-bell',
                meta: {
                    title: '系统消息',
                    permission: 'sysmessage'
                },
                component: (resolve) => require(['../components/sysmessage.vue'], resolve)
            }
        ]
    }
];
