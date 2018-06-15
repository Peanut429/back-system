<template>
    <div class="processed-detail">
        <commontitle titleName="退货处理/已处理/详情"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.id" inputTitle="退货编号" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.orderId" inputTitle="原订单编号" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.storeName" inputTitle="退货门店" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.createTime" inputTitle="申请时间" :disabled="true"></commoninput>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.phone" inputTitle="客户电话" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.expressCompany" inputTitle="快递公司" :disabled="true"></commoninput>
            </Col>
            <Col :xs="{span: 10}" :sm="{span: 5}">
                <commoninput v-model="detailInfo.expressNo" inputTitle="快递单号" :disabled="true"></commoninput>
            </Col>
        </Row>
        <Row :style="{margin: '20px 0', fontSize: '15px'}">
            退货商品（共{{detailInfo.sumNum}}件）
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" :total="total" show-total></Page>
                </div>
            </template>
        </Table>
        <!--申请退货理由-->
        <Row :style="{margin: '20px 0', fontSize: '15px'}">
            <commoninput v-model="detailInfo.reason" inputType="textarea" inputTitle="退货理由" :disabled="true"></commoninput>
        </Row>
        <!--审批回复-->
        <Row :style="{margin: '20px 0', fontSize: '15px'}">
            <commoninput v-model="comment" inputType="textarea" inputTitle="留言或邮寄地址" :disabled="true"></commoninput>
        </Row>
        <!--附件内容-->
        <Row v-if="attachment.length > 0" :style="{fontSize: '14px', margin: '40px 0 10px 0'}">附件</Row>
        <Row type="flex" :gutter="16" v-if="attachment.length > 0">
            <Col class="image-wrapper" v-for="(item, index) in attachment" :key="index">
                <img class="image-item" src="../../data-mock/首页数据mock/byTime.jpeg" @click="magnify(index)" />
                <!--<img class="image-item" :src="item" @click="magnify(index)" />-->
            </Col>
        </Row>
        <Row :style="{fontSize: '14px', margin: '40px 0 10px 0'}">审批历史</Row>
        <Timeline></Timeline>
        <Row type="flex" justify="space-between" :style="{marginTop: '30px'}">
            <Col>
                <router-link to="/home/return-processed">
                    <div class="return-btn">返回</div>
                </router-link>
            </Col>
        </Row>
        <!-- 大图片 -->
        <Modal
            v-model="modalShow"
            width="500"
            :mask-closable="false"
        >
            <template slot="header">
                <h3 class="modal-header">附件（{{currentIndex + 1}}/{{attachment.length}}）</h3>
            </template>
            <div class="image-container">
                <!--<img :src="attachment[currentIndex]" />-->
                <img src="../../data-mock/首页数据mock/byTime.jpeg" />
                <div class="previous" @click="previous">
                    <Icon type="chevron-left"></Icon>
                </div>
                <div class="next" @click="next">
                    <Icon type="chevron-right"></Icon>
                </div>
            </div>
            <template slot="footer">
                <Button type="primary" @click="close">关闭</Button>
            </template>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    export default {
        data() {
            return {
                currentIndex: 0,
                modalShow: false,
                // 详情信息
                detailInfo: {
                    id: null,
                    orderId: null,
                    storeName: null,
                    createTime: null,
                    phone: null,
                    expressCompany: null,
                    expressNo: null,
                    sumNum: 0,
                    status: '',
                    reason: '',
                    coodinateContent: '',
                    auditContent: ''
                },
                columns: [
                    {title: 'SKU编码', key: 'productSku', width: 80, fixed: 'left'},
                    {title: '商品条形码', key: 'productBarcode', minWidth: 150},
                    {title: '商品名称', key: 'productName', minWidth: 150, ellipsis: true},
                    {title: '商品类型', key: 'productModel', minWidth: 80, align: 'center'},
                    {title: '规格', key: 'productFormat', minWidth: 80, align: 'center'},
                    {title: '品牌', key: 'productBrandName', minWidth: 60, align: 'center'},
                    {
                        title: '价格',
                        key: 'salePrice',
                        minWidth: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.salePrice.toFixed(2));
                        }
                    },
                    {title: '单位', key: 'productUnit', minWidth: 60, align: 'center'},
                    {title: '个数', key: 'number', width: 60, fixed: 'right'}
                ],
                data: [],
                total: 0,
                attachment: []
            };
        },
        beforeMount() {
            console.log(this.$route.params);
            this.getRefundDetail();
            this.getAttachment();
            this.getHistory();
        },
        methods: {
            // 获取退款处理历史记录
            getHistory() {
                this.$axios.get('/api/history').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res);
                        this.history = res.data.data;
                        console.log(this.history);
                    }
                });
            },
            // 获取退款详情
            getRefundDetail() {
                this.$axios.get('/api/processedRefundDetail').then(res => {
                    if (res.data.errno === 0) {
                        console.log(res);
                        let data = res.data.data;
                        this.detailInfo = {
                            id: data.id,
                            orderId: data.orderId,
                            storeName: data.storeName,
                            createTime: data.createTime,
                            phone: data.mobile,
                            expressCompany: data.expressCompany,
                            expressNo: data.expressNo,
                            sumNum: data.sumNum,
                            status: data.status,
                            reason: data.reason,
                            coodinateContent: data.coodinateContent,
                            auditContent: data.auditContent
                        };
                        this.total = data.detailList.total;
                        this.data = data.detailList.dataList;
                    }
                });
            },
            // 获取附件
            getAttachment() {
                this.$axios.get('/api/attachment').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res);
                        this.attachment = res.data.data;
                    }
                });
            },
            // 查看大图片
            magnify(index) {
                this.currentIndex = index;
                this.modalShow = true;
            },
            close() {
                this.modalShow = false;
            },
            previous() {
                if (this.currentIndex === 0) {
                    this.currentIndex = this.attachment.length - 1;
                } else {
                    this.currentIndex--;
                }
            },
            next() {
                if (this.currentIndex === this.attachment.length - 1) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex++;
                }
            }
        },
        computed: {
            comment() {
                if (this.detailInfo.coodinateContent) {
                    return this.detailInfo.coodinateContent;
                } else {
                    return this.detailInfo.auditContent;
                }
            }
        },
        components: {
            commontitle,
            commoninput
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .image-container
        position: relative
        width: 100%
        .previous, .next
            position: absolute
            top: 50%
            width: 40px
            height: 40px
            line-height: 40px
            border-radius: 50%
            background-color: #ccc
            transform: translateY(-50%)
            text-align: center
            cursor: pointer
            opacity: 0
            transition: all .2s linear
        img
            width: 100%
        &:hover .previous, &:hover .next
            opacity: 1
        .previous
            left: 10px
        .next
            right: 10px
    .processed-detail
        .image-wrapper
            height: 50px
            .image-item
                height: 100%
        .return-btn
            display: inline-block
            height: 32px
            line-height: 32px
            width: 76px
            padding: 0 6px
            text-align: center
            background-color: #fff
            border-radius: 5px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
            color: black
            font-size: 14px
        .modal-header
            font-weight: 700
            font-size: 16px
</style>
