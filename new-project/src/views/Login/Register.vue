<template>
    <PublicNavBar />
    <div class="container">
        <h3>新用户注册</h3>
        <div class="input">
            <van-cell-group inset>
                <van-field v-model="tel" label="手机号" type="tel" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <template #button>
                        <van-button type="primary">发送验证码</van-button>
                    </template>
                </van-field>
                <van-field v-model="pwd" label="密码" type="password" />
            </van-cell-group>
            <div class="register-btn">
                <van-button type="primary" color="#7232dd" @click="register" block>注册</van-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import axios from "axios"
import PublicNavBar from "@/components/PublicNavBar.vue"
import { showSuccessToast, showFailToast } from 'vant'
import { useRouter,useRoute } from "vue-router"
    const tel = ref("");
    const pwd = ref("");
    const sms = ref("");
    const router = useRouter();
    const route = useRoute();
    const register = async () => {
        try {
            if (tel.value === "" || pwd.value === "") {
                showFailToast("请输入手机号或密码");
            } else {
                const result = await axios.post("http://localhost:6699/api/register", {
                    phone: tel.value,
                    password: pwd.value
                })
                if (result.data.status === 200){
                    showSuccessToast("注册成功");
                    router.push("/login");
                }
            }
        } catch (error) {
            console.log("接口请求出错",error);
        }
    }
</script>
<style scoped>
.container h3 {
    text-align: center;
    padding: 20px;
}

.register-btn {
    padding: 20px;
}
</style>