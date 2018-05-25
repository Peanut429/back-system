<template>
    <div class="user-list">
        <commontitle titleName="客户管理/客户列表"></commontitle>
        <Row>
            <Col :xs="{span: 24}" :md="{span: 18}">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput inputTitle="客户编号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <commoninput inputTitle="手机号码" inputType="number"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <selector listName="注册门店" :list="storeList" :selected="storeList[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 12}" :md="{span: 6}">
                        <selector listName="客户状态" :list="signState"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 6}">
                <search></search>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="end">
            <div class="action-col" @click="_export">
                <Icon class="icon" size="20" type="ios-upload-outline"></Icon>
                <span>导出客户注册数据</span>
            </div>
        </Row>
        <Table :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page :total="100" size="small" show-total></Page>
                </div>
            </template>
        </Table>
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
              storeList: [
                  {label: '全部', value: 'all'},
                  {label: '国际科技园01L', value: 'gk01'},
                  {label: '国际科技园02L', value: 'gk02'},
                  {label: '国际科技园03L', value: 'gk03'}
              ],
              signState: [
                  {label: '全部', value: 'all'},
                  {label: '正常使用', value: 'normal'},
                  {label: '取消签约', value: 'cancel'}
              ],
              columns: [
                  {title: '客户编号', key: 'ID'},
                  {title: '手机号码', key: 'userPhone'},
                  {title: '注册门店', key: 'regStore'},
                  {title: '客户状态', key: 'signState'},
                  {title: '注册时间', key: 'regTime'},
                  {title: '操作', key: 'actions'}
              ]
          };
        },
        methods: {
            _export() {}
        },
        components: {
            commoninput,
            commontitle,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .user-list
        .action-col
            display: flex
            align-items: center
            padding: 30px 0
            cursor: pointer
            font-size: 15px
            user-select: none
            &+.action-col
                margin-left: 30px
            &:hover
                color: #ff9c10
            .icon
                margin-right: 10px
                color: currentColor
        .pages
            display flex
            justify-content center
            align-items center
</style>
