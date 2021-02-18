const path = require('path');
const baseUrl = 'https://m.baidu.com' //https://m.baidu.com/ //预览网页域名
const outfilePath = path.join(__dirname,'../mobile/src/skeleton/pages') //生成首页骨架屏的目标地址 目标项目和生成骨架屏项目最好同级目录
// const loginPath = `${baseUrl}/login` //需要登录状态的页面登录地址

const SkeRouterName = [ //需要要生成的页面地址
	//'orderDetail?orderId=',//订单详情
	//'addEdit',//添加地址
	//'anchor?hostId=',
	// 'clock',
	// 'invite_user',
	// 'invite_new',
	//'addressList',//地址列表
	//'cart',
	// 'order_list',
	//'login',
	//'store_detail?storeId=',
	'goods_detail?goodsId=',
]
const setDpsConfig = {//配置骨架屏的基本参数
	loginPath,
	needLogin: false,//控制骨架屏生成是否登录状态的
	domClassName: 'skeCreateWrap',//骨架屏的class容器 
	animationKey:'@keyframes opacitySkeleton {0% {opacity: 1}50% {opacity: .7}100% {opacity: 1}}',
	outfilePath, //生成首页骨架屏的目标地址
	routerList: SkeRouterName.map(item=>{
		let formItem = item.indexOf('?') >=0 ? item.split('?')[0] : item;
		return {
			router: `${baseUrl}/${item}`,//访问页面地址
			outPath: `${outfilePath}/${formItem}.vue`,//生成骨架屏的文件绝对路径目录,文件名字和路由一致
		}
	})
}

module.exports = {
	...setDpsConfig,
}
