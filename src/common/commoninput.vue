<template>
    <div class="input" @click="inputHandle">
        <input
            v-if="inputType === 'text'"
            type="text"
            :class="{'require': redLine}"
            ref="text"
            v-model="text"
            @blur="blur"
        />
        <input
            v-if="inputType === 'number'"
            type="number"
            :class="{'require': redLine}"
            ref="number"
            v-model="number"
            @blur="blur"
            onkeypress="return (/[\d|\.|-]/.test(String.fromCharCode(event.keyCode || event.which)))"
        />
        <span ref="title" class="input-title" :class="{'active': startInput || text !== '' || number !== ''}">{{inputTitle}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
// onkeypress="return (/[\d\.]/.test(String.fromCharCode(event.keyCode || event.which)))"
export default {
    props: {
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
            type: [String, Number]
        },
        max: {
            type: [String, Number]
        },
        min: {
            type: [String, Number]
        }
    },
    data() {
        return {
            startInput: false,
            number: '',
            text: '',
            redLine: false
        };
    },
    methods: {
        inputHandle() {
            this.startInput = true;
            this.$refs[this.inputType].focus();
        },
        blur() {
            // console.log(this[this.inputType]);
            this.startInput = false;
            if (this[this.inputType] === '') {
                if (this.isRequired) {
                    this.redLine = true;
                }
            } else {
                this.redLine = false;
            }
            this.$emit('getValue', this[this.inputType]);
        }
        // getValue(e) {
        // },
        // replace() {
        //     if (this.number === '') {
        //         return false;
        //     } else if (this.isInt) {
        //         this.number = this.number.replace(/[^-\d.]/g, '');
        //         this.number = parseInt(this.number);
        //     } else {
        //         /* eslint-disable no-useless-escape */
        //         this.number = this.number.replace(/[^-\d\..]/g, '');
        //         // this.number = parseFloat(this.number);
        //     }
        // }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../stylus/variable'
    .input
        position: relative
        margin: 28px 0 0
        height: 36px
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
</style>
