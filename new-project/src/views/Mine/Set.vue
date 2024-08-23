<template>
    <PublicNavBar title="设置" />
    <div class="set-container">
        <van-cell-group style="margin-top:10px;">
            <van-cell title="个人信息">
                <template #value>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top:10px;">
            <van-cell title="账号管理">
                <template #value>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
            <van-cell title="清除缓存" value="0.0 MB" />
        </van-cell-group>
        <van-cell-group style="margin-top:10px;">
            <van-cell title="关于我们">
                <template #value>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
        </van-cell-group>
        <div class="exit" @click="exitLogin">退出登录</div>
    </div>
</template>

<script setup>
import PublicNavBar from "@/components/PublicNavBar.vue"
import { showConfirmDialog } from 'vant'
import { showSuccessToast } from 'vant'
import { useRouter } from "vue-router"
    const router = useRouter();
    const exitLogin = () => {
        showConfirmDialog({
            title: '提示',
            message:
                '是否退出登录？',
        })
        .then(() => {
            localStorage.removeItem("tokenStore");
            showSuccessToast("退出成功");
            router.replace("/mine");
        })
        .catch(() => {
            
        });
    }
</script>
<style scoped>
.exit {
    height: 50px;
    widows: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    margin-top: 25px;
}
</style>