var Tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) {
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) {
		if((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d / 2) == 2) {
			return b + c;
		}
		if(!p) {
			p = d * (0.3 * 1.5);
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if(t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 2.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		if((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) {
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if(t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};

function css(obj, attr, val) {
	if(/rotate|skew|scale|translate/.test(attr)) {
		return cssTransform(obj, attr, val);
	}
	if(val === 'undefined') {
		var val = getComputedStyle(obj)[attr];
		if(attr == 'opacity') {
			val = Math.round(val * 100);
		}
		return val;
	} else {
		if(attr == 'opacity') {
			obj.style[attr] = val / 100;
		} else {
			obj.style[attr] = val + 'px';
		}
	}
}

function cssTransform(obj, attr, val) {
	if(!obj.transform) {
		obj.transform = {};
	}
	if(typeof val === 'undefined') {
		if(typeof obj.transform[attr] === 'undefined') {
			switch(getTransformUnit(attr)) {
				case 'percent':
					obj.transform[attr] = 100;
					break;
				default:
					obj.transform[attr] = 0;
			}
		}
		return obj.transform[attr];
	} else {
		obj.transform[attr] = val;
		var iStyle = '';
		for(var s in obj.transform) {
			switch(getTransformUnit(s)) {
				case 'degree':
					iStyle += ' ' + s + '(' + obj.transform[s] + 'deg)';
					break;
				case 'percent':
					iStyle += ' ' + s + '(' + (obj.transform[s] / 100) + ')';
					break;
				case 'pixel':
					iStyle += ' ' + s + '(' + obj.transform[s] + 'px)';
					break;
			}
		}
		obj.style.WebkitTransform = obj.style.transform = iStyle;
	}

	function getTransformUnit(attribute) {
		if(/rotate|skew/.test(attribute)) {
			return 'degree';
		} else if(/scale/.test(attribute)) {
			return 'percent';
		} else {
			return 'pixel';
		}
	}
}

function MTween(init) {
	/*
		 API
		 @ init.el: element(object),
		 @ init.target: { 'attr1': val1, 'attr2': val2... },
		 @ init.time: msec (doration),
		 @ init.type: 'tween type',
		 * init.callIn: function (){} (function in the same time),
		 * init.callBack: function (){} (function after motion)
	*/
	var t = 0;
	var b = {};
	var c = {};
	var d = init.time / 20;
	for(var s in init.target) {
		b[s] = css(init.el, s);
		c[s] = init.target[s] - b[s];
	}
	clearInterval(init.el.timer);
	init.el.timer = setInterval(function() {
		t++;
		if(t > d) {
			clearInterval(init.el.timer);
			init.callBack && init.callBack.call(init.el);
		} else {
			init.callIn && init.callIn.call(init.el);
			for(var s in b) {
				var val = Number((Tween[init.type](t, b[s], c[s], d)).toFixed(2));
				css(init.el, s, val);
			}
		}
	}, 20);
}

function mScroll(init) {
	/*
		 API
		 @ init.el: element(object)
		 * init.useBar: 
	 		* false (default)
	 		* true (scrollBar visible)
	 		* 'ctrl' (scrollBar control scrollElement)
	*/
	css(init.el, 'translateZ', 0.01); //3D hardware acceleration
	init.el.style.minHeight = '100%';
	var cont = {}; //attributes in scrollElement
	cont.height = init.el.offsetHeight;
	cont.parentHeight = init.el.parentNode.offsetHeight;
	var ease = {}; //attributes in easeMotion
	if(init.useBar) {
		var bar = {}; //attributes in scrollBar
		useBar();
	}
	touchScroll();

	//useBar
	function useBar() {
		bar.el = document.createElement('div');
		bar.el.style.cssText = 'width: 8px; background: rgba(0,0,0,0.5); opacity: 0; position: absolute; right: 0; top: 0; border-radius: 4px;';
		bar.scale = cont.parentHeight / cont.height;
		bar.height = bar.scale * cont.parentHeight;
		bar.el.style.height = bar.height + 'px';
		css(bar.el, 'translateZ', 0.01); //fixed scrollBar cannot be touched in android QQBrowser
		init.el.parentNode.appendChild(bar.el);
		//scrollBar ctrl
		if(init.useBar == 'ctrl') {
			bar.el.addEventListener('touchstart', function(e) {
				bar.oriY = e.changedTouches[0].pageY;
				bar.startY = css(bar.el, 'translateY');
				cont.startY = css(init.el, 'translateY');
				clearTimeout(bar.el.timer);
				clearTimeout(init.el.timer);
				bar.el.style.transition = 'none';
				bar.el.style.opacity = 1;
			});
			bar.el.addEventListener('touchmove', function(e) {
				bar.disY = e.changedTouches[0].pageY - bar.oriY;
				bar.curY = Math.round(bar.startY + bar.disY);
				if(bar.curY < 0) {
					bar.curY = 0;
				} else if(bar.curY > cont.parentHeight - bar.height) {
					bar.curY = cont.parentHeight - bar.height;
				}
				cont.barCtrlY = -bar.curY / bar.scale;
				css(bar.el, 'translateY', bar.curY);
				css(init.el, 'translateY', cont.barCtrlY);
			});
			bar.el.addEventListener('touchend', function() {
				clearTimeout(bar.el.timer);
				bar.el.timer = setTimeout(function() {
					bar.el.style.transition = '1s';
					bar.el.style.opacity = 0;
				}, 500);
			});
		}
	}
	//touchScroll
	function touchScroll() {
		//scroll element with touchmoving on scrollElement
		init.el.addEventListener('touchstart', function(e) {
			clearInterval(init.el.timer);
			cont.oriY = e.changedTouches[0].pageY;
			cont.startY = css(init.el, 'translateY');
			ease.lastDis = 0;
			ease.lastStart = cont.startY;
			ease.lastTime = new Date().getTime();
			if(init.useBar) {
				clearTimeout(bar.el.timer);
				bar.el.style.transition = 'none';
				bar.el.style.opacity = 1;
			}
		});
		init.el.addEventListener('touchmove', function(e) {
			cont.disY = e.changedTouches[0].pageY - cont.oriY;
			cont.curY = Math.round(cont.startY + cont.disY);
			css(init.el, 'translateY', cont.curY);
			ease.lastDis = cont.curY - ease.lastStart;
			ease.lastStart = cont.curY;
			ease.newTime = new Date().getTime();
			ease.timeDis = ease.newTime - ease.lastTime;
			ease.lastTime = ease.newTime;
			init.useBar && css(bar.el, 'translateY', -cont.curY * bar.scale);
		});
		init.el.addEventListener('touchend', function() {
			if(init.useBar && !cont.disY) {
				bar.el.style.transition = '1s';
				bar.el.style.opacity = 0;
			}
			ease.startY = css(init.el, 'translateY');
			//return(long distance with a short doration)
			if(Math.abs(ease.lastDis) < 10) {
				if(ease.startY > cont.parentHeight - cont.height && ease.startY < 0) {
					return;
				}
			}!ease.timeDis ? ease.speed = 0 : ease.speed = ease.lastDis / ease.timeDis * 10;
			ease.target = Math.round(ease.startY + ease.speed * 20);
			//easeBack near side(top or bottom) of scrollElement's parent
			if(ease.target > 0) {
				ease.target = 0;
			} else if(ease.target < cont.parentHeight - cont.height) {
				ease.target = cont.parentHeight - cont.height;
			}
			MTween({ //scroll motion
				"el": init.el,
				"target": {
					"translateY": ease.target
				},
				"time": Math.abs(ease.target - ease.startY) * 2,
				"type": "easeOutStrong",
				"callBack": function() {
					if(init.useBar) {
						bar.el.timer = setTimeout(function() {
							bar.el.style.transition = '1s';
							bar.el.style.opacity = 0;
						}, 500);
					}
				},
				"callIn": function() {
					if(init.useBar) {
						bar.curY = -css(init.el, 'translateY') * bar.scale;
						css(bar.el, 'translateY', bar.curY);
					}
				}
			});
		});
	}
}

function mRotate(init) {
	/*
		 API
		 @ init.el: element(object)
	*/
	css(init.el,'rotateX',0); //locked x-axis when rotateY
	var cont = {};
	var ease = {};
	cont.scale = 90 / init.el.offsetHeight;
	init.el.addEventListener('touchstart', function(e) {
		clearInterval(init.el.timer);
		cont.startX = css(init.el, 'rotateY');
		cont.startY = css(init.el, 'rotateX');
		cont.oriX = e.changedTouches[0].pageX;
		cont.oriY = e.changedTouches[0].pageY;
		ease.startX = cont.startX;
		ease.startY = cont.startY;
		ease.disX = 0;
		ease.disY = 0;
		ease.startTime = new Date().getTime();
	});
	init.el.addEventListener('touchmove', function(e) {
		cont.disX = (cont.oriX - e.changedTouches[0].pageX) * cont.scale;
		cont.disY = (e.changedTouches[0].pageY - cont.oriY) * cont.scale;
		cont.curX = Math.round(cont.startX + cont.disX);
		cont.curY = Math.round(cont.startY + cont.disY);
		if(cont.curY > 45) {
			cont.curY = 45;
		} else if(cont.curY < -45) {
			cont.curY = -45;
		}
		css(init.el, 'rotateY', cont.curX);
		css(init.el, 'rotateX', cont.curY);
		ease.disX = cont.curX - ease.startX;
		ease.disY = cont.curY - ease.startY;
		ease.startX = cont.curX;
		ease.startY = cont.curY;
		ease.newTime = new Date().getTime();
		ease.disTime = ease.newTime - ease.startTime;
		ease.startTime = ease.newTime;
	});
	init.el.addEventListener('touchend', function() {
		if(!ease.disTime) {
			ease.speedX = 0;
			ease.speedY = 0;
		} else {
			ease.speedX = Math.round(ease.disX / ease.disTime * 10);
			ease.speedY = Math.round(ease.disY / ease.disTime * 10);
		}
		cont.curX = css(init.el, 'rotateY');
		cont.curY = css(init.el, 'rotateX');
		ease.targetX = cont.curX + ease.speedX * 20;
		ease.targetY = cont.curY + ease.speedY * 20;
		if(ease.targetY > 45) {
			ease.targetY = 45;
		} else if(ease.targetY < -45) {
			ease.targetY = -45;
		}
		MTween({
			el: init.el,
			target: {
				'rotateY': ease.targetX,
				'rotateX': ease.targetY
			},
			time: 500,
			type: 'easeOutStrong'
		});
	});
}

function regPoly(parent,order){
	var aPlane = parent.children; //each plane
	var n = aPlane.length; //num of plane
	var iWidth = aPlane[0].offsetWidth; //width of plane
	var iDeg = 180*(n-2)/n;
	var iRot = 360/n;
	var iR = iWidth/2*Math.tan(iDeg/2*Math.PI/180);
	for (var i=0; i<n; i++) {
		if (!order) {
			css(aPlane[i],'rotateY',i*iRot);
			css(aPlane[i],'translateZ',iR);
		} else {
			css(aPlane[i],'translateZ',iR*Math.cos(i*iRot*Math.PI/180));
			css(aPlane[i],'translateX',iR*Math.sin(i*iRot*Math.PI/180));
			css(aPlane[i],'rotateY',i*iRot);
		}
	}	
}