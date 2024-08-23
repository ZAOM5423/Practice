<template>
    <PublicNavBar title="商品详情" />
    <div class="main-container">
        <div class="goods-container">
            <img :src="goodsInfo.image" />
            <p class="title">{{ goodsInfo.title }}</p>
            <p class="box-p">
                <span class="price">￥{{ goodsInfo.price }}.00</span>
                <span class="old-price">￥500</span>
            </p>
            <div class="other">
                <span>快递：免邮费</span>
                <span>好评率：99%</span>
                <span>销量：3000</span>
            </div>
        </div>
        <div class="selectType">
            <p>选择规格</p>
            <van-icon name="arrow" />
        </div>
        <div class="comment-header">
            <div class="title">用户评价(999+)</div>
            <div class="percent">
                <span class="text-desc">98%好评</span>
                <van-icon name="arrow" />
            </div>
        </div>
        <Evaluate :icon="evuluateInfo.icon" :rate="evuluateInfo.rate" :time="evuluateInfo.time"
            :text="evuluateInfo.text" :name="evuluateInfo.name" />
        <div class="more" @click="openMore()">
            <div>查看更多</div>
        </div>
        <div class="buy">
            <van-action-bar>
                <van-action-bar-icon icon="chat-o" text="客服" />
                <van-action-bar-icon icon="cart-o" text="购物车" />
                <van-action-bar-icon icon="shop-o" text="店铺" />
                <van-action-bar-button type="warning" text="加入购物车" />
                <van-action-bar-button type="danger" text="立即购买" @click="onBuy()" />
            </van-action-bar>
        </div>
    </div>

</template>
<script setup>
import axios from 'axios';
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PublicNavBar from "@/components/PublicNavBar.vue"
import Evaluate from "@/components/Evaluate.vue"
import { ref } from 'vue'
const route = useRoute();
const router = useRouter();
const goodsInfo = ref([]);
const evuluateInfo = ref([]);
const requestDetail = async () => {
    try {
        const result = await axios.get("http://iwenwiki.com:3006/api/goods/details", {
            params: {
                id: route.params.id
            }
        });
        if (result.data.status === 200) {
            goodsInfo.value = result.data.data;
        }
    } catch (error) {
        console.log("接口请求失败", error);
    }
}
const getEvaluate = async () => {
    try {
        const result = await axios.get("http://iwenwiki.com:3006/api/comment/goods", {
            params: {
                id: route.params.id
            }
        });
        if (result.data.status === 200) {
            evuluateInfo.value = result.data.data[0];
        }
    } catch (error) {
        console.log("接口请求失败", error);
    }
}
const openMore = () => {
    router.push("/allEvaluate");
}
const getTiemString = () => {
    // 获取当前时间的 Date 对象
    const date = new Date();
    // 获取年份、月份、日期、小时、分钟、秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1，并补齐两位
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // 拼接成没有分隔符的纯字符串格式
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedDate;
}
const onBuy = () => {
    router.push(
        {
            name: "orderDetail",
            params: {
                id:route.params.id,
                orderId:getTiemString()
            }
        }
    );
}
onMounted(() => {
    requestDetail();
    getEvaluate();
})

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.main-container {
    background-color: #fff;
}

.goods-container img {
    width: 100%;
}

.title {
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
}

.price {
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    color: #f23d52;
}

.box-p {
    padding-bottom: 10px;
}

.old-price {
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}

.other {
    display: flex;
    padding: 10px;
}

.other span {
    flex: 1;
    font-size: 12px;
    color: #999;
}

.other span:nth-child(1) {
    text-align: left;
}

.other span:nth-child(2) {
    text-align: center;
}

.other span:nth-child(3) {
    text-align: right;
}

.selectType {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #f3f4f5;
    border-top: 1px solid #f3f4f5;
    box-sizing: border-box;
    margin-top: 10px;
}

.selectType p {
    flex: 1;
    display: inline-block;
    font-size: 14px;
    padding-left: 10px;
}

.van-badge__wrapper {
    flex: 1;
    text-align: right;
}

.more {
    height: 100px;
    padding: 10px;
    border-top: 1px solid #f3f4f5;
    box-sizing: border-box;
}

.more div {
    text-align: center;
    font-size: 14px;
}

.comment {
    border-bottom: 1px solid #f3f4f5;
}

.comment-header {
    padding: 10px;
    display: flex;
}

.comment-header title {
    flex: 1;
    font-size: 14px;
    text-align: left;
}

.percent {
    flex: 1;
    text-align: right;
    color: #999;
}

.text-desc {
    font-size: 12px;
}
</style>