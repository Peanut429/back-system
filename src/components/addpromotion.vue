<template>
    <div class="addpromotion">
        <commontitle titleName="价格管理/促销/新增促销"></commontitle>
        <Row type="flex" :gutter="16"  :style="{width: '60%'}">
            <Col span="8">
                <selector listName="所在门店" :list="storeList" :selected="storeList[0].value"></selector>
            </Col>
            <Col>
                <DatePicker type="date" @on-change="chooseDate" placeholder="开始时间"></DatePicker>
            </Col>
            <Col>
                <DatePicker type="date" @on-change="chooseDate" placeholder="结束时间"></DatePicker>
            </Col>
        </Row>
        <Tabs type="line" style="margin: 30px 0;" :animated="false">
            <TabPane label="满减促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span class="type">满减方式 : </span>
                        <RadioGroup v-model="reduceType">
                            <Radio label="递阶满减"></Radio>
                            <Radio label="每满减"></Radio>
                        </RadioGroup>
                    </div>
                    <div class="rules-content">
                        <div class="djmj" v-if="reduceType === '递阶满减'">
                            <div class="content-row" v-for="(item, index) in fullReduction" :key="index">
                                <div class="icon" @click="removeRules(index)">
                                    <Icon size="20" type="minus-circled"></Icon>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput inputTitle="满" :isRequired="true" inputType="number"></commoninput>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput inputTitle="减" :isRequired="true" inputType="number"></commoninput>
                                </div>
                            </div>
                            <div style="margin: 10px 0;padding: 0 15px;" @click="addRules">
                                <Icon size="20" type="plus-circled"></Icon>
                            </div>
                        </div>
                        <div class="mmj" v-if="reduceType === '每满减'">
                            <div class="content-row">
                                <div class="input-wrapper">
                                    <commoninput inputTitle="满" :isRequired="true" inputType="number"></commoninput>
                                </div>
                                <div class="input-wrapper">
                                    <commoninput inputTitle="减" :isRequired="true" inputType="number"></commoninput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品 ： " :radio="radioGroup"></goodsselector>
            </TabPane>
            <TabPane label="单品促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>输入折扣 ： </span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput inputTitle="折扣(%)" :isRequired="true" inputType="number"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品 ： " :radio="radioGroup"></goodsselector>
            </TabPane>
            <TabPane label="套装促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>促销方式 ： </span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <selector listName="促销方式" :list="promotionWay" :selected="promotionWay[0].value" @selectorValue="getpromotionWay"></selector>
                            </div>
                            <div v-if="promotionWayValue === 'discount'" class="input-wrapper">
                                <commoninput inputTitle="折扣(%)" inputType="number"></commoninput>
                            </div>
                            <div v-if="promotionWayValue === 'reduce'" class="input-wrapper">
                                <commoninput inputTitle="扣减(元)" inputType="number"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="选择商品">
                    <div slot="footer" class="footer">
                        <ul class="result">
                            <li class="original">
                                <span class="text">原价 :</span>
                                <span class="number">￥10.00</span>
                            </li>
                            <li class="discount">
                                <span class="text">折扣价 :</span>
                                <span class="number">￥5.00</span>
                            </li>
                        </ul>
                    </div>
                </goodsselector>
            </TabPane>
            <TabPane label="赠品促销">
                <goodsselector selectorTitle="购买商品"></goodsselector>
                <goodsselector selectorTitle="赠送商品"></goodsselector>
            </TabPane>
            <TabPane label="满赠促销">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>满赠标准</span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput inputTitle="满额(元)" inputType="number" :isRequired="true"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
                <goodsselector selectorTitle="购买商品"></goodsselector>
                <goodsselector selectorTitle="赠送商品"></goodsselector>
            </TabPane>
            <TabPane label="首单立减">
                <div class="rules-container">
                    <div class="rules-header">
                        <span>首单立减</span>
                    </div>
                    <div class="rules-content">
                        <div class="content-row">
                            <div class="input-wrapper">
                                <commoninput inputTitle="立减(元)" inputType="number" :isRequired="true"></commoninput>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <Row type="flex" justify="space-between">
            <Col>
                <router-link to="/home/promotion">
                    <div class="return-btn">返回</div>
                </router-link>
            </Col>
            <Col style="display: flex;justify-content: flex-end">
                <Button type="ghost" :disabled="disabled">发布活动</Button>
            </Col>
        </Row>
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
                disabled: true,
                reduceType: '递阶满减',
                radioGroup: [
                    {label: 'all', value: '全部商品'},
                    {label: 'part', value: '部分商品'}
                ],
                fullReduction: [
                    {full: '', reduce: ''}
                ],
                storeList: [
                    {label: '全部', value: 'all'},
                    {label: '国际科技园01L', value: 'gk01'},
                    {label: '国际科技园02L', value: 'gk02'},
                    {label: '国际科技园03L', value: 'gk03'}
                ],
                promotionWay: [
                    {label: '套装折扣', value: 'discount'},
                    {label: '套装减免', value: 'reduce'}
                ],
                promotionWayValue: 'discount'
            };
        },
        methods: {
            chooseDate() {},
            removeRules(index) {
                this.fullReduction.splice(index, 1);
            },
            addRules() {
                this.fullReduction.push({full: '', reduce: ''});
            },
            selectGoods() {},
            getpromotionWay(value) {
                this.promotionWayValue = value;
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
