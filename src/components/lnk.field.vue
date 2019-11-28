<!--
  @name 自定义的普通field组件
  @author siye
  @实例：
    Normal: <lnk-field v-model="opportunityItem.accountName" type="text" label="" hasLink required/>
  @备注：
    所有 field 加上 required 属性会有必输小红心提示
 -->
<template>
  <div>
    <div><span class="require-icon" v-if="required">*</span></div>
    <div class="lnk-field">
      <div class="lnk-row">
        <div class="lnk-col-label">{{ label }}</div>
        <div class="lnk-col-content">
          <input class="input"
                 :type="type"
                 :readonly="readonly"
                 :placeholder="placeholder"
                 v-bind="$attrs"
                 :value="value"
                 @input="$emit('input', $event.target.value)"
                 @click="$emit('click')"
                 />
        </div>
        <div v-if="hasLink">
          <label class="iconfont icon-more"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lnk-field',
    data () {
      return {
        placeholder: ''
      }
    },
    props: {
      value: String,          // 值列表传递的值
      label: String,          // LABEL
      type: String,           // type
      hasLink: Boolean,       // 是否显示右向箭头
      required: Boolean,      // 必输标识
      readonly: Boolean       // 只读标识
    },
    created () {
      if(!this.readonly) {
        this.placeholder = '请输入' + this.label;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
