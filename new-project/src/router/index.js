import { createRouter, createWebHistory } from "vue-router"
import Home from '@/views/Home/Home.vue'
import Address from '@/views/Address/Address.vue'
import Personnel from '@/views/Personnel/Personnel.vue'
import Shop from '@/views/Shop/Shop.vue'
import Mine from '@/views/Mine/Mine.vue'
import Layout from '@/views/Layout.vue'
import AdrSelect from '@/views/Home/AdrSelect.vue'
import Detail from '@/views/Home/Detail.vue'
import GoodsDetail from '@/views/Home/GoodsDetail.vue'
import AllEvaluate from '@/views/Home/AllEvaluate.vue'
import AddressDetail from '@/views/Address/AddressDetail.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Login/Register.vue'
import OrdersView from '@/views/Mine/OrdersView.vue'
import OrderDetail from '@/views/Home/OrderDetail.vue'
import SelectAddress from '@/views/Home/SelectAddress.vue'
import ChangeAddress from '@/views/Home/ChangeAddress.vue'
import BaiduMap from '@/views/Address/BaiduMap.vue'
import Set from '@/views/Mine/Set.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/address',
                    name: 'address',
                    component: Address
                },
                {
                    path: '/personnel',
                    name: 'personnel',
                    component: Personnel
                },
                {
                    path: '/shop',
                    name: 'shop',
                    component: Shop
                },
                {
                    path: '/mine',
                    name: 'mine',
                    component: Mine
                }
            ]
        },
        {
            path: '/adrSelect',
            name: 'adrSelect',
            component: AdrSelect
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/goodsDetail/:id',
            name: 'goodsDetail',
            component: GoodsDetail
        },
        {
            path: '/allEvaluate',
            name: 'allEvaluate',
            component: AllEvaluate
        },
        {
            path: '/addressDetail/:id',
            name: 'addressDetail',
            component: AddressDetail
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/ordersView/:type',
            name: 'ordersView',
            component: OrdersView
        },
        {
            path:'/orderDetail/:id/:orderId',
            name:'orderDetail',
            component: OrderDetail
        },
        {
            path:'/selectAddress',
            name:'selectAddress',
            component: SelectAddress
        },
        {
            path:'/changeAddress',
            name:'changeAddress',
            component: ChangeAddress
        },
        {
            path:'/baiduMap',
            name:'baiduMap',
            component:BaiduMap
        },
        {
            path:'/set',
            name:'set',
            component:Set
        }
    ]
})

export default router;