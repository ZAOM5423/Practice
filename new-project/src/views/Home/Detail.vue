<template>
    <PublicNavBar title="美业快讯" />
    <div class="banner">
        <img :src="imgSrc" />
    </div>
    <div class="detailList">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="detailImg" v-for="(item, index) in list" :key="index">
                <img :src="item.image" />
                <div class="detailText">
                    <p>{{ item.title }}</p>
                    <span>{{ item.descs }}</span>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script setup>
import PublicNavBar from "@/components/PublicNavBar.vue"
import { onMounted } from "vue"
import axios from "axios"
import { ref } from "vue";
const imgSrc = ref("");
const loading = ref(false);
const finished = ref(false);
const list = ref([]);
const getImg = async () => {
    try {
        const result = await axios.get("http://iwenwiki.com:3006/api/banner");
        if (result.data.status === 200) {
            imgSrc.value = result.data.data[0].image;
        }
    } catch (error) {
        console.log("获取图片时出错了", error);
    }
}
onMounted(() => {
    getImg();
})
const onLoad = async () => {
    try {
        const result = await axios.get("http://iwenwiki.com:3006/api/beauty");
        if (result.data.status === 200) {
            result.data.data.forEach((item) => {
                list.value.push(item);
            })
        }
    } catch (error) {
        console.log("获取列表时出错了", error);
    }

    // 加载状态结束
    loading.value = false;

    //数据全部加载完成
    if (list.value.length >= list.value.length) {
        finished.value = true;
    }
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

div {
    box-sizing: border-box;
}

.banner img {
    width: 100%;
}

.detailImg {
    display: flex;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
}

.detailImg img {
    height: 100px;
    width: 100px;
    border-radius: 5px;
}

.detailText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
}

.detailText p {
    font-size: 15px;
    padding: 10px 0;
}

.detailText span {
    display: block;
    color: #999;
    font-size: 14px;
    padding: 10px 0;
}
</style>