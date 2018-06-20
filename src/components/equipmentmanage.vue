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
        <Table class="table" :columns="columns" :data="data">
            <template slot="footer">
                <div class="pages">
                    <Page show-total size="small" :total="total"></Page>
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
              searchInfo: {
                  storeId: 'all',
                  type: 'all',
                  grade: 'all',
                  isSolved: 'all'
              },
              storeList: [
                  {label: '全部', value: 'all'}
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
                  {label: '严重', value: '严重'},
                  {label: '一般', value: '一般'},
                  {label: '轻微', value: '轻微'}
              ],
              processState: [
                  {label: '全部', value: 'all'},
                  {label: '未解决', value: 'N'},
                  {label: '已解决', value: 'Y'}
              ],
              columns: [
                  {title: '异常编号', key: 'id', width: 80, fixed: 'left'},
                  {title: '所在门店', key: 'storeName', minWidth: 150, ellipsis: true},
                  {title: '报警时间', key: 'addTime', minWidth: 150},
                  {title: '异常类型', key: 'type', minWidth: 80},
                  {title: '异常等级', key: 'grade', minWidth: 80, align: 'center'},
                  {title: '异常描述', key: 'description', minWidth: 80},
                  {title: '处理时间', key: 'updateTime', minWidth: 150},
                  {
                      title: '处理状态',
                      key: 'isSolved',
                      minWidth: 80,
                      align: 'center',
                      render: (h, params) => {
                          let result = params.row.isSolved === 'Y' ? '已解决' : '未解决';
                          return h('span', result);
                      }
                  },
                  {
                      title: '操作',
                      width: 60,
                      fixed: 'right',
                      render: (h, params) => {
                          if (params.row.isSolved === 'N') {
                              return h('Button', {
                                  props: {
                                      type: 'text',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {
                                          let now = new Date();
                                          this.data[params.index].isSolved = 'Y';
                                          this.$set(this.data[params.index], 'updateTime', now);
                                          console.log(this.data);
                                      }
                                  }
                              }, '操作');
                          }
                      }
                  }
              ],
              data: [],
              total: 0
          };
        },
        beforeMount() {
            this.getStoreList();
            this.getMonitor();
        },
        methods: {
            // 获取门店列表
            getStoreList() {
                this.$store.dispatch('getStoreList').then(res => {
                    let storeDetail = res.data;
                    // console.log(this.storeDetail);
                    storeDetail.forEach(item => {
                        this.storeList.push({label: item.storkName, value: item.id});
                    });
                });
            },
            // 获取监控管理数据
            getMonitor() {
                this.$axios.get('/api/monitor').then(res => {
                    if (res.data.errno === 0) {
                        console.log(res);
                        let data = res.data.data;
                        this.data = data.dataList;
                    }
                });
            }
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
