<template>
    <div class="equipment-manage">
        <commontitle titleName="设备监控/监控管理"></commontitle>
        <Row>
            <Col :sm="{span: 24}" :md="{span: 18}">
                <Row :gutter="16">
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector :list="storeList" listName="所在门店" :selected="storeList[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector :list="abnormalType" listName="异常类型" :selected="abnormalType[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector :list="abnormalClass" listName="异常等级" :selected="abnormalClass[0].value"></selector>
                    </Col>
                    <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
                        <selector :list="processState" listName="处理状态" :selected="processState[0].value"></selector>
                    </Col>
                </Row>
            </Col>
            <Col :sm="{span: 24}" :md="{span: 6}">
                <search></search>
            </Col>
        </Row>
        <Table class="table" :columns="columns">
            <template slot="footer">
                <div class="pages">
                    <Page show-total size="small" :total="100"></Page>
                </div>
            </template>
        </Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import commontitle from '../common/commontitle';
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
              abnormalType: [
                  {label: '全部', value: 'all'},
                  {label: 'PLC故障', value: 'PLC故障'},
                  {label: '门禁故障', value: '门禁故障'},
                  {label: '程序异常', value: '程序异常'},
                  {label: '摄像头异常', value: '摄像头异常'}
              ],
              abnormalClass: [
                  {label: '全部', value: 'all'},
                  {label: '严重', value: '3'},
                  {label: '一般', value: '2'},
                  {label: '轻微', value: '1'}
              ],
              processState: [
                  {label: '全部', value: 'all'},
                  {label: '未解决', value: '1'},
                  {label: '已解决', value: '0'}
              ],
              columns: [
                  {title: '异常编号', key: 'abnormalNumber'},
                  {title: '所在门店', key: 'storeAddress'},
                  {title: '报警时间', key: 'alarmTime'},
                  {title: '异常类型', key: 'abnormalType'},
                  {title: '异常等级', key: 'abnormalClass'},
                  {title: '异常描述', key: 'abnormalDesc'},
                  {title: '处理时间', key: 'processTime'},
                  {title: '处理状态', key: 'processState'},
                  {title: '操作', key: 'actions'}
              ]
          };
        },
        components: {
            commontitle,
            selector,
            search
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .equipment-manage
        .table
            margin-top: 30px
</style>
