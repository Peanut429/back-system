<template>
    <div class="empolyee">
        <commontitle titleName="系统设置/员工"></commontitle>
        <Row>
            <Col :sm="{span: 24}" :md="{span: 18}">
                <Row :gutter="16">
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput inputTitle="账号名称"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput inputTitle="员工姓名"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <commoninput inputTitle="员工工号"></commoninput>
                    </Col>
                    <Col :xs="{span: 12}" :sm="{span: 6}">
                        <selector listName="分配角色" :list="roleNameList"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :sm="{span: 24}" :md="{span: 6}">
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
                    <Page size="small" show-total :total="4"></Page>
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
                roleNameList: [
                    {label: '全部', value: 'all'},
                    {label: '仓库', value: '仓库'},
                    {label: '财务', value: '财务'},
                    {label: '配送员', value: '配送员'},
                    {label: '超级管理员', value: '超级管理员'}
                ],
                columns: [
                    {title: '账号名称', key: ''},
                    {title: '员工姓名', key: ''},
                    {title: '账号工号', key: ''},
                    {title: '分配角色', key: ''},
                    {title: '创建时间', key: ''},
                    {title: '状态', key: ''},
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {}
                                    }
                                }, '修改密码'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push('/detail');
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            _addNew() {}
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

</style>
