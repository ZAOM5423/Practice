<template>
    <PublicNavBar title="订单详情" />
    <div class="order-container">
        <div class="count-down">
            <div class="cancel" v-if="isExpired">
                <p>订单已取消</p>
            </div>
            <div class="wait" v-else>
                <h3>等待买家付款</h3>
                <span>{{ hours }}小时</span>
                <span>{{ minutes }}分</span>
                <span>{{ seconds }}秒</span>
                <span>后自动取消订单</span>
            </div>
        </div>
        <div class="address" @click="onSelectAdd()">
            <div class="address-icon-1">
                <van-icon name="map-marked" />
            </div>
            <div class="address-info">
                <div class="address-base">
                    <span>阿卡丽</span>
                    <span>19028462118</span>
                </div>
                <div class="address-detail">
                    <span>北京市西城区大望路酒仙桥村</span>
                </div>
            </div>
            <div class="address-icon-2">
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="order-card">
            <van-card :num="card.ordernum" :price="card.price" :desc="card.descs" :title="card.title"
                :thumb="card.image" />
        </div>
        <van-cell-group style="margin-top:10px;">
            <van-cell title="支付金额">
                <template #value>
                    <span class="custom-value">￥{{ totalPrice }}</span>
                </template>
            </van-cell>
            <van-cell title="运费" value="￥0" style="border-top: 1px solid #e5e5e5;" />
        </van-cell-group>
        <van-cell-group style="margin-top:10px;">
            <van-cell title="支付方式" value="支付宝" />
        </van-cell-group>
        <!-- 优惠券单元格 -->
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"
            style="margin-top:10px;" />
        <!-- 优惠券列表 -->
        <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
            <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" @change="onChange"
                @exchange="onExchange" />
        </van-popup>
        <div class="show-info">
            <span>订单编号:{{ route.params.orderId }}</span>
            <span>下单时间:{{ currentTime }}</span>
        </div>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PublicNavBar from "@/components/PublicNavBar.vue"
import axios from 'axios'
import { computed } from "vue"

const route = useRoute();
const router = useRouter();
// 存储目标时间的键
const storageKey = 'countdown-target-time';
const currentTime = ref(localStorage.getItem(storageKey));

// 从 localStorage 中恢复目标时间
const storedTargetDate = localStorage.getItem(storageKey);
const targetDate = ref(storedTargetDate ? new Date(storedTargetDate) : new Date(Date.now() + 1000 * 60 * 5)); // 默认 5 分钟后

const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');
const isExpired = ref(false);
const card = ref([]);

let intervalId;

function updateCountdown() {
    const now = new Date();
    const timeLeft = targetDate.value - now;

    if (timeLeft <= 0) {
        hours.value = '00';
        minutes.value = '00';
        seconds.value = '00';
        isExpired.value = true;
        clearInterval(intervalId);
        localStorage.removeItem(storageKey); // 倒计时结束后清除 localStorage 数据
        return;
    }

    const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    hours.value = String(hoursLeft).padStart(2, '0');
    minutes.value = String(minutesLeft).padStart(2, '0');
    seconds.value = String(secondsLeft).padStart(2, '0');
}

// 设置目标时间并保存到 localStorage
function setTargetDate() {
    const futureDate = new Date(Date.now() + 1000 * 60 * 5); // 5 分钟后
    targetDate.value = futureDate;
    localStorage.setItem(storageKey, futureDate.toISOString());
}

const onSelectAdd = () => {
    router.push("/selectAddress");
}

const getCard = async () => {
    try {
        const res = await axios.get("http://iwenwiki.com:3006/api/order/all");
        if (res.data.status == 200) {
            res.data.data.forEach((item) => {
                if (item.id == route.params.id) {
                    card.value = item;
                }
            });
        }
    } catch (error) {
        console.log("接口请求失败", error);
    }
}

const totalPrice = computed(() => {
    return (card.value.price * card.value.ordernum).toFixed(2);
})

const coupon = {
    available: 1,
    condition: '功能测试中\n功能测试中',
    reason: '',
    value: 150,
    name: '功能测试中',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: 'null',
    unitDesc: '元',
};

const coupons = ref([coupon]);
const showList = ref(false);
const chosenCoupon = ref(-1);

const onChange = (index) => {
    showList.value = false;
    chosenCoupon.value = index;
};
const onExchange = (code) => {
    coupons.value.push(coupon);
};

const getCurrentTime = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (currentTime.value) {
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            currentTime.value = currentTime.value.replace(new RegExp(letter, 'g'), ' ');
        }
    }
}

const onSubmit = () => {
    
}

onMounted(() => {
    if (!storedTargetDate) {
        setTargetDate();
    }
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
    getCard();
    getCurrentTime();
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped>
.count-down {
    background-color: #919191;
    padding: 10px;
    box-sizing: border-box;
}

.count-down .wait h3 {
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    margin-top: 5px;
}

.count-down .wait span {
    color: #fff;

}

.count-down .cancel {
    height: 64px;
    display: flex;
    align-items: center;
}

.count-down .cancel p {
    color: #fff;
    font-weight: 400;
    font-size: 16px;
}

.address {
    background-color: #fff;
    display: flex;
}

.address .address-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
}

.address .address-base {
    flex: 1;
    margin: 5px;
}

.address .address-base span:nth-child(2) {
    padding-left: 15px;
}

.address .address-detail {
    flex: 1;
    margin: 5px;
}

.address .address-icon-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    padding-right: 20px;
}

.address .address-icon-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    padding-left: 20px;
}

.order-card {
    margin-top: 10px;
}

.order-card .van-card {
    padding: 10px;
}

.custom-value {
    color: red;
    /* 设置文字颜色为红色 */
    font-weight: bold;
    /* 设置文字加粗 */
    font-size: 18px;
    /* 调整文字大小 */
}

.show-info {
    background-color: #fff;
    display: flex;
    padding-bottom: 10px;
    margin-top: 10px;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px 10px;
}

.show-info span {
    flex: 1;
    font-size: 13px;
    color: #999999;
}

.show-info span:nth-child(1) {
    padding-bottom: 5px;
}

.show-info span:nth-child(2) {
    padding-top: 5px;
}

.van-submit-bar {
    position: relative;
}
</style>