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
                    <Table :columns="tableColumns">
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
        <goodslist ref="goodslist"></goodslist>
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
            }
        },
        data() {
            return {
                whichGoods: 'all',
                modalShow: false,
                tableColumns: [
                    {title: 'SKU编码', key: 'SKU'},
                    {title: '商品条形码', key: 'barcode'},
                    {title: '商品名称', key: 'goodsName'},
                    {title: '商品类型', key: 'goodsType'},
                    {title: '规格', key: 'specification'},
                    {title: '品牌', key: 'brand'},
                    {title: '零售价', key: 'sellingPrice'},
                    {title: '单位', key: 'measurementUnit'},
                    {title: '操作', key: 'actions'}
                ]
            };
        },
        methods: {
            selectGoods() {
                this.$refs.goodslist.modalShow();
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
                /*border: none*/
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
                        &:hover
                            color: #ff9c10
                            .icon
                                color: currentColor
                        .icon
                            margin-right: 5px
</style>
