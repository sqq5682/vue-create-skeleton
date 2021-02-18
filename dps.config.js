const skeletonConfig = require('./config')
const dpsConfig = {
	...skeletonConfig,
	// header: {
	// 	height: 40,
	// 	background: '#3388ff'
	// },
	// extraHTTPHeaders:{
	// 	authorization:'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI1ZjU2MTMwZjE3NDI2NDc2YThmNjQ2MDIiLCJuYmYiOjE2MDA0MTMyMjIsImlzcyI6InNob3BzaG9wcyIsInVrZXkiOiIiLCJleHAiOjE2MDMwMDUyMjIsImlhdCI6MTYwMDQxMzIyMiwianRpIjoiYmVkMGU0NWY1NzlhNDY4NGIwYWZjNGYyZmIxNzk4NjMifQ.0sbrfur9hfqcZnLRpqlPzloibWULFtcr_36LDu9a8efujiAUs61VxnnLAChh6YLgZg6qPhkhdtgFMHG3zIoI7w',
	// 	token:'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI1ZjU2MTMwZjE3NDI2NDc2YThmNjQ2MDIiLCJuYmYiOjE2MDA0MTMyMjIsImlzcyI6InNob3BzaG9wcyIsInVrZXkiOiIiLCJleHAiOjE2MDMwMDUyMjIsImlhdCI6MTYwMDQxMzIyMiwianRpIjoiYmVkMGU0NWY1NzlhNDY4NGIwYWZjNGYyZmIxNzk4NjMifQ.0sbrfur9hfqcZnLRpqlPzloibWULFtcr_36LDu9a8efujiAUs61VxnnLAChh6YLgZg6qPhkhdtgFMHG3zIoI7w',
	// },
	background: '#eee',
	animation: 'opacitySkeleton 1s linear infinite;',
	headless:false,
	includeElement: function(node, draw) {
		//定制某个节点画出来的样子，带上return false
		// if(node.id == 'func-buttons') {
		// 	//跳过该节点及其子节点
		// 	return false;
		// }
		// if(node.tagName.toLowerCase() === 'img') {
		// 	///对该图片生成宽100%，高8%，颜色为红色的色块
		// 	draw({
		// 		width: 100,
		// 		height: 8,
		// 		left: 0,
		// 		top: 0,
		// 		zIndex: 99999999,
		// 		background: 'red'
		// 	});
		// 	return false;
		// } 
	},
	// writePageStructure: function(html) {
	// 	let getIndexHtml = fs.readFileSync(indexHtml).toString();
	// 	let writeHtml = getIndexHtml.replace("<!--shell-->",html)
	// 	fs.writeFile(routers[0].outPath,writeHtml,'utf8',function(error){
	// 		if(error){
	// 			console.log(error);
	// 			return false;
	// 		}
	// 		console.log('写入成功');
	// 	})
	// 	//fs.writeFileSync(filepath, html);
	// 	console.log(html)
	// },
	init: function() {
		// document.querySelectorAll('.m-icon').forEach(item => item.parentNode.removeChild(item));
		// 生成骨架屏之前的操作，比如删除干扰节点
	}
}

module.exports = dpsConfig;

