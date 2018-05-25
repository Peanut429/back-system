<template>
    <div class="return-unprocesse">
        <commontitle titleName="退货处理/未处理"></commontitle>
        <Row>
            <Col>
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
            </Col>
            <Col>
                <Row type="flex">
                    <Col :xs="{span: 11}" :md="{span: 5}">
                        <DatePicker type="date" @on-change="startTime" placeholder="申请时间"></DatePicker>
                    </Col>
                    <Col span="2" class="date-to">至</Col>
                    <Col :xs="{span: 11}" :md="{span: 5}">
                        <DatePicker type="date" @on-change="endTime" placeholder=""></DatePicker>
                    </Col>
                    <Col :xs="{span: 24}" :md="{span: 12}">
                        <search></search>
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
        <Table class="table" :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page :total="1" size="small" show-total></Page>
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
                    {title: '退货编号', key: 'srNumber'},
                    {title: '原订单号', key: 'orderNumber'},
                    {title: '退货商品', key: 'barcode'},
                    {title: '退货门店', key: 'storeAddress'},
                    {title: '退货理由', key: 'returnReason'},
                    {title: '申请时间', key: 'applicationTime'},
                    {title: '价格', key: 'price'},
                    {title: '操作', key: 'actions'}
                ]
            };
        },
        methods: {
            startTime() {},
            endTime() {}
        },
        components: {
            commontitle,
            commoninput,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
