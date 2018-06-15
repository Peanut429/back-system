<template>
    <div class="untreated-detail">
        <commontitle titleName="退货处理/未处理/详情"></commontitle>
        <Row :gutter="16">
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="detailInfo.id" :disabled="true" inputTitle="退货编号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="detailInfo.orderId" :disabled="true" inputTitle="原订单编号"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="detailInfo.storeName" :disabled="true" inputTitle="退货门店"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}">
                <commoninput v-model="detailInfo.createTime" :disabled="true" inputTitle="申请时间"></commoninput>
            </Col>
            <Col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 4}">
                <commoninput v-model="detailInfo.phone" :disabled="true" inputTitle="客户电话"></commoninput>
            </Col>
        </Row>
        <Row :style="{margin: '20px 0', fontSize: '15px'}">
            退货商品（共{{total}}件）
        </Row>
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" :total="total" show-total></Page>
                </div>
            </template>
        </Table>
        <Row :style="{margin: '20px 0', fontSize: '15px'}">
            <commoninput v-model="reason" inputType="textarea" inputTitle="退货理由" :disabled="true"></commoninput>
        </Row>
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
                <router-link to="/home/return-unprocess">
                    <div class="return-btn">返回</div>
                </router-link>
            </Col>
            <Col style="display: flex;justify-content: flex-end">
                <Button class="btns" type="primary">审核通过并退款</Button>
                <Button class="btns" type="primary">审核通过</Button>
                <Button class="btns" type="warning">审核驳回</Button>
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
        beforeMount() {
            // console.log(this.$route.params);
            this.getHistory();
            this.getRefundDetail();
            this.getAttachment();
        },
        data() {
            return {
                modalShow: false,
                currentIndex: 0,
                // 退货信息
                detailInfo: {
                    id: '',
                    orderId: '',
                    storeName: '',
                    createTime: '',
                    phone: ''
                },
                columns: [
                    {title: 'SKU编码', key: 'productSku', width: 100, fixed: 'left'},
                    {title: '商品条码', key: 'productBarcode', minWidth: 150},
                    {title: '商品名称', key: 'productName', minWidth: 150},
                    {title: '商品类型', key: 'productBrandName', minWidth: 80, align: 'center'},
                    {title: '规格', key: 'productFormat', minWidth: 80, align: 'center'},
                    {title: '品牌', key: 'productBrandName', minWidth: 80, align: 'center'},
                    {title: '价格', key: 'salePrice', minWidth: 80, align: 'center'},
                    {title: '单位', key: 'productUnit', minWidth: 80, align: 'center'},
                    {title: '个数', key: 'number', width: 50, fixed: 'right'}
                ],
                // 退货商品数据
                data: [],
                // 附件
                attachment: [],
                // 退货理由
                reason: '',
                // 退款处理记录
                history: [],
                total: 0
            };
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
                this.$axios.get('/api/refundDetail').then(res => {
                    if (res.data.errno === 0) {
                        let data = res.data.data;
                        this.detailInfo = {
                            id: data.id,
                            orderId: data.orderId,
                            storeName: data.storeName,
                            createTime: data.createTime,
                            phone: data.mobile
                        };
                        this.total = data.detailList.total;
                        this.data = data.detailList.dataList;
                        this.reason = data.reason;
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
        components: {
            commoninput,
            commontitle
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .untreated-detail
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
        .btns
            margin-left: 10px
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
            font-size: 14px
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
    .modal-header
        font-weight: 700
        font-size: 16px
</style>
