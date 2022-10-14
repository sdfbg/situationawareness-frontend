<template>
  <div class="body-bg">
    <div class="title-area">
      <img src="@/assets/images/login/loginNew.png" class="title-img" />
    </div>
    <a-row>
      <a-col :span="14" :offset="1">
        <div class="connet-area">
          <img src="@/assets/images/login/login3-22.png" class="connet-img" />
        </div>
      </a-col>
      <a-col :span="8">
        <div class="login-area">
          <!-- <img src="@/assets/images/login/login-bg.png" class="login-img"   > -->
          <div class="login-title">
            <img src="@/assets/images/login/login-font.png" class="login-img" />
          </div>
          <div>
            <a-form
              :form="form"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              class="login-form"
              @submit="handleSubmit"
            >
              <div class="id-area">
                <a-form-item label="用户ID：">
                  <a-input
                    v-decorator="[
              'accountNumber',
              { rules: [{ required: true, message: '请输入用户ID!' }], initialValue: accountNumber },
            ]"

                    placeholder
                    class="input-area1"
                  ></a-input>
                </a-form-item>
              </div>
              <div class="pwd-area">
                <a-form-item label="密码：">
                  <a-input
                    v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] ,initialValue: password},
            ]"
                    type="password"
                    placeholder
                  ></a-input>
                </a-form-item>
              </div>

              <div class="login_other">
                <a-form-item>
                  <a-checkbox
                    v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true,
                },
              ]"
                    class="remember-font"
                  >记住密码</a-checkbox>
                </a-form-item>
              </div>

              <div class="login-button-img">
                <button html-type="submit" class="login-button login-b-font">登&emsp;录</button>
              </div>
              <div :class="disabled?'key-button-img key-button-disabled':'key-button-img'">
                <button html-type="submit" :disabled="disabled" class="login-button login-b-font">证书登录</button>
              </div>
            </a-form>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import api from "@/api";
import { setToken } from "@/api/store.js";
export default {
  data() {
    return {
    form: null,
      accountNumber: "",
      password: "",
      disabled:true
    };
  },

  mounted() {
    this.getCookie();
  },
  created() {
    // this.form 是UI框架中登录框的源码之一，研究代码时可以忽略
    this.form = this.$form.createForm(this, {
      props: { name: "normal_login" }
    });
    this.initForm();
  },
  methods: {
    initForm() {
      const accountNumber = this.getCookie("accountNumber");
      const password = this.getCookie("password");
      if (accountNumber && password) {
        this.accountNumber = accountNumber;
        this.password = password;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (values.remember) {
          this.setCookie(values.accountNumber, values.password, 7);
        } else {
          this.clearCookie();
        }

        let data = {
          accountnumber: values.accountNumber,
          password: values.password
        };
        if (!err) {
          this.$axios.post(api.Login(), data).then(res => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setToken(res.headers.authorization);
            //todo修改跳转
            this.$router.push("/portal");
            // this.$router.push("/layout");
          });
        }
      });
    },
    //设置cookie
    setCookie(accountnumber, password, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "accountNumber" +
        "=" +
        accountnumber +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + password + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] == key) {
            return arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1);
    }
  }
};
</script>
<style  scoped lang='less'>
@import "../../assets/style/login.less";
</style>
