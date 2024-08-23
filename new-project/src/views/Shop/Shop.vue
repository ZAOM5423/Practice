<template>
    <Search />
    <Swipe />
    <div class="container">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '5px 16px' }">
            特惠专题
        </van-divider>
        <img src="http://iwenwiki.com/h5/figertipalliance/assets/d1-ZYG66eFS.png" />
        <img src="http://iwenwiki.com/h5/figertipalliance/assets/d2-C3isx8i-.jpg" />
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '5px 16px' }">
        单品推荐
    </van-divider>
    <PublicGood />
</template>
<script setup>
import Search from "@/components/Search.vue"
import Swipe from "@/components/Swipe.vue"
import PublicGood from "@/components/PublicGood.vue"
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    background-color: #fff;
}

.container img {
    width: 100%;
}
</style>