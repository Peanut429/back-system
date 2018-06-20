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
            :mask-closable="false"
        >
            <Row>
                <commoninput v-model="currentInfo.roleName" inputTitle="角色名称*" :isRequired="true">{{item.label}}</commoninput>
            </Row>
            <Row>
                <Select v-model="currentInfo.permissionList">
                    <OptionGroup label="首页">
                        <Option v-for="(item, index) in modulePermission[0]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="商品资料">
                        <Option v-for="(item, index) in modulePermission[1]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="价格管理">
                        <Option v-for="(item, index) in modulePermission[2]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="库存管理">
                        <Option v-for="(item, index) in modulePermission[3]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="销售流水">
                        <Option v-for="(item, index) in modulePermission[4]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="客户管理">
                        <Option v-for="(item, index) in modulePermission[5]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="退货处理">
                        <Option v-for="(item, index) in modulePermission[6]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="设备监控">
                        <Option v-for="(item, index) in modulePermission[7]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="消息">
                        <Option v-for="(item, index) in modulePermission[8]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                    <OptionGroup label="配送">
                        <Option v-for="(item, index) in modulePermission[9]" :key="index" :value="item.value"></Option>
                    </OptionGroup>
                </Select>
            </Row>
            <template slot="footer">
                <Button type="ghost" size="large">取消</Button>
                <Button type="ghost" size="large" :disabled="true">保存</Button>
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
                  permissionList: []
              },
              modulePermission: [
                  [{label: '首页', value: 'home_page'}],
                  [{label: '商品', value: 'commodity'}],
                  [{label: '促销', value: 'promotion'}, {label: '商品价格', value: 'commodity_price'}],
                  [{label: '库存', value: 'inventory'}, {label: '入库', value: 'inventory_in'}, {label: '出库', value: 'inventory_out'}],
                  [{label: '订单列表', value: 'order_list'}],
                  [{label: '客户列表', value: 'customer_list'}],
                  [{label: '未处理', value: 'refund_unhandle'}, {label: '已处理', value: 'refund_handled'}],
                  [{label: '监控管理', value: 'monitoring_management'}],
                  [{label: '系统消息', value: 'sys_message'}],
                  [{label: '配送', value: 'distribution'}]
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
                          console.log(params.row.enable);
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
                                  click: () => {}
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
                        console.log(res.data.data);
                        this.data = res.data.data;
                    }
                });
            },
            _addNew() {},
            clear() {
                this.roleName = '';
            },
            search() {}
        },
        components: {
            commontitle,
            commoninput,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .role
        .table
            .ivu-table-fixed-right
                .ivu-table-fixed-body
                    .ivu-table-cell
                        padding-left: 0
</style>
