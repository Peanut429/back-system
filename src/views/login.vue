<template>
    <Row type="flex" align="middle" justify="center" class-name="row">
        <Form justify="center" ref="formInline" :model="form" :rules="ruleInline" class="form-box">
            <FormItem prop="user">
                <Input type="text" v-model="form.account" placeholder="Username" size="large">
                    <Icon size="20" type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="Password" size="large">
                    <Icon size="20" type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Row type="flex" justify="center">
                    <Button size="large" long type="primary" @click="handleLogin('form')">Signin</Button>
                </Row>
            </FormItem>
        </Form>
    </Row>
</template>
<script>
    const ERR_OK = 0;
    export default {
        data () {
            return {
                form: {
                    account: '',
                    password: ''
                },
                ruleInline: {
                    account: [
                        { required: true, message: 'Please fill in the user account', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleLogin(name) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.$Message.success('Success!');
                //     } else {
                //         this.$Message.error('Fail!');
                //     }
                // });
                let account = this.form.account;
                let url = '/api/' + account;
                this.$axios.get(url).then(res => {
                    console.log(res);
                    let errno = res.data.errno;
                    if (errno === ERR_OK) {
                        let {permission, empname} = res.data.data;
                        let userInfo = {account, permission, empname};
                        this.$store.dispatch('login', userInfo).then(res => {
                            // console.log(res);
                        });
                        this.$router.push('/home');
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .row
        display: flex
        justify-content: center
        align-items: center
        height: 100vh
        .form-box
            padding: 30px 50px 10px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 30px
</style>
