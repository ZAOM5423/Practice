<template>
    <PublicNavBar title="城市选择" />
    <div class="current-city">
        <h3>当前定位城市</h3>
        <div>北京</div>
    </div>
    <div class="change-city">选择城市</div>
    <van-index-bar>
        <div v-for="(value, key, index) in cityJSON" :key="index">
            <van-index-anchor :index="key" />
            <van-cell :title="item.city" v-for="(item, cityIndex) in cityJSON[key]" :key="cityIndex" @click="confirmCity(item.city)" />
        </div>
    </van-index-bar>
</template>
<script setup>
import cityJSON from "@/assets/public/city.json"
import { useCurrentCity } from "@/store/currentCityStore.js"
import { useRouter } from "vue-router"
import PublicNavBar from "@/components/PublicNavBar.vue"

    const router = useRouter();
    const cityStore = useCurrentCity();
    const confirmCity = (value) => {
        cityStore.newCity = value;
        router.back();
    }
</script>
<style scoped>
.current-city {
    box-sizing: border-box;
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
}

.current-city h3 {
    font-size: 14px;
    color: #999;
    font-weight: 400;
    margin-top: -2px;
}

.current-city div {
    font-size: 14px;
    margin-top: 10px;
    margin-top: -2px;
}

.change-city {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
}
</style>