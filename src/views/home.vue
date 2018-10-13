<template>
    <Row class="layout">
        <Col class="layout-col-left">
            <div class="layout-logo-left">
                <img src="../images/logo.png" />
            </div>
            <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" accordion>
                <Submenu :name="item" v-for="(item, index) in sortRule" :key="index">
                    <template slot="title">
                        <Icon :type="nav[item].icon" size="17"></Icon>
                        {{nav[item].groupTitle}}
                    </template>
                    <router-link :to="'/home/'+value.permission" v-for="(value, key) in nav[item].content" :key="key" v-if="!nav[item].hidden">
                        <MenuItem :name="value.permission" class="layout-menu-item-text">
                            {{value.title}}
                        </MenuItem>
                    </router-link>
                </Submenu>
            </Menu>
        </Col>
        <Col class="layout-col-right">
            <Row type="flex" justify="space-between" align="middle" class="layout-header">
                <div class="layout-header-company-name">company name</div>
                <Dropdown trigger="click" class="layout-header-dropdown" @on-click="handleClick">
                    <a href="javascript:void(0)">
                        {{empname}}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item, index) in actions" :key="index" :name="item.name">{{item.label}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Row>
            <Content :style="{padding: '20px'}" class="layout-right-content">
                <router-view />
            </Content>
        </Col>
    </Row>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            openNames: [],
            activeName: '',
            firstModule: '',
            actions: [
                {label: '退出登录', name: 'exit'},
                {label: '修改密码', name: 'changePwd'}
            ]
        };
    },
    created() {
        console.log('created');
        // this.newRouter[0].children.forEach(item => {
        //     if (!this.nav[item.group]) {
        //         this.sortRule.push(item.group);
        //         this.nav[item.group] = {};
        //         this.nav[item.group].content = [];
        //         this.nav[item.group].icon = item.icon;
        //         this.nav[item.group].groupTitle = item.groupTitle;
        //     }
        //     if (!item.hidden) {
        //         this.nav[item.group].content.push({title: item.meta.title, permission: item.meta.permission});
        //     }
        // });
        // console.log(this.nav);
        this.firstModule = this.nav[this.sortRule[0]].content[0].permission;
        // if (this.$route.path === '/home') {
        //     // console.log('重定向');
        //     this.$router.push('/home/' + this.firstModule);
        // }
        // console.log(this.$route.meta);
        let modulePath = this.$route.meta.active || this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1);
        this.activeName = modulePath === 'home' ? this.firstModule : modulePath;
        for (var i in this.nav) {
            this.nav[i].content.forEach(item => {
                if (item.permission === this.activeName) {
                    this.openNames = [i];
                }
            });
        }
    },
    methods: {
        handleClick(name) {
            if (name === 'exit') {
                sessionStorage.removeItem('ACCOUNT');
                sessionStorage.removeItem('PERMISSION');
                sessionStorage.removeItem('EMPNAME');
                this.$router.replace('/login');
            }
        }
    },
    computed: {
        ...mapGetters(['newRouter', 'nav', 'sortRule', 'empname'])
    },
    components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/variable.styl"
    .layout
        position: relative
        overflow: hidden
        height: 100vh
        background: #f5f7f9
        .layout-col-left
            box-sizing: border-box
            position: absolute
            top: 0
            left: 0
            width: 200px
            height: 100vh
            overflow-y: auto
            overflow-x: hidden
            background-color: $theme-color
            .layout-logo-left
                display: flex
                justify-content: center
                align-items: center
                width: 200px
                height: 140px
                img
                    width: 50%
                    height: 100px
        .ivu-menu-submenu-title
            font-size: 17px
        .layout-menu-item-text
            font-size: 15px
        .layout-col-right
            display: flex
            flex-direction: column
            margin-left: 200px
            height: 100vh
            .layout-header
                flex: 0 0 50px
                padding: 0 30px
                background-color: #fff
                box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1)
                .layout-header-company-name, .layout-header-dropdown
                    font-size: 15px
            .layout-right-content
                flex: 1
                overflow: auto
</style>
