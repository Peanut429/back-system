<template>
    <div class="promotion">
        <commontitle titleName="价格管理/促销"></commontitle>
        <Row :gutter="16">
            <Col span="16">
                <Row :gutter="16" type="flex" class="selectors">
                    <Col>
                        <selector listName="所在门店" :list="storeList" :selected="storeList[0].value"></selector>
                    </Col>
                    <Col>
                        <selector listName="促销类型" :list="promotionType" :selected="promotionType[0].value"></selector>
                    </Col>
                    <Col>
                        <selector listName="促销状态" :list="promotionState" :selected="promotionState[0].value"></selector>
                    </Col>
                    <Col>
                        <DatePicker type="date" @on-change="chooseDate" placeholder="开始时间"></DatePicker>
                    </Col>
                    <Col>
                        <DatePicker type="date" @on-change="chooseDate" placeholder="结束时间"></DatePicker>
                    </Col>
                </Row>
            </Col>
            <Col class="buttons" :md="{span: '5'}">
                <Button size="large" class="clear-btn" type="ghost">清空条件</Button>
                <Button size="large" class="search-btn" type="primary">搜索</Button>
            </Col>
        </Row>
        <Row class="action-row" type="flex" justify="end" align="middle">
            <Col>
                <router-link to="/home/addpromotion">
                    <div class="action-col">
                        <Icon class="icon" size="20" type="ios-plus-outline"></Icon>
                        <span>新增促销</span>
                    </div>
                </router-link>
            </Col>
        </Row>
        <Table :columns="promotionData"></Table>
    </div>
</template>

<script type="text/ecmascript-6">
import commontitle from '../common/commontitle';
import commoninput from '../common/commoninput';
import selector from '../common/selector';
import datepick from '../common/datepick';
export default {
  data() {
      return {
          storeList: [
              {label: '全部', value: 'all'},
              {label: '国际科技园01L', value: 'gk01'},
              {label: '国际科技园02L', value: 'gk02'},
              {label: '国际科技园03L', value: 'gk03'}
          ],
          promotionType: [
              {label: '全部', value: 'all'},
              {label: '满减促销', value: 'fullReduction'},
              {label: '单品促销', value: 'single'},
              {label: '套装促销', value: 'suit'},
              {label: '赠品促销', value: 'gift'},
              {label: '满赠促销', value: 'fullGift'},
              {label: '首单立减', value: 'firstOrder'}
          ],
          promotionState: [
              {label: '全部', value: 'all'},
              {label: '进行中', value: 'underway'},
              {label: '已取消', value: 'canceled'},
              {label: '已失效', value: 'failure'},
              {label: '未开始', value: 'notStarted'}
          ],
          promotionData: [
              {title: '促销编号', key: 'id'},
              {title: '所在门店', key: 'storeAddress'},
              {title: '促销类型', key: 'promotionType'},
              {title: '商品总数', key: 'totalGoods'},
              {title: '促销时间', key: 'time'},
              {title: '促销状态', key: 'promotionState'},
              {title: '操作', key: 'actions'}
          ]
      };
  },
  components: {
      commontitle,
      commoninput,
      selector,
      datepick
  },
  methods: {
      chooseDate(date, content) {
          console.log(date, content);
      }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .promotion
        position: relative
        .selectors
            .ivu-col
                flex: 1
                align-self: flex-end
               /*.ivu-date-picker
                    width: 100%
                    .ivu-input
                        height: 36px
                        border: none
                        border-radius: 0
                        border-bottom: 1px solid rgba(0,0,0,0.1)
                        background-color: transparent
                        font-size: 14px
                        &:focus
                            border-bottom: 1px solid rgb(33, 150, 243)*/
        .buttons
            display: flex
            justify-content: flex-end
            align-items: flex-end
            height: 59px
            .clear-btn, .search-btn
                margin-left: 10px
                box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
        /*.action-row
            margin: 30px 0
            font-size: 15px
            color: #7b7b7b
            user-select: none
            box-sizing: border-box
            .action-col
                display: flex
                align-items: center
                cursor: pointer
                color: rgb(123, 123, 123)
                .icon
                    margin-right: 10px*/
</style>
