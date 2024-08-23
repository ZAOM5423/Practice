<template>
    <PublicNavBar title="地址编辑" />
    <div class="change-container">
        <van-address-edit
            v-model="currentAddress"
            :area-list="areaList"
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import PublicNavBar from "@/components/PublicNavBar.vue";

const route = useRoute();
const router = useRouter();
const searchResult = ref([]);
const areaList = ref({
    province_list: { 110000: '北京市' },
    city_list: { 110100: '北京市市辖区' },
    county_list: { 110101: '东城区' },
});

// 初始化地址对象
const currentAddress = ref({
    id: null,
    name: '',
    tel: '',
    province: '',
    city: '',
    county: '',
    addressDetail: '',
    isDefault: false,
});

onMounted(() => {
    const addressId = route.query.id;
    const addressList = JSON.parse(localStorage.getItem('addressList') || '[]');

    if (addressId) {
        const existingAddress = addressList.find(addr => addr.id === addressId);
        if (existingAddress) {
            currentAddress.value = existingAddress;
        }
    } else {
        currentAddress.value.id = Date.now().toString();
    }
});

// 保存地址
const onSave = () => {
    // 打印 currentAddress 以调试
    console.log('Saving Address:', currentAddress.value);

    const newAddress = { ...currentAddress.value };
    const addressList = JSON.parse(localStorage.getItem('addressList') || '[]');

    const index = addressList.findIndex(addr => addr.id === newAddress.id);
    if (index !== -1) {
        addressList.splice(index, 1, newAddress);
    } else {
        addressList.push(newAddress);
    }

    localStorage.setItem('addressList', JSON.stringify(addressList));
    router.push('/selectAddress');
};

// 删除地址
const onDelete = () => {
    const addressList = JSON.parse(localStorage.getItem('addressList') || '[]');
    const updatedList = addressList.filter(addr => addr.id !== currentAddress.value.id);

    localStorage.setItem('addressList', JSON.stringify(updatedList));
    router.push('/selectAddress');
};

// 处理详细地址变更
const onChangeDetail = (detail) => {
    currentAddress.value.addressDetail = detail;
};
</script>

<style scoped>
.change-container {
    padding: 16px;
    background-color: #f8f8f8;
}
</style>