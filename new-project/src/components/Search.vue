<template>
    <div class="header">
        <van-search class="search-vant" v-model="value" show-action placeholder="请输入商品名称" @search="onSearch()">
            <template #left>
                <div class="address-select" @click="toSelect()">
                    {{ cityStore.newCity }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
        </van-search>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router"
import { useCurrentCity } from "@/store/currentCityStore.js"
import {ref} from "vue"
    const value = ref("")
    const cityStore = useCurrentCity();
    const router = useRouter();
    const toSelect = () => {
        router.push("/adrSelect");
    }
    const onClickButton = () => { }
    const onSearch = () => { }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-vant {
    width: 100%;
}

.address-select {
    width: 60px;
}

.search-vant {
    position: absolute;
    padding: 10px 5px;
    top: 0;
}

.van-search {
    margin-top: 0;
}

.address-select {
    margin-left: 0;
}
</style>