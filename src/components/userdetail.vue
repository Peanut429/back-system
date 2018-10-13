<template>
    <div class="user-detail">
        <commontitle titleName="系统设置/员工/编辑员工"></commontitle>
        <div>
            <span class="detail-item">基本信息</span>
        </div>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="userInfo.login" inputTitle="账号名称" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="userInfo.fullName" inputTitle="员工姓名" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="userInfo.role" inputTitle="分配角色" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="userInfo.userCode" inputTitle="员工工号" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 4}">
                <commoninput class="detail-enable" v-model="userInfo.enable" inputTitle="状态" :disabled="true"></commoninput>
            </Col>
        </Row>
        <div>
            <span class="detail-item">门店分配</span>
            <span class="detail-desc">为该员工分配门店</span>
        </div>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" show-total :total="total"></Page>
                </div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    export default {
        data() {
            return {
                userInfo: {
                    login: '',
                    fullName: '',
                    role: '',
                    userCode: '',
                    enable: 'true'
                },
                columns: [
                    {title: '门店编号', key: 'id'},
                    {
                        title: '门店类型',
                        key: 'type',
                        render: (h, params) => {
                            if (this.storeType.length === 0) {
                                return;
                            }
                            let type = this.storeType.filter(item => {
                                return item.value === params.row.type;
                            });
                            return h('span', type[0].label);
                        }
                    },
                    {title: '门店名称', key: 'storkName'},
                    {title: '门店地址', key: 'address'},
                    {title: '创建时间', key: 'createTime'},
                    {title: '设备编号', key: 'deviceNo'},
                    {
                        title: '经营状态',
                        key: 'storeStatus',
                        render: (h, params) => {
                            let status = params.row.storeStatus === 1 ? '正常营业' : '结业';
                            return h('span', {
                                'class': {
                                    open: params.row.storeStatus === 1
                                }
                            }, status);
                        }
                    },
                    {title: '操作'}
                ],
                data: [],
                total: 0,
                storeType: []
            };
        },
        beforeMount() {
            // console.log(this.$route.params);
            this.getUserInfo();
            this.getStores();
            this.getStoreType();
        },
        methods: {
            // 获取员工信息
            getUserInfo() {
                this.$axios.get('/api/userDetail').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res);
                        let data = res.data.data;
                        let role = [];
                        data.roles.forEach(item => {
                            role.push(item.roleName);
                        });
                        let enable = data.enable === true ? '开启' : '禁用';
                        this.userInfo = {
                            login: data.login,
                            fullName: data.fullName,
                            role: role.join(),
                            userCode: data.userCode,
                            enable: enable
                        };
                    }
                });
            },
            // 获取分配的门店
            getStores() {
                this.$axios.get('/api/stores').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res);
                        res.data.data.dataList.forEach(item => {
                            this.data.push(item.storeInfo);
                        });
                        this.total = res.data.data.total;
                    }
                });
            },
            // 获取门店类型数据
            getStoreType() {
                this.$store.dispatch('getStoreType').then(res => {
                    res.forEach(item => {
                        this.storeType.push({label: item.typeName, value: item.id});
                    });
                });
            }
        },
        components: {
            commontitle,
            commoninput
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .user-detail
        .detail-enable
            input
                border-color: transparent
        .table
            .open
                color: #0ba65b
</style>
