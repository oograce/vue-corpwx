<!--
  @name tab页上的右侧filter popup，默认占tab宽度的 4/24
  @author siye
  @desc：
    1、配置filters参数 filters: [ { name: '购买原因', select: [], type: 'BUY_REASON', lov: [] } ]
    2、定义handle方法 searchByFilter: function ( filters ) { } 对传入的filter进行完善后的参数
    3、使用：
      <van-row>
        <lnk-filter-tab :filters="filters" @handle="searchByFilter" span="4"></lnk-filter-tab>
      </van-row>
-->
<template>
    <div>
      <van-col :span="span">
        <div @click="showFilterPanel">
          <label class="iconfont icon-shaixuan" style="font-size: 24px;"></label>
        </div>
      </van-col>
      <van-popup v-model="filterPanel" position="right" :overlay="true"
                 style="width: 60%;height: 100%;">
        <div class="module-item">
          <div v-for="(item, index) in filters" :key="index">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-body">
              <div class="filter_panel">
                <div v-for="(lovItem, num) in item.lov" class="filter_item" :key="num"
                     :class="{'checked-item': lovItem.selected}"
                     @click="selectFilterProperty( index, lovItem )">
                  <span>{{ lovItem.name }}</span>
                  <label class="iconfont icon-selected check-icon" v-show="lovItem.selected"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-row style="width: 100%;position: fixed;bottom: 0;height: 44px;">
          <van-col span="12">
            <van-button bottom-action @click="initFilterData">重置</van-button>
          </van-col>
          <van-col span="12">
            <van-button type="primary" bottom-action @click="searchByFilter">完成</van-button>
          </van-col>
        </van-row>
      </van-popup>
    </div>
</template>

<script>
  export default {
    name: "filterPopup",
    data () {
      return {
        filterPanel: false
      }
    },
    created () {
      // 处理筛选popup上的数据
      for(let i=0;i<this.filters.length;i++) {
        this.filters[i].lov = this.$store.getters.getLov(this.filters[i].type).value;
        for(let j=0;j<this.filters[i].lov.length;j++) {
          this.filters[i].lov[j] = Object.assign( {}, this.filters[i].lov[j], { selected: false });
        }
      }
    },
    props: {
      filters: Array,         // 过滤条件数组
      isMultiple: {           // 是否多选
        type: Boolean,
        default: false
      },
      span: {                 // 宽度
        type: String,
        default: '4'
      }
    },
    methods: {
      // 打开筛选框
      showFilterPanel: function () {
        this.initFilterData();
        this.filterPanel = true;
      },
      // 重置筛选条件
      initFilterData: function () {
        for(let i=0;i<this.filters.length;i++) {
          for(let j=0;j<this.filters[i].lov.length;j++) {
            this.filters[i].lov[j].selected = false;
          }
          this.filters[i].select = [];
        }
        this.$forceUpdate();
      },
      // 选中筛选条件
      selectFilterProperty: function ( index, lovItem ) {
        if(this.isMultiple) {      // 多选
          lovItem.selected = !lovItem.selected;
          this.$forceUpdate();
          let findFlag = false;
          let findIndex = false;
          for(let i=0;i<this.filters[index].select.length;i++) {
            if(this.filters[index].select[i] === lovItem.val) {
              findFlag = true;
              findIndex = index;
              break;
            }
          }
          if(findFlag) {
            if(!lovItem.selected) {
              this.filters[index].select.splice(findIndex, 1);
            }
          } else {
            if(lovItem.selected) {
              this.filters[index].select.push(lovItem.val);
            }
          }
        } else {                  // 单选
          if(!lovItem.selected) {
            for(let i=0;i<this.filters[index].lov.length;i++) {
              this.filters[index].lov[i].selected = false;
            }
            lovItem.selected = true;
            this.$forceupdate();
            this.filters[index].select = [];
            this.filters[index].select.push(lovItem.val);
          }
        }
      },
      // 完成筛选
      searchByFilter: function () {
        this.filterPanel = false;
        this.$emit('handle', this.filters)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter_panel {
    text-align: left;
    .filter_item {
      display: inline-block;
      font-size: 12px;
      width: 75px;
      text-align: center;
      height: 27px;
      line-height: 27px;
      border-radius: 10px;
      border: 1px solid #d1d1d1;
      margin: 5px;
      position: relative;
    }
    .checked-item {
      border: 1px solid #26a2ff !important;
    }
    .check-icon {
      color: #26a2ff;
      font-size: 18px;
      position: absolute;
      right: -6px;
      top: -8px;
      background: white;
    }
  }
</style>
