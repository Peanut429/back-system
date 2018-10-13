<template>
    <div class="role">
        <commontitle titleName="系统设置/角色"></commontitle>
        <Row>
            <Col :xs="{span: 8}" :md="{span: 6}">
                <commoninput v-model="roleName" inputTitle="角色名称"></commoninput>
            </Col>
            <Col :xs="{span: 8, offset: 8}" :md="{span: 6, offset: 12}">
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
                    <Page size="small" :total="4" show-total></Page>
                </div>
            </template>
        </Table>
        <Modal
            v-model="modalShow"
            :title="modalTitle"
            :closable="false"
            :mask-closable="false"
            class="role-modal"
        >
            <Row>
                <commoninput v-model="currentInfo.roleName" inputTitle="角色名称*" :isRequired="true"></commoninput>
            </Row>
            <Row :style="{margin: '20px 0'}">
                <div class="select-wrapper">
                    <div class="select-title" :class="{'active': currentInfo.permissionList.length !== 0}">模块权限</div>
                    <Select v-model="currentInfo.permissionList" :multiple="true">
                        <OptionGroup label="首页">
                            <Option v-for="(item, index) in modulePermission[0]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="商品资料">
                            <Option v-for="(item, index) in modulePermission[1]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="价格管理">
                            <Option v-for="(item, index) in modulePermission[2]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="库存管理">
                            <Option v-for="(item, index) in modulePermission[3]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="销售流水">
                            <Option v-for="(item, index) in modulePermission[4]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="客户管理">
                            <Option v-for="(item, index) in modulePermission[5]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="退货处理">
                            <Option v-for="(item, index) in modulePermission[6]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="设备监控">
                            <Option v-for="(item, index) in modulePermission[7]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="消息">
                            <Option v-for="(item, index) in modulePermission[8]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                        <OptionGroup label="配送">
                            <Option v-for="(item, index) in modulePermission[9]" :key="index" :value="item.value">{{item.label}}</Option>
                        </OptionGroup>
                    </Select>
                </div>
            </Row>
            <Row class="radio-group" type="flex">
                <Col class="radio-title">角色状态</Col>
                <Col>
                    <RadioGroup v-model="currentInfo.enable">
                        <Radio label="true" size="large">
                            <span class="radioText">启用</span>
                        </Radio>
                        <Radio label="false" size="large">
                            <span class="radioText">禁用</span>
                        </Radio>
                    </RadioGroup>
                </Col>
            </Row>
            <template slot="footer">
                <Button type="ghost" size="large" @click="cancel">取消</Button>
                <Button type="ghost" size="large" :disabled="true" @click="save">保存</Button>
            </template>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import search from '../common/search';
    export default {
        data() {
          return {
              roleName: '',
              modalShow: false,
              modalTitle: '新增角色信息',
              currentInfo: {
                  roleName: '',
                  permissionList: [],
                  enable: 'true'
              },
              currentIndex: 0,
              modulePermission: [
                  [{label: '首页', value: '首页'}],
                  [{label: '商品', value: '商品'}],
                  [{label: '促销', value: '促销'}, {label: '商品价格', value: '商品价格'}],
                  [{label: '库存', value: '库存'}, {label: '入库', value: '入库'}, {label: '出库', value: '出库'}],
                  [{label: '订单列表', value: '订单列表'}],
                  [{label: '客户列表', value: '客户列表'}],
                  [{label: '未处理', value: '未处理'}, {label: '已处理', value: '已处理'}],
                  [{label: '监控管理', value: '监控管理'}],
                  [{label: '系统消息', value: '系统消息'}],
                  [{label: '配送', value: '配送'}]
              ],
              columns: [
                  {title: '角色名称', key: 'roleName', width: 180, ellipsis: true, fixed: 'left'},
                  {
                      title: '模块权限',
                      minWidth: 300,
                      ellipsis: true,
                      render: (h, params) => {
                          let permission = '';
                          params.row.permissionList.forEach(item => {
                              permission = permission + item.permissionName + ',';
                          });
                          return h('span', permission);
                      }
                  },
                  {title: '创建日期', key: 'createdDate', minWidth: 150},
                  {
                      title: '状态',
                      minWidth: 60,
                      key: 'enable',
                      render: (h, params) => {
                          let enable = params.row.enable === true ? '启用' : '禁用';
                          if (params.row.roleCode !== null) {
                              enable = '';
                          }
                          return h('span', enable);
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
                                      let permissionList = [];
                                      params.row.permissionList.forEach(item => {
                                          permissionList.push(item.permissionName);
                                      });
                                      this.currentInfo = {
                                          roleName: this.data[index].roleName,
                                          permissionList,
                                          enable: params.row.enable.toString()
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
            this.getRoleInfo();
        },
        methods: {
            // 获取角色信息
            getRoleInfo() {
                this.$axios.get('/api/role').then(res => {
                    if (res.data.errno === 0) {
                        this.data = res.data.data;
                    }
                });
            },
            _addNew() {
                this.modalShow = true;
            },
            clear() {
                this.roleName = '';
            },
            search() {},
            cancel() {
                this.modalShow = false;
                this.currentIndex = 0;
                this.currentInfo = {
                    roleName: '',
                    permissionList: [],
                    enable: 'true'
                };
            },
            save() {}
        },
        components: {
            commontitle,
            commoninput,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/variable.styl"
    .role
        .table
            .ivu-table-fixed-right
                .ivu-table-fixed-body
                    .ivu-table-cell
                        padding-left: 0
    .role-modal
        .select-wrapper
            position: relative
            margin: 22px 0 0
            .select-title
                position: absolute
                top: 0
                left: 0
                height: 30px
                line-height: 30px
                padding-left: 6px
                font-size: 14px
                color: $grey-color
                transition: all .2s linear
                &.active
                    top: -18px
                    height: 18px
                    padding: 0
                    padding-left: 6px
                    line-height: 18px
                    font-size: 12px
                    // color: rgb(33, 150, 243)
                    background-color: transparent
            .ivu-select-selection
                border: 0
                border-radius: 0
                border-bottom: 1px solid rgba(0, 0, 0, 0.1)
                background-color: transparent
                .ivu-select-placeholder
                    font-size: 0
        .radio-group
            margin: 20px 0
            font-size: 15px
            .radio-title
                padding-right: 20px
            .radioText
                font-size: 15px
</style>
