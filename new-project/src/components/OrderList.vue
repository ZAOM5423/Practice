<template>
    <div class="order-container">
        <div class="order-header">
            <p>订单号：{{ num }}</p>
            <p class="order-status" v-if="status == 1">等待支付</p>
            <p class="order-status" v-if="status == 2">等待收货</p>
            <p class="order-status" v-if="status == 3">等待评价</p>
        </div>
        <div class="order-body">
            <van-card :num="ordernum" :price="price" :title="title" :desc="descs" :thumb="image">
            </van-card>
        </div>
        <div class="order-footer">
            <p>数量</p>
            <p>共2件<van-icon name="arrow" /></p>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        num:String,
        status:String,
        title:String,
        descs:String,
        image:String,
        ordernum:String,
        price:String
    });
</script>
<style scoped>
.order-header {
    display: flex;
    padding: 0 10px;
    background-color: #fff;
    margin-top: 5px;
}

.order-header p:nth-child(1) {
    flex: 1;
    text-align: left;
    font-size: 12px;
}

.order-header .order-status{
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: #f44;
}

.order-footer{
    display: flex;
    background-color: #fff;
    padding: 0 10px;
    height: 40px;
    margin-top: -8px;
}
.order-footer p:nth-child(1){
    flex: 1;
    font-size: 14px;
}
.order-footer p:nth-child(2){
    flex: 1;
    font-size: 14px;
    text-align: right;
}
</style>