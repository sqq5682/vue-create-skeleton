const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer')
//const cheerio = require('cheerio');
const ppteer = require('./pp');
const defaultHtml = require('./default.vue');
const evalScripts = require('../evalDOM');
const dpsConfig = require('../dps.config');
const { log, getAgrType, calcText, genArgs } = require('./utils');

const currDir = process.cwd();

class DrawPageStructure {
    constructor({
        loginPath,
        needLogin,
        outfilePath,
        routerList,
        background,
        animation,
        rootNode,
        header,
        device,
        headless,
        extraHTTPHeaders,
        writePageStructure,
        includeElement,
        init
    } = {}) {
        this.routerList = routerList;//要生成页面路由地址
        this.filepath = routerList[0].router;//当前要生成页面的路由
        this.loginPath = loginPath//登录地址
        this.needLogin = needLogin//是否需要登录
        this.outfilePath = outfilePath//要生成的目录
        //this.injectSelector = output.injectSelector || 'body';
        this.background = background || '#ecf0f2';
        this.animation = animation || '';
        this.rootNode = rootNode || '';
        this.header = header || '';
        this.device = device;
        this.headless = headless;
        this.extraHTTPHeaders = extraHTTPHeaders;
        this.writePageStructure = writePageStructure;
        this.includeElement = includeElement || function() {};
        this.init = init || function() {};
        this.pp = null
        if (this.headless === undefined) this.headless = true;
        
        if(routerList.length <=0 ){
            log.error('请检查输入生成骨架屏的页面地址以及目录', 1); 
        }
        //this.routerList.forEach((item=>item.status = false))
        if (!routerList[0].router) {
          log.error('路由页面不存在', 1); 
        }
        
        // if (header && getAgrType(header) !== 'object') {
        //   log.error('[header] should be an object !', 1);
        // }
        // if (routerList[0].outPath) {
        //     // if (!fs.existsSync(filepath)) {
        //     //     log.error('[output.filepath:404] please provide the output filepath !', 1);
        //     // }
        // }
        
    }
    async generateSkeletonHTML(page) {
        let html = '';
        try {
            const agrs = genArgs.create({
                init: {
                    type: 'function',
                    value: this.init.toString()
                },
                includeElement: {
                    type: 'function',
                    value: this.includeElement.toString()
                }, 
                background: {
                    type: 'string',
                    value: this.background
                }, 
                animation: {
                    type: 'string',
                    value: this.animation
                },
                rootNode: {
                    type: 'string',
                    value: this.rootNode
                },
                header: {
                    type: 'object',
                    value: JSON.stringify(this.header)
                }
            });
            agrs.unshift(evalScripts);
            html = await page.evaluate.apply(page, agrs);
        } catch (e) {
            log.error('\n[page.evaluate] ' + e.message);
        }
        return html;
    }
    writeToFilepath(filepath, html) {//生成写入骨架屏文件
        html = html.replace(dpsConfig.animation, '')
        html = html.replace(dpsConfig.animationKey, '')
        let fileHTML = defaultHtml;
        let createHtml = fileHTML.replace('<!--shell-->',html);
        let createPath = filepath.replace('src/skeleton/pages','src/components/skeleton/pages')
        fs.writeFileSync(filepath, createHtml);
        fs.writeFileSync(createPath, createHtml);
    }
    async mockLogin(pp) {//模拟登录
        log.info(`正在打开页面：${this.loginPath}`);
        const pageLogin = await pp.openPage(this.loginPath);
        log.info(`成功打开页面：${this.loginPath}`);
        await pageLogin.type(".phone-input", "18210002806");//输入手机号
        await pageLogin.click(".code-button");//模拟点击获取code
        let getCode = await this.inquirerFun('input', 'code', '请输入收到的验证码')
        await pageLogin.type(".common-input", getCode);//发送验证码
        await pageLogin.click(".left");//勾选协议
        await pageLogin.click(".login-button");//触发登录按钮
        this.needLogin = false
    }
    async inquirerFun(type, name, message = '', def = '', prefix = '') {//简单封装inquirer
        let getRes = await inquirer.prompt([
            {
                type,//类型
                name,//字段何设置
                message,//描述
                default: def,//默认值
                prefix,//前缀设置
            }
        ])
        if(!getRes[name] || getRes[name] == ''){
            await this.inquirerFun(type, name, message, def, prefix)
        }else{
            return getRes[name]
        }
    }
    async start() {
        if(this.routerList[0].hasOwnProperty('status')){
            log.info(`骨架屏已经全部生成`)
            await this.pp.browser.close();
            process.exit(0);
        }
        if(!this.routerList.some(item=>item.hasOwnProperty('status'))){
            log.info('启动浏览器...')
            this.pp = await ppteer({
                device: this.device,
                headless: this.headless
            });
        }
        let pageUrl = this.routerList[0].router
        this.filepath = this.routerList[0].outPath
        let pp = this.pp
        if(this.needLogin){
            await this.mockLogin(pp);
        }
        log.info(`正在打开页面：${ pageUrl }...`)
        const page = await pp.openPage(pageUrl, this.extraHTTPHeaders,);
        log.info(`已经打开页面：${ pageUrl }...`)
        const html = await this.generateSkeletonHTML(page);
        log.info('浏览页面已经生成骨架屏结构')
        await this.inquirerFun("confirm", "html", "是否生成对应页面骨架屏文件？")
        const getCreateHtml = await page.$eval(`.${dpsConfig.domClassName}`, e => e.innerHTML);
        // const userWrite = getAgrType(this.writePageStructure) === 'function';
        // if (userWrite) {
        //     this.writePageStructure(getCreateHtml, this.filepath);
        // }
        if (this.filepath) {
            fs.writeFileSync(this.filepath, defaultHtml);
            this.writeToFilepath(this.filepath, getCreateHtml);
        }
        log.info('已经生成骨架屏文件')
        this.routerList[0].status = true;
        this.routerList.push(this.routerList.shift());
        log.warn(`骨架屏已经生成目录: ${this.filepath}`);
        this.start()
        if (this.headless) {
            setTimeout(async ()=>{
                process.exit(0);
            },5000)
        }
    }
}
module.exports = DrawPageStructure;
