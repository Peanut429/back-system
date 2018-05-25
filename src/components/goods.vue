<template>
    <div class="goods">
        <commontitle titleName="商品资料/商品"></commontitle>
        <Row>
            <Col class="inputs" :md="{span: '18'}">
                <Row :gutter="16">
                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput @getValue="getGoodsName" inputTitle="商品名称"></commoninput>
                    </Col>

                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput @getValue="getSKU" inputTitle="SKU编码"></commoninput>
                    </Col>

                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <commoninput @getValue="getBarcode" inputTitle="商品条形码"></commoninput>
                    </Col>
                    <Col :xs="{span: '12'}" :md="{span: '6'}">
                        <selector @selectValue="getSelect" :list="goodsTypeList" listName="商品类型"></selector>
                    </Col>
                </Row>
            </Col>
            <Col class="buttons" :md="{span: '6'}">
                <Button size="large" class="clear-btn" type="ghost">清空条件</Button>
                <Button size="large" class="search-btn" type="primary">搜索</Button>
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
        <Modal
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
                        <commoninput inputTitle="商品名称" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput class="item" inputTitle="SKU编码"></commoninput>
                        <commoninput class="item" inputTitle="商品条形码" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput class="item" inputTitle="商品品牌"></commoninput>
                        <commoninput class="item" inputTitle="商品型号"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput class="item" inputTitle="商品规格"></commoninput>
                        <selector class="item" listName="商品类型" :list="goodsTypeList"></selector>
                    </div>
                    <div class="container-row">
                        <commoninput inputType="number" inputTitle="库存下限*(件)" class="item" :isRequired="true"></commoninput>
                        <commoninput inputType="number" inputTitle="库存上限*(件)" class="item"></commoninput>
                    </div>
                    <div class="container-row">
                        <commoninput class="item" inputType="number" inputTitle="毛重(g)*"></commoninput>
                        <Row class="item" :gutter="16">
                            <Col span="15">
                                <commoninput inputType="number" inputTitle="保质期"></commoninput>
                            </Col>
                            <Col span="9">
                                <selector listName="保质期单位" :list="expDateUnit"></selector>
                            </Col>
                        </Row>
                    </div>
                    <div class="container-row">
                        <selector class="item" listName="计价类型" :list="valuationType"></selector>
                        <selector class="item" listName="计量单位" :list="unit"></selector>
                    </div>
                    <div class="base-info">价格信息</div>
                    <div class="container-row">
                        <commoninput inputType="number" inputTitle="采购价" class="item"></commoninput>
                        <commoninput inputType="number" inputTitle="零售价" class="item" :isRequired="true"></commoninput>
                    </div>
                    <div class="container-row">
                        <selector class="item" listWidth="50%" listName="税率" :list="taxRate" :selected="taxRate[0].value"></selector>
                    </div>
                    <div class="container-row">
                        <commoninput inputTitle="备注" class="item"></commoninput>
                    </div>
                    <div class="base-info">商品图片</div>
                    <Row type="flex" style="margin-top: 20px;">
                        <Col span="6">
                            <div class="wrapper">
                                <div class="content">
                                    <input ref="file" id="file" type="file" class="upload" @change="getImageUrl">
                                    <label for="file">
                                        <Icon size="100" type="image" v-show="!uploaded"></Icon>
                                        <img ref="image" v-show="uploaded"/>
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
        </Modal>
        <!-- </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
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
              modalShow: false,
              uploaded: false,
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
                  {title: '商品条形码', key: 'productBarcode', width: 150},
                  {title: '商品名称', key: 'gdsName', width: 150, ellipsis: true},
                  {title: '商品类型', key: 'gdsType', width: 70},
                  {title: '品牌', key: 'productBrandName', width: 55},
                  {title: '毛重', key: 'weight', width: 55},
                  {title: '单位', key: 'unit', width: 55},
                  {title: '采购价', key: 'costPrice', width: 55},
                  {title: '零售价', key: 'marketPrice', width: 60},
                  {title: '创建时间', key: 'createTime', width: 150},
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
                      render: function(h, params) {
                          let result = this.row.currentStatus === 1 ? '上架' : '下架';
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {}
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
              this.modalShow = true;
            },
            getGoodsName(value) {
              this.goodsName = value;
            },
            getSKU(value) {
              this.SKU = value;
            },
            getBarcode(value) {
              this.barcode = value;
            },
            getSelect(value) {
              this.goodsType = value;
            },
            getPage(page) {
            //   console.log(page);
            },
            ok() {
              this.modalShow = false;
            },
            cancel() {
              this.modalShow = false;
            },
            getImageUrl() {
              this.$refs.image.src = window.URL.createObjectURL(this.$refs.file.files[0]);
              this.uploaded = true;
            },
            rmImage() {
              this.uploaded = false;
              this.$refs.image.removeAttribute('src');
            }
        },
        components: {
          commontitle,
          commoninput,
          selector
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .goods
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
        .table
            .ivu-table-header
                th:last-child
                    padding-left: 10px
            .ivu-table-cell
                padding: 0
                padding-left: 10px
                .ivu-btn-text
                    color: #2196f3
    .vertical-center-modal
        display: flex
        justify-content: center
        align-items: center
        .ivu-modal
            top: 0
            .ivu-modal-body
                padding: 0
                .container
                    height: 60vh
                    padding: 16px
                    overflow-y: auto
                    .base-info
                        display: inline-block
                        background-color #e4f1fa
                        color: #92b3ce
                        padding: 3px 5px
                        &:not(:first-child)
                            margin-top: 20px
                    .container-row
                        display: flex
                        justify-content: space-between
                        margin: 0 -8px
                        .item
                            flex: 1
                            margin-left: 8px
                            margin-right: 8px
                    .wrapper
                        position: relative
                        width: 100%
                        padding-top: 100%
                        .content
                            position: absolute
                            top: 0
                            left: 0
                            bottom: 0
                            right: 0
                            .upload
                                display: none
                            label
                                display: flex
                                justify-content: center
                                align-items: center
                                width: 100%
                                height: 100%
                                background: rgba(0, 0, 0, 0.2)
                                img
                                    width: 100%
                                    height: 100%
                                    background-color: #fff
                            .mask-layer
                                position: absolute
                                top: 0
                                left: 0
                                right: 0
                                bottom: 0
                                display: flex
                                justify-content: center
                                align-items: center
                                background-color: rgba(0, 0, 0, .2)
                                opacity: 0
                                transition: all .2s linear
                            &:hover .mask-layer
                                opacity: 1
</style>
