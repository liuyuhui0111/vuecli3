<template>
    <div class="page">{{name}}</div>
</template>
<script>

import { getCode } from '@/api/apis';

export default {
    data() {
        return {
            name: 'page',
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            getCode({ id: 1 })
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
<style scoped>

</style>
