# page-skeleton(draw-page-structure)

## 项目开始

```
npm install
```

```
npm run start 
```

### 具体参考

按照开源的 [dps](https://github.com/famanoder/dps) 根据网页生成骨架屏DOM来做的。

[dps](https://github.com/famanoder/dps) 其中主要功能是 [puppeteer](https://github.com/puppeteer/puppeteer)  是一个Node.js包，提供了一组用来操纵Chrome的API，可以做到爬取页面数据，页面截屏或者生成PDF文件，前端自动化测试（模拟输入/点击/键盘行为）以及捕获站点的时间线，分析网站性能问题。


<!-- [vue-skeleton-webpack-plugin](https://github.com/lavas-project/vue-skeleton-webpack-plugin) -->

<!-- ##### vue-skeleton-webpack-plugin 用法

    npm install vue-skeleton-webpack-plugin -S

在vue.config.js 中的 configureWebpack 配置

    const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
    new SkeletonWebpackPlugin({
        webpackConfig: {
            entry: {
                app: path.join(__dirname, './src/skeleton/entry-skeleton.js'),
            },
        },
        router: {
            mode: 'history',
            routes: [
                {
                    path: '/login',//可以用正则比如 path: /^\/page1/
                    skeletonId: 'skeleton1'
                },
                {
                    path: '/order_list',
                    skeletonId: 'skeleton2'
                },
            ]
        },
        minimize: true,//下是否需要压缩注入 HTML 的 JS 代码
        quiet: true,//在服务端渲染时是否需要输出信息到控制台
    })
 -->


### 参数说明
| 参数 | 说明 | 默认值 | 是否必填
|----- | ----- | ----- | -----
| loginPath | 登录页面路由地址 | -- | 是
| needLogin | 是否需要登录 | -- | 是
| routerList | 待生成骨架屏的页面地址数组 | -- | 是
| outfilePath | 生成的骨架屏节点写入的文件 | -- | 否
| output.injectSelector | 骨架屏节点插入的位置 | #app | 否
| header.height | 主题header的高 | -- | 否s
| header.background | 主题header的背景色 | -- | 否
| background | 骨架屏主题色 | #ecf0f2 | 否
| animation | css3动画属性 | -- | 否
| rootNode | 真对某个模块生成骨架屏 | document.body | 否-已废弃
| device | 设备类型，支持mobile, ipad, pc | mobile | 否
| extraHTTPHeaders | 添加请求头 | -- | 否
| init | 开始生成之前的操作 | -- | 否
| includeElement(node, draw) | 定制某个节点如何生成 | -- | 否
| writePageStructure(html, ?filepath) | 回调的骨架屏节点 | -- | 否
