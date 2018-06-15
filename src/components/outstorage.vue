<template>
    <div class="intostorage">
        <commontitle titleName="库存管理/出库"></commontitle>
        <Row>
            <Col :xs="{span: 24}" :md="{span: 18}">
                <Row :gutter="16" class="selectors">
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector v-model="searchInfo.storeName" listName="所在门店" :list="storeList"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector v-model="searchInfo.bill" listName="单据类型" :list="billType"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector v-model="searchInfo.executor" listName="执行人" :list="executor"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <DatePicker :value="searchInfo.outDate" type="date" @on-change="chooseOutDate" placeholder="出库日期"></DatePicker>
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
                    <Page :total="total" size="small" show-total @on-change="getPage"></Page>
                </div>
            </template>
        </Table>
        <!-- 新增出库单 -->
        <Modal
            v-model="modals.add"
            title="新增出库单"
            width="800"
            ok-text="保存"
            cancel-text="取消"
            :mask-closable="false"
        >
            <Row :gutter="16">
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <selector v-model="newOutStoreInfo.billType" :disabled="true" listName="单据类型" :list="billList"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <selector v-model="newOutStoreInfo.storeName" listName="入库门店" :list="whichStore"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 6}">
                    <DatePicker :value="newOutStoreInfo.createTime" type="date" @on-change="outTime" placeholder="创建日期"></DatePicker>
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
            <Table class="table" :columns="add_columns" :data="newOutStoreInfo.selected"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="newOutStoreInfo.comment" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{newOutStoreInfo.comment.length}} / 200</div>
            </Row>
        </Modal>
        <!-- 修改出库单 -->
        <Modal
            v-model="modals.modification"
            title="修改出库单"
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
                        <DatePicker type="date" :value="newOutStoreInfo.createTime" @on-change="modDate"></DatePicker>
                    </Col>
                </Row>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="newOutStoreInfo.billType" :disabled="true" listName="单据类型" :list="billList"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="newOutStoreInfo.storeName" :disabled="true" listName="入库门店" :list="whichStore"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="newOutStoreInfo.executor" listName="执行人" :list="executorList"></selector>
                </Col>
            </Row>
            <Row type="flex" justify="end" align="middle" :style="{margin: '20px 0'}">
                <div class="select-btn" @click="selectGoods">
                    <Icon size="15" class="icon" type="ios-upload-outline"></Icon>
                    <span>导出</span>
                </div>
            </Row>
            <Table class="table" :columns="add_columns" :data="newOutStoreInfo.selected"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="outInfo.message" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{outInfo.message.length}} / 200</div>
            </Row>
        </Modal>
        <!-- 出库单明细 -->
        <Modal
            v-model="modals.detail"
            title="出库单明细"
            width="800"
        >
            <Row :gutter="16">
                <Row>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <commoninput inputTitle="出库单号" :disabled="true" v-model="currentInfo.id"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 8}">
                        <DatePicker type="date" :value="currentInfo.createTime" :disabled="true"></DatePicker>
                    </Col>
                </Row>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="billList[0].value" listName="单据类型" :list="billList" :disabled="true"></selector>
                </Col>
                <Col :xs="{span: 12}" :md="{span: 8}">
                    <selector v-model="whichStore[0].value" :disabled="true" listName="入库门店" :list="whichStore"></selector>
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
            <Table id="detail-table" class="table" :columns="detail_columns" :data="outInfo.data"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="outInfo.message" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{outInfo.message.length}} / 200</div>
            </Row>
            <template slot="footer">
                <Button type="primary" @click="close('detail')">关闭</Button>
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
                modals: {
                    add: false,
                    modification: false,
                    detail: false
                },
                products: [],
                productsTotal: 0,
                searchInfo: {
                    storeName: 'all',
                    bill: '',
                    executor: 'all',
                    outDate: ''
                },
                newOutStoreInfo: {
                    // 单据类型（调拨出库）
                    billType: '0',
                    // 出库门店
                    storeName: '',
                    // 创建时间
                    createTime: new Date(),
                    // 执行人
                    executor: '',
                    // 选则的出库商品
                    selected: [],
                    // 出库商品的数量
                    quantity: [],
                    // 备注
                    comment: ''
                },
                // 当前所需操作的行的信息
                currentInfo: {},
                // 出库单信息
                outInfo: {
                    data: [],
                    message: ''
                },
                storeList: [
                    {label: '全部', value: 'all'}
                ],
                billType: [
                    {label: '全部', value: 'all'},
                    {label: '销售', value: '1'},
                    {label: '调拨出库', value: '0'}
                ],
                executor: [
                    {label: '全部', value: 'all'},
                    {label: '配送员', value: 'deliveryman'}
                ],
                columns: [
                    {title: '所在门店', key: 'storeName', width: 108, fixed: 'left'},
                    {title: '单号', key: 'id', width: 80},
                    {
                        title: '单据类型',
                        key: 'bill',
                        width: 80,
                        render: (h, params) => {
                            let bill = params.row.bill === '1' ? '销售' : '调拨出库';
                            return h('span', bill);
                        }
                    },
                    {title: '制单人', key: 'createByName', minWidth: 80},
                    {title: '创建日期', key: 'createTime', minWidth: 150},
                    {title: '执行人', key: 'deliPersonName', minWidth: 80, ellipsis: true},
                    {title: '出库时间', key: 'time', minWidth: 150},
                    {
                        title: '出库状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            let status = params.row.status === '1' ? '已出库' : '未出库';
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
                                        size: 'small'
                                    },
                                    'class': {
                                        disabled: params.row.status === '1'
                                    },
                                    on: {
                                        click: () => {
                                            this.currentInfo = params.row;
                                            this.$axios.get('/api/outcondition').then(res => {
                                                console.log(res);
                                                if (res.data.errno === 0) {
                                                    this.newOutStoreInfo.selected = res.data.data.data;
                                                    this.newOutStoreInfo.storeName = params.row.storeName;
                                                    this.newOutStoreInfo.billType = params.row.bill;
                                                    this.newOutStoreInfo.executor = params.row.deliPersonName;
                                                    this.newOutStoreInfo.createTime = params.row.createTime;
                                                    for (let i = 0; i < res.data.data.data.length; i++) {
                                                        this.newOutStoreInfo.quantity.push(res.data.data.data[i].quantity);
                                                    }
                                                    this.newOutStoreInfo.comment = res.data.data.message;
                                                    this.modals.modification = true;
                                                    console.log(this.newOutStoreInfo);
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
                                            this.$axios.get('/api/outcondition').then(res => {
                                                if (res.data.errno === 0) {
                                                    this.outInfo.data = res.data.data.data;
                                                    this.outInfo.message = res.data.data.message;
                                                    this.modals.detail = true;
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
                total: 0,
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
                                    value: params.row.quantity || this.newOutStoreInfo.quantity[params.index],
                                    type: 'number'
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
                                        this.newOutStoreInfo.selected.splice(params.index, 1);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                detail_columns: [
                    {title: 'SKU编码', key: 'productSku', width: 80, fixed: 'left'},
                    {title: '商品条码', key: 'productBarcode', minWidth: 150},
                    {title: '商品名称', key: 'gdsName', minWidth: 150, ellipsis: true},
                    {title: '规格', key: 'format', width: 70},
                    {title: '数量', key: 'quantity', width: 70, align: 'center'},
                    {title: '单位', key: 'unit', width: 70, align: 'center'}
                ]
            };
        },
        beforeMount() {
            this.getStoreList();
            this.getOutStore();
        },
        methods: {
            // 获取门店列表
            getStoreList() {
                this.$store.dispatch('getStoreList').then(res => {
                    this.storeDetail = res.data;
                    this.storeDetail.forEach(item => {
                        this.storeList.push({label: item.storkName, value: item.storkName});
                    });
                    this.newOutStoreInfo.storeName = this.storeList[1].value;
                });
            },
            // 获取出库单信息
            getOutStore() {
                this.$axios.get('/api/outStore').then(res => {
                    if (res.data.errno === 0) {
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            // 选择商品时获取商品列表
            getProducts() {
                return new Promise((resolve, reject) => {
                    this.$axios.get('/api/product1').then(res => {
                        if (res.data.errno === 0) {
                            this.products = res.data.data.dataList;
                            this.productsTotal = res.data.data.total;
                            resolve();
                        }
                    });
                });
            },
            // 选取商品
            selectGoods() {
                this.getProducts().then(() => {
                    this.$refs.goodslist.modalShow();
                });
            },
            // 选中的商品
            selectedGds(selection) {
                this.newOutStoreInfo.selected = selection;
                for (let i = 0; i < selection.length; i++) {
                    this.newOutStoreInfo.quantity.push(1);
                }
            },
            chooseOutDate(date) {
                this.searchInfo.outDate = date;
            },
            modDate(date) {
                this.currentInfo.createTime = date;
            },
            getPage() {},
            outTime(date) {
                this.newOutStoreInfo.createTime = date;
            },
            clear() {
                this.searchInfo = {
                    storeName: 'all',
                    bill: '',
                    executor: 'all',
                    outDate: ''
                };
            },
            search() {},
            // 关闭模态框
            close(item) {
                this.modals[item] = false;
            },
            _addNew() {
                this.modals.add = true;
            },
            _export() {}
        },
        computed: {
            billList() {
                return this.billType.slice(1);
            },
            whichStore() {
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
    .ivu-date-picker
        width: 100%
        padding-top: 22px
        .ivu-input
            height: 36px
            border: none
            border-radius: 0
            border-bottom: 1px solid rgba(0,0,0,0.1)
            background-color: transparent
            font-size: 14px
            &:focus
                border-bottom: 1px solid rgb(33, 150, 243)
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
            .pages
                display: flex
                justify-content: center
                align-items: center
</style>
