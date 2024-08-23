<template>
    <PublicNavBar title="全部评价" />
    <div class="allEvaluate-container" v-for="(item,id) in allEvaluateInfo" :key="id">
        <Evaluate :icon="item.icon" :rate="item.rate" :time="item.time" :text="item.text" :name="item.name" />
    </div>
</template>
<script setup>
import PublicNavBar from "@/components/PublicNavBar.vue"
import Evaluate from "@/components/Evaluate.vue"
import { ref } from "vue"
import { onMounted } from "vue"
import axios from "axios"
    const allEvaluateInfo = ref([]);
    const getAllEvaluate = async () => {
        try {
            const result = await axios.get("http://iwenwiki.com:3006/api/comment/all");
            if (result.data.status === 200) {
                allEvaluateInfo.value = result.data.data;
            }
        } catch (error) {
            console.log("接口请求失败", error);
        }
    }
    onMounted(() => {
        getAllEvaluate();
    })
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.allEvaluate-container{
    background-color: #fff;
}
</style>