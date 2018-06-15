<template>
    <div class="user-list">
        <commontitle titleName="客户管理/客户列表"></commontitle>
        <Row>
            <Col :xs="{span: 24}" :md="{span: 18}">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput v-model="searchInfo.customerCode" inputTitle="客户编号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput v-model="searchInfo.phone" inputTitle="手机号码" inputType="number"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <selector v-model="searchInfo.storeName" listName="注册门店" :list="storeList"></selector>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <selector v-model="searchInfo.customerStatusID" listName="客户状态" :list="signState"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 6}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col" @click="_export">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出客户注册数据</span>
            </div>
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page :total="total" size="small" show-total></Page>
                </div>
            </template>
        </Table>
        <Modal
            v-model="detailModal"
            title="客户详情"
            width="800"
            :mask-closable="false"
        >
            <Table class="table" :columns="detailColumns" :data="detailData">
                <template slot="footer">
                    <div class="pages">
                        <Page size="small" show-total :total="detailTotal"></Page>
                    </div>
                </template>
            </Table>
            <template slot="footer">
                <Button type="primary" @click="close('detailModal')">关闭</Button>
            </template>
        </Modal>
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
                detailModal: false,
                searchInfo: {
                    customerCode: '',
                    phone: '',
                    storeName: 'all',
                    customerStatusID: ''
                },
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                signState: [
                    {label: '全部', value: 'all'},
                    {label: '正常使用', value: '0'},
                    {label: '取消签约', value: '1'}
                ],
                columns: [
                    {title: '客户编号', key: 'customerCode', width: 80, fixed: 'left'},
                    {title: '手机号码', key: 'phone', minWidth: 100},
                    {title: '注册门店', key: 'storeName', minWidth: 150, ellipsis: true},
                    {title: '客户状态', key: 'customerStatusName', minWidth: 80},
                    {title: '注册时间', key: 'registerTime', minWidth: 150},
                    {
                      title: '操作',
                      width: 230,
                      fixed: 'right',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {
                                          this.detailModal = true;
                                          this.$axios.get('/api/customerListDetail').then(res => {
                                              if (res.data.errno === 0) {
                                                  this.detailTotal = res.data.data.total;
                                                  this.detailData = res.data.data.dataList;
                                              }
                                          });
                                      }
                                  }
                              }, '详情'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {}
                                  }
                              }, '行为举报'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {}
                                  }
                              }, '加入黑名单')
                          ]);
                      }
                    }
                ],
                data: [],
                total: 0,
                detailColumns: [
                    {title: '使用门店', key: 'storeName', fixed: 'left', minWidth: 100},
                    {title: '订单金额', key: 'orderAmount', minWidth: 80},
                    {title: '商品名称', key: 'productName', minWidth: 150},
                    {title: '结算时间', key: 'paymentDate', minWidth: 150},
                    {title: '状态', key: 'paymentStatus', width: 80, fixed: 'right'}
                ],
                detailData: [],
                detailTotal: 0
          };
        },
        beforeMount() {
            this.getStoreList();
            this.getCustomerList();
        },
        methods: {
            // 获取门店列表
            getStoreList() {
                this.$store.dispatch('getStoreList').then(res => {
                    this.storeDetail = res.data;
                    this.storeDetail.forEach(item => {
                        this.storeList.push({label: item.storkName, value: item.storkName});
                    });
                });
            },
            // 获取客户列表数据
            getCustomerList() {
                this.$axios.get('/api/customerList').then(res => {
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            _export() {},
            clear() {
                this.searchInfo = {
                    customerCode: '',
                    phone: '',
                    storeName: 'all',
                    customerStatusID: ''
                };
            },
            search() {},
            close(item) {
                this[item] = false;
            }
        },
        components: {
            commoninput,
            commontitle,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .user-list
        .action-col
            display: flex
            align-items: center
            padding: 30px 0
            cursor: pointer
            font-size: 15px
            user-select: none
            &+.action-col
                margin-left: 30px
            &:hover
                color: #ff9c10
            .icon
                margin-right: 10px
                color: currentColor
        .table
            .ivu-table-fixed-right
                .ivu-table-tbody
                    .ivu-table-cell
                        padding-left: 0
            .pages
                display flex
                justify-content center
                align-items center
</style>
