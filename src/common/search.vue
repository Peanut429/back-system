<template>
    <div class="buttons">
        <Button size="large" class="clear-btn" type="ghost" @click="clear">清空条件</Button>
        <Button size="large" class="search-btn" type="primary" @click="search">搜索</Button>
    </div>
</template>

<script>
    export default {
        methods: {
            clear() {
                this.$emit('clear');
            },
            search() {
                this.$emit('search');
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .buttons
        display: flex
        justify-content: flex-end
        align-items: flex-end
        height: 59px
        .clear-btn, .search-btn
            margin-left: 10px
            box-shadow: 0 2px 5px rgba(0, 0, 0, .26)
</style>
