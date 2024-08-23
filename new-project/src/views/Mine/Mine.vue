<template>
    <div class="load" v-if="isLogin">
        <div class="load-container">
            <div class="load-set">
                <van-icon name="chat" />
                <van-icon name="setting" @click="onSet" />
            </div>
            <div class="load-body">
                <div class="load-img">
                    <van-image round width="5rem" height="5rem"
                        src="https://img.wowoqq.com/allimg/190227/1-1Z22G94517-51.jpg" />
                </div>
                <div class="load-p">
                    用户
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <div class="order-status">
            <van-grid>
                <van-grid-item icon="cash-back-record-o" text="待支付" @click="inOrderInfo(1)" />
                <van-grid-item icon="completed-o" text="待收货" @click="inOrderInfo(2)" />
                <van-grid-item icon="records-o" text="待评价" @click="inOrderInfo(3)" />
                <van-grid-item icon="orders-o" text="全部订单" @click="inOrderInfo(0)" />
            </van-grid>
        </div>
        <div class="other-func">
            <van-grid :column-num="3">
                <van-grid-item icon="guide-o" text="我的发布" />
                <van-grid-item icon="star-o" text="我的收藏" />
                <van-grid-item icon="clock-o" text="浏览历史" />
                <van-grid-item icon="wap-home-o" text="常用地址" />
                <van-grid-item icon="service-o" text="联系客服" />
                <van-grid-item icon="comment-circle-o" text="意见反馈" />
            </van-grid>
        </div>
    </div>
    <div class="unload" v-else>
        <van-icon name="user-o" />
        <p>您还没有登录，请登录后查看用户信息</p>
        <van-button type="primary" to="/login">登录</van-button>
    </div>
</template>
<script setup>
import { useToken } from "@/store/tokenStore.js"
import { ref } from 'vue'
import { onMounted,onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { watch,watchEffect } from "vue"
    const tokenStore = useToken();
    const isLogin = ref();
    const router = useRouter();
    watchEffect(() => {
        if(JSON.parse(localStorage.getItem("tokenStore"))){
            isLogin.value = true;
        }else{
            isLogin.value = false;
        }
    })
    // watchEffect(() => {
    //     if(tokenStore.userInfo.token === ""){
    //         isLogin.value = false;
    //     }else{
    //         isLogin.value = true;
    //     }
    // })
    const inOrderInfo = (type) => {
        router.push({
            name: "ordersView",
            params: {
                type
            }
        })
    }
    const onSet = () => {
        router.push("/set");
    }
</script>
<style scoped>
.unload {
    text-align: center;
    padding-top: 150px;
}

.unload .van-icon {
    font-size: 50px;
    color: #684886;
}

.unload p {
    font-size: 15px;
    margin: 20px;
}

.load-container {
    padding-bottom: 50px;
    background-color: #fff;
}

.load-container .load-set {
    padding: 20px;
    box-sizing: border-box;
    clear: both;
    overflow: hidden;
}

.load-set .van-icon:nth-child(1) {
    float: left;
    font-size: 25px;
}

.load-set .van-icon:nth-child(2) {
    float: right;
    font-size: 25px;
}

.load-img {
    text-align: center;
}

.load-p {
    text-align: center;
}

.load-p .van-icon {
    font-size: 16px;
}

.other-func {
    margin-top: 10px;
}
</style>