<template>
    <div class="promotion">
        <commontitle titleName="价格管理/促销"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 24}" :md="{span: 19}">
                <Row :gutter="16" type="flex" class="selectors">
                    <Col>
                        <selector v-model="storeName" listName="所在门店" :list="storeList"></selector>
                    </Col>
                    <Col>
                        <selector v-model="proType" listName="促销类型" :list="promotionType"></selector>
                    </Col>
                    <Col>
                        <selector v-model="proState" listName="促销状态" :list="promotionState"></selector>
                    </Col>
                    <Col>
                        <DatePicker :value="startDate" type="date" @on-change="startTime" placeholder="开始时间"></DatePicker>
                    </Col>
                    <Col>
                        <DatePicker :value="endDate" type="date" @on-change="endTime" placeholder="结束时间"></DatePicker>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: '5'}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row class="action-row" type="flex" justify="end" align="middle">
            <Col>
                <router-link to="/home/addpromotion">
                    <div class="action-col">
                        <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                        <span>新增促销</span>
                    </div>
                </router-link>
            </Col>
        </Row>
        <Table :columns="promotionData"></Table>
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
                storeName: '',
                proType: '',
                proState: '',
                startDate: '',
                endDate: '',
                storeList: [
                    {label: '全部', value: 'all'},
                    {label: '国际科技园01L', value: 'gk01'},
                    {label: '国际科技园02L', value: 'gk02'},
                    {label: '国际科技园03L', value: 'gk03'}
                ],
                promotionType: [
                    {label: '全部', value: 'all'}
                ],
                promotionState: [
                    {label: '全部', value: 'all'},
                    {label: '进行中', value: 'underway'},
                    {label: '已取消', value: 'canceled'},
                    {label: '已失效', value: 'failure'},
                    {label: '未开始', value: 'notStarted'}
                ],
                promotionData: [
                    {title: '促销编号', key: 'id'},
                    {title: '所在门店', key: 'storeAddress'},
                    {title: '促销类型', key: 'promotionType'},
                    {title: '商品总数', key: 'totalGoods'},
                    {title: '促销时间', key: 'time'},
                    {title: '促销状态', key: 'promotionState'},
                    {title: '操作', key: 'actions'}
                ]
          };
        },
        components: {
            commontitle,
            commoninput,
            selector,
            search
        },
        beforeMount() {
            this.getMainType();
        },
        methods: {
            // 获取促销方式
            getMainType() {
                this.$axios.get('/api/mainType').then(res => {
                    if (res.data.errno === 0) {
                        res.data.data.forEach(item => {
                            this.promotionType.push({label: item.name, value: item.name});
                        });
                    }
                });
            },
            clear() {
                this.storeName = 'all';
                this.proType = 'all';
                this.proState = 'all';
                this.startDate = '';
                this.endDate = '';
            },
            search() {},
            startTime(date) {
                this.startDate = date;
            },
            endTime(date) {
                this.endDate = date;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .promotion
        position: relative
        .selectors
            .ivu-col
                flex: 1
                align-self: flex-end
               /*.ivu-date-picker
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
        .buttons
            display: flex
            justify-content: flex-end
            align-items: flex-end
            height: 59px
            .clear-btn, .search-btn
                margin-left: 10px
                box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
        /*.action-row
            margin: 30px 0
            font-size: 15px
            color: #7b7b7b
            user-select: none
            box-sizing: border-box
            .action-col
                display: flex
                align-items: center
                cursor: pointer
                color: rgb(123, 123, 123)
                .icon
                    margin-right: 10px*/
</style>
