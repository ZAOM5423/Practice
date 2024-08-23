<template>
    <div class="evaluate-container">
        <div class="evaluate-header">
            <div class="header-image">
                <img :src="icon" />
            </div>
            <div data-v-392d0525="" class="header-user">
                <span data-v-392d0525="">{{ name }}</span>
                <div class="vant-star">
                    <van-rate v-model="value" size="12" readonly />
                </div>
                
            </div>
            <div class="time">
                <span>{{ time }}</span>
            </div>
        </div>
        <div class="comment-body">
                <div class="body-text">
                    <span>{{ text }}</span>
                </div>
            </div>
    </div>
</template>
<script setup>
import { defineProps } from "vue"
import { ref } from "vue"
import { watch } from "vue"
    const props = defineProps({
        icon: String,
        rate: Number,
        time: String,
        text: String,
        name: String
    });
    const value = ref(props.rate);
    watch(() => props.rate, (newValue) => {
        value.value = newValue;
    });
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.evaluate-header {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
}

.header-image img {
    width: 40px;
    height: 40px;
}
.header-user{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 5px;
}
.header-user span {
    display: block;
    font-size: 15px;
}
.time{
    flex: 1;
    display: flex;
    justify-content: flex-end;
}
.time span{
    font-size: 13px;
    color: #999;
    padding-top: 5px;
}
.comment-body{
    padding: 0 10px 10px 50px;
}
.body-text span{
    font-size: 14px;
}
.body-image{
    margin-top: 5px;
}
</style>