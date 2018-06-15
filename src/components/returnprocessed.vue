<template>
    <div class="return-processed">
        <commontitle titleName="退货处理/已处理"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :md="{span: 6}">
                <selector v-model="searchInfo.storeId" listName="退货门店" :list="storeList"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="searchInfo.id" inputTitle="退货编号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="searchInfo.orderId" inputTitle="原订单号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <commoninput v-model="searchInfo.productName" inputTitle="退货商品"></commoninput>
            </Col>
        </Row>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 12}" :md="{span: 6}">
                <DatePicker :value="searchInfo.createStartTime" type="date" @on-change="startTime" placeholder="申请时间"></DatePicker>
            </Col>
            <Col class="date-to" span="1">至</Col>
            <Col :xs="{span: 11}" :md="{span: 5}">
                <DatePicker :value="searchInfo.createEndTime" type="date" @on-change="endTime" placeholder=""></DatePicker>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <selector v-model="searchInfo.status" listName="状态" :list="status"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 6}">
                <DatePicker :value="searchInfo.updateTime" type="date" @on-change="processTime" placeholder="处理时间"></DatePicker>
            </Col>
        </Row>
        <Row>
            <search @clear="clear" @search="search"></search>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出</span>
            </div>
            <div class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出详情</span>
            </div>
        </Row>
        <Table
            class="table"
            :columns="columns"
            :data="data"
            @on-row-click="showDetail"
        >
            <template slot="footer">
                <div class="pages">
                    <Page show-total size="small" :total="total"></Page>
                </div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    import search from '../common/search';
    export default {
        data() {
          return {
              searchInfo: {
                  storeId: 'all',
                  id: '',
                  orderId: '',
                  productName: '',
                  createStartTime: '',
                  createEndTime: '',
                  status: '2',
                  updateTime: ''
              },
              storeList: [
                  {label: '全部', value: 'all'}
              ],
              status: [
                  {label: '所有已处理订单', value: '2'}
              ],
              columns: [
                  {title: '退货编号', key: 'id', width: 165, fixed: 'left'},
                  {title: '原订单号', key: 'orderId', minWidth: 165},
                  {title: '退货商品', key: 'productName', minWidth: 150, ellipsis: true},
                  {title: '退货门店', key: 'storeName', minWidth: 100, ellipsis: true},
                  {title: '退货理由', key: 'reason', minWidth: 150, ellipsis: true},
                  {title: '申请时间', key: 'createTime', minWidth: 150},
                  {title: '处理时间', key: 'updateTime', minWidth: 150},
                  {
                      title: '价格',
                      key: 'amount',
                      minWidth: 80,
                      align: 'center',
                      render: (h, params) => {
                          return h('span', params.row.amount.toFixed(2));
                      }
                  },
                  {
                      title: '状态',
                      width: 80,
                      ellipsis: true,
                      fixed: 'right',
                      render: (h, params) => {
                          return h('span', {
                              'class': {
                                  reject: params.row.status === '1002',
                                  pass: params.row.status === '1010',
                                  close: params.row.status === '1020',
                                  refund: params.row.status === '1009'
                              }
                          }, params.row.statusName);
                      }
                  }
              ],
              data: [],
              total: 0
          };
        },
        beforeMount() {
            this.getStoreList();
            this.getStatus();
            this.getRefundInfo();
        },
        methods: {
            // 获取门店列表
            getStoreList() {
                this.$store.dispatch('getStoreList').then(res => {
                    let storeDetail = res.data;
                    storeDetail.forEach(item => {
                        this.storeList.push({label: item.storkName, value: item.id});
                    });
                });
            },
            // 获取处理状态信息
            getStatus() {
                this.$axios.get('/api/status').then(res => {
                    if (res.data.errno === 0) {
                        let data = res.data.data;
                        data.forEach(item => {
                            this.status.push({label: item.value, value: item.key});
                        });
                    }
                });
            },
            // 获取已处理退货信息
            getRefundInfo() {
                this.$axios.get('/api/refund').then(res => {
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            startTime(date) {
                this.searchInfo.createStartTime = date;
            },
            endTime(date) {
                this.searchInfo.createEndTime = date;
            },
            processTime(date) {
                this.searchInfo.updateTime = date;
            },
            clear() {
                this.searchInfo = {
                    productName: '',
                    storeId: 'all',
                    status: '2',
                    id: '',
                    orderId: '',
                    createStartTime: '',
                    createEndTime: '',
                    updateTime: ''
                };
            },
            search() {},
            showDetail(data, index) {
                // console.log(data, index);
                this.$router.push('/home/processed-detail:' + data.id);
            }
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
    .return-processed
        .ivu-table
            .reject
                color: #d32f2f
            .pass
                color: #388e3c
            .close
                color: black
            .refund
                color: #f57c00
</style>
