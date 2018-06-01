<template>
    <div class="goods">
        <commontitle titleName="商品资料/商品"></commontitle>
        <Row>
            <Col class="inputs" :md="{span: '18'}">
                <Row :gutter="16">
                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput v-model="searchInfo.gdsName" inputTitle="商品名称"></commoninput>
                    </Col>

                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput v-model="searchInfo.productSku" inputTitle="SKU编码"></commoninput>
                    </Col>

                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput v-model="searchInfo.productBarcode" inputTitle="商品条形码"></commoninput>
                    </Col>
                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <selector v-model="searchInfo.gdsType" :list="goodsTypeList" listName="商品类型"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :md="{span: '6'}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row :gutter="32" class="action-row" type="flex" justify="end" align="middle">
            <Col>
                <div @click="_import" class="action-col">
                    <Icon class="icon" size="20" type="ios-download-outline"></Icon>
                    <span>导入</span>
                </div>
            </Col>
            <Col>
                <div @click="_export" class="action-col">
                    <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                    <span>导出</span>
                </div>
            </Col>
            <Col>
                <div @click="_add" class="action-col">
                    <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                    <span>新增</span>
                </div>
            </Col>
        </Row>
        <Table class="table" :columns="goodsList" :data="gdsData">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" :total="total" show-total @on-change="getPage"></Page>
                </div>
            </template>
        </Table>
        <!-- 对话框 -->
        <!-- <div v-if="modalShow"> -->
        <!--<Modal
            v-model="modalShow"
            title="新增商品信息"
            width="720"
            @on-ok="ok"
            @on-cancel="cancel"
            class-name="vertical-center-modal"
        >
            <div class="container">
                <form ref="form">
                    <div class="base-info">基本信息</div>
                    <div>
                        <commoninput v-model="formData.gdsName" inputTitle="商品名称" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.productSku" class="item" inputTitle="SKU编码"></commoninput>
                        <commoninput v-model="formData.productBarcode" class="item" inputTitle="商品条形码" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.productBrandName" class="item" inputTitle="商品品牌"></commoninput>
                        <commoninput v-model="formData.model" class="item" inputTitle="商品型号"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.format" class="item" inputTitle="商品规格"></commoninput>
                        <selector class="item" listName="商品类型" :list="goodsTypeList"></selector>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.inventoryWarnLow" inputType="number" inputTitle="库存下限*(件)" class="item" :isRequired="true"></commoninput>
                        <commoninput v-model="formData.inventoryWarnHigh" inputType="number" inputTitle="库存上限*(件)" class="item"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.weight" class="item" inputType="number" inputTitle="毛重(g)*"></commoninput>
                        <Row class="item" :gutter="16">
                            <Col span="15">
                                <commoninput v-model="formData.shelfLife" inputType="number" inputTitle="保质期"></commoninput>
                            </Col>
                            <Col span="9">
                                <selector v-model="formData.shelfType" listName="保质期单位" :list="expDateUnit"></selector>
                            </Col>
                        </Row>
                    </div>
                    <div class="container-row">
                        <selector class="item" listName="计价类型" :list="valuationType"></selector>
                        <selector class="item" listName="计量单位" :list="unit"></selector>
                    </div>
                    <div class="base-info">价格信息</div>
                    <div class="container-row">
                        <commoninput v-model="formData.costPrice" inputType="number" inputTitle="采购价" class="item"></commoninput>
                        <commoninput v-model="formData.marketPrice" inputType="number" inputTitle="零售价" class="item" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <selector class="item" listWidth="50%" listName="税率" :list="taxRate" :selected="taxRate[0].value"></selector>
                    </div>
                    <div class="container-row">
                        <commoninput v-model="formData.gdsDesc" inputTitle="备注" class="item"></commoninput>
                    </div>
                    <div class="base-info">商品图片</div>
                    <Row type="flex" style="margin-top: 20px;">
                        <Col span="6">
                            <div class="wrapper">
                                <div class="content">
                                    <input ref="file" id="file" type="file" class="upload" @change="getImageUrl">
                                    <label for="file">
                                        <Icon size="100" type="image" v-show="!uploaded"></Icon>
                                        <img ref="image" v-show="uploaded" :src="imagePath"/>
                                    </label>
                                    <div class="mask-layer" v-show="uploaded" @click="rmImage">
                                        <Icon v-show="uploaded" color="#fff" size="50" type="ios-trash-outline"></Icon>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </form>
            </div>
        </Modal> -->
        <!-- </div> -->
        <gdsinfo ref="addNewGds" :formData="formData" modalTitle="新增商品信息"></gdsinfo>
        <gdsinfo ref="modification" :formData="formData" modalTitle="修改商品信息"></gdsinfo>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import search from '../common/search';
    import selector from '../common/selector';
    import gdsinfo from '../common/gdsinfo';
    export default {
        beforeMount() {
            this.getGds();
        },
        data() {
            return {
                goodsName: '',
                SKU: '',
                barcode: '',
                goodsType: '',
                total: 100,
                // 搜索栏中的数据
                searchInfo: {
                    gdsName: null,
                    productSku: null,
                    productBarcode: null,
                    gdsType: 'all'
                },
                // 模态框里form的数据
                formData: {
                    gdsName: null,
                    productSku: null,
                    productBarcode: null,
                    productBrandName: null,
                    model: null,
                    format: null,
                    gdsType: null,
                    inventoryWarnLow: null,
                    inventoryWarnHigh: null,
                    weight: null,
                    shelfLife: null,
                    shelfType: null,
                    priceType: null,
                    unit: null,
                    costPrice: null,
                    marketPrice: null,
                    rate: null,
                    gdsDesc: null,
                    gdsImagePath: null
                },
                goodsTypeList: [
                    {label: '全部', value: 'all'},
                    {label: '玩具', value: '玩具'},
                    {label: '零食', value: '零食'},
                    {label: '饮料', value: '饮料'},
                    {label: '便当', value: '便当'},
                    {label: '水果', value: '水果'},
                    {label: '家居', value: '家居'},
                    {label: '粮油调味', value: '粮油调味'},
                    {label: '其他', value: '其他'}
                ],
                goodsList: [
                  {
                      title: 'SKU编码',
                      key: 'productSku',
                      width: 108,
                      fixed: 'left',
                      render: function(h, params) {
                          let icon = h('Icon', {
                              props: {
                                  type: 'image',
                                  size: 14
                              }
                          });
                          let image = h('img', {
                              style: {
                                  height: '20px',
                                  verticalAlign: 'baseline'
                              },
                              domProps: {
                                  src: this.row.gdsImagePath
                              }
                          });
                          let pic = !this.row.gdsImagePath ? icon : image;
                          return h('div', [
                              pic,
                              h('span', {
                                  style: {
                                      paddingLeft: '10px'
                                  }
                              }, this.row.productSku)
                          ]);
                      }
                  },
                  {title: '商品条形码', key: 'productBarcode', minWidth: 150},
                  {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
                  {title: '商品类型', key: 'gdsType', width: 70},
                  {title: '品牌', key: 'productBrandName', width: 55},
                  {title: '毛重', key: 'weight', width: 55},
                  {title: '单位', key: 'unit', width: 55},
                  {title: '采购价', key: 'costPrice', width: 55},
                  {title: '零售价', key: 'marketPrice', width: 60},
                  {title: '创建时间', key: 'createTime', minWidth: 150},
                  {
                      title: '保质期',
                      width: 55,
                      render: function(h, params) {
                          let result = `${this.row.shelfLife}/${this.row.shelfType}`;
                          return h('span', result);
                      }
                  },
                  {
                      title: '当前状态',
                      key: 'goodsState',
                      width: 70,
                      render: function(h, params) {
                          // 上架为1，下架为2
                          let result = this.row.currentStatus === 1 ? '上架' : '下架';
                          return h('span', result);
                      }
                  },
                  {
                      title: '操作',
                      width: 150,
                      fixed: 'right',
                      render: (h, params) => {
                          let result = params.row.currentStatus === 1 ? '上架' : '下架';
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {
                                          for (let item in this.formData) {
                                              this.formData[item] = params.row[item];
                                          }
                                          this.$refs.modification.show = true;
                                      }
                                  }
                              }, '修改'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {}
                                  }
                              }, '删除'),
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {}
                                  }
                              }, result)
                          ]);
                      }
                  }
                ],
                // 初始化表格里的数据
                gdsData: [],
                valuationType: [
                  {label: '重量计价', value: 'weight'},
                  {label: '数量计价', value: 'number'}
                ],
                unit: [
                  {label: '件', value: 'jian'},
                  {label: '个', value: 'ge'},
                  {label: '包', value: 'bao'},
                  {label: '瓶', value: 'ping'},
                  {label: '箱', value: 'xiang'},
                  {label: '克', value: 'ke'}
                ],
                taxRate: [
                  {label: '无', value: '0'},
                  {label: '0.1', value: '0.1'},
                  {label: '0.13', value: '0.13'},
                  {label: '0.17', value: '0.17'}
                ],
                expDateUnit: [
                  {label: '年', value: 'year'},
                  {label: '月', value: 'month'},
                  {label: '日', value: 'day'}
                ]
            };
        },
        methods: {
            getGds() {
                this.$axios.get('/api/gds').then(res => {
                    console.log(res.data.data.dataList);
                    if (res.data.errno === 0) {
                        this.gdsData = res.data.data.dataList;
                    }
                });
            },
            _import() {},
            _export() {},
            _add() {
              this.$refs.addNewGds.show = true;
            },
            getPage(page) {
            //   console.log(page);
            },
            clear() {
                this.searchInfo = {
                    gdsName: null,
                    productSku: null,
                    productBarcode: null,
                    gdsType: 'all'
                };
            },
            search() {}
        },
        components: {
            commontitle,
            commoninput,
            selector,
            search,
            gdsinfo
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods
        .table
            .ivu-table-cell
                padding: 0
                padding-left: 10px
                .ivu-btn-text
                    color: #2196f3
            .ivu-table-fixed-right
                thead
                    .ivu-table-cell
                        height: 40px
                        line-height: 40px
                        padding-left: 20px
</style>
