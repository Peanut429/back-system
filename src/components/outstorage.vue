<template>
    <div class="intostorage">
        <commontitle titleName="库存管理/出库"></commontitle>
        <Row>
            <Col :xs="{span: 24}" :md="{span: 18}">
                <Row :gutter="16" class="selectors">
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="所在门店" :list="storeList" :selected="storeList[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="单据类型" :list="documentsType"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector listName="执行人" :list="executor" :selected="executor[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <DatePicker type="date" @on-change="chooseDate" placeholder="出库日期"></DatePicker>
                    </Col>
                </Row>
            </Col>
            <Col class="buttons" :xs="{span: 24}" :md="{span: 6}">
                <Button size="large" class="clear-btn" type="ghost">清空条件</Button>
                <Button size="large" class="search-btn" type="primary">搜索</Button>
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
        <Table class="table" :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page :total="100" size="small" show-total @on-change="getPage"></Page>
                </div>
            </template>
        </Table>
        <!--弹出框-->
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
                    <DatePicker type="date" @on-change="intoStorageDate" placeholder="创建日期"></DatePicker>
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
            <Table :columns="add_columns" class="table"></Table>
            <Row :style="{marginTop: '20px', width: '50%'}">
                <!--<commoninput inputTitle="备注"></commoninput>-->
                <div class="desc">
                    备注：
                </div>
                <Input class="comment" v-model="comment" type="textarea" :maxlength="200" :autosize="{minRows: 1, maxRows: 10}"></Input>
                <div class="number">{{comment.length}} / 200</div>
            </Row>
        </Modal>
        <goodslist ref="goodslist" :columns="add_columns"></goodslist>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    import goodslist from '../common/goodslist';
    export default {
        data() {
            return {
                addModal: false,
                comment: '',
                storeList: [
                    {label: '全部', value: 'all'},
                    {label: '国际科技园01L', value: 'gk01'},
                    {label: '国际科技园02L', value: 'gk02'},
                    {label: '国际科技园03L', value: 'gk03'}
                ],
                documentsType: [
                    {label: '全部', value: 'all'},
                    {label: '销售', value: 'sell'},
                    {label: '调拨出库', value: 'allocate'}
                ],
                executor: [
                    {label: '全部', value: 'all'},
                    {label: '配送员', value: 'deliveryman'}
                ],
                columns: [
                    {title: '所在门店', key: 'storeAddress'},
                    {title: '单号', key: 'documentsNumber'},
                    {title: '单据类型', key: 'documentsType'},
                    {title: '制单人', key: 'creator'},
                    {title: '创建日期', key: 'creatTime'},
                    {title: '执行人', key: 'executor'},
                    {title: '出库时间', key: 'completeTime'},
                    {title: '出库状态', key: 'completeState'},
                    {title: '操作', key: 'actions'}
                ],
                add_columns: [
                    {title: 'SKU编码', key: 'SKU'},
                    {title: '商品条码', key: 'barcode'},
                    {title: '商品名称', key: 'goodsName'},
                    {title: '规格', key: 'specification'},
                    {title: '数量', key: 'input'},
                    {title: '单位', key: 'measurementUnit'},
                    {title: '生产日期', key: 'measurementUnit'},
                    {title: '操作', key: 'actions'}
                ]
            };
        },
        methods: {
            chooseDate() {},
            getPage() {},
            intoStorageDate() {},
            selectGoods() {
                this.$refs.goodslist.modalShow();
            },
            _addNew() {
                this.addModal = true;
            },
            _export() {}
        },
        computed: {
            documentsList() {
                return this.documentsType.slice(1);
            },
            intoWhichStore() {
                return this.storeList.slice(1);
            },
            executorList() {
                return this.executor.slice(1);
            }
        },
        components: {
            commontitle,
            commoninput,
            selector,
            goodslist
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .table
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .1)
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
            box-shadow: 1px 1px 2px rgba(0, 0, 0, .1)
            .pages
                display: flex
                justify-content: center
                align-items: center
</style>
