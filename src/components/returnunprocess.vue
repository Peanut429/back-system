<template>
    <div class="return-unprocesse">
        <commontitle titleName="退货处理/未处理"></commontitle>
        <Row>
            <Col>
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <selector v-model="serarchInfo.storeName" listName="退货门店" :list="storeList"></selector>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput v-model="serarchInfo.refundId" inputTitle="退货编号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput v-model="serarchInfo.orderId" inputTitle="原订单号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput v-model="serarchInfo.gdsName" inputTitle="退货商品"></commoninput>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row type="flex">
                    <Col :xs="{span: 11}" :md="{span: 5}">
                        <DatePicker :value="serarchInfo.createStartTime" type="date" @on-change="startTime" placeholder="申请时间"></DatePicker>
                    </Col>
                    <Col span="2" class="date-to">至</Col>
                    <Col :xs="{span: 11}" :md="{span: 5}">
                        <DatePicker :value="serarchInfo.createEndTime" type="date" @on-change="endTime" placeholder=""></DatePicker>
                    </Col>
                    <Col :xs="{span: 24}" :md="{span: 12}">
                        <search @clear="clear" @search="search"></search>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出</span>
            </div>
            <div class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出详情</span>
            </div>
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page :total="total" size="small" show-total></Page>
                </div>
            </template>
        </Table>
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
                serarchInfo: {
                    storeName: 'all',
                    refundId: '',
                    orderId: '',
                    gdsName: '',
                    createStartTime: '',
                    createEndTime: ''
                },
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                columns: [
                    {title: '退货编号', key: 'id', fixed: 'left', width: 170},
                    {title: '原订单号', key: 'orderId', minWidth: 170},
                    {title: '退货商品', key: 'productName', minWidth: 150, ellipsis: true},
                    {title: '退货门店', key: 'storeName', minWidth: 105, ellipsis: true},
                    {title: '退货理由', key: 'reason', minWidth: 150, ellipsis: true},
                    {title: '申请时间', key: 'createTime', minWidth: 150},
                    {title: '价格', key: 'amount', width: 60, align: 'center'},
                    {
                        title: '操作',
                        width: 145,
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
                                            this.$router.push('/home/untreated-detail:' + params.row.id);
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {}
                                    }
                                }, '通过'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {}
                                    }
                                }, '驳回')
                            ]);
                        }
                    }
                ],
                data: [],
                total: 0
            };
        },
        beforeMount() {
            this.getStoreList();
            this.getUnrefund();
        },
        methods: {
            // 获取门店列表
            getStoreList() {
                this.$store.dispatch('getStoreList').then(res => {
                    this.storeDetail = res.data;
                    this.storeDetail.forEach(item => {
                        this.storeList.push({label: item.storkName, value: item.storkName});
                    });
                });
            },
            // Request URL: https://api.quixmart.com/quixmart-api/api/refund?createEndTime=&createStartTime=&id=&orderId=&pageNo=1&pageSize=10&productName=&searchBrandId=&status=1&storeId=&updateEndTime=&updateStartTime=
            getUnrefund() {
                this.$axios.get('/api/unrefund').then(res => {
                    console.log(res);
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            startTime(date) {
                this.searchInfo.createStartTime = date;
            },
            endTime(date) {
                this.searchInfo.createEndTime = date;
            },
            clear() {
                this.searchInfo = {
                    storeName: 'all',
                    refundId: '',
                    orderId: '',
                    gdsName: '',
                    createStartTime: '',
                    createEndTime: ''
                };
            },
            search() {}
        },
        components: {
            commontitle,
            commoninput,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .return-unprocesse
        .table
            .ivu-table-fixed-right
                .ivu-table-tbody
                    .ivu-table-cell
                        padding-left: 0
</style>
