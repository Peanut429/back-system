<template>
    <div class="order-list">
        <commontitle titleName="销售流水/订单列表"></commontitle>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 24}" :md="{span: 12}">
                <Row :gutter="16">
                    <Col span="8">
                        <selector listName="所在门店" :list="storeList" :selected="storeList[0].value"></selector>
                    </Col>
                    <Col span="8">
                        <commoninput inputTitle="订单编号"></commoninput>
                    </Col>
                    <Col span="8">
                        <commoninput inputTitle="支付宝/微信订单号"></commoninput>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 12}" class="date-col">
                <Row :gutter="16" type="flex">
                    <Col span="7">
                        <DatePicker type="date" on-change="startTime" placeholder="销售日期"></DatePicker>
                    </Col>
                    <Col class="date-to" span="2">
                        <span>至</span>
                    </Col>
                    <Col span="7">
                        <DatePicker type="date" on-change="endTime" placeholder=""></DatePicker>
                    </Col>
                    <Col span="8">
                        <DatePicker type="date" on-change="paymentTime" placeholder="付款日期"></DatePicker>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <search></search>
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
        <Table :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page :total="100" size="small"></Page>
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
              storeList: [
                  {label: '全部', value: 'all'},
                  {label: '国际科技园01L', value: 'gk01'},
                  {label: '国际科技园02L', value: 'gk02'},
                  {label: '国际科技园03L', value: 'gk03'}
              ],
              columns: [
                  {title: '订单编号', key: 'orderNumber'},
                  {title: '支付宝/微信订单号', key: 'AWNumber'},
                  {title: '购买门店', key: 'storeAddress'},
                  {title: '付款方式', key: 'paymentType'},
                  {title: '订单总额', key: 'orderAmount'},
                  {title: '销售时间', key: 'sellTime'},
                  {title: '付款时间', key: 'paymentTime'},
                  {title: '订单状态', key: 'orderState'},
                  {title: '操作', key: 'actions'}
              ]
          };
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
        /*.date-col
            padding-top: 22px
            .ivu-date-picker
                width: 100%
                .ivu-input
                    height: 36px
                    border: none
                    border-radius: 0
                    border-bottom: 1px solid rgba(0,0,0,0.1)
                    background-color: transparent
                    font-size: 14px
                    &:focus
                        border-bottom: 1px solid rgb(33, 150, 243)*/
        /*.action-col
            display: flex
            align-items: center
            padding: 30px 0
            cursor: pointer
            font-size: 15px
            user-select: none
            &+.action-col
                margin-left: 30px
            &:hover
                color: #ff9c10
            .icon
                margin-right: 10px
                color: currentColor*/
        /*.pages
            display flex
            justify-content center
            align-items center*/
</style>
