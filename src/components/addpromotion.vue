<template>
    <div class="addpromotion">
        <commontitle titleName="价格管理/促销/新增促销"></commontitle>
        <Row type="flex" :gutter="16">
            <Col :xs="{span: 8}" :md="{span: 6}">
                <selector listName="所在门店" :list="storeList" v-model="storeName" :disabled="tabValue === '首单立减'"></selector>
            </Col>
            <Col :xs="{span: 8}" :md="{span: 6}">
                <DatePicker type="datetime" @on-change="chooseStart" placeholder="开始时间"></DatePicker>
            </Col>
            <Col :xs="{span: 8}" :md="{span: 6}">
                <DatePicker type="datetime" @on-change="chooseEnd" placeholder="结束时间"></DatePicker>
            </Col>
        </Row>
        <Tabs v-model="tabValue" type="line" style="margin: 30px 0;" :animated="false">
            <TabPane label="满减促销" name="满减促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span class="type">满减方式 : </span>
                        <RadioGroup v-model="reduceType">
                            <Radio label="递阶满减"></Radio>
                            <Radio label="每满减"></Radio>
                        </RadioGroup>
                    </div>
                    <div class="rules-content">
                        <div class="djmj" v-show="reduceType === '递阶满减'">
                            <div class="content-row" v-for="(item, index) in fullReduceRule" :key="index">
                                <div class="icon" @click="removeRules(index)">
                                    <Icon size="20" type="minus-circled"></Icon>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput v-model="item.full" inputTitle="满" :isRequired="true" inputType="number"></commoninput>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput v-model="item.reduce" inputTitle="减" :isRequired="true" inputType="number"></commoninput>
                                </div>
                            </div>
                            <div style="margin: 10px 0;padding: 0 15px;" @click="addRules">
                                <Icon size="20" type="plus-circled"></Icon>
                            </div>
                        </div>
                        <div class="mmj" v-show="reduceType === '每满减'">
                            <div class="content-row">
                                <div class="input-wrapper">
                                    <commoninput v-model="everyMinusRule[0].full" inputTitle="满" :isRequired="true" inputType="number"></commoninput>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput v-model="everyMinusRule[0].reduce" inputTitle="减" :isRequired="true" inputType="number"></commoninput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品 ： " :radio="radioGroup" :calcTime="calcTime" :data="fullReduce"></goodsselector>
            </TabPane>
            <TabPane label="单品促销" name="单品促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>输入折扣 ： </span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput v-model="discount" inputTitle="折扣(%)" :isRequired="true" inputType="number"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品 ： " :radio="radioGroup" :calcTime="calcTime" :data="{name: '单品促销', rule: discount}"></goodsselector>
            </TabPane>
            <TabPane label="套装促销" name="套装促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>促销方式 ： </span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <selector v-model="promotionWayValue" listName="促销方式" :list="promotionWay"></selector>
                            </div>
                            <div v-show="promotionWayValue === 'percentage'" class="input-wrapper">
                                <commoninput v-model="percentage" inputTitle="折扣(%)" inputType="number" :isRequired="true" format="int"></commoninput>
                            </div>
                            <div v-show="promotionWayValue === 'reduce'" class="input-wrapper">
                                <commoninput v-model="reduce" inputTitle="扣减(元)" inputType="number" :isRequired="true"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品" :data="suit" :calcTime="calcTime" @getGdsList="getDisGdsList">
                    <div slot="footer" class="footer" v-show="discountGdsList.length !== 0">
                        <ul class="result">
                            <li class="original">
                                <span class="text">原价 :</span>
                                <span class="number">￥{{suitCalc.op}}</span>
                            </li>
                            <li class="discount">
                                <span class="text">折扣价 :</span>
                                <span class="number">￥{{suitCalc.dp}}</span>
                            </li>
                        </ul>
                    </div>
                </goodsselector>
            </TabPane>
            <TabPane label="赠品促销" name="赠品促销">
                <div class="gdsSelWrapper">
                    <goodsselector selectorTitle="购买商品" :actionBtn="false" @getGdsList="getDisGdsList"></goodsselector>
                    <goodsselector selectorTitle="赠送商品" :actionBtn="false" @getGdsList="getGiftGdsList"></goodsselector>
                    <Row type="flex" justify="space-between" :style="{padding: '5px'}">
                        <Col>
                            <router-link to="/home/promotion">
                                <div class="return-btn">返回</div>
                            </router-link>
                        </Col>
                        <Col style="display: flex;justify-content: flex-end">
                            <Button type="ghost" :disabled="!calcTime">发布活动</Button>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane label="满赠促销" name="满赠促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>满赠标准</span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput v-model="full" inputTitle="满额(元)" inputType="number" :isRequired="true"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gdsSelWrapper">
                    <goodsselector selectorTitle="购买商品" :actionBtn="false" @getGdsList="getDisGdsList"></goodsselector>
                    <goodsselector selectorTitle="赠送商品" :actionBtn="false" @getGdsList="getGiftGdsList"></goodsselector>
                    <Row type="flex" justify="space-between" :style="{padding: '5px'}">
                        <Col>
                            <router-link to="/home/promotion">
                                <div class="return-btn">返回</div>
                            </router-link>
                        </Col>
                        <Col style="display: flex;justify-content: flex-end">
                            <Button type="ghost" :disabled="!fullGift">发布活动</Button>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane label="首单立减" name="首单立减">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>首单立减</span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput v-model="firstReduce" inputTitle="立减(元)" inputType="number" :isRequired="true"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <Row type="flex" justify="space-between" :style="{padding: '5px'}">
                    <Col>
                        <router-link to="/home/promotion">
                            <div class="return-btn">返回</div>
                        </router-link>
                    </Col>
                    <Col style="display: flex;justify-content: flex-end">
                        <Button type="ghost" :disabled="!firstReduce">发布活动</Button>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import selector from '../common/selector';
    import commoninput from '../common/commoninput';
    import goodsselector from '../common/goodsselector';
    export default {
        data() {
            return {
                tabValue: '满减促销',
                // 选择促销门店
                storeName: 'all',
                // 活动发布时间
                startTime: '',
                // 活动截止时间
                endTime: '',
                // 发布按钮禁用状态
                // publish: true,
                // 套装促销-折扣百分比值
                percentage: '',
                // 套装促销-折扣固定值
                reduce: '',
                // 套装促销-折扣计算方式
                promotionWayValue: 'percentage',
                // 单品促销-折扣值
                discount: '',
                // 促销商品列表
                discountGdsList: [],
                // 赠送的商品的列表
                giftGdsList: [],
                // 满减方式
                reduceType: '递阶满减',
                radioGroup: [
                    {label: 'all', value: '全部商品'},
                    {label: 'part', value: '部分商品'}
                ],
                // 递阶满减的规则
                fullReduceRule: [
                    {full: '', reduce: ''}
                ],
                // 每满减的规则
                everyMinusRule: [
                    {full: '', reduce: ''}
                ],
                // 满赠促销-满赠标准
                full: '',
                // 首单立减
                firstReduce: '',
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                promotionWay: [
                    {label: '套装折扣', value: 'percentage'},
                    {label: '套装减免', value: 'reduce'}
                ]
            };
        },
        beforeMount() {
            this.getStoreList();
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
            // 促销开始时间
            chooseStart(date) {
                this.startTime = date;
            },
            // 促销截止时间
            chooseEnd(date) {
                this.endTime = date;
            },
            // 满减促销规则新增
            addRules() {
                this.fullReduceRule.push({full: '', reduce: ''});
            },
            // 满减促销规则移除
            removeRules(index) {
                this.fullReduceRule.splice(index, 1);
            },
            selectGoods() {},
            getDisGdsList(data) {
                console.log(data);
                this.discountGdsList = data;
            },
            getGiftGdsList(data) {
                this.giftGdsList = data;
            }
        },
        computed: {
            // 计算促销时间是否正常
            calcTime() {
                if (this.startTime === '' || this.endTime === '') {
                    return false;
                }
                let startTimes = this.startTime.substring(0, 10).split('-');
                let endTimes = this.endTime.substring(0, 10).split('-');
                let start = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + this.startTime.substring(10, 19);
                let end = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + this.endTime.substring(10, 19);
                let thisResult = (Date.parse(end) - Date.parse(start)) / 3600 / 1000;
                if (thisResult < 0 || thisResult === 0) {
                    return false;
                } else if (thisResult > 0) {
                    return true;
                }
            },
            // 满减促销数据
            fullReduce() {
                if (this.reduceType === '递阶满减') {
                    return {name: '满减促销', rule: this.fullReduceRule};
                } else {
                    return {name: '满减促销', rule: this.everyMinusRule};
                }
            },
            // 套装促销数据
            suit() {
                console.log(this.percentage);
                if (this.promotionWayValue === 'percentage') {
                    return {name: '套装促销', rule: {type: this.promotionWayValue, value: this.percentage}};
                } else {
                    return {name: '套装促销', rule: {type: this.promotionWayValue, value: this.reduce}};
                }
            },
            // 套装促销计算结果
            suitCalc() {
                let originalPrice = 0;
                let discountPrice = 0;
                this.discountGdsList.forEach(item => {
                    originalPrice += item.marketPrice;
                });
                if (this.suit.rule.type === 'percentage') {
                    discountPrice = originalPrice * this.suit.rule.value;
                } else {
                    discountPrice = originalPrice - this.suit.rule.value;
                }
                return {op: originalPrice, dp: discountPrice};// op: original price, dp: discount price
            },
            // 满赠促销是否可以发布
            fullGift() {
                if (!this.calcTime || !this.full) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        watch: {
            tabValue(current) {
                if (current === '首单立减') {
                    this.storeName = 'all';
                }
            }
        },
        components: {
            commoninput,
            commontitle,
            selector,
            goodsselector
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/variable.styl"
    .addpromotion
        /*.ivu-col
            flex: 1
            align-self: flex-end
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
        .return-btn
            height: 32px
            line-height: 32px
            width: 76px
            padding: 0 6px
            text-align: center
            background-color: #fff
            border-radius: 5px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
            color: #000
        .rules-container
            margin-bottom: 20px
            border: 1px solid #dddee1
            .rules-header
                display: flex
                align-items: center
                padding: 0 15px
                height: 40px
                line-height: 40px
                border-bottom: 1px solid #dddee1
                font-size: 15px
                .type
                    margin-right: 10px
                .ivu-radio-wrapper
                    font-size: 14px
            .content-row
                display: flex
                padding: 0 15px
                .icon
                    align-self: flex-end
                    margin-bottom: 7px
                .input-wrapper
                    width: 150px
                    margin: 0 20px
                    &:first-child
                        margin-left: 0
        .footer
            display: flex
            justify-content: flex-end
            margin-right: 40px
            padding: 5px 0
            height: 100%
            line-height: 1
            .result
                display: flex
                flex-direction column
                justify-content space-around
                li
                    display: flex
                    width: 100px
                    font-size: 14px
                    &.original
                        color: $grey-color
                    span
                        flex: 0 0 50px
                        &.text
                            margin-right: 5px
                            text-align: right
                        &.number
                            text-align: left
</style>
