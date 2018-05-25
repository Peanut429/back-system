<template>
    <div class="goods-price">
        <commontitle titleName="价格管理/商品价格"></commontitle>
        <Row :gutter="48">
            <Col :xs="{span: 24}" :md="16">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <selector :list="storeList" listName="所在门店" :selected="storeList[0].value" @selectValue="getSelect"></selector>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput inputTitle="SKU编码"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput inputTitle="商品名称"></commoninput>
                    </Col>
                </Row>
            </Col>
            <Col span="6" class="buttons">
                <Button size="large" class="clear-btn" type="ghost">清空条件</Button>
                <Button size="large" class="search-btn" type="primary">搜索</Button>
            </Col>
        </Row>
        <Table class="table" :columns="goodsInfo" style="margin-top: 40px">
            <template slot="header">
                <div class="table-title">销售动态</div>
            </template>
            <template slot="footer">
                <div class="pages">
                    <Page size="small" :total="total" show-total @on-change="getPage"></Page>
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
          total: 100,
          storeList: [
              {label: '全部', value: 'all'},
              {label: '国际科技园01L', value: 'gk01'},
              {label: '国际科技园02L', value: 'gk02'},
              {label: '国际科技园03L', value: 'gk03'}
          ],
          goodsInfo: [
              {title: '所在门店', key: 'storeName'},
              {title: 'SKU编码', key: 'SKU'},
              {title: '商品条形码', key: 'barcode'},
              {title: '商品名称', key: 'goodsName'},
              {title: '商品类型', key: 'goodsType'},
              {title: '单位', key: 'measurementUnit'},
              {title: '零售价', key: 'sellingPrice'},
              {title: '操作', key: 'action'}
          ]
      };
  },
  methods: {
      getSelect() {},
      getPage() {}
  },
  components: {
      commontitle,
      commoninput,
      selector
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods-price
        .buttons
            display: flex
            // justify-content: flex-end
            align-items: flex-end
            height: 59px
            .clear-btn, .search-btn
                margin-left: 10px
                box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
        /*.table
            box-shadow: 1px 1px 2px rgba(0, 0, 0, .1)
            font-size: 14px
            .table-title
                padding-left: 18px
            .pages
                display: flex
                justify-content: center
                align-items: center*/
</style>
