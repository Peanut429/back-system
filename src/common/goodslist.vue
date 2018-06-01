<template>
    <Modal
        v-model="show"
        title="选择商品"
        width="800"
        ok-text="确认"
        cancel-text="取消"
        :mask-closable="false"
        @on-ok="ok"
    >
        <div class="search"></div>
        <Table
            height="400"
            class="table"
            :columns="columns"
            :data="products"
            @on-selection-change="chooseGds"
        >
            <template slot="footer">
                <div class="pages">
                    <Page :total="total" size="small" show-total></Page>
                </div>
            </template>
        </Table>
    </Modal>
</template>

<script>
    export default {
        props: {
            products: {
                type: Array,
                require: true
            },
            total: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                show: false,
                selectedGds: [],
                columns: [
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: 'SKU编码',
                        key: 'productSku',
                        width: 108
                    },
                    {
                        title: '商品条形码',
                        key: 'productBarcode',
                        minWidth: 150
                    },
                    {
                        title: '商品名称',
                        key: 'gdsName',
                        minWidth: 150,
                        ellipsis: true
                    },
                    {
                        title: '商品类型',
                        key: 'gdsType',
                        width: 70
                    },
                    {
                        title: '规格',
                        key: 'format',
                        width: 70
                    },
                    {
                        title: '品牌',
                        key: 'productBrandName',
                        width: 70
                    },
                    {
                        title: '单位',
                        key: 'unit',
                        width: 70
                    }
                ]
            };
        },
        methods: {
            modalShow() {
                this.show = true;
            },
            ok() {
                this.$emit('selectedGds', this.selectedGds);
            },
            chooseGds(selection) {
                // console.log(selection);
                this.selectedGds = selection;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .table
        .ivu-table-cell
            padding: 0
            padding-left: 10px
            .ivu-btn-text
                color: #2196f3
        .ivu-table-fixed-right
            thead
                .ivu-table-cell
                    padding-left: 20px
    .pages
        display flex
        justify-content center
        align-items center
</style>
