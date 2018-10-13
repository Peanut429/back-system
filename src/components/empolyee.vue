<template>
    <div class="empolyee">
        <commontitle titleName="系统设置/员工"></commontitle>
        <Row>
            <Col :sm="{span: 24}" :md="{span: 18}">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput v-model="searchInfo.login" inputTitle="账号名称"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput v-model="searchInfo.fullName" inputTitle="员工姓名"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput v-model="searchInfo.userCode" inputTitle="员工工号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <selector v-model="searchInfo.roles" listName="分配角色" :list="roleNameList"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :sm="{span: 24}" :md="{span: 6}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col" @click="_addNew">
                <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                <span>新增</span>
            </div>
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" show-total :total="total"></Page>
                </div>
            </template>
        </Table>
        <Modal
            v-model="pwdModal"
            title="修改密码"
            width="700"
            :closable="false"
            :mask-closable="false"
            class="pwdModal"
        >
            <div class="container">
                <commoninput v-model="modPwd.pwd" inputTitle="密码*" :isRequired="true"></commoninput>
                <commoninput v-model="modPwd.confirm" inputTitle="确认密码*" :isRequired="true"></commoninput>
            </div>
            <template slot="footer">
                <Button class="pwdModal-btn" size="large" type="ghost" @click="close('pwdModal')">取消</Button>
                <Button class="pwdModal-btn" size="large" type="ghost" :disabled="true" @click="save('pwdModal')">保存</Button>
            </template>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    import search from '../common/search';
    export default {
        data() {
            return {
                pwdModal: false,
                searchInfo: {
                    login: '',
                    fullName: '',
                    userCode: '',
                    roles: 'all'
                },
                modPwd: {
                    pwd: '',
                    confirm: ''
                },
                roleNameList: [
                    {label: '全部', value: 'all'}
                ],
                columns: [
                    {title: '账号名称', key: 'login', width: 100, fixed: 'left', ellipsis: true},
                    {title: '员工姓名', key: 'fullName', minWidth: 80, ellipsis: true},
                    {title: '账号工号', key: 'userCode', minWidth: 80},
                    {
                        title: '分配角色',
                        minWidth: 160,
                        ellipsis: true,
                        render: (h, params) => {
                            let role = [];
                            params.row.roles.forEach(item => {
                                role.push(item.roleName);
                            });
                            return h('span', role.join());
                        }
                    },
                    {title: '创建时间', key: 'createdDate', minWidth: 150},
                    {
                        title: '状态',
                        minWidth: 80,
                        render: (h, params) => {
                            let status = params.row.enable === true ? '启用' : '禁用';
                            return h('span', status);
                        }
                    },
                    {
                        title: '操作',
                        width: 140,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.pwdModal = true;
                                        }
                                    }
                                }, '修改密码'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push('/home/user-detail:' + params.row.id);
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                data: [],
                total: 0
            };
        },
        beforeMount() {
            this.getRoleList();
            this.getUsers();
        },
        methods: {
            // 获取角色列表
            getRoleList() {
                this.$axios.get('/api/role').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res.data.data);
                        res.data.data.forEach(item => {
                            this.roleNameList.push({label: item.roleName, value: item.roleName});
                        });
                    }
                });
            },
            // 获取员工列表
            getUsers() {
                this.$axios.get('/api/users').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res.data.data);
                        this.data = res.data.data;
                        this.total = this.data.length;
                    }
                });
            },
            _addNew() {},
            clear() {
                this.searchInfo = {
                    login: '',
                    fullName: '',
                    userCode: '',
                    roles: 'all'
                };
            },
            search() {},
            close(item) {
                this[item] = false;
            },
            save(item) {
                this[item] = false;
            }
        },
        components: {
            commoninput,
            commontitle,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .empolyee
        .table
            .ivu-table-fixed-right
                .ivu-table-fixed-header
                    .ivu-table-cell
                        padding-left: 18px
    .pwdModal
        .container
            padding-bottom: 20px
        .pwdModal-btn
            width: 150px
</style>
