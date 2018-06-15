<template>
    <div class="order-list">
        <commontitle titleName="销售流水/订单列表"></commontitle>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 24}" :md="{span: 12}">
                <Row :gutter="16">
                    <Col span="8">
                        <selector v-model="searchInfo.storeName" listName="所在门店" :list="storeList"></selector>
                    </Col>
                    <Col span="8">
                        <commoninput v-model="searchInfo.orderCode" inputTitle="订单编号"></commoninput>
                    </Col>
                    <Col span="8">
                        <commoninput v-model="searchInfo.tradeNo" inputTitle="支付宝/微信订单号"></commoninput>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 12}" class="date-col">
                <Row :gutter="16" type="flex">
                    <Col span="7">
                        <DatePicker :value="searchInfo.saleDate" type="date" on-change="startTime" placeholder="销售日期"></DatePicker>
                    </Col>
                    <Col class="date-to" span="2">
                        <span>至</span>
                    </Col>
                    <Col span="7">
                        <DatePicker :value="searchInfo.endSaleDate" type="date" on-change="endTime" placeholder=""></DatePicker>
                    </Col>
                    <Col span="8">
                        <DatePicker :value="searchInfo.paymentDate" type="date" on-change="paymentTime" placeholder="付款日期"></DatePicker>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <search @clear="clear" @search="search"></search>
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
                    <Page :total="100" size="small"></Page>
                </div>
            </template>
        </Table>
        <Modal
            v-model="msgModal"
            title="订单备注"
            width="500"
            ok-text="保存"
            cancel-text="取消"
            :mask-closable="false"
            @on-ok="subMsg"
        >
            <Input v-model="orderMsg" type="textarea"></Input>
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
                msgModal: false,
                orderMsg: '',
                searchInfo: {
                    storeName: 'all',
                    orderCode: '',
                    tradeNo: '',
                    saleDate: '',
                    endSaleDate: '',
                    paymentDate: ''
                },
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                columns: [
                    {title: '订单编号', key: 'orderCode', width: 155, fixed: 'left'},
                    {title: '支付宝/微信订单号', key: 'tradeNo', width: 150, ellipsis: true},
                    {title: '购买门店', key: 'storeName', minWidth: 108, ellipsis: true},
                    {title: '付款方式', key: 'paymentType', width: 80},
                    {title: '订单总额', key: 'orderAmount', width: 70, align: 'center'},
                    {title: '销售时间', key: 'saleDate', minWidth: 150},
                    {title: '付款时间', key: 'paymentDate', minWidth: 150},
                    {title: '订单状态', key: 'paymentStatus', width: 100},
                    {
                        title: '操作',
                        width: 100,
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
                                            this.$router.push('/home/order-detail:' + params.row.orderCode);
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.msgModal = true;
                                        }
                                    }
                                }, '备注')
                            ]);
                        }
                    }
                ],
                data: []
          };
        },
        beforeMount() {
            this.getStoreList();
            this.getOrderList();
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
            // 获取订单信息
            getOrderList() {
                this.$axios.get('/api/orderlist').then(res => {
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                    }
                });
            },
            clear() {
                this.searchInfo = {
                    storeName: 'all',
                    orderCode: '',
                    tradeNo: '',
                    saleDate: '',
                    endSaleDate: '',
                    paymentDate: ''
                };
            },
            search() {},
            close(item) {
                this[item] = false;
            },
            subMsg() {
                this.orderMsg = '';
            }
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
    .order-list
        .table
            .ivu-table-fixed-right
                thead
                    .ivu-table-cell
                        height: 40px
                        line-height: 40px
                        padding-left: 20px
</style>
