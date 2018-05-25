<template>
    <div class="return-processed">
        <commontitle titleName="退货处理/已处理"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :md="{span: 6}">
                <selector listName="退货门店" :list="storeList" :selected="storeList[0].value"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput inputTitle="退货编号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput inputTitle="原订单号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput inputTitle="退货商品"></commoninput>
            </Col>
        </Row>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 12}" :md="{span: 6}">
                <DatePicker type="date" @on-change="startTime" placeholder="申请时间"></DatePicker>
            </Col>
            <Col class="date-to" span="1">至</Col>
            <Col :xs="{span: 11}" :md="{span: 5}">
                <DatePicker type="date" @on-change="endTime" placeholder=""></DatePicker>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <selector listName="状态" :list="state" :selected="state[0].value"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <DatePicker type="date" @on-change="processTime" placeholder="处理时间"></DatePicker>
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
        <Table class="table" :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page show-total size="small" :total="1"></Page>
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
              state: [
                  {label: '所有已处理订单', value: 'all'},
                  {label: '审核驳回', value: '审核驳回'},
                  {label: '待寄出', value: '待寄出'},
                  {label: '已寄出', value: '已寄出'},
                  {label: '已收货', value: '已收货'},
                  {label: '待深蓝审核', value: '待深蓝审核'},
                  {label: '深蓝审核驳回', value: '深蓝审核驳回'},
                  {label: '退款中', value: '退款中'},
                  {label: '深蓝退款中', value: '深蓝退款中'},
                  {label: '退款完成', value: '退款完成'},
                  {label: '深蓝退款完成', value: '深蓝退款完成'},
                  {label: '已关闭', value: '已关闭'}
              ],
              columns: [
                  {title: '退货编号', key: 'srNumber'},
                  {title: '原订单号', key: 'orderNumber'},
                  {title: '退货商品', key: 'barcode'},
                  {title: '退货门店', key: 'storeAddress'},
                  {title: '退货理由', key: 'returnReason'},
                  {title: '申请时间', key: 'applicationTime'},
                  {title: '处理时间', key: 'processTime'},
                  {title: '价格', key: 'price'},
                  {title: '状态', key: 'processResult'}
              ]
          };
        },
        methods: {
            startTime() {},
            endTime() {},
            processTime() {}
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

</style>
