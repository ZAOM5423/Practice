<template>
    <Search />
    <Swipe />
    <div class="navigation">
        <div class="nav-item">
            <img src="@/assets/images/nav1.png" />
            <span>转让出租</span>
        </div>
        <div class="nav-item">
            <img src="@/assets/images/nav2.png" />
            <span>招聘求职</span>
        </div>
        <div class="nav-item">
            <img src="@/assets/images/nav3.png" />
            <span>流行产品</span>
        </div>
        <div class="nav-item">
            <img src="@/assets/images/nav4.png" />
            <span>培训课程</span>
        </div>
        <div class="nav-item">
            <img src="@/assets/images/nav5.png" />
            <span>批发进货</span>
        </div>
    </div>
    <div class="information" @click="openDetail()">
        <h3>美甲咨询</h3>
        <p>年会不能错过的款，美呆了~</p>
        <van-icon name="arrow" />
    </div>
    <div class="recommend">
        <div class="hot">
            <h3>热门活动</h3>
        </div>
        <div class="option">
            <h3>优选店铺</h3>
        </div>
    </div>
    <div class="roll">
        <div class="roll-header">
            <h3>最新商铺</h3>
            <span>查看全部<van-icon name="arrow" /></span>
        </div>
        <div class="roll-main">
            <div class="roll-container" v-for="(item, index) in roll" :key="index">
                <img :src="item.image" />
                <p>{{ item.title }}</p>
                <span>{{ item.price }}元/月</span>
            </div>
        </div>
    </div>
    <div class="goods">
        <div class="title">
            <h3>————为你推荐————</h3>
        </div>
        <PublicGood />
    </div>
</template>
<script setup>
import Search from "@/components/Search.vue"
import Swipe from "@/components/Swipe.vue"
import PublicGood from "@/components/PublicGood.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"
import { onMounted } from "vue"
import axios from "axios"
    const roll = ref([]);
    const router = useRouter();
    const openDetail = () => {
        router.push("/detail");
    }
    const getRoll = async () => {
        try {
            const result = await axios.get("http://iwenwiki.com:3006/api/newgoods");
            if (result.data.status === 200) {
                result.data.data.forEach(item => {
                    roll.value.push(item);
                });
            }
        } catch (error) {
            console.log("接口请求出错了", error);
        }
    }
    onMounted(() => {
        getRoll();

    })
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.navigation {
    padding: 5px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 10px;
}

.nav-item img {
    margin-top: -5px;
    width: 40px;
}

.nav-item span {
    display: block;
    margin-top: 7px;
    font-size: 12px;
}

.information {
    display: flex;
    padding: 10px;
    background-color: #fff;
}

.information h3 {
    font-size: 14px;
    color: #999;
    font-weight: 400;
    border-right: 1px solid #f3f4f5;
}

.information p {
    font-size: 14px;
    margin-left: 20px;
}

.van-badge__wrapper {
    flex: 1;
    text-align: right;
}

.recommend {
    display: flex;
    background-color: #fff;
    padding: 10px;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.recommend div {
    flex: 1;
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.hot {
    background-color: rgb(0, 255, 225);
    margin-right: 5px;
}

.option {
    background-color: aquamarine;
    margin-left: 5px;
}

.roll {
    background-color: #fff;
    padding: 5px;
    box-sizing: border-box;
}

.roll-header {
    display: flex;
}

.roll-header h3 {
    flex: 1;
    font-weight: 400;
    font-size: 16px;
    padding-left: 5px;
}

.roll-header span {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #999;
}

.roll-main {
    display: flex;
    text-align: center;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.roll-container {
    margin-right: 15px;
}

.roll-container img {
    display: block;
    height: 130px;
    width: 230px;
}

.roll-container p {
    white-space: normal;
    word-break: break-word;
    font-size: 14px;
    text-align: left;
    padding: 10px;
}

.roll-container span {
    display: block;
    font-size: 14px;
    width: 100%;
    text-align: left;
    padding: 0 10px 10px;
    color: #820085;
}
.title{
    display: flex;
    justify-content: center;
    padding: 5px;
}
.title h3 {
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    color: #999;
}
</style>