<template>
  <div class="main-div">
    <div style="text-align: center;">
      <van-button type="primary" @click="selectEnterpriseContact">选择成员</van-button>
    </div>
    <div class="module-item">
      <div class="item-title">参与成员</div>
      <div class="item-body" style="width: 100%;height: 160px;overflow-y: scroll;margin-top: 10px;">
        <div v-for="user in selectedUserList" :key="user.id" style="height: 76px;width: 60px;float: left;">
          <img style="width: 40px;height: 40px;border-radius: 40px;" :src="user.avatar"/>
          <p style="height: 14px;font-size: 8px;">{{user.id}}</p>
          <p style="height: 14px;font-size: 8px;">{{user.name}}</p>
        </div>
      </div>
      <div class="item-title" style="margin-top: 10px;">讨论组信息</div>
      <div class="item-body">
        <lnk-field v-model="groupName" label="讨论组名称" required/>
      </div>
    </div>
    <div style="text-align: center;margin-top: 20px;">
      <van-button type="danger" @click="openEnterpriseChat">创建会话</van-button>
    </div>
  </div>
</template>

<script>
  import LnkField from '@/components/lnk.field'
  export default {
    name: "communityItem",
    data () {
      return {
        groupName: "",              // 讨论组名称
        selectedUserList: [],       // 已选用户列表
        selectedUserIdList: [],     // 已选用户ID列表
        userIdListStr: ""
      }
    },
    components: {
      LnkField
    },
    created () {
      document.title = '交流';
    },
    methods: {
      /**
       * 拉取讨论组人员
       * */
      selectEnterpriseContact: function () {
        let that = this;
        this.$wx.invoke("selectEnterpriseContact", {
          "fromDepartmentId": -1,                     // 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
          "mode": "multi",                            // 必填，选择模式，single表示单选，multi表示多选
          "type": ["user"],                           // 必填，选择限制类型，指定department、user中的一个或者多个
          //"selectedDepartmentIds": ["2","3"],       // 非必填，已选部门ID列表。用于多次选人时可重入
          "selectedUserIds": that.selectedUserIdList  // 非必填，已选用户ID列表。用于多次选人时可重入
        },function(res){
          if (res.err_msg === "selectEnterpriseContact:ok") {
            if(typeof res.result === 'string') {
              res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
            }
            that.selectedUserList = res.result.userList; // 已选的成员列表
            for (let i = 0; i < that.selectedUserList.length; i++) {
              let user = that.selectedUserList[i];
              that.selectedUserIdList.push(user.id);
            }
          } else {
            this.$toast("取消选择！");
          }
        });
      },
      /**
       * 创建会话
       * */
      openEnterpriseChat: function () {
        let that = this;
        if(this.$util.isEmpty(this.groupName)) {
          this.$toast('讨论组名称不能为空！');
          return;
        }
        if(this.selectedUserIdList.length === 0) {
          this.$toast('请选择参与讨论组人员！');
          return;
        } else {
          for (let i = 0; i < this.selectedUserIdList.length; i++) {
            if(i === 0) {
              this.userIdListStr = this.selectedUserIdList[i]
            } else {
              this.userIdListStr = this.userIdListStr + ';' +this.selectedUserIdList[i]
            }
          }
        }
        this.$wx.openEnterpriseChat({
          // 注意：userIds和externalUserIds至少选填一个，且userIds+openIds总数不能超过2000。
          userIds: this.userIdListStr,     // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
          groupName: this.groupName,       // 必填，会话名称。单聊时该参数传入空字符串""即可。
          success: function(res) {
            // 回调
            that.$toast('讨论组已创建！');
          },
          fail: function(res) {
            if(res.errMsg.indexOf('function not exist') > -1){
              alert('版本过低请升级')
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-div {
    margin-top: 20px;
    text-align: center;
  }
</style>
