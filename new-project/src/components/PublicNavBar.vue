<template>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>
<script setup>
import {defineProps} from "vue"
    const props = defineProps({
        title: String
    })
    const onClickLeft = () => {
        window.history.back();
    }
</script>
<style scoped></style>