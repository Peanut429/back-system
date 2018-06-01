<template>
    <Modal
        v-model="show"
        :title="modalTitle"
        width="720"
        @on-ok="ok"
        @on-cancel="cancel"
        class-name="vertical-center-modal"
    >
        <div class="container">
            <Form ref="form" :model="formData">
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
            </Form>
        </div>
    </Modal>
</template>

<script>
    import commoninput from '../common/commoninput';
    import selector from '../common/selector';
    export default {
        props: {
            formData: {
                type: Object
            },
            modalTitle: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                show: false,
                imagePath: null,
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
            ok() {
                this.show = false;
                // console.log(this.formData);
                this.$emit('getFormObj', this.formData);
                for (let item in this.formData) {
                    this.formData[item] = null;
                }
            },
            cancel() {
                this.show = false;
                this.$refs.form.resetFields();
            },
            getImageUrl() {
                this.imagePath = window.URL.createObjectURL(this.$refs.file.files[0]);
                this.uploaded = true;
            },
            rmImage() {
                this.uploaded = false;
                this.imagePath = null;
            }
        },
        components: {
            commoninput,
            selector
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
