<template>
    <div class="sysmessage">
        <commontitle titleName="系统消息"></commontitle>
        <Row type="flex">
            <Col :xs="{span: 6}" :md="{span: 4}">
                <DatePicker type="date" @on-change="chooseDate" placeholder="开始时间"></DatePicker>
            </Col>
            <Col span="1" class="date-to">至</Col>
            <Col :xs="{span: 6}" :md="{span: 4}">
                <DatePicker type="date" @on-change="chooseDate" placeholder="结束时间"></DatePicker>
            </Col>
            <Col :xs="{span: 6, offset: 5}" :md="{span: 4, offset: 11}">
                <search></search>
            </Col>
        </Row>
        <Tabs v-model="msgType" class="tabs">
            <TabPane label="已读" name="已读">已读</TabPane>
            <TabPane label="未读" name="未读">未读</TabPane>
        </Tabs>
        <Row type="flex" justify="center">
            <Page class="page" :total="368" show-total></Page>
        </Row>
    </div>
</template>s

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import search from '../common/search';
    export default {
        data() {
            return {
                msgType: '已读'
            };
        },
        components: {
            commontitle,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .sysmessage
        .tabs
            margin: 30px 0
        .page
            user-select: none
        /*.return-btn
            height: 32px
            line-height: 32px
            width: 76px
            padding: 0 6px
            text-align: center
            background-color: #fff
            border-radius: 5px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
            color: #000*/
</style>
