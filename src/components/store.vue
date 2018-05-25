<template>
    <div class="store">
        <commontitle titleName="系统设置/门店"></commontitle>
        <Row :gutter="16" type="flex">
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <commoninput inputTitle="门店名称"></commoninput>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <selector listName="经营状态" :list="manageState" :selected="manageState[0].value"></selector>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                <selector listName="门店类型" :list="storeType" :selected="storeType[0].value"></selector>
            </Col>
            <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
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
                     <Page size="small" :total="13" show-total></Page>
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
                manageState: [
                    {label: '全部', value: 'all'},
                    {label: '结业', value: '1'},
                    {label: '正常营业', value: '0'}
                ],
                storeType: [
                    {label: '全部', value: 'all'},
                    {label: '自营', value: '自营'},
                    {label: '加盟', value: '加盟'},
                    {label: '零食', value: '零食'},
                    {label: '果蔬', value: '果蔬'},
                    {label: '生鲜', value: '生鲜'},
                    {label: '便利店', value: '便利店'},
                    {label: '健身', value: '健身'}
                ],
                columns: [
                    {title: '门店编号', key: ''},
                    {title: '门店类型', key: ''},
                    {title: '门店名称', key: ''},
                    {title: '门店地址', key: ''},
                    {title: '硬件类型', key: ''},
                    {title: '创建时间', key: ''},
                    {title: '设备编号', key: ''},
                    {title: '经营状态', key: ''},
                    {title: '操作', key: ''}
                ]
            };
        },
        methods: {
            _addNew() {}
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

</style>
