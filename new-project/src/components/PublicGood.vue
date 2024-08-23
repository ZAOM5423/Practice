<template>
    <div class="card" v-for="(item, id) in cardInfo" :key="id">
        <div class="card-item" @click="openGoodsDetail(item.id)">
            <img :src="item.image" />
            <p>{{ item.title }}</p>
            <div class="card-item-bottom">
                <span>￥{{ item.price }}.00</span>
                <van-icon name="shopping-cart-o" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
    const router = useRouter();
    const cardInfo = ref([]);
    const getCard = async () => {
        try {
            const result = await axios.get("http://iwenwiki.com:3006/api/recommendgoods");
            if (result.data.status === 200) {
                cardInfo.value = result.data.data;
            }
        } catch (error) {
            console.log("接口请求出错",error);
        }
    }
    const openGoodsDetail = (id) => {
        router.push({
            name: "goodsDetail",
            params: { id: id }
        });
    }
    onMounted(() => {
        getCard();
    })
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.card {
    background-color: #fff;
}

.card-item {
    width: 49%;
    float: left;
    margin: 10px 0;
    padding: 10px;
    box-sizing: border-box;
}

.card-item:nth-child(odd) {
    padding-right: 0.7%;
}

.card-item img {
    width: 100%;
    border-radius: 5px
}

.card-item p {
    font-size: 14px;
    margin: 5px 0;
    padding: 0 10px;
    box-sizing: border-box;
}

.card-item-bottom {
    display: flex;
    padding: 5px 5px;
    box-sizing: border-box;
}

.card-item-bottom span,van-icon {
    flex: 1;
}

.card-item-bottom span {
    font-size: 12px;
    text-align: left;
}

.card-item-bottom van-icon {
    font-size: 12px;
    text-align: right;
    color: #999;
}
</style>