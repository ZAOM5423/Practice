<template>
    <Search />
    <van-dropdown-menu>
        <van-dropdown-item title="位置" ref="location">
            <div class="list" @click="onLocation">
                <h3 value="area" :class="[active == 'area' ? 'active' : '']">区域</h3>
                <h3 value="subway" :class="[active == 'subway' ? 'active' : '']">地铁</h3>
            </div>
            <div class="item">
                <van-cell-group v-if="active == 'area'">
                    <van-cell :value="item" v-for="(item, index) in areas" :key="index" @click="onItem(item)" />
                </van-cell-group>
                <van-cell-group v-if="active == 'subway'">
                    <van-cell :value="item" v-for="(item, index) in subways" :key="index" @click="onItem(item)" />
                </van-cell-group>
            </div>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="price">
            <van-cell-group>
                <van-cell value="不限" />
                <van-cell value="2000元以下" @click="onPrice('2000')" />
                <van-cell value="2000-2500元" @click="onPrice('2500')" />
                <van-cell value="2560-3000元" @click="onPrice('3000')" />
            </van-cell-group>
        </van-dropdown-item>
        <van-dropdown-item title="类型" ref="type">
            <div class="container">
                <div class="title">商铺类型</div>
                <div class="btn" v-for="(item, index) in types" :key="index" @click="onType(item)">{{ item }}</div>
            </div>
        </van-dropdown-item>
        <van-dropdown-item title="更多" ref="more">
            <div class="container">
                <div class="title">{{ mores1.title }}</div>
                <div @click="onMore1(childItem)" :class="[selectBtn1 == childItem ? 'activeBtn' : '']" class="btn"
                    v-for="(childItem, childIndex) in mores1.btns" :key="childIndex">{{ childItem }}</div>
            </div>
            <div class="container">
                <div class="title">{{ mores2.title }}</div>
                <div @click="onMore2(childItem)" :class="[selectBtn2 == childItem ? 'activeBtn' : '']" class="btn"
                    v-for="(childItem, childIndex) in mores2.btns" :key="childIndex">{{ childItem }}</div>
            </div>
            <div class="container btnL">
                <div class="clearBtn" @click="clearBtn">清空筛选</div>
                <div class="sureBtn" @click="sureBtn">确定</div>
            </div>
        </van-dropdown-item>
    </van-dropdown-menu>
    <PublicAddList />
</template>
<script setup>
import Search from "@/components/Search.vue"
import PublicAddList from "@/components/PublicAddList.vue"
import { ref } from "vue"

const areas = ["不限", "东城区", "西城区", "朝阳区", "海淀区", "昌平区"];
const subways = ["不限", "一号线", "二号线", "五号线", "六号线", "昌平线"];
const types = ["不限", "商场/超市", "商业街", "社区底商"];
const mores1 =
{
    title: "面积",
    btns: ["不限", "20㎡以下", "20㎡-50㎡", "50㎡-100㎡", "100㎡以上"],
}
const mores2 =
{
    title: "楼层",
    btns: ["不限", "地下", "一层", "二层", "二层以上"]
}
const active = ref("area");
const location = ref();
const price = ref();
const type = ref();
const more = ref();
const selectBtn1 = ref("不限");
const selectBtn2 = ref("不限");
const onLocation = (even) => {
    active.value = even.target.getAttribute("value");
    if (active.value === null) {
        active.value = "area";
    }
}
const onItem = (value) => {
    location.value.toggle();
}
const onPrice = (value) => {
    price.value.toggle();
}
const onType = (value) => {
    type.value.toggle();
}
const onMore1 = (value) => {
    selectBtn1.value = value;
}
const onMore2 = (value) => {
    selectBtn2.value = value;
}
const clearBtn = () => {
    selectBtn1.value = "不限";
    selectBtn2.value = "不限";
}
const sureBtn = () => {
    more.value.toggle();
}
</script>
<style>
.van-dropdown-item__content {
    background-color: #f3f4f5;
}

.van-cell__value {
    flex: none;
}
</style>
<style scoped>
.van-dropdown-menu {
    margin-top: 50px;
}

.list {
    width: 50%;
    float: left;
    background-color: #f3f4f5;
}

.list h3 {
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-sizing: border-box;
}

.list h3.active {
    background-color: #fff;
}

.item {
    width: 50%;
    float: left;
}

.container {
    background-color: #fff;
    overflow: hidden;
    clear: both;
}

.title {
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
}

.btn {
    float: left;
    height: 30px;
    width: 80px;
    line-height: 30px;
    background-color: #f3f4f5;
    margin: 10px;
    text-align: center;
    font-size: 14px;
    margin-top: 0;
    border-radius: 5px;
}

.clearBtn {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    ;
    background: #f3f4f5;
    border-radius: 5px;
    margin: 10px;
}

.sureBtn {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #684886;
    color: #fff;
    border-radius: 5px;
    margin: 10px;
}

.btnL {
    display: flex;
    justify-content: center;
}

.activeBtn {
    background-color: #684886 !important;
    color: #fff;
}

/* .list-item {
    border-bottom: 1px solid #f3f4f5;
    padding: 10px;
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
} */
</style>