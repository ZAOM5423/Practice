<template>
    <PublicNavBar title="位置" />
    <div class="map-container">
        <baidu-map class="map" :center="{ lng: 118.454, lat: 32.955 }" :zoom="15" @ready="ready">
        </baidu-map>
    </div>
</template>
<script setup>
import PublicNavBar from "@/components/PublicNavBar.vue"
    const ready = ({BMap,map})=>{
    //  对地图进行自定义操作
    };
</script>
<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>