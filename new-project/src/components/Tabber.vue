<template>
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item name="address" icon="location-o" to="address">选址</van-tabbar-item>
        <van-tabbar-item name="shop" icon="shopping-cart-o" to="shop">商城</van-tabbar-item>
        <van-tabbar-item name="personnel" icon="comment-o" to="personnel">人才库</van-tabbar-item>
        <van-tabbar-item name="mine" icon="user-circle-o" to="mine">我的</van-tabbar-item>
    </van-tabbar>

</template>
<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { onMounted } from "vue"
    const active = ref("home")
    const route = useRoute();
    onMounted(() => {
        active.value = route.path.slice(1);
        if (route.path.slice(1) === ""){
            active.value = "home";
        }
    })
</script>
<style>
    
</style>