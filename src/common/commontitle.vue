<template>
    <Row class="title" type="flex" align="middle">
        <div class="title-sign"></div>
        <div class="title-text">{{titleName}}</div>
    </Row>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            titleName: {
                type: String,
                required: true
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/variable.styl";
    .title
        height: 25px
        margin-bottom: 15px
        font-size: 16px
        .title-sign
            width: 5px
            height: 16px
            margin-right: 10px
            background-color: $theme-color
        .title-text
            font-weight: 700
</style>
