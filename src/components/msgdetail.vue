<template>
    <div class="msg-detail">
        <commontitle titleName="系统消息/详情"></commontitle>
        <div class="msg-item">
            <div class="msg-head">
                <span class="msg-title">库存预警</span>
                <span class="msg-time">{{data.createDate}}</span>
            </div>
            <div class="msg-body">
                <p class="msg-content">{{data.content}}</p>
                <div class="msg-address">
                    <Icon class="msg-icon" type="navigate"></Icon> 门店地址：
                    <span class="msg-store-name">{{data.stockAddress}}</span>
                </div>
            </div>
        </div>
        <Table class="table" :columns="columns" :data="gdsInfo">
            <template slot="header">
                <div class="table-title">库存警告商品</div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    export default {
        data() {
            return {
                data: {},
                gdsInfo: [],
                columns: [
                    {title: 'SKU编码', key: 'productSku'},
                    {title: '商品条形码', key: 'productBarcode'},
                    {title: '商品名称', key: 'gdsName'},
                    {title: '商品类型', key: 'gdsType'},
                    {title: '规格', key: 'format'},
                    {title: '品牌', key: 'productBrandName'},
                    {title: '价格', key: 'marketPrice'},
                    {title: '单位', key: 'unit'}
                ]
            };
        },
        beforeMount() {
            console.log(this.$route.params);
            this.getMsgDetail();
        },
        methods: {
            // 获取消息详情
            getMsgDetail() {
                this.$axios.get('/api/msgDetail').then(res => {
                    if (res.data.errno === 0) {
                        console.log(res.data.data);
                        this.data = res.data.data;
                        // let gdsId = this.data.gdsId;
                        this.$axios.get('/api/gdsId').then(res => {
                            if (res.data.errno === 0) {
                                console.log(res.data.data);
                                this.gdsInfo.push(res.data.data);
                            }
                        });
                    }
                });
            }
        },
        components: {
            commontitle
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .msg-detail
        .msg-item
            margin-bottom: 20px
            border: 1px solid #cfcfcf
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12)
            .msg-head
                display: flex
                justify-content: space-between
                padding: 15px 20px
                border-bottom: 1px solid #cfcfcf
                .msg-title
                    font-size: 15px
                    color: #d32f2f
                .msg-time
                    font-size: 14px
            .msg-body
                padding: 20px
                /*cursor: pointer*/
                /*&:hover
                    background-color: #ececec*/
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
</style>
