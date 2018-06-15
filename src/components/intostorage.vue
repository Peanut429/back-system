<template>
    <div class="intostorage">
        <commontitle titleName="库存管理/入库"></commontitle>
        <Row>
            <Col :xs="{span: 24}" :md="{span: 18}">
                <Row :gutter="16" class="selectors">
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="所在门店" :list="storeList" v-model="searchInfo.storeName"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="单据类型" :list="documentsType" v-model="searchInfo.documentsType"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="执行人" :list="executor" v-model="searchInfo.executor"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <DatePicker :value="searchInfo.date" type="date" @on-change="intoDate" placeholder="入库日期"></DatePicker>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 6}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row type="flex" justify="end" align="middle" :style="{margin: '30px 0'}">
            <div class="action" @click="_export">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出</span>
            </div>
            <div class="action" @click="_addNew">
                <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                <span>新增</span>
            </div>
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page :total="100" size="small" show-total @on-change="getPage"></Page>
                </div>
            </template>
        </Table>
        <!-- 新增入库单 -->
        <Modal
            v-model="addModal"
            title="新增入库单"
            width="800"
            ok-text="保存"
            cancel-text="取消"
            :mask-closable="false"
        >
            <Row :gutter="16">
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <selector listName="单据类型" :list="documentsList" :selected="documentsList[0].value"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <selector listName="入库门店" :list="intoWhichStore" :selected="intoWhichStore[0].value"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <DatePicker type="date" @on-change="createDate" placeholder="创建日期"></DatePicker>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <selector listName="执行人" :list="executorList" :selected="executorList[0].value"></selector>
                </Col>
            </Row>
            <Row type="flex" justify="end" align="middle" :style="{margin: '20px 0'}">
                <div class="select-btn" @click="selectGoods">
                    <Icon size="15" class="icon" type="bag"></Icon>
                    <span>选择商品</span>
                </div>
            </Row>
            <Table class="table" :columns="add_columns" :data="selected"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <!--<commoninput inputTitle="备注"></commoninput>-->
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="comment" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{comment.length}} / 200</div>
            </Row>
        </Modal>
        <!-- 修改入库单 -->
        <Modal
            v-model="modModal"
            title="修改入库单"
            width="800"
            ok-text="保存"
            cancel-text="取消"
            :mask-closable="false"
        >
            <Row :gutter="16">
                <Row>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput v-model="currentInfo.id" inputTitle="入库单号" :disabled="true"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <DatePicker type="date" :value="currentInfo.createTime" @on-change="modDate"></DatePicker>
                    </Col>
                </Row>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="documentsList[0].value" listName="单据类型" :list="documentsList"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="intoWhichStore[0].value" :disabled="true" listName="入库门店" :list="intoWhichStore"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="executorList[0].value" listName="执行人" :list="executorList"></selector>
                </Col>
            </Row>
            <Row type="flex" justify="end" align="middle" :style="{margin: '20px 0'}">
                <div class="select-btn" @click="selectGoods">
                    <Icon size="15" class="icon" type="ios-upload-outline"></Icon>
                    <span>导出</span>
                </div>
            </Row>
            <Table class="table" :columns="add_columns" :data="detail_data"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <!--<commoninput inputTitle="备注"></commoninput>-->
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="comment" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{comment.length}} / 200</div>
            </Row>
        </Modal>
        <!-- 入库单明细 -->
        <Modal
            v-model="detailModal"
            title="入库单明细"
            width="800"
            :mask-closable="false"
        >
            <Row :gutter="16">
                <Row>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput inputTitle="入库单号" :disabled="true" v-model="currentInfo.id"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <DatePicker type="date" :value="currentInfo.createTime" :disabled="true"></DatePicker>
                    </Col>
                </Row>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="documentsList[0].value" listName="单据类型" :list="documentsList" :disabled="true"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="intoWhichStore[0].value" :disabled="true" listName="入库门店" :list="intoWhichStore"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="executorList[0].value" :disabled="true" listName="执行人" :list="executorList"></selector>
                </Col>
            </Row>
            <Row type="flex" justify="end" align="middle" :style="{margin: '20px 0'}">
                <div class="select-btn" @click="selectGoods">
                    <Icon size="15" class="icon" type="ios-upload-outline"></Icon>
                    <span>导出</span>
                </div>
            </Row>
            <Table id="detail-table" class="table" :columns="detail_columns" :data="detail_data"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <!--<commoninput inputTitle="备注"></commoninput>-->
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="comment" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{comment.length}} / 200</div>
            </Row>
            <template slot="footer">
                <Button type="primary" @click="close('detailModal')">关闭</Button>
            </template>
        </Modal>
        <goodslist ref="goodslist" :products="products" :total="productsTotal" @selectedGds="selectedGds"></goodslist>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    import goodslist from '../common/goodslist';
    import search from '../common/search';
    export default {
        data() {
            return {
                addModal: false,
                modModal: false,
                detailModal: false,
                comment: '',
                // 选择商品时的商品列表
                products: [],
                // 商品列表总数
                productsTotal: 0,
                searchInfo: {
                    storeName: 'all',
                    documentsType: '',
                    executor: 'all',
                    date: ''
                },
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                documentsType: [
                    {label: '全部', value: 'all'},
                    {label: '配送入库', value: '1'}
                ],
                executor: [
                    {label: '全部', value: 'all'},
                    {label: '配送员', value: '配送员'}
                ],
                columns: [
                    {title: '所在门店', key: 'storeName', width: 150, fixed: 'left', ellipsis: true},
                    {title: '单号', key: 'id', width: 60},
                    {
                        title: '单据类型',
                        key: 'bill',
                        width: 90,
                        render: (h, params) => {
                            let name;
                            if (params.row.bill === '1') {
                                name = '配送入库';
                            }
                            return h('span', name);
                        }
                    },
                    {title: '制单人', key: 'createByName', width: 70},
                    {title: '创建日期', key: 'createTime', minWidth: 150},
                    {title: '执行人', key: 'deliPersonName', width: 70},
                    {title: '入库时间', key: 'arrivalDate', minWidth: 150},
                    {
                        title: '入库状态',
                        key: 'status',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            let status = params.row.status === '0' ? '待配送' : '已配送';
                            return h('span', status);
                        }
                    },
                    {
                        title: '操作',
                        width: 100,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        disabled: !Number(params.row.status)
                                    },
                                    'class': {
                                        disabled: !Number(params.row.status)
                                    },
                                    on: {
                                        click: () => {
                                            this.currentInfo = params.row;
                                            this.$axios.get('/api/condition').then(res => {
                                                console.log(res);
                                                if (res.data.errno === 0) {
                                                    this.detail_data = res.data.data;
                                                    this.modModal = true;
                                                }
                                            });
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.currentInfo = params.row;
                                            this.$axios.get('/api/condition').then(res => {
                                                if (res.data.errno === 0) {
                                                    this.detail_data = res.data.data;
                                                    this.detailModal = true;
                                                }
                                            });
                                        }
                                    }
                                }, '明细')
                            ]);
                        }
                    }
                ],
                data: [],
                // 新增
                add_columns: [
                    {title: 'SKU编码', key: 'productSku', width: 108, fixed: 'left'},
                    {title: '商品条码', key: 'productBarcode', minWidth: 130},
                    {title: '商品名称', key: 'gdsName', minWidth: 130, ellipsis: true},
                    {title: '规格', key: 'format', width: 70},
                    {
                        title: '数量',
                        width: 70,
                        render: (h, params) => {
                            return h('input', {
                                domProps: {
                                    type: 'number',
                                    min: 1,
                                    value: params.row.quantity || 1
                                },
                                style: {
                                    width: '100%'
                                },
                                on: {
                                    input: () => {}
                                }
                            });
                        }
                    },
                    {title: '单位', key: 'unit', width: 50, align: 'center'},
                    {
                        title: '生产日期',
                        minWidth: 130,
                        render: (h, params) => {
                            return h('DatePicker', {
                                props: {
                                    type: 'date',
                                    value: params.row.productionTime
                                },
                                attrs: {
                                    class: 'productionDate'
                                },
                                on: {
                                    'on-change': (date) => {
                                        params.row.productionTime = date;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '操作',
                        width: 70,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.selected.splice(params.index, 1);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                // 选中的商品
                selected: [],
                // 当前选中项信息
                currentInfo: {},
                // 明细
                detail_columns: [
                    {title: 'SKU编码', key: 'productSku', fixed: 'left', width: 108},
                    {title: '商品条码', key: 'productBarcode', minWidth: 150},
                    {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
                    {title: '规格', key: 'format', width: 70},
                    {title: '数量', key: 'quantity', width: 70},
                    {title: '单位', key: 'unit', width: 70},
                    {title: '生产日期', key: 'productionTime', minWidth: 150},
                    {title: '实际入库量', key: 'actualDelivery', width: 150, align: 'center'},
                    {title: '差值', key: 'diffNum', width: 50, fixed: 'right', align: 'center'}
                ],
                detail_data: []
            };
        },
        beforeMount() {
            this.getStoreList();
            this.getIntoStore();
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
            // 获取入库数据
            getIntoStore() {
                this.$axios.get('/api/intoStore').then(res => {
                    // console.log(res);
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                    }
                });
            },
            // 选择商品时获取商品列表
            getProducts() {
                return new Promise((resolve, reject) => {
                    this.$axios.get('/api/product1').then(res => {
                        // console.log(res);
                        if (res.data.errno === 0) {
                            this.products = res.data.data.dataList;
                            this.productsTotal = res.data.data.total;
                            resolve();
                        }
                    });
                });
            },
            selectGoods() {
                this.getProducts().then(() => {
                    this.$refs.goodslist.modalShow();
                });
            },
            // 已选中的商品
            selectedGds(selection) {
                this.selected = selection;
            },
            intoDate(date) {
                this.searchInfo.date = date;
            },
            modDate(date) {
                this.currentInfo.createTime = date;
            },
            getPage() {},
            createDate() {},
            clear() {
                this.searchInfo = {
                    storeName: 'all',
                    documentsType: '',
                    executor: 'all',
                    date: ''
                };
            },
            search() {},
            _addNew() {
                this.addModal = true;
            },
            _export() {},
            close(item) {
                this[item] = false;
            }
        },
        computed: {
            documentsList() {
                return this.documentsType.slice(1);
            },
            intoWhichStore() {
                if (this.storeList.length > 1) {
                    return this.storeList.slice(1);
                } else {
                    return [{label: '未获取到门店信息', value: 'error'}];
                }
            },
            executorList() {
                return this.executor.slice(1);
            }
        },
        components: {
            commontitle,
            commoninput,
            selector,
            goodslist,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/variable.styl"
    .desc
        font-size: 14px
        padding: 5px 0 5px 6px
    .number
        margin-top: 5px
        padding-right 10px
        text-align: right
    .select-btn
        display: flex
        align-items: center
        color: $grey-color
        cursor: pointer
        font-size: 15px
        &:hover
            color: #ff9c10
            .icon
                color: currentColor
        .icon
            margin-right: 5px
    .intostorage
        .buttons
            display: flex
            justify-content: flex-end
            align-items: flex-end
            height: 59px
            .clear-btn, .search-btn
                margin-left: 10px
                box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
        .action
            display flex
            align-items center
            cursor: pointer
            color: #7b7b7b
            font-size: 15px
            &+.action
                margin-left: 30px
            &:hover
                color: #ff9c10
            .icon
                margin-right: 10px
                color: currentColor
        .table
            .ivu-table-cell
                .disabled
                    color: $grey-color
            .ivu-table-fixed-right
                thead
                    .ivu-table-cell
                        height: 40px
                        line-height: 40px
                        padding-left: 20px
    #detail-table
        .ivu-table-fixed-right
            thead
                .ivu-table-cell
                    height: 40px
                    line-height: 40px
                    padding-left: 0
            .ivu-table-fixed-body
                .ivu-table-cell
                    padding: 0
</style>
