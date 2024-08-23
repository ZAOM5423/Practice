<template>
    <div class="address-list">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list-item" v-for="(item,id) in list" :key="id" @click="openDetail(item.id)">
                <img :src="item.image" />
                <div class="list-p">
                    <p>{{ item.title }}</p>
                    <span>{{ item.descs }}</span>
                    <span>{{ item.price }}元/月</span>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
    const router = useRouter();
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const page = ref("1");
    const onLoad = () => {
    const result = axios.get("http://iwenwiki.com:3006/api/place", {
        params: {
            page: page.value
        }
    })
    result.then((res) => {
        if (res.data.status === 200){
            list.value = res.data.data;
            page.value ++;
        }
        loading.value = false;
        if (res.data.status == 500){
            finished.value = true;
        }
    })
}
const openDetail = (value) => {
        router.push({
            name:"addressDetail",
            params:{
                id:value
            }
        });
    }
</script>
<style scoped>
.list-item {
    border-bottom: 1px solid #f3f4f5;
    padding: 5px;
    display: flex;
    background-color: #fff;
}

.list-item img {
    width: 150px;
    border-radius: 10px;
    padding: 5px;
}

.list-p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
}

.list-p p {
    font-size: 14px;
    margin: 5px 0;
}

.list-p :nth-child(2) {
    display: block;
    font-size: 14px;
    color: #999;
}

.list-p :nth-child(3) {
    display: block;
    font-size: 14px;
    color: #f44;
    margin: 5px 0;
}
</style>