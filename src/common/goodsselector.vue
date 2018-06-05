<template>
    <div class="goods-selector">
        <div class="rules-container">
            <div class="rules-header">
                <span class="type">{{selectorTitle}}</span>
                <RadioGroup v-if="radio" v-model="whichGoods">
                    <Radio v-for="(item, index) in radio" :key="index" :label="item.label">{{item.value}}</Radio>
                </RadioGroup>
            </div>
            <div class="rules-content">
                <div v-if="!radio || whichGoods === 'part'">
                    <Table :columns="tableColumns" :data="selected">
                        <template slot="header">
                            <div class="table-header">
                                <span>已选商品</span>
                                <div class="select-btn" @click="selectGoods">
                                    <Icon class="icon" type="bag"></Icon>
                                    <span>选择商品</span>
                                </div>
                            </div>
                        </template>
                        <template slot="footer">
                            <slot name="footer"></slot>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
        <Row type="flex" justify="space-between" :style="{padding: '5px'}" v-if="actionBtn">
            <Col>
                <router-link to="/home/promotion">
                    <div class="return-btn">返回</div>
                </router-link>
            </Col>
            <Col style="display: flex;justify-content: flex-end">
                <Button type="ghost" :disabled="!canPublish">发布活动</Button>
            </Col>
        </Row>
        <goodslist ref="goodslist" :products="products" :total="total" @selectedGds="selectedGds"></goodslist>
    </div>
</template>

<script>
    import goodslist from './goodslist';
    export default {
        props: {
            radio: {
                type: Array
            },
            selectorTitle: {
                type: String,
                required: true
            },
            actionBtn: {
                type: Boolean,
                default: true
            },
            calcTime: {
                type: Boolean,
                default: true
            },
            data: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                whichGoods: 'all',
                modalShow: false,
                publish: true,
                tableColumns: [
                    {title: 'SKU编码', key: 'productSku', width: 108, fixed: 'left'},
                    {title: '商品条形码', key: 'productBarcode', minWidth: 150},
                    {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
                    {title: '商品类型', key: 'gdsType', width: 100},
                    {title: '规格', key: 'format', width: 100},
                    {title: '品牌', key: 'productBrandName', width: 70},
                    {title: '零售价', key: 'marketPrice', width: 100},
                    {title: '单位', key: 'unit', width: 70},
                    {
                        title: '操作',
                        width: 100,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    color: '#2196f3',
                                    userSelect: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.selected.splice(params.index, 1);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                products: [],
                selected: [],
                total: 0
            };
        },
        methods: {
            getProducts() {
                return new Promise((resolve, reject) => {
                    this.$axios.get('/api/product1').then(res => {
                        // console.log(res);
                        if (res.data.errno === 0) {
                            this.products = res.data.data.dataList;
                            this.total = res.data.data.total;
                            resolve();
                        }
                    });
                });
            },
            selectGoods() {
                this.getProducts().then(() => {
                    this.$refs.goodslist.modalShow();
                });
            },
            selectedGds(data) {
                if (this.selected.length === 0) {
                    this.selected = [...data];
                } else {
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < this.selected.length; j++) {
                            if (data[i].productSku === this.selected[j].productSku) {
                                data.splice(i, 1);
                                j = this.selected.length;
                                i--;
                            }
                        }
                    }
                    this.selected = this.selected.concat(data);
                }
                this.$emit('getGdsList', this.selected);
            }
        },
        computed: {
            canPublish() {
                // console.log(this.calcTime);
                if (this.dataIsRight && this.calcTime) {
                    return true;
                } else {
                    return false;
                }
            },
            dataIsRight() {
                if (this.data == null) {
                    return true;
                }
                let flag = true;
                if (this.data.name === '满减促销') {
                    this.data.rule.forEach((item) => {
                        if (Number(item.full) <= Number(item.reduce)) {
                            flag = false;
                        }
                        if (Number(item.reduce) <= 0) {
                            flag = false;
                        }
                    });
                }
                if (this.data.name === '单品促销') {
                    if (this.data.rule >= 100 || this.data.rule <= 0) {
                        flag = false;
                    }
                }
                if (this.data.name === '套装促销') {
                    if (this.data.rule.type === 'percentage') {
                        if (this.data.rule.value >= 100 || this.data.rule.value <= 0) {
                            flag = false;
                        }
                    } else {
                        if (Number(this.data.rule.value) <= 0) {
                            flag = false;
                        }
                    }
                }
                return flag;
            }
        },
        components: {
            goodslist
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods-selector
        .rules-container
            margin-bottom: 20px
            border: 1px solid #dddee1
            /*box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)*/
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
            .content-row
                display: flex
                padding: 0 15px
                .icon
                    align-self: flex-end
                    margin-bottom: 7px
            .ivu-table-wrapper
                .table-header
                    display: flex
                    justify-content: space-between
                    padding: 0 15px
                    font-size: 15px
                    .select-btn
                        display: flex
                        align-items: center
                        color: $grey-color
                        cursor: pointer
                        user-select: none
                        &:hover
                            color: #ff9c10
                            .icon
                                color: currentColor
                        .icon
                            margin-right: 5px
                .ivu-table-fixed, .ivu-table-fixed-right
                    top: 48px
                .ivu-table-fixed-right
                    thead
                        .ivu-table-cell
                            padding-left: 27px
        .return-btn
            height: 32px
            line-height: 32px
            width: 76px
            padding: 0 6px
            text-align: center
            background-color: #fff
            border-radius: 5px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
</style>
