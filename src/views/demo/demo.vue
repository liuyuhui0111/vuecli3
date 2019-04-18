<template>
    <div class="page">{{name}}
    <span @click="loading">loadding === {{id}}</span>
    <a class="a" :href="href">QQ客服</a>

    <router-link to="/detail">detail</router-link>
    </div>
</template>
<script>

import { setCookie, getCookie, delCookie } from '@/assets/utils/util';

export default {
    data() {
        return {
            name: 'page',
            res: {},
            id: '',
            href: 'http://wpa.qq.com/msgrd?v=3&uin=84964308&site=在线客服&menu=yes',
        };
    },
    mounted() {
        this.id = getCookie('id');
        this.init();
    },
    methods: {
        init() {

        },
        loading() {
            setCookie('id', '123');
            const loading = this.$loading();
            setTimeout(() => {
                loading.close();
            }, 2000);
        },
        delCookieFn() {
            delCookie('id');
        },
    },
};
</script>
<style scoped>
.page{
    height: 1000px;
}
.a{
    display: block;
    margin-bottom: 200px;
}
</style>
