<template>
    <div class="container">
        <PublicNavBar title="" />
        <div class="login-img">
            <img src="http://iwenwiki.com/h5/figertipalliance/assets/logo-DpH7pzzB.png" />
        </div>
        <div class="login-input">
            <van-cell-group inset>
                <van-field v-model="tel" label="手机号" type="tel" />
                <van-field v-model="pwd" label="密码" type="password" />
            </van-cell-group>
        </div>
        <div class="login-btn">
            <van-button type="primary" color="#7232dd" @click="login" block>登录</van-button>
        </div>
        <div class="other">
            <div class="free" @click="toRegister">没有账号？免费注册</div>
            <div class="forget">忘记密码</div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import md5 from "js-md5"
import { useToken } from "@/store/tokenStore.js"
import PublicNavBar from "@/components/PublicNavBar.vue"
import { useRouter,useRoute } from "vue-router"
import { showSuccessToast, showFailToast } from 'vant'
    const tel = ref("");
    const pwd = ref("");
    const salt = "3160c983de13029ce6101ba26fc71563";
    const tokenStore = useToken();
    const router = useRouter();
    const route = useRoute();
    const login = async () => {
        try {
            const result = await axios.post("http://localhost:6699/api/login", {
                phone: tel.value,
                password: pwd.value,
                verify: md5("zaom" + salt)
            })
            if (result.data.status === 200){
                tokenStore.setToken(tel.value,result.data.user.token);
                showSuccessToast("登录成功");
                route.query.redirect ? router.replace(route.query.redirect) : router.replace("/");
            }
        } catch (error) {
            console.log("接口请求出错",error);
        }
    }
    const toRegister = () => {
        router.push("/register");
    }
</script>
<style scoped>
.login-img {
    text-align: center;
    padding-top: 50px;
    width: 100%;
}

.login-input {
    margin-top: 50px;
}

.login-btn {
    padding: 20px;
}

.other {
    display: flex;
    padding: 0 20px;
}

.free {
    flex: 1;
    text-align: left;
    font-size: 14px;
}

.forget {
    flex: 1;
    text-align: right;
    font-size: 14px;
}
</style>