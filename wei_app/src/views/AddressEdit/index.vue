<template>
  <form class="mui-input-group">
    <div class="mui-input-row">
      <label class="tit">收件人</label>
      <input v-model="form.name" type="text" class="mui-input-clear" placeholder="请输入收件人姓名" />
    </div>
    <div class="mui-input-row">
      <label class="tit">联系方式</label>
      <input v-model="form.tel" type="text" class="mui-input-clear" placeholder="请输入手机号" />
    </div>
    <div class="mui-input-row">
      <label class="tit">所在地区</label>
      <input
        v-model="form.area"
        type="text"
        class="mui-input-clear"
        placeholder="所在地区"
        @click="choose"
      />
      <div class="divwrap">
        <div class="mask" @click="choose" v-show="show"></div>
        <v-distpicker
          v-show="show"
          type="mobile"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
          :province="newInfo.province"
          :city="newInfo.city"
          :area="newInfo.district"
        ></v-distpicker>
      </div>
    </div>
    <div class="mui-input-row">
      <label class="tit">详细地址</label>
      <input v-model="form.detail" type="text" class="mui-input-clear" placeholder="请输入详细地址" />
    </div>
    <div class="mui-button-row">
      <button @click="save" type="button" class="mui-btn mui-btn-primary mui-btn-block">确认</button>
      <button v-show="id" @click="del" type="button" class="mui-btn mui-btn-danger mui-btn-block">删除</button>
    </div>
  </form>
</template>

<script>
import VDistpicker from "v-distpicker";
import addressApi from "../../api/addressApi";
export default {
  props: ["id"],
  components: {
    "v-distpicker": VDistpicker
  },
  data() {
    return {
      form: {
        name: "",
        tel: "",
        area: "",
        detail: "",
        id: ""
      },
      show: false, // 是否显示遮罩层
      newInfo: {
        province: "", // 省
        city: "", // 市
        area: "" // 区
      }
    };
  },
  methods: {
    async del() {
      this.$indicator.open({ text: "删除中" });
      this.form.id = this.id;
      let res = await addressApi.delAddress(this.form);
      this.$indicator.close();
      const { msg, data, code } = res;
      if (code === 0) {
        this.$toast(msg);
      } else if (code === 1) {
        this.$toast(msg);
        this.$router.go(-1);
      } else if (code === 2) {
        this.$router.push("/user/login");
      }
    },

    choose() {
      this.show = !this.show;
    },
    async save() {
      this.$indicator.open({ text: "提交中" });
      this.form.id = this.id;
      let res = await addressApi.saveAddress(this.form);
      this.$indicator.close();
      const { msg, code, data } = res;
      if (code === 1) {
        this.$toast(msg);
        this.$router.go(-1);
      } else if (code === 2) {
        this.$toast(msg);
        this.$router.push("/user/login");
      } else {
        this.$toast(msg);
      }
    },
    onChangeProvince(data) {
      this.newInfo.province = data.value;
    },
    onChangeCity(data) {
      this.newInfo.city = data.value;
    },
    onChangeArea(data) {
      this.newInfo.area = data.value;
      this.form.area =
        this.newInfo.province +
        "-" +
        this.newInfo.city +
        "-" +
        this.newInfo.area;
      this.show = false;
    },
    // 编辑收获地址
    async editAddress() {
      if (!this.id) return;
      this.$indicator.open({ text: "加载中" });
      let res = await addressApi.editAddress(this.id);
      this.$indicator.close();
      const { msg, code, data } = res;
      if (code === 0) {
        this.$toast(msg);
      } else if (code === 1) {
        this.form = data;
      } else if (code === 2) {
        this.$router.push("/user/login");
      }
    }
  },
  created() {
    this.editAddress();
  }
};
</script>

<style lang="scss" scoped>
.mui-input-group .mui-button-row {
  height: auto;
}
.mui-input-clear {
  font-size: 14px;
}
.mui-input-group:before {
  list-style: none;
}
.mui-button-row {
  margin-top: 20px;
  button {
    margin: 20px 0;
    padding: 10px 0;
  }
}
.tit {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
}
.divwrap > .mask {
  background: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.divwrap > .distpicker-address-wrapper {
  color: #999;
  background: #fff;
  border-top: 1px solid #ccc;
  z-index: 1;
  height: 300px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
