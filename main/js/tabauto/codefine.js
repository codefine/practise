//这是Michael.Lu原创的原生JS库

/*
 参数填写类型说明：
 	* 元素: object
 	* 数组: object
 	* []: number
 	* '': string (''中如果有英文内容而非中文说明，则为固定字符串)
 	* ||: 非必要填写内容
 
 目录：
 	<1>	基础功能
 		>HTML加载完成后执行JS { $(function (){}) }
 		>根据不同选择符获取元素 { $(|父级元素|,'@标签名||#ID名') }
 	<2>	获取元素属性值 { getStyle(元素,'属性名','number||string') }
 	<3> 运动 { doMove(元素,'属性名',[步长],[结束条件],|回调函数|) } (包涵<2>)
 	<4> 抖动 { shake(元素,'属性名',|回调函数|) }
 	<5> 透明度变化 { opacity(元素,[步长0~100],[结束条件0~100],|回调函数|) } (包涵<2>)
 	<6> 数组极值 { extramum(数组,'max||min') }
 	<7> 去重复 { overKill(数组||'字符串') }
 	<8> 随机整数 { random([起始值],[结束值]) }
 	<9> 查找元素(任意子字符串)在数组中的位数 { arrIndexOf(数组,'子字符串',|[起始位置]|) }
 	<10> 查找元素(或任意子字符串)个数 { search(数组||'字符串',[查找对象]||'查找对象') }
 	<11> 非严格模式的类json字符串转换成严格模式的类json字符串 { jsonify('字符串') }
 */


//<1> 基础功能
function $(){
	if (typeof arguments[0]==='function') {	//HTML加载完成后执行JS
		window.onload = arguments[0];
	} else if (typeof arguments[0]==='string') { //根据不同选择符获取元素 ｛ 规则：(父级元素,元素名称) 如果不填写父级元素，则视父级为document｝
		switch (arguments[0].charAt(0)) {
			case '#': return (arguments[1]||document).getElementById(arguments[0].replace('#','')); break;	//#根据元素ID获取
			case '@': return (arguments[1]||document).getElementsByTagName(arguments[0].replace('@','')); break; //@根据元素标签名获取
		}
	} 
}

//<2> 获取元素属性值
//已知缺点：1⃣不能获取复合属性；2⃣不能获取未设置属性；3⃣不能获取前后含有空格的属性；
function getStyle(obj,attr,type){
	if (type==='number') {
		return obj.currentStyle ? parseInt(obj.currentStyle[attr]) : parseInt(getComputedStyle(obj, null)[attr]);
	} else if (type==='string') {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
	}
}

//<3> 运动
function doMove(obj,dir,step,end,endFn){
	step = getStyle(obj,dir,'number')<end ? step : -step;
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		var speed = getStyle(obj,dir,'number') + step;
		if (speed>end&&step>0||speed<end&&step<0) {
			speed = end;
		}
		obj.style[dir] = speed + 'px';
		if (speed==end) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	},30)
}

//<4> 抖动
function shake(obj,dir,endFn){
	if (obj.onOff) {return;}
	obj.onOff = true;
	var pos = getStyle(obj,dir,'number');
	var freq = [];
	var num = 0;
	for (i=20; i>0; i-=4) {
		freq.push(i,-i);
	}
	freq.push(0);
	clearInterval(obj.shakeOne);
	obj.shakeOne = setInterval(function (){
		obj.style[dir] = pos + freq[num] + 'px';
		num ++;
		if (num==freq.length) {
			clearInterval(obj.shakeOne);
			endFn && endFn();
			obj.onOff = false;
		}
	},40);
}

//<5> 透明度变化
function opacity(obj,step,end,endFn){
	step = parseInt(getStyle(obj,'opacity','string')*100)>end ? -step : step;
	clearInterval(obj.opacity);
	obj.opacity = setInterval(function (){
		var speed = parseInt(getStyle(obj,'opacity','string')*100) + step;
		if (speed>end&&step>0||speed<end&&step<0) {
			speed = end;
		}
		obj.style.opacity = speed/100;
		obj.style.filter = 'alpha(opacity:'+speed+')';
		if (speed==end) {
			clearInterval(obj.opacity);
			endFn && endFn();
		}
	},80)
}

//<6> 数组极值(最大值&最小值)
function extramum(arr,ext){
	max = min = arr[0];
	for (var i=0; i<arr.length; i++) {
		if (max<arr[i]) max = arr[i];
		if (min>arr[i]) min = arr[i];
	}
	switch (ext) {
		case 'max': return max;
		case 'min': return min;
	}
}

//<7> 去重复
function overKill(obj){
	if (typeof obj==='string') {
		obj = obj.split('');
		kill(obj);
		obj = obj.join('');
	} else {
		kill(obj);
	}
	function kill(obj){
		for (var i=0; i<obj.length; i++) {
			for (var j=i+1; j<obj.length; j++) {
				if (obj[i]===obj[j]) {
					obj.splice(j,1);
					j --;
				}
			}
		}
	}
	return obj;
}

//<8> 随机整数
function randomInt(x,y){
	return Math.round(Math.random()*(y-x>0 ? y-x : x-y)+(y-x>0 ? x : y));
}

//<9> 查找元素(或任意子字符串)在数组中的位数
function arrIndexOf(arr,elt,loc){
	var newArr = arr.slice(typeof loc==='undefined'?0:loc);
	var newStr = newArr.join(',').slice(0,newArr.join(',').indexOf(elt)+elt.length);
	return newArr.join(',').indexOf(elt)===-1 ? -1 : (typeof loc==='undefined'?0:loc)+newStr.split(',').length-1;
}

//<10> 查找元素(或任意子字符串)个数
function search(obj,cont){
	var num = 0;
	if (typeof obj==='string') {
		var loc = 0;
		for (var i=0; i<obj.length; i++) {
			if (obj.indexOf(cont,loc)!==-1) {
				loc = obj.indexOf(cont,loc)+1;
				num ++;
			}
		}
	} else {
		for (var i=0; i<arr.length; i++) {
			if (arr[i]===cont) num++;
		}
	}
	return num;
}

//<11> 非严格模式的类json字符串转换成严格模式的类json字符串
function jsonify(str){	
	//以下方法只能转换一层json
//	var aJson = str.replace(/:/g,',').match(/(\w+-?)+/g);
//	var newStr = '';
//	for (var i=0; i<aJson.length; i+=2) {
//		for (var j=0; j<2; j++) {
//			if (j==0) {
//				newStr += '"'+aJson[i+j]+'"'+':';
//			} else {
//				newStr += '"'+aJson[i+j]+'"'+',';
//			}
//		}
//	}
//	return '{'+newStr.replace(/,$/,'')+'}';
	return str.replace(/'|"|\s/g,'').replace(/(\w+-?)+/g,function ($0){
				return '"'+$0+'"';
	})
}
