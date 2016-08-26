// JavaScript Document
define(function(require,exports,module){
	exports.loginRun=function(id){
		var oBox=document.getElementById(id);
		var oDiv=oBox.getElementsByTagName('div')[0];
		var aA=oBox.getElementsByTagName('a');
		var l=oDiv.offsetLeft,nowLeft=oDiv.offsetLeft,now=0;
		for(var i=0; i<aA.length; i++){
			mouseOver(aA[i]);
			mouseOut(aA[i]);
			if(aA[i].className){
				now=i;	
			}
		}
		function mouseOver(obj){
			obj.addEventListener('mouseover',function(){
				fnMove(oDiv,this.offsetLeft);
				for(var i=0; i<aA.length; i++){
					aA[i].classList.remove('active');	
				}
				this.classList.add('active');
			},false)	
		}
		function mouseOut(obj){
			obj.addEventListener('mouseout',function(){
				fnMove(oDiv,nowLeft);
				for(var i=0; i<aA.length; i++){
					aA[i].classList.remove('active');	
				}
				aA[now].classList.add('active');
			},false)	
		}
		function fnMove(obj,iTarget){
			var speed=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				speed+=(iTarget-obj.offsetLeft);
				speed*=0.5;
				l+=speed;
				oDiv.style.left=Math.round(l)+'px';
				if(Math.abs(speed)<1)speed=0;
				if(speed==0&&iTarget==obj.offsetLeft){
					clearInterval(obj.timer);
				}
			},30)
		};
	}	
	
	exports.getPos=function(obj){
		var l=0; 
		var t=0;
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;	
		}
		return {left:l,top:t};
	}
	
	exports.startMove=function(obj,json,json2){
		json2=json2||{};
		json2.clock=json2.clock||700;
		json2.scale=json2.scale||'nor';
		var start={};
		var dis={};
		for(var name in json){
			start[name]=parseFloat(getStyle(obj,name));
			if(isNaN(start[name])){
				switch(name){
					case 'height':
						start[name]=obj.offsetHeight;	
						break;
					case 'width':
						start[name]=obj.offsetWidth;	
						break;
					case 'top':
						start[name]=obj.offsetTop;	
						break;
					case 'left':
						start[name]=obj.offsetLeft;	
						break;
					case 'opacity':
						start[name]=1;	
						break;
					case 'borderWidth':
						start[name]=0;	
						break;
				}
			}
			dis[name]=json[name]-start[name];
		}
		var count=Math.floor(json2.clock/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				switch(json2.scale){
					case 'nor':
						var cur=start[name]+dis[name]*n/count;
						break;	
					case 'add':
						var a=n/count;
						var cur=start[name]+dis[name]*Math.pow(a,3);
						break;	
					case 'del':
						var a=1-n/count;
						var cur=start[name]+dis[name]*(1-Math.pow(a,3));
						break;	
				}
				if(name=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';	
				}
			}
			if(n==count){
				clearInterval(obj.timer);
				json2.fn&&json2.fn();	
			}
		},30)
		function getStyle(obj,sName){
			return (obj.currentStyle||getComputedStyle(obj,false))[sName];	
		}
	};
	
	exports.getStyle=function(obj,sName){
		return (obj.currentStyle||getComputedStyle(obj,false))[sName];
	};
	
	exports.addFavorite=function(id){
		var oA=document.getElementById(id);	
		oA.addEventListener('click',function(){
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
		},false)
	};
	
	exports.fnToTop=function(id){
		var oDiv=document.getElementById(id);	
		oDiv.addEventListener('click',function(){
			document.body.scrollTop=0;
			this.style.display='none';
			//this.removeAttribute('style');
		},false)
		window.addEventListener('scroll',function(){
			var top=document.body.scrollTop;
			if(top>0){
				oDiv.style.display='block';
				oDiv.style.animation='1s toTop linear';
			}
		},false)
	};
	
	exports.ran=function(n,m){
		return parseInt(Math.random()*(m-n)+n);	
	}
	
})