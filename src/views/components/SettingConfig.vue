<style scoped>
    h3 {
        padding-top: 10px;
        font-weight: normal;
    }

    .split-line {
        height: 1px;
        background: #eee;
        margin: 20px 0;
    }

    .setting-cont{
        text-align: center;
    }
</style>
<template>
    <div class="setting-config">
        <div class="setting-header">
            <h2>配置</h2>
            <h3>我的配置信息</h3>
        </div>
        <div class="split-line"></div>
        <div class="setting-cont">
            <AccountConfig v-on:restart="restartBox"></AccountConfig>
        </div>
    </div>
</template>
<script>
    import AccountConfig from './AccountConfig.vue';

    export default {
        data() {
            return {};
        },
        methods: {
            restartBox(){
                this.$emit('restart');
            }
        },
        components: {
            AccountConfig: AccountConfig
        }
    };
</script>