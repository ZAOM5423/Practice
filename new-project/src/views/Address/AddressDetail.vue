<template>
    <div class="container">
        <div class="header">
            <van-icon @click="goBack" name="arrow-left" />
            <img :src="addList.image" />
            <h3>{{ addList.title }}</h3>
        </div>
        <div class="body">
            <van-grid :column-num="3">
                <van-grid-item>
                    <span class="grid-1">租金</span>
                    <span class="grid-2">{{ addList.price }}</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="grid-1">转让费</span>
                    <span class="grid-2">{{ addList.afee }}</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="grid-1">面积</span>
                    <span class="grid-2">{{ addList.size }}</span>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="map-main" @click="onMap">
            <div class="title">{{ addList.location }}</div>
            <div class="map">地图<van-icon name="arrow" /></div>
        </div>
        <div class="recommend">
            <h3>商铺推荐</h3>
            <PublicAddList />
        </div>
    </div>
    <van-action-bar>
        <van-action-bar-icon icon="star-o" text="收藏" />
        <van-action-bar-button type="primary" text="联系业主" />
    </van-action-bar>
</template>
<script setup>
import { useRoute,useRouter } from "vue-router"
import axios from "axios"
import { ref } from "vue"
import { onMounted } from "vue"
import PublicAddList from "@/components/PublicAddList.vue"
    const route = useRoute();
    const router = useRouter();
    const addList = ref([]);
    const getDetail = async () => {
        try {
            const result = await axios.get("http://iwenwiki.com:3006/api/place/details", {
                params: {
                    id: route.params.id
                }
            })
            if (result.data.status === 200){
                addList.value = result.data.data;
            }
        } catch (error) {
            console.log("接口请求失败", error);
        }
    }
    const goBack = () => {
        router.back();
    }
    const onMap = () => {
        router.push("/baiduMap");
    }
onMounted(() => {
    getDetail()
})
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.header{
    background-color: #fff;
}
.header .van-badge__wrapper{
    position: absolute;
    font-size: 25px;
    padding: 7px;
    font-weight: 700;
    box-sizing: border-box;
}
.container img{
    width: 100%;
}
.header h3{
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
}
.van-grid-item__content .grid-1{
    font-size: 14px;
    color: #999;
}
.van-grid-item__content .grid-2{
    font-size: 14px;
    color: #f44;
    margin-top: 10px
}
.map-main{
    display: flex;
    margin: 10px 10px;
}
.map-main .title{
    flex: 1;
    text-align: left;
    font-size: 15px;
}
.map-main .map{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    color: #999;
}
.map-main .map .van-icon{
    font-size: 12px;
    padding-left: 5px;
    line-height: 20px;
}
.recommend{
    background-color: #fff;
    box-sizing: border-box;
}
.recommend h3{
    font-size: 15px;
    padding-left: 15px;
    padding-top: 10px;
}
</style>