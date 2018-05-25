<template>
    <div class="card" :style="{backgroundColor: cardColor}">
        <Icon size="50" :type="cardIcon" color="#fff"></Icon>
        <div class="card-info">
            <span class="number">{{cardNumber}}</span>
            <span class="desc">{{cardDesc}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            cardIcon: {
                type: String,
                required: true
            },
            cardNumber: {
                type: Number,
                required: true
            },
            cardDesc: {
                type: String,
                required: true
            },
            cardColor: {
                type: String,
                required: true
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .card
        display: flex
        justify-content: space-between
        align-items: center
        height: 100px
        margin-bottom: 16px
        padding: 0 30px
        box-sizing: border-box
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .2)
        .card-info
            display: flex
            height: 100%
            flex-direction: column
            justify-content: space-between
            padding: 16px 0
            text-align: right
            color: #fff
            .number
                font-size: 24px
</style>
