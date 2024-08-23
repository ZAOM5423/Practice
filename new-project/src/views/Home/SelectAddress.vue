<template>
    <PublicNavBar title="地址选择" />
    <div class="select-container">
        <van-address-list
            v-model="chosenAddressId"
            :list="formattedAddressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import PublicNavBar from "@/components/PublicNavBar.vue";

const router = useRouter();
const chosenAddressId = ref(null);
const addressList = ref([]);

// 从 localStorage 加载地址列表
onMounted(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addressList') || '[]');
    console.log("Loaded addresses from localStorage:", savedAddresses);  // Debug log
    addressList.value = savedAddresses;
});

// 格式化地址列表，添加完整的 address 字段
const formattedAddressList = computed(() => {
    return addressList.value.map(address => ({
        ...address,
        address: `${address.province || ''}${address.city || ''}${address.county || ''}${address.addressDetail || ''}`
    }));
});

console.log("Formatted address list:", formattedAddressList.value);  // Debug log

// 编辑地址
const onEdit = (address) => {
    router.push({
        path: '/changeAddress',
        query: { id: address.id }
    });
};

// 添加新地址
const onAdd = () => {
    router.push("/changeAddress");
};
</script>

<style scoped>
.select-container {
    padding: 16px;
    background-color: #f8f8f8;
}
</style>