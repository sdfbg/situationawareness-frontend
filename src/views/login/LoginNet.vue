<template>
  <div class="login_wrap">

    <div class="title_area">
      <img src="../../assets/images/netlogin/title.png"  />
    </div>
    <a-row type="flex" justify="center">
      <a-col :span="8">
        <div class="login_area">
          <!-- <img src="@/assets/images/login/login-bg.png" class="login-img"   > -->
          <div class="login_title">
            <img src="../../assets/images/netlogin/login_title.png" />
          </div>
          <div>
            <a-form
              :form="form"
              :wrapper-col="{ span: 18,offset:3 }"
              class="login-form"
            >
              <div class="id-area">
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'accountNumber',
                      {
                        rules: [{ required: true, message: '请输入用户ID!' }],
                        initialValue: accountNumber,
                      },
                    ]"
                    placeholder
                    class="input-area1"
                  >
                    <img slot="prefix" src="../../assets/images/netlogin/yonghu.png"/>
                  </a-input>
                </a-form-item>
              </div>
              <div class="pwd-area">
                <a-form-item >
                  <a-input
                    v-decorator="[
                      'password',
                      {
                        rules: [{ required: true, message: '请输入密码!' }],
                        initialValue: password,
                      },
                    ]"
                    type="password"
                    placeholder
                  >
                     <img slot="prefix" src="../../assets/images/netlogin/mima.png"/>
                  </a-input>
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
                    >记住密码</a-checkbox
                  >
                </a-form-item>
              </div>

              <a-form-item>
                <button @click="handleSubmit" class="login_button">
                  登&emsp;录
                </button>
              </a-form-item>
              <!-- <div class="key-button-img">
                <button html-type="submit" class="login-button login-b-font">
                  证书登录
                </button>
              </div> -->
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
    };
  },

  mounted() {
    this.getCookie();
  },
  created() {
    // this.form 是UI框架中登录框的源码之一，研究代码时可以忽略
    this.form = this.$form.createForm(this, {
      props: { name: "normal_login" },
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
    handleSubmit() {
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
          this.$axios.post(api.netLogin(), data).then(res => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setToken(res.headers.authorization);
            this.$router.push("/all");
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
    },
  },
};
</script>
<style  scoped lang='less'>
@import "~@/assets/style/netlogin.less";
</style>
