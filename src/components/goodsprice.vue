<template>
    <div class="goods-price">
        <commontitle titleName="价格管理/商品价格"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 24}" :md="16">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <selector v-model="searchInfo.storkName" :list="storeList" listName="所在门店"></selector>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput v-model="searchInfo.productSku" inputTitle="SKU编码"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput v-model="searchInfo.gdsName" inputTitle="商品名称"></commoninput>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 8}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Table class="table" :columns="goodsInfo" :data="gdsData" style="margin-top: 40px">
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
import search from '../common/search';
import selector from '../common/selector';
export default {
    data() {
      return {
          total: 100,
          dom: 'span',
          rowIndex: () => this.$refs.newPrice.value,
          newPrice: 0,
          searchInfo: {
              storkName: 'all',
              productSku: null,
              gdsName: null
          },
          storeList: [
              {label: '全部', value: 'all'}
          ],
          goodsInfo: [
              {title: '所在门店', key: 'storeName', width: 150, fixed: 'left', ellipsis: true},
              {title: 'SKU编码', key: 'productSku', width: 108},
              {title: '商品条形码', key: 'productBarcode', minWidth: 150},
              {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
              {title: '商品类型', key: 'gdsType', Width: 70},
              {title: '单位', key: 'unit', Width: 70},
              {
                  title: '零售价',
                  Width: 70,
                  render: (h, params) => {
                      if (this.rowIndex !== params.index) {
                          return h('span', params.row.marketPrice);
                      } else {
                          return h('input', {
                              domProps: {
                                  value: params.row.marketPrice
                              },
                              style: {
                                  width: '80%'
                              },
                              on: {
                                  input: ($event) => {
                                      this.newPrice = $event.target.value;
                                  }
                              }
                          });
                      }
                  }
              },
              {
                  title: '操作',
                  width: 80,
                  fixed: 'right',
                  render: (h, params) => {
                      let text = '';
                      if (this.rowIndex !== params.index) {
                          text = '编辑';
                      } else {
                          text = '完成';
                      }
                      return h('Button', {
                          props: {
                              type: 'text',
                              size: 'small'
                          },
                          style: {
                              userSelect: 'none'
                          },
                          on: {
                              click: () => {
                                  if (this.rowIndex !== params.index) {
                                      this.rowIndex = params.index;
                                  } else {
                                      this.rowIndex = null;
                                      if (!this.newPrice) {
                                          return false;
                                      }
                                      params.row.marketPrice = this.newPrice;
                                      this.newPrice = null;
                                      this.$Message.config({
                                          top: 200
                                      });
                                      this.$Message.success({
                                          content: '修改成功！'
                                      });
                                      setTimeout(() => {
                                          this.$Message.destroy();
                                      }, 2000);
                                  }
                              }
                          }
                      }, text);
                  }
              }
          ],
          gdsData: []
      };
    },
    beforeMount() {
        this.getStoreList();
        this.getGdsPrice();
    },
    methods: {
        // 获取门店列表信息
        getStoreList() {
            this.$store.dispatch('getStoreList').then(res => {
                this.storeDetail = res.data;
                this.storeDetail.forEach(item => {
                    this.storeList.push({label: item.storkName, value: item.storkName});
                });
            });
        },
        // 获取商品价格数据
        getGdsPrice() {
            this.$axios.get('/api/gdsPrice').then(res => {
                if (res.data.errno === 0) {
                    this.gdsData = res.data.data.dataList;
                    this.total = res.data.data.totalGdsNum;
                }
            });
        },
        getPage() {},
        clear() {
            this.searchInfo = {
                storkName: 'all',
                productSku: null,
                gdsName: null
            };
        },
        search() {}
    },
    components: {
        commontitle,
        commoninput,
        selector,
        search
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods-price
        /*.table
            box-shadow: 1px 1px 2px rgba(0, 0, 0, .1)
            font-size: 14px
            .table-title
                padding-left: 18px
            .pages
                display: flex
                justify-content: center
                align-items: center*/
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
</style>
