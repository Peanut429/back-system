<template>
    <div class="inventory">
        <commontitle titleName="库存管理/库存"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :md="{span: 5}">
                <selector listName="所在门店" :list="storeList" v-model="searchInfo.storeName"></selector>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput v-model="searchInfo.productSku" inputTitle="SKU编码"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput v-model="searchInfo.productBarcode" inputTitle="商品条形码"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 5}">
                <commoninput v-model="searchInfo.gdsName" inputTitle="商品名称"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :md="{span: 4}">
                <selector v-model="searchInfo.gdsType" listName="商品类型" :list="goodsTypeList"></selector>
            </Col>
        </Row>
        <Row type="flex" justify="end">
            <search @clear="clear" @search="search"></search>
        </Row>
        <Row type="flex" justify="end" align="middle" class="action-row">
            <div @click="_export" class="action-col">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出</span>
            </div>
        </Row>
        <Table :columns="columns" class="table" :data="data">
            <template slot="footer">
                <div class="footer">
                    <p class="footer-amount">库存合计总数：44</p>
                    <div class="pages">
                        <Page size="small" show-total :total="total"></Page>
                    </div>
                </div>
            </template>
        </Table>
        <!-- modals -->
        <!--数量设置-->
        <Modal
            v-model="modals.numSet"
            title="数量设置"
            width="500"
            :mask-closable="false"
        >
            <Row>
                <commoninput :inputValue="currentInfo.storeName" inputTitle="门店名称" :disabled="true"></commoninput>
            </Row>
            <Row>
                <commoninput :inputValue="currentInfo.gdsName" inputTitle="商品名称" :disabled="true"></commoninput>
            </Row>
            <Row>
                <Col span="12">
                    <commoninput v-model="setGdsNum.number" inputTitle="数量调整" width="50%" :isRequired="true" format="int"></commoninput>
                </Col>
            </Row>
            <Row>
                <Input type="textarea" v-model="setGdsNum.message"></Input>
            </Row>
            <template slot="footer">
                <div class="modal-footer">
                    <Button @click="close('numSet')">取消</Button>
                    <Button type="primary" :disabled="numSetBtn" @click="numSetOk('numSet')">保存</Button>
                </div>
            </template>
        </Modal>
        <!--预警设置-->
        <Modal
            v-model="modals.warnSet"
            title="预警设置"
            width="500"
            :mask-closable="false"
        >
            <Row>
                <commoninput :inputValue="currentInfo.storeName" :disabled="true" inputTitle="门店名称"></commoninput>
            </Row>
            <Row>
                <commoninput :inputValue="currentInfo.gdsName" :disabled="true" inputTitle="商品名称"></commoninput>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                     <commoninput v-model="setWarnInfo.warnLow" inputTitle="库存下限*（件）" format="int" :isRequired="true"></commoninput>
                </Col>
                <Col span="12">
                    <commoninput v-model="setWarnInfo.warnHigh" inputTitle="库存上限（件）" format="int"></commoninput>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <commoninput v-model="setWarnInfo.leftTime" inputTitle="临保日期*（天）" format="int" :isRequired="true"></commoninput>
                </Col>
            </Row>
            <template slot="footer">
                <div class="modal-footer">
                    <Button @click="close('warnSet')">取消</Button>
                    <Button type="primary" :disabled="warnSetBtn" @click="warnSetOk('warnSet')">保存</Button>
                </div>
            </template>
        </Modal>
        <!-- 校正详情 -->
        <Modal
            v-model="modals.checkDetail"
            title="校正详情"
            width="700"
            :mask-closable="false"
        >
            <Table class="table" :columns="detailColumns" :data="checkDetailInfo">
                <template slot="footer">
                    <div class="pages">
                        <Page :total="detailTotal" size="small" show-total></Page>
                    </div>
                </template>
            </Table>
            <template slot="footer">
                <div class="modal-footer">
                    <Button type="primary" @click="close('checkDetail')">关闭</Button>
                </div>
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
              // 模态框
              modals: {
                  numSet: false,
                  warnSet: false,
                  checkDetail: false
              },
              // 搜索信息
              searchInfo: {
                  storeName: 'all',
                  productSku: null,
                  productBarcode: null,
                  gdsType: 'all',
                  gdsName: null
              },
              // 当前表格选中项的信息
              currentInfo: {},
              index: null,
              // 数量调整信息
              setGdsNum: {
                  number: null,
                  message: ''
              },
              // 预警设置信息
              setWarnInfo: {
                  warnLow: '',
                  warnHigh: '',
                  leftTime: ''
              },
              storeList: [
                  {label: '全部', value: 'all'}
              ],
              goodsTypeList: [
                  {label: '全部', value: 'all'},
                  {label: '玩具', value: '玩具'},
                  {label: '零食', value: '零食'},
                  {label: '饮料', value: '饮料'},
                  {label: '便当', value: '便当'}
              ],
              columns: [
                  {title: '所在门店', key: 'storeName', fixed: 'left', width: 150, ellipsis: true},
                  {title: 'SKU编码', key: 'productSku', width: 108},
                  {title: '商品条形码', key: 'productBarcode', minWidth: 150},
                  {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
                  {title: '商品类型', key: 'gdsType', width: 70},
                  {title: '品牌', key: 'productBrandName', width: 50, align: 'center'},
                  {title: '规格', key: 'format', width: 70},
                  {title: '单位', key: 'unit', width: 50, align: 'center'},
                  {title: '库存数', key: 'gdsNum', width: 70, align: 'center'},
                  {
                      title: '保质期',
                      width: 55,
                      render: (h, params) => {
                          let result = `${params.row.shelfLife}/${params.row.shelfType}`;
                          return h('span', result);
                      }
                  },
                  {
                      title: '操作',
                      width: 80,
                      fixed: 'right',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  style: {
                                      padding: '3px 0'
                                  },
                                  on: {
                                      click: () => {
                                          this.currentInfo = params.row;
                                          this.index = params.index;
                                          this.setGdsNum.number = params.row.gdsNum;
                                          this.modals.numSet = true;
                                      }
                                  }
                              }, '数量调整'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  style: {
                                      padding: '3px 0'
                                  },
                                  on: {
                                      click: () => {
                                          this.currentInfo = params.row;
                                          this.index = params.index;
                                          this.setWarnInfo.warnLow = params.row.inventoryWarnLow;
                                          this.modals.warnSet = true;
                                      }
                                  }
                              }, '预警设置'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  style: {
                                      padding: '3px 0'
                                  },
                                  on: {
                                      click: () => {
                                          this.$axios.get('/api/checkDetail').then(res => {
                                              // console.log(res);
                                              if (res.data.errno === 0) {
                                                  this.checkDetailInfo = res.data.data.dataList;
                                                  this.detailTotal = res.data.data.total;
                                                  this.modals.checkDetail = true;
                                              }
                                          });
                                      }
                                  }
                              }, '校正详情')
                          ]);
                      }
                  }
              ],
              data: [],
              total: 0,
              // 校正详情信息
              checkDetailInfo: [],
              detailColumns: [
                  {title: '商品名称', key: 'gdsname', minWidth: 150, ellipsis: true, fixed: 'left'},
                  {title: '商品条形码', key: 'barcode', minWidth: 150},
                  {title: '操作时间', key: 'createTime', minWidth: 170},
                  {title: '操作数量', key: 'updatenum', width: 100},
                  {title: '备注', key: 'note', minWidth: 200, ellipsis: true}
              ],
              detailTotal: 0
          };
        },
        beforeMount() {
            this.getStoreList();
            this.getGdsStore();
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
            // 获取库存信息
            getGdsStore() {
                this.$axios.get('/api/gdsStore').then(res => {
                    // console.log(res);
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            numSetOk(item) {
                this.data[this.index].gdsNum = Number(this.setGdsNum.number);
                this.modals[item] = false;
            },
            warnSetOk(item) {
                this.data[this.index].inventoryWarnLow = Number(this.setWarnInfo.warnLow);
                this.data[this.index].inventoryWarnHigh = Number(this.setWarnInfo.warnHigh);
                this.modals[item] = false;
            },
            close(item) {
                this.modals[item] = false;
            },
            _export() {},
            clear() {
                this.searchInfo = {
                    storeName: 'all',
                    productSku: null,
                    productBarcode: null,
                    gdsType: 'all',
                    gdsName: null
                };
            },
            search() {}
        },
        computed: {
            numSetBtn() {
                if (this.index != null) {
                    if (this.setGdsNum.number === '') {
                        return true;
                    }
                    let current = Number(this.setGdsNum.number);
                    if (current !== this.data[this.index].gdsNum && this.setGdsNum.message !== '') {
                        return false;
                    }
                }
                return true;
            },
            warnSetBtn() {
                let leftTime = Number(this.setWarnInfo.leftTime);
                let warnLow = Number(this.setWarnInfo.warnLow);
                if (leftTime > 0 && warnLow > 0) {
                    return false;
                }
                return true;
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
    .inventory
        .buttons
            display: flex
            justify-content: flex-end
            align-items: flex-end
            height: 59px
            .clear-btn, .search-btn
                margin-left: 10px
                box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
        .table
            .ivu-table-cell
                padding: 0
                padding-left: 10px
                .ivu-btn-text
                    color: #2196f3
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
