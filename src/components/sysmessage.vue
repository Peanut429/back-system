<template>
    <div class="sysmessage">
        <commontitle titleName="系统消息"></commontitle>
        <Row type="flex">
            <Col :xs="{span: 6}" :md="{span: 4}">
                <DatePicker type="date" :value="searchInfo.startDate" @on-change="startDate" placeholder="开始时间"></DatePicker>
            </Col>
            <Col span="1" class="date-to">至</Col>
            <Col :xs="{span: 6}" :md="{span: 4}">
                <DatePicker type="date" :value="searchInfo.endDate" @on-change="endDate" placeholder="结束时间"></DatePicker>
            </Col>
            <Col :xs="{span: 6, offset: 5}" :md="{span: 4, offset: 11}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Tabs v-model="msgType" class="tabs">
            <TabPane label="已读" name="已读">
                <ul class="msg">
                    <li class="msg-item" v-for="(item, index) in dataList" :key="index">
                        <div class="msg-head">
                            <span class="msg-title">库存预警</span>
                            <span class="msg-time">{{item.createDate}}</span>
                            <Icon class="msg-delete" type="ios-trash"></Icon>
                        </div>
                        <div class="msg-body" @click="showDetail(item.id)">
                            <p class="msg-content">{{item.content}}</p>
                            <div class="msg-address">
                                <Icon class="msg-icon" type="navigate"></Icon> 门店地址：
                                <span class="msg-store-name">{{item.stockAddress}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </TabPane>
            <TabPane label="未读" name="未读">
                <ul class="msg">
                    <li class="msg-item" v-for="(item, index) in dataList" :key="index">
                        <div class="msg-head">
                            <span class="msg-title">库存预警</span>
                            <span class="msg-time">{{item.createDate}}</span>
                            <Icon class="msg-delete" type="ios-trash"></Icon>
                        </div>
                        <div class="msg-body">
                            <p class="msg-content">{{item.content}}</p>
                            <div class="msg-address">
                                <Icon class="msg-icon" type="navigate"></Icon> 门店地址：
                                <span class="msg-store-name">{{item.stockAddress}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </TabPane>
        </Tabs>
        <Row type="flex" justify="center">
            <Page class="page" :total="total" show-total></Page>
        </Row>
    </div>
</template>s

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import search from '../common/search';
    export default {
        data() {
            return {
                searchInfo: {
                    startDate: '',
                    endDate: ''
                },
                msgType: '已读',
                dataList: [],
                total: 0
            };
        },
        beforeMount() {
            this.getMessage();
        },
        methods: {
            // 获取消息列表
            getMessage() {
                this.$axios.get('/api/message').then(res => {
                    if (res.data.errno === 0) {
                        console.log(res.data.data);
                        this.dataList = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            showDetail(id) {
                this.$router.push('/home/message-detail:' + id);
            },
            startDate(date) {
                this.searchInfo.startDate = date;
            },
            endDate(date) {
                this.searchInfo.endDate = date;
            },
            clear() {
                this.searchInfo = {
                    startDate: '',
                    endDate: ''
                };
            },
            search() {}
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
            .msg
                .msg-item
                    margin-bottom: 20px
                    border: 1px solid #cfcfcf
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12)
                    .msg-head
                        display: flex
                        padding: 15px 20px
                        border-bottom: 1px solid #cfcfcf
                        .msg-title
                            flex: 0 0 80%
                            font-size: 15px
                            color: #d32f2f
                        .msg-time
                            flex: 0 0 16%
                            font-size: 14px
                        .msg-delete
                            flex: 0 0 4%
                            font-size: 20px
                            cursor: pointer
                            opacity: .3
                            &:hover
                                opacity: .7
                    .msg-body
                        padding: 20px
                        cursor: pointer
                        &:hover
                            background-color: #ececec
                        .msg-content
                            font-size: 14px
                            color: #000
                            opacity: .87
                        .msg-address
                            margin-top: 16px
                            line-height: 15px
                            font-size: 13px
                            color: #000
                            opacity: .54
        .page
                user-select: none
</style>
