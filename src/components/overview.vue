<template>
    <div class="overview">
        <commontitle titleName="首页/概览"></commontitle>
        <Row class="selector">
            <selector ref="selector" listWidth="50%" :list="storeList" listName="门店" v-model="storkName"></selector>
        </Row>
        <Row class="card-row" :gutter="16">
            <Col v-for="(item, index) in cardList" :key="index" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <card :cardIcon="item.icon" :cardNumber="storeStatistics[item.key]" :cardDesc="item.desc" :cardColor="item.color"></card>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col :xs="{span: 24}" :md="{span: 12}">
                <div class="table">
                    <Table :columns="inventoryCols" :data="inventoryData">
                        <template slot="header" class="table-title">
                            <div class="table-title">库存动态</div>
                        </template>
                    </Table>
                </div>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 12}">
                <div class="table">
                    <Table :columns="saleCols" :data="orderData">
                        <template slot="header">
                            <div class="table-title">销售动态</div>
                        </template>
                    </Table>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import commontitle from '../common/commontitle';
import selector from '../common/selector';
import card from '../common/card';
export default {
    data() {
      return {
          storkName: 'all',
          storeList: [
              {label: '全部', value: 'all'}
          ],
          cardList: [
              {icon: 'person-stalker', desc: '本月客流量', color: '#54ade8', key: 'customer'},
              {icon: 'document-text', desc: '本月订单', color: '#4dccb3', key: 'order'},
              {icon: 'stats-bars', desc: '本月销售量', color: '#6384a6', key: 'sale'},
              {icon: 'cash', desc: '本月销售额 (取整)', color: '#fe6c60', key: 'amount'}
          ],
          inventoryCols: [
              {title: 'SKU编码', key: 'productSku'},
              {title: '商品名称', key: 'gdsName', ellipsis: true},
              {title: '商品类型', key: 'gdsType'},
              {title: '库存数量', key: 'gdsNum'}
          ],
          inventoryData: [],
          saleCols: [
              {title: '订单编号', key: 'orderCode', ellipsis: true},
              {title: '付款方式', key: 'paymentType', width: 100},
              {title: '销售时间', key: 'saleDate'},
              {title: '付款状态', key: 'paymentStatus', width: 100}
          ],
          orderData: [],
          // 模拟后台的统计数据
          storeStatistics: {
              'customer': 687,
              'order': 584,
              'sale': 828,
              'amount': 4189
          },
          storeDetail: {}
      };
    },
    beforeMount() {
        this.getStoreList();
        this.getGdsStore();
        this.getOrderList();
    },
    methods: {
        // 获取门店列表
        getStoreList() {
            this.$store.dispatch('getStoreList').then(res => {
                this.storeDetail = res.data;
                // console.log(this.storeDetail);
                this.storeDetail.forEach(item => {
                    this.storeList.push({label: item.storkName, value: item.storkName});
                });
            });
        },
        // 获取库存
        getGdsStore() {
            this.$store.dispatch('getGdsStore').then(res => {
                // console.log(res);
                this.inventoryData = res.dataList;
            });
        },
        // 获取订单
        getOrderList() {
            this.$store.dispatch('getOrderList').then(res => {
                console.log(res);
                this.orderData = res.dataList;
            });
        }
    },
    components: {
      commontitle,
      selector,
      card
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .overview
        width: 100%
        .selector
            margin-bottom: 20px
        .card-row
            // margin-top: 25px
        .table
            margin-top: 15px
</style>
