<template>
    <div class="order-detail">
        <commontitle titleName="销售流水/订单列表/订单详情"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :md="{span: 6}">
                <selector v-model="detailInfo.storeName" :disabled="true" listName="所在门店" :list="storeList"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.orderId" inputTitle="订单编号" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.tradeNo" inputTitle="支付宝/微信订单号" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.userName" inputTitle="客户昵称" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.userTel" inputTitle="客户手机" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.createTime" inputTitle="销售日期" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="detailInfo.paymentTime" inputTitle="付款日期" :disabled="true"></commoninput>
            </Col>
        </Row>
        <Row :style="{margin: '20px 0', fontSize: '14px'}">
            <span>订单备注：</span>
            <span></span>
        </Row>
        <Table class="table" :columns="columns" :data="detailInfo.data">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" show-total :total="detailInfo.total"></Page>
                </div>
                <div class="detail-calc">
                    <p>总金额：<span class="number">3.5</span></p>
                    <p class="discount">总计优惠：<span class="number">-0.00</span></p>
                    <p class="result">实付款：<span class="number">3.5</span></p>
                </div>
            </template>
        </Table>
        <Row :style="{padding: '5px', marginTop: '20px'}">
            <router-link to="/home/order-list">
                <div class="return-btn">返回</div>
            </router-link>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import selector from '../common/selector';
    import commoninput from '../common/commoninput';
    export default {
        beforeMount() {
            // console.log(this.$route.params);
            this.$axios.get('/api/selectedByCode').then(res => {
                console.log(res);
                if (res.data.errno === 0) {
                    this.detailInfo.total = res.data.data.total;
                    this.storeList.push({label: res.data.data.dataList[0].storeName, value: res.data.data.dataList[0].storeName});
                    this.detailInfo.storeName = res.data.data.dataList[0].storeName;
                    this.detailInfo.orderId = res.data.data.dataList[0].orderId;
                    this.detailInfo.tradeNo = res.data.data.dataList[0].tradeNo;
                    this.detailInfo.userName = res.data.data.dataList[0].userName;
                    this.detailInfo.userTel = res.data.data.dataList[0].userTel;
                    this.detailInfo.createTime = res.data.data.dataList[0].createTime;
                    this.detailInfo.paymentTime = res.data.data.dataList[0].paymentTime;
                    this.detailInfo.data = res.data.data.dataList[0].orderDetailVO;
                }
            });
        },
        data() {
            return {
                storeList: [
                    {label: '未获取到门店数据', value: 'error'}
                ],
                detailInfo: {
                    storeName: '',
                    orderId: '',
                    tradeNo: '',
                    userName: '',
                    userTel: '',
                    createTime: '',
                    paymentTime: '',
                    total: 0,
                    data: []
                },
                columns: [
                    {title: 'SKU编码', key: 'productSku', width: 108, fixed: 'left'},
                    {title: '商品编码', key: 'productBarcode', minWidth: 150},
                    {title: '商品类型', key: 'productType', minWidth: 80},
                    {title: '规格', key: 'productFormat', minWidth: 80},
                    {title: '品牌', key: 'productBrandName', minWidth: 80, align: 'center'},
                    {title: '单位', key: 'productUnit', minWidth: 50, align: 'center'},
                    {title: '数量', key: 'number', minWidth: 50, align: 'center'},
                    {
                        title: '零售价',
                        key: 'retailPrice',
                        width: 80,
                        fixed: 'right',
                        render: (h, params) => {
                            let price = params.row.retailPrice.toFixed(2);
                            return h('span', price);
                        }
                    }
                ]
            };
        },
        components: {
            commontitle,
            selector,
            commoninput
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .order-detail
        .return-btn
            display: inline-block
            height: 32px
            line-height: 32px
            width: 76px
            padding: 0 6px
            text-align: center
            background-color: #fff
            border-radius: 5px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
            color: #000
            user-select: none
        .table
            .ivu-table-footer
                height: auto
                .detail-calc
                    padding: 10px 0
                    text-align: right
                    p
                        padding-right: 20px
                        height: 25px
                        line-height: 25px
                        .number
                            display: inline-block
                            width: 50px
                    .discount
                        color: #FF4040
                    .result
                        font-weight: 500
                        font-size: 18px
</style>
