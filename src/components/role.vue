<template>
    <div class="role">
        <commontitle titleName="系统设置/角色"></commontitle>
        <Row>
            <Col :xs="{span: 8}" :md="{span: 6}">
                <commoninput inputTitle="角色名称"></commoninput>
            </Col>
            <Col :xs="{span: 8, offset: 8}" :md="{span: 6, offset: 12}">
                <search></search>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col" @click="_addNew">
                <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                <span>新增</span>
            </div>
        </Row>
        <Table class="table" :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page size="small" :total="4" show-total></Page>
                </div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
    import commoninput from '../common/commoninput';
    import search from '../common/search';
    export default {
        data() {
          return {
              columns: [
                  {title: '角色名称', key: ''},
                  {title: '模块权限', key: ''},
                  {title: '创建日期', key: ''},
                  {title: '状态', key: ''},
                  {
                      title: '操作',
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
              ]
          };
        },
        methods: {
            _addNew() {}
        },
        components: {
            commontitle,
            commoninput,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
