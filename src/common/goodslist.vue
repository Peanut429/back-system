<template>
    <Modal
        v-model="show"
        title="选择商品"
        width="800"
        ok-text="确认"
        cancel-text="取消"
        :mask-closable="false"
    >
        <div class="search"></div>
        <Table :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page :total="20"></Page>
                </div>
            </template>
        </Table>
    </Modal>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'SKU编码',
                        key: 'SKU'
                    },
                    {
                        title: '商品条形码',
                        key: 'barcode'
                    },
                    {
                        title: '商品名称',
                        key: 'goodsName'
                    },
                    {
                        title: '商品类型',
                        key: 'goodsType'
                    },
                    {
                        title: '规格',
                        key: 'specification'
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '单位',
                        key: 'measurementUnit'
                    }
                ]
            };
        },
        methods: {
            modalShow() {
                this.show = true;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .pages
        display flex
        justify-content center
        align-items center
</style>
