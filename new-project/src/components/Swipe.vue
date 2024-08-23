<template>
    <div class="container">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>
import axios from "axios"
import { ref } from "vue";
import { onMounted } from "vue";
const images = ref([]);
const getImg = async () => {
    try {
        const response = await axios.get("http://iwenwiki.com:3006/api/banner");
        if (response.data.status === 200) {
            response.data.data.forEach((item) => {
                images.value.push(item.image);
            });
        }
    } catch (error) {
        console.log("发生了一些错误", error);
    }
}
onMounted(() => {
    getImg();
})
</script>
<style scoped>
.container {
    margin-top: 55px;
}

img {
    width: 100%;
}
</style>