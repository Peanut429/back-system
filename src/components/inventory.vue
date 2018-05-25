<template>
    <div class="inventory">
        <commontitle titleName="库存管理/库存"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :md="{span: 5}">
                <selector listName="所在门店" :list="storeList" :selected="storeList[0].value"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput inputTitle="SKU编码"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput inputTitle="商品条形码"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput inputTitle="商品名称"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 4}">
                <selector listName="商品类型" :list="goodsTypeList" :selected="goodsTypeList[0].value"></selector>
            </Col>
        </Row>
        <Row type="flex" justify="end">
            <Col class="buttons">
                <Button size="large" class="clear-btn" type="ghost">清空条件</Button>
                <Button size="large" class="search-btn" type="primary">搜索</Button>
            </Col>
        </Row>
        <Row type="flex" justify="end" align="middle" class="action-row">
            <div @click="_export" class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出</span>
            </div>
        </Row>
        <Table :columns="columns" class="table">
            <template slot="footer">
                <div class="footer">
                    <p class="footer-amount">库存合计总数：44</p>
                    <div class="pages">
                        <Page size="small" show-total :total="1"></Page>
                    </div>
                </div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    export default {
        data() {
          return {
              storeList: [
                  {label: '全部', value: 'all'},
                  {label: '国际科技园01L', value: 'gk01'},
                  {label: '国际科技园02L', value: 'gk02'},
                  {label: '国际科技园03L', value: 'gk03'}
              ],
              goodsTypeList: [
                  {label: '全部', value: 'all'},
                  {label: '玩具', value: 'toy'},
                  {label: '零食', value: 'snack'},
                  {label: '饮料', value: 'drink'},
                  {label: '便当', value: 'lunchBox'}
              ],
              columns: [
                  {title: '所在门店', key: 'storelist'},
                  {title: 'SKU编码', key: 'SKU'},
                  {title: '商品条形码', key: 'barcode'},
                  {title: '商品名称', key: 'goodsName'},
                  {title: '商品类型', key: 'goodsType'},
                  {title: '品牌', key: 'brand'},
                  {title: '规格', key: 'specification'},
                  {title: '单位', key: 'measurementUnit'},
                  {title: '库存数', key: 'amount'},
                  {title: '保质期', key: 'expirationDate'},
                  {title: '操作', key: 'actions'}
              ]
          };
        },
        methods: {
            _export() {}
        },
        components: {
            commontitle,
            commoninput,
            selector
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .inventory
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
                color: #7b7b7b
                &:hover
                    color: #ff9c10
                .icon
                    margin-right: 10px
                    color: currentColor*/

        .ivu-table-footer
            height: auto
            line-height normal
            .footer-amount
                height: 40px
                line-height: 40px
                padding-right: 20px
                font-size: 14px
                background-color: #f7fcff
                text-align: right
            .pages
                height: 40px
</style>
