<template>
    <PublicNavBar title="我的订单" />
    <van-tabs v-model:active="defineView" @change="getOtherList">
        <van-tab title="全部" name="0">
            <OrderList :num="item.num" :status="item.status" :title="item.title" :descs="item.descs" :image="item.image"
                :ordernum="item.ordernum" :price="item.price" v-for="(item, index) in allOrderList" :key="index" />
        </van-tab>
        <van-tab title="待支付" name="1">
            <OrderList :num="item.num" :status="item.status" :title="item.title" :descs="item.descs" :image="item.image"
                :ordernum="item.ordernum" :price="item.price" v-for="(item, index) in OtherOrderList" :key="index" />
            <div class="goPay">
                <div class="payBtn">立即付款</div>
            </div>
        </van-tab>
        <van-tab title="待收货" name="2">
            <OrderList :num="item.num" :status="item.status" :title="item.title" :descs="item.descs" :image="item.image"
                :ordernum="item.ordernum" :price="item.price" v-for="(item, index) in OtherOrderList" :key="index" />
        </van-tab>
        <van-tab title="待评价" name="3">
            <OrderList :num="item.num" :status="item.status" :title="item.title" :descs="item.descs" :image="item.image"
                :ordernum="item.ordernum" :price="item.price" v-for="(item, index) in OtherOrderList" :key="index" />
        </van-tab>
    </van-tabs>
</template>
<script setup>
import PublicNavBar from "@/components/PublicNavBar.vue"
import OrderList from "@/components/OrderList.vue"
import { ref } from "vue"
import { onMounted } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"
    const route = useRoute();
    const defineView = ref(route.params.type);
    const allOrderList = ref([]);
    const OtherOrderList = ref([]);
    const getAllList = async () => {
        try {
            const result = await axios.get("http://iwenwiki.com:3006/api/order/all");
            if (result.data.status === 200) {
                allOrderList.value = result.data.data;
            }
        } catch (error) {

        }
    }
    const getOtherList = async (index) => {
        try {
            if (index !== "0") {
                const result = await axios.get("http://iwenwiki.com:3006/api/order/type", {
                    params: {
                        type: index
                    }
                });
                if (result.data.status === 200) {
                    OtherOrderList.value = result.data.data;
                }
            }
        } catch (error) {

        }
    }
    onMounted(() => {
        getAllList();
        getOtherList(defineView.value);
    })
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.goPay{
    background-color: #fff;
    border-top: 1px solid #f3f4f5;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}
.payBtn{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: #684886;
    border-radius: 20px;
}
</style>