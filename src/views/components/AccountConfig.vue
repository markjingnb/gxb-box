<style scoped>
    .ivu-input-number {
        width: 100%;
    }

    .step-btn-box{
        margin: 25px 0;
    }

    .spin-container{
        display: inline-block;
        width: 200px;
        height: 100px;
        position: relative;
    }

    .loaded-container{
        width: 100%;
        height: 100%;
    }

    .split-line {
        height: 1px;
        width: 100%;
        margin-bottom: 20px;
        border-top: 1px solid #eee;
        text-align: center;
    }

    .txt{
        position: relative;
        top:-8px;
        background: #fff;
        display: inline-block;
    }

    .ivu-input-icon:hover{
        cursor: pointer;
        color: #2d8cf0
    }
</style>
<style>
    .account_input .ivu-input{
        text-transform: lowercase;
    }
    input[readonly="readonly"] {
        background-color: #f3f3f3;
    }
</style>
<template>
    <div class="account-setting">
        <div class="spin-container" v-show="!loaded">
            <Spin fix></Spin>
        </div>
        <div class="loaded-container" v-if="loaded">
            <div class="merchant" v-if="account_type === 'merchant'">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="100">
                <FormItem label="账号" prop="account_name">
                    <Input readonly v-model="formValidate1.account_name" placeholder="sample_user" class="account_input"></Input>
                </FormItem>
                <FormItem label="私钥" prop="private_key">
                    <div @click="changeShowType()"><Icon class="ivu-input-icon" type="eye"></Icon></div>
                    <Input :type="show_type" readonly v-model="formValidate1.private_key" placeholder="请输入账户私钥"></Input>
                </FormItem>
                <FormItem label="回调地址" prop="callback_url">
                    <Input v-model="formValidate1.callback_url" placeholder="http://localhost:3000/demo/callback"></Input>
                </FormItem>
                <FormItem label="请求超时/毫秒" prop="privacy_request_timeout">
                    <InputNumber v-model="formValidate1.privacy_request_timeout" placeholder="120000"></InputNumber>
                </FormItem>
                <FormItem label="默认超时/毫秒" prop="default_timeout">
                    <InputNumber v-model="formValidate1.default_timeout" placeholder="8000"></InputNumber>
                </FormItem>
            </Form>
            <div class="step-btn-box" v-if="scene === 'init'">
                <Button type="primary" @click="lastStep()">上一步</Button>
                <Button type="primary" @click="handleSubmit1('formValidate1')">下一步</Button>
            </div>
            <div class="save-btn-box" v-else>
                <Button type="primary" @click="handleSubmit1('formValidate1')">保存配置</Button>
            </div>
        </div>
            <div class="datasource" v-if="account_type === 'datasource'">
                <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                    <FormItem label="账号" prop="account_name">
                        <Input readonly v-model="formValidate2.account_name" placeholder="sample_user" class="account_input"></Input>
                    </FormItem>
                    <FormItem label="私钥" prop="private_key">
                        <div @click="changeShowType()"><Icon class="ivu-input-icon" type="eye"></Icon></div>
                        <Input :type="show_type" readonly v-model="formValidate2.private_key" placeholder="请输入账户私钥"></Input>
                    </FormItem>
                    <div class="split-line"><span class="txt">数据源（出售数据）</span></div>
                    <FormItem label="接口地址" prop="service">
                        <Input v-model="formValidate2.service" placeholder="http://localhost:3000/demo/call"></Input>
                    </FormItem>
                    <FormItem
                            v-for="(item, index) in formValidate2.subscribed_data_product"
                            :key="index"
                            :label="'产品ID-' + (index + 1)">
                        <Row>
                            <Col span="18">
                            <span>{{item}}</span>
                            </Col>
                            <Col span="4" offset="1">
                            <Button type="ghost" @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                            <Input v-model="product_id" placeholder="请输入产品ID"></Input>
                            </Col>
                            <Col span="10" offset="2">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="商户功能">
                        <i-switch v-model="is_merchant_open" size="large" style="float:right">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <div class="merchant_config" v-if="is_merchant_open">
                        <div class="split-line"><span class="txt">商户（购买数据）</span></div>
                        <FormItem label="回调地址" prop="callback_url">
                            <Input v-model="formValidate2.callback_url" placeholder="http://localhost:3000/demo/callback"></Input>
                        </FormItem>
                        <FormItem label="请求超时/毫秒" prop="privacy_request_timeout">
                            <InputNumber v-model="formValidate2.privacy_request_timeout" placeholder="120000"></InputNumber>
                        </FormItem>
                        <FormItem label="默认超时/毫秒" prop="default_timeout">
                            <InputNumber v-model="formValidate2.default_timeout" placeholder="8000"></InputNumber>
                        </FormItem>
                    </div>
                </Form>
                <div class="step-btn-box" v-if="scene === 'init'">
                    <Button type="primary" @click="lastStep()">上一步</Button>
                    <Button type="primary" @click="handleSubmit2('formValidate2')">下一步</Button>
                </div>
                <div class="save-btn-box" v-else>
                    <Button type="primary" @click="handleSubmit2('formValidate2')">保存配置</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Handler from '../../libs/handler';
    import {mapGetters} from 'vuex';
    
    export default {
        props: ['scene'],
        data () {
            return {
                loaded: false,
                show_type: 'password',
                formValidate1: {
                    account_name: '',
                    private_key: '',
                    callback_url: '',
                    privacy_request_timeout: 120000,
                    default_timeout: 8000
                },
                ruleValidate1: {
                    account_name: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    private_key: [
                        {required: true, message: '私钥不能为空', trigger: 'blur'}
                    ],
                    callback_url: [
                        {required: true, type: 'url', message: '回调地址必须为URL', trigger: 'blur'}
                    ],
                    privacy_request_timeout: [
                        {required: true, type: 'integer', message: '只能输入数字', trigger: 'blur'}
                    ],
                    default_timeout: [
                        {required: true, type: 'integer', message: '只能输入数字', trigger: 'blur'}
                    ]
                },
                product_id: '',
                is_merchant_open: false,
                formValidate2: {
                    account_name: '',
                    private_key: '',
                    callback_url: '',
                    privacy_request_timeout: 120000,
                    default_timeout: 8000,
                    service: '',
                    subscribed_data_product: []
                },
                ruleValidate2: {
                    account_name: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    private_key: [
                        {required: true, message: '私钥不能为空', trigger: 'blur'}
                    ],
                    callback_url: [
                        {required: true, type: 'url', message: '回调地址必须为URL', trigger: 'blur'}
                    ],
                    privacy_request_timeout: [
                        {required: true, type: 'integer', message: '只能输入数字', trigger: 'blur' }
                    ],
                    default_timeout: [
                        {required: true, type: 'integer', message: '只能输入数字', trigger: 'blur' }
                    ],
                    service: [
                        {required: true, type: 'url', message: '接口地址必须为URL', trigger: 'blur'}
                    ]
                }
            };
        },
        created (){
            this.$http.get('/api/fetch_config').then((res) => {
                if (this.account_type === 'merchant'){
                    this.formValidate1.account_name = res.data.merchant.account_name;
                    this.formValidate1.private_key = res.data.merchant.private_key;
                    this.formValidate1.callback_url = res.data.merchant.callback_url;
                    this.formValidate1.privacy_request_timeout = res.data.merchant.privacy_request_timeout ? res.data.merchant.privacy_request_timeout : 120000;
                    this.formValidate1.default_timeout = res.data.merchant.default_timeout ? res.data.merchant.default_timeout : 8000;
                }else{
                    this.formValidate2.account_name = res.data.datasource.account_name;
                    this.formValidate2.private_key = res.data.datasource.private_key;
                    this.formValidate2.service = res.data.datasource.service;
                    this.formValidate2.subscribed_data_product = res.data.datasource.subscribed_data_product ? res.data.datasource.subscribed_data_product : [];
                    if (res.data.merchant){
                        this.is_merchant_open = true;
                        this.formValidate2.callback_url = res.data.merchant.callback_url;
                        this.formValidate2.privacy_request_timeout = res.data.merchant.privacy_request_timeout ? res.data.merchant.privacy_request_timeout : 120000;
                        this.formValidate2.default_timeout = res.data.merchant.default_timeout ? res.data.merchant.default_timeout : 8000;
                    }
                }
                this.loaded = true;
            }).catch((err)=>{
                Handler.error(err);
            });
        },
        computed: {
            ...mapGetters({
                account_type: 'account_type'
            })
        },
        methods: {
            handleSubmit1 (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formValidate1.account_name = this.formValidate1.account_name.toLowerCase();
                        this.$http({
                            method: 'post',
                            url: '/api/write_config',
                            data: {
                                config: this.formValidate1,
                                type: 'merchant'
                            }
                        }).then(() => {
                            this.$Message.success('提交成功');
                            this.$emit('next');
                            this.$emit('restart');
                        }).catch((err) => {
                            this.$Message.error('提交失败:' + Handler.error(err));
                        });
                    } else {
                        this.$Message.error('验证失败');
                    }
                });
            },
            handleSubmit2 (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formValidate2.subscribed_data_product.length === 0){
                            this.$Message.error('至少需要添加一个产品ID');
                        }else{
                            let merchant_config = {
                                account_name: this.formValidate2.account_name.toLowerCase(),
                                private_key: this.formValidate2.private_key,
                                callback_url: this.formValidate2.callback_url,
                                privacy_request_timeout: this.formValidate2.privacy_request_timeout,
                                default_timeout: this.formValidate2.default_timeout
                            };
                            let datasource_config = {
                                account_name: this.formValidate2.account_name.toLowerCase(),
                                private_key: this.formValidate2.private_key,
                                service: this.formValidate2.service,
                                subscribed_data_product: this.formValidate2.subscribed_data_product
                            };
                            this.$http({
                                method: 'post',
                                url: '/api/write_config',
                                data: {
                                    merchant_config: merchant_config,
                                    datasource_config: datasource_config,
                                    type: 'datasource',
                                    is_merchant_open: this.is_merchant_open,
                                }
                            }).then(() => {
                                this.$Message.success('提交成功');
                                this.$emit('next');
                                this.$emit('restart');
                            }).catch((err) => {
                                this.$Message.error('提交失败:' + Handler.error(err));
                            });
                        }
                    } else {
                        this.$Message.error('验证失败');
                    }
                });
            },
            changeShowType () {
                if (this.show_type === 'password'){
                    this.show_type = 'text';
                }else{
                    this.show_type = 'password';
                }
            },
            handleAdd () {
                if (this.product_id !== ''){
                    this.formValidate2.subscribed_data_product.push(this.product_id);
                    this.product_id = '';
                }else{
                    this.$Message.error('产品ID不能为空');
                }
            },
            handleRemove (index) {
                this.formValidate2.subscribed_data_product.splice(index, 1);
            },
            lastStep (){
                this.$emit('last');
            }
        }
    };
</script>