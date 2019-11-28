<!--
  @name 自定义的值列表field组件
  @author siye
  @实例：
    Lov: <lnk-lov-field v-model="opportunityItem.source" label="来源渠道" lovType="source"/>
  @备注：
    所有 field 加上 required 属性会有必输小红心提示
 -->
<template>
  <div class="lov-page">
    <div><span class="require-icon" v-if="required">*</span></div>
    <div class="lnk-field">
      <div class="lnk-row">
        <div class="lnk-col-label">{{ label }}</div>
        <div class="lnk-col-content">
          <input class="input"
                 :placeholder="placeholder"
                 readonly
                 @click="showLov"
                 v-bind="$attrs"
                 :value="value|lovTransform(lovType)"
                 />
        </div>
        <label class="iconfont icon-more" v-if="!readonly"></label>
      </div>
      <van-popup v-model="showLovFlag" position="right">
        <div class="module-item">
          <div class="item-title">请选择{{ label }}</div>
          <div class="item-body">
            <div v-for="item in lovList" :key="item.val"  @click="pickLov( item )" class="radio-class">
              <label class="iconfont icon-fangxingxuanzhong icon" v-if="item.val === pickLovValue"></label>
              <label class="iconfont icon-fangxingweixuanzhong icon" v-if="item.val !== pickLovValue"></label>
              <span class="name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'lov-field',
    computed: {
      ...mapGetters(['getLov'])
    },
    data () {
      return {
        placeholder: '',
        showLovFlag: false,
        lovList: [],
        pickLovValue: '',
      }
    },
    props: {
      lovType: String,        // 值列表类型
      value: String,          // 值列表传递的值
      label: String,          // LABEL元素
      required: Boolean,      // 必输标识
      readonly: Boolean       // 只读标识
    },
    created () {
      if(!this.readonly) {
        this.placeholder = '请选择' + this.label;
      }
    },
    methods: {
      showLov: function () {
        if(!this.readonly) {
          this.showLovFlag = true;
          this.lovList = [];
          this.pickLovValue = "";
          this.lovList = this.getLov(this.lovType).value;
          if (!this.required) {
            this.lovList.push({
              name: '不选择',
              val: 'not select'
            })
          }
          for (let i = 0; i < this.lovList.length; i++) {
            let temp = this.lovList[i];
            if (this.value === temp.val) {
              this.pickLovValue = temp.val;
            }
          }
        }
      },
      pickLov: function ( item ) {
        this.showLovFlag = false;
        if(item.name === '不选择') {
          this.$emit("input", "")
        } else {
          this.$emit("input", item.val);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lov-page {
    .icon {
      color: #26a2ff;
      font-size: 18px;
    }
    .radio-class {
      height: 26px;
      font-size: 16px;
      padding: 6px 0 6px 0;
      margin-left: 8px;
      border-bottom: 1px solid #fafafa;
      .name {
        margin-left: 10px;
      }
    }
  }
</style>
