<template>
    <div class="selector">
        <div ref="title" class="selector-name" :class="{'active': value}">{{listName}}</div>
        <Select :size="listSize" @on-change="handleChange" v-model="value" :style="{width: listWidth}">
            <Option v-for="(item, index) in list" :key="index" :value="item.value">{{item.label}}</Option>
        </Select>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            listName: {
                type: String,
                required: true
            },
            list: {
                type: Array,
                required: true
            },
            listWidth: {
                type: String,
                default: '100%'
            },
            listSize: {
                type: String,
                default: 'large'
            },
            selected: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                // active: false,
                value: this.selected
            };
        },
        methods: {
            handleChange(name) {
                // this.active = true;
                this.value = name;
                this.$emit('selectorValue', this.value);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../stylus/variable.styl'
    .selector
        position: relative
        margin: 22px 0 0
        .selector-name
            position: absolute
            top: 0
            left: 0
            height: 17px
            line-height: 17px
            padding: 11px 0 6px 8px
            font-size: 14px
            color: $grey-color
            transition: all .2s linear
            &.active
                top: -18px
                height: 18px
                padding: 0
                padding-left: 8px
                line-height: 18px
                font-size: 12px
                // color: rgb(33, 150, 243)
                background-color: transparent
        .ivu-select-selection
            border: 0
            border-radius: 0
            border-bottom: 1px solid rgba(0, 0, 0, 0.1)
            background-color: transparent
            .ivu-select-placeholder
                display: none
</style>
