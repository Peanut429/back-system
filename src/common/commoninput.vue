<template>
    <div class="input" @click="inputHandle">
        <input
            v-if="inputType === 'text'"
            type="text"
            :class="{'require': redLine, 'disabled': disabled}"
            ref="text"
            :value="inputValue"
            :disabled="disabled"
            @blur="blur"
            @input="input"
        />
        <input
            v-if="inputType === 'number'"
            type="number"
            :class="{'require': redLine, 'disabled': disabled}"
            ref="number"
            :value="inputValue"
            :disabled="disabled"
            @blur="blur"
            @input="input"
        />
        <Input
            class="textarea"
            type="textarea"
            v-if="inputType === 'textarea'"
            :value="inputValue"
            :class="{'require': redLine, 'disabled': disabled}"
            ref="textarea"
            :disabled="disabled"
            :autosize="{minRows, maxRows}"
            :maxlength="maxlength"
            @on-blur="blur"
            @on-change="input"
        ></Input>
        <span ref="title" class="input-title" :class="{'active': active}">{{inputTitle}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
// onkeypress="return (/[\d\.]/.test(String.fromCharCode(event.keyCode || event.which)))"
// onkeypress="return (/[\d|\.|-]/.test(String.fromCharCode(event.keyCode || event.which)))"
export default {
    props: {
        inputValue: {
            type: [String, Number],
            default: ''
        },
        inputTitle: {
            type: String,
            require: true
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        inputType: {
            type: String,
            default: 'text'
        },
        isInt: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 200
        },
        maxRows: {
            type: Number,
            default: 10
        },
        minRows: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        format: {
            type: String
        }
    },
    model: {
        prop: 'inputValue',
        event: 'getValue'
    },
    data() {
        return {
            startInput: false,
            redLine: false
        };
    },
    methods: {
        inputHandle() {
            if (this.disabled) {
                return false;
            }
            this.startInput = true;
            this.$refs[this.inputType].focus();
        },
        blur() {
            this.startInput = false;
            if (this.inputValue === '') {
                if (this.isRequired) {
                    this.redLine = true;
                }
            } else {
                this.redLine = false;
            }
        },
        input($event) {
            if (this.format === 'int') {
                $event.target.onkeypress = function(event) {
                    return (/\d/.test(String.fromCharCode(event.keyCode || event.which)));
                };
                if ($event.target.value === '.') {
                    $event.target.value = '';
                }
                if ($event.target.value !== '') {
                    $event.target.value = parseInt($event.target.value).toString().substr(0, 2);
                }
            }
            this.$emit('getValue', $event.target.value);
        }
    },
    computed: {
        active() {
            if (this.startInput) {
                return true;
            } else if (this.inputValue != null && this.inputValue !== '') {
                return true;
            }
            return false;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../stylus/variable'
    .input
        position: relative
        margin: 28px 0 0
        /*height: 36px*/
        .input-title
            overflow hidden
            position: absolute
            top: 0
            left: 0
            padding-left: 6px
            max-width: 100%
            height: 30px
            line-height: 30px
            background-color: transparent
            font-size: 15px
            color: $grey-color
            transition: all .2s linear
            white-space: nowrap
            text-overflow: ellipsis
            &.active
                top: -18px
                height: 18px
                line-height: 18px
                font-size: 12px
        input
            box-sizing: border-box
            padding: 6px
            width: 100%
            height: 30px
            outline: none
            border: none
            background-color: transparent
            font-size: 15px
            border-bottom: 1px solid rgba(0, 0, 0, .12)
            &.require
                border-bottom-color: rgb(221,44,0)
            &:focus
                border-bottom: 1px solid rgb(33, 150, 243)
            &:focus + .active
                color: rgb(33, 150, 243)
        .disabled
            color: $grey-color
        .textarea
            .ivu-input
                resize: none
                border: none
                border-bottom: 1px solid rgba(0, 0, 0, .12)
                border-radius: 0
                background-color: transparent
                &:focus
                    border-bottom: 1px solid rgb(33, 150, 243)
        .require
            .ivu-input
                border-bottom: 1px solid rgb(221,44,0)
</style>
