<template>
    <div class="date-pick" @click="inputEvent">
        <DatePicker ref="input" :type="type" @on-change="chooseDate" :placement="placement"></DatePicker>
        <div class="date-title" :class="{active: date || startInput}">{{placeholder}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        placeholder: {
            type: String,
            default: '请选择日期'
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            startInput: false,
            date: ''
        };
    },
    mounted() {
        this.$nextTick(() => {
            document.getElementsByClassName('ivu-input')[0].addEventListener('blur', () => {
                this.startInput = false;
            });
        });
    },
    methods: {
        inputEvent() {
            this.startInput = true;
            document.getElementsByClassName('ivu-input')[0].focus();
            document.querySelector('.ivu-date-picker .ivu-select-dropdown').style.display = 'block';
        },
        chooseDate(date, type) {
            console.log(date, type);
            this.date = date;
            document.querySelector('.ivu-date-picker .ivu-select-dropdown').style.display = 'none';
            this.$emit('chooseDate', this.date);
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../stylus/variable.styl'
.date-pick
    position: relative
    height: 36px
    .date-title
        position: absolute
        top: 0
        left: 0
        height: 36px
        line-height: 36px
        padding-left: 7px
        font-size: 15px
        color: $grey-color
        transition: all .2s linear
        user-select: none
        &.active
            top: -18px
            height: 18px
            line-height: 18px
            font-size: 12px
    .ivu-date-picker
        width: 100%
        .ivu-input
            height: 36px
            border: none
            border-radius: 0
            border-bottom: 1px solid rgba(0,0,0,0.1)
            background-color: transparent
            font-size: 14px
            &:focus
                border-bottom: 1px solid rgb(33, 150, 243)
            &:focus + .active
                color: rgb(33, 150, 243)
</style>
