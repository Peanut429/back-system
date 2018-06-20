<template>
    <div class="store">
        <commontitle titleName="系统设置/门店"></commontitle>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <commoninput v-model="searchInfo.storeName" inputTitle="门店名称"></commoninput>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <selector v-model="searchInfo.status" listName="经营状态" :list="manageState"></selector>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <selector v-model="searchInfo.storeType" listName="门店类型" :list="storeType"></selector>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <search @clear="clear" @search="search"></search>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col" @click="_addNew">
                <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                <span>新增</span>
            </div>
        </Row>
         <Table class="table" :columns="columns" :data="data">
             <template slot="footer">
                 <div class="pages">
                     <Page size="small" :total="total" show-total></Page>
                 </div>
             </template>
         </Table>
        <Modal
            v-model="modalShow"
            title="新增门店信息"
            width="700"
            :closable="false"
            :mask-closable="false"
            class="storeModal"
        >
            <div class="container">
                <commoninput v-model="currentStoreInfo.storeName" inputTitle="门店名称*" :isRequired="true"></commoninput>
                <commoninput v-model="currentStoreInfo.deviceNo" inputTitle="设备编号*" :isRequired="true"></commoninput>
                <commoninput v-model="currentStoreInfo.licenseKey" inputTitle="许可证号"></commoninput>
                <selector v-model="currentStoreInfo.intoMethod" listName="进店类型" :list="intoMethod"></selector>
                <selector v-model="currentStoreInfo.deviceType" listName="硬件类型" :list="deviceType"></selector>
                <selector v-model="currentStoreInfo.storeType" listName="门店类型" :list="storeTypeList"></selector>
                <commoninput v-model="currentStoreInfo.address" inputTitle="门店地址"></commoninput>
                <commoninput inputType="textarea" v-model="currentStoreInfo.describe" inputTitle="描述"></commoninput>
                <Row class="radio-group" type="flex">
                    <Col class="radio-title">经营状态</Col>
                    <Col>
                        <RadioGroup v-model="currentStoreInfo.status">
                            <Radio label="1" size="large">
                                <span class="radioText">正常营业</span>
                            </Radio>
                            <Radio label="0" size="large">
                                <span class="radioText">结业</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <div class="image-title">门店图片</div>
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
                    <Col class="imageDesc" :style="{marginLeft: '20px', fontSize: '15px'}">
                        <p>仅支持JPG和PNG格式，并小于5MB</p>
                        <p>推荐使用长方形照片，分辨率不低于160*90像素</p>
                    </Col>
                </Row>
                <Row type="flex" class="radio-group">
                    <Col class="radio-title" span="6">是否允许灰名单进入</Col>
                    <RadioGroup :style="{marginLeft: '20px'}" v-model="currentStoreInfo.ashEnter">
                        <Radio label="true" size="large">
                            <span class="radioText">允许</span>
                        </Radio>
                        <Radio label="false" sizse="large">
                            <span class="radioText">禁止</span>
                        </Radio>
                    </RadioGroup>
                </Row>
            </div>
            <template slot="footer">
                <Button type="ghost" class="modal-btn" @click="cancel">取消</Button>
                <Button type="ghost" class="modal-btn" :disabled="true" @click="save">保存</Button>
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
                modalShow: false,
                imagePath: null,
                uploaded: false,
                searchInfo: {
                    storeId: '',
                    status: 'all',
                    storeType: 'all'
                },
                currentStoreInfo: {
                    storeName: '',
                    deviceNo: '',
                    licenseKey: '',
                    intoMethod: '',
                    deviceType: '',
                    storeType: '',
                    address: '',
                    describe: '',
                    status: '1',
                    imagePath: '',
                    ashEnter: 'false'
                },
                currentIndex: 0,
                manageState: [
                    {label: '全部', value: 'all'},
                    {label: '结业', value: '1'},
                    {label: '正常营业', value: '0'}
                ],
                storeType: [
                    {label: '全部', value: 'all'}
                ],
                intoMethod: [
                    {label: '刷手进门', value: 1},
                    {label: '扫码进门', value: 2}
                ],
                deviceType: [
                    {label: '小兰', value: 1},
                    {label: '大兰', value: 3},
                    {label: '芭提雅', value: 2}
                ],
                storeTypeList: [
                    {label: '自营', value: 1},
                    {label: '加盟', value: 2}
                ],
                columns: [
                    {title: '门店编号', key: 'id', width: 80, fixed: 'left'},
                    {
                        title: '门店类型',
                        key: 'type',
                        minWidth: 80,
                        render: (h, params) => {
                            let type = this.storeType.filter(item => {
                                return item.value === params.row.type;
                            });
                            return h('span', type[0].label + '店');
                        }
                    },
                    {title: '门店名称', key: 'storkName', minWidth: 150, ellipsis: true},
                    {title: '门店地址', key: 'address', minWidth: 150, ellipsis: true},
                    {
                        title: '硬件类型',
                        key: 'deviceType',
                        minWidth: 80,
                        render: (h, params) => {
                            let typeName;
                            switch (params.row.deviceType) {
                                case 1:
                                    typeName = '小兰';
                                    break;
                                case 2:
                                    typeName = '芭提雅';
                                    break;
                                default:
                                    typeName = '大兰';
                            }
                            return h('span', typeName);
                        }
                    },
                    {title: '创建时间', key: 'createTime', minWidth: 150},
                    {title: '设备编号', key: 'deviceNo', minWidth: 150, ellipsis: true},
                    {
                        title: '经营状态',
                        key: 'status',
                        minWidth: 80,
                        render: (h, params) => {
                            let status = params.row.status === '1' ? '正常营业' : '结业';
                            return h('span', {
                                'class': {
                                    normal: params.row.status === '1'
                                }
                            }, status);
                        }
                    },
                    {
                        title: '操作',
                        width: 50,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let index = params.index;
                                        this.currentIndex = index;
                                        this.currentStoreInfo = {
                                            storeName: this.data[index].storkName,
                                            deviceNo: this.data[index].deviceNo,
                                            licenseKey: this.data[index].licenseKey,
                                            intoMethod: this.data[index].intoMethod,
                                            deviceType: this.data[index].deviceType,
                                            storeType: this.data[index].type,
                                            address: this.data[index].address,
                                            describe: this.data[index].describe,
                                            status: this.data[index].status,
                                            imagePath: this.data[index].imagePath,
                                            ashEnter: this.data[index].ashEnter.toString()
                                        };
                                        this.modalShow = true;
                                    }
                                }
                            }, '编辑');
                        }
                    }
                ],
                data: [],
                total: 0
            };
        },
        beforeMount() {
            this.getStoretype();
            this.getStoreInfo();
        },
        methods: {
            // 获取门店类型
            getStoretype() {
                this.$axios.get('/api/storeType').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res.data.data);
                        let data = res.data.data;
                        data.forEach(item => {
                            this.storeType.push({label: item.typeName, value: item.id});
                        });
                    }
                });
            },
            // 获取门店信息
            getStoreInfo() {
                this.$axios.get('/api/storeInfo').then(res => {
                    if (res.data.errno === 0) {
                        // console.log(res.data.data);
                        this.data = res.data.data.dataList;
                        this.total = res.data.data.total;
                    }
                });
            },
            _addNew() {
                this.modalShow = true;
            },
            getImageUrl() {
                this.imagePath = window.URL.createObjectURL(this.$refs.file.files[0]);
                this.uploaded = true;
            },
            rmImage() {
                this.uploaded = false;
                this.imagePath = null;
            },
            cancel() {
                this.modalShow = false;
                this.currentStoreInfo = {
                    storeName: '',
                        deviceNo: '',
                        licenseKey: '',
                        intoMethod: '',
                        deviceType: '',
                        storeType: '',
                        address: '',
                        describe: '',
                        status: '1',
                        imagePath: '',
                        ashEnter: 'false'
                };
            },
            save() {
                this.modalShow = false;
                this.data[this.currentIndex].storkName = this.currentStoreInfo.storeName;
                this.data[this.currentIndex].licenseKey = this.currentStoreInfo.licenseKey;
                this.data[this.currentIndex].intoMethod = this.currentStoreInfo.intoMethod;
                this.data[this.currentIndex].deviceType = this.currentStoreInfo.deviceType;
                this.data[this.currentIndex].storeType = this.currentStoreInfo.storeType;
                this.data[this.currentIndex].address = this.currentStoreInfo.address;
                this.data[this.currentIndex].describe = this.currentStoreInfo.describe;
                this.data[this.currentIndex].status = this.currentStoreInfo.status;
                this.data[this.currentIndex].ashEnter = this.currentStoreInfo.status === 'true';
                this.currentStoreInfo = {
                    storeName: '',
                    deviceNo: '',
                    licenseKey: '',
                    intoMethod: '',
                    deviceType: '',
                    storeType: '',
                    address: '',
                    describe: '',
                    status: '1',
                    imagePath: '',
                    ashEnter: 'false'
                };
            },
            clear() {
                this.searchInfo = {
                    storeId: '',
                    status: 'all',
                    storeType: 'all'
                };
            },
            search() {}
        },
        components: {
            commoninput,
            commontitle,
            search,
            selector
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .store
        .table
            .ivu-table-fixed-right
                .ivu-table-fixed-body
                    .ivu-table-cell
                        padding-left: 0
            .normal
                color: #0ba65b
    .storeModal
        .container
            height: 50vh
            overflow-y: auto
            .imageDesc
                display: flex
                flex-direction: column
                justify-content: flex-end
                margin-left: 20px
                padding-bottom: 10px
                font-size: 15px
            .image-title
                font-size: 15px
            .radio-group
                margin: 20px 0
                font-size: 15px
                .radio-title
                    padding-right: 20px
                .radioText
                    font-size: 15px
            .wrapper
                position: relative
                width: 100%
                padding-top: 58%
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
        .modal-btn
            width: 150px
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3)
</style>
