// JavaScript Document
define(function(require,exports,module){
	var scrollTop=require('public.js').getPos;
	var moveJs=require('public.js').startMove;
	exports.Tab=function(id){
		var oBox=document.querySelector(id);
		var oUl=oBox.querySelector('ul');
		var aLi=oUl.children;
		var aBtn=oBox.querySelector('ol').children;
		var oDiv=document.querySelector('#login-run');
		var x=-aLi[1].offsetLeft,now=1,bNow=0,bOk=false,timer=null;
		window.addEventListener('scroll',function(){
			clearInterval(timer)
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(sTop<scrollTop(oUl).top+oUl.offsetHeight){
				timer=setInterval(tab,3000);
			}else{
				clearInterval(timer)
			}
		},false)
		oDiv.addEventListener('mouseover',function(){
			clearInterval(timer);
		},false)
		oDiv.addEventListener('mouseout',function(){
			timer=setInterval(tab,3000);
		},false)
		timer=setInterval(tab,3000);
		function tab(){
			now++;
			bNow++;
			oUl.style.transition='1s all ease';
			x=-now*aLi[1].offsetWidth;
			oUl.style.transform='translate('+x+'px)';	
			function moveEnd(){
				oUl.removeEventListener('transitionend',moveEnd,false);	
				if(now==aLi.length-1){
					oUl.style.transition='none';
					now=1;
					x=-now*aLi[1].offsetWidth;
					oUl.style.transform='translate('+x+'px)';	
				}
			}
			oUl.addEventListener('transitionend',moveEnd,false);
			if(bNow>3){
				bNow=0
			}
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].classList.remove('active');	
			}
			aBtn[bNow].classList.add('active');	
		}	
		oUl.onmousedown=function(ev){
			clearInterval(timer)
			if(bOk)return;
			bOk=true;
			var disX=ev.clientX-x;
			var downX=ev.clientX;
			oUl.style.transition='none';
			document.addEventListener('mousemove',fnMove,false);
			function fnMove(ev){
				x=ev.clientX-disX;	
				oUl.style.transform='translate('+x+'px)';
			}
			document.addEventListener('mouseup',fnUp,false);
			function fnUp(ev){
				document.removeEventListener('mouseup',fnUp,false);	
				document.removeEventListener('mousemove',fnMove,false);	
				oUl.style.transition='0.3s all ease';
				var upX=ev.clientX;
				if(Math.abs(downX-upX)>50){
					if(upX<downX){
						now++;
						bNow++;
					}else{
						now--;	
						bNow--;
					}
					x=-now*aLi[1].offsetWidth;
					oUl.style.transform='translate('+x+'px)';	
				}
				function moveEnd(){
					oUl.removeEventListener('transitionend',moveEnd,false);	
					oUl.style.transition='none';
					if(now==0){
						now=aLi.length-2;
					}
					if(now==aLi.length-1){
						now=1;
					}
					x=-now*aLi[1].offsetWidth;
					oUl.style.transform='translate('+x+'px)';	
					
					if(bNow<0){
						bNow=3;
					}
					if(bNow>3){
						bNow=0
					}
					for(var i=0; i<aBtn.length; i++){
						aBtn[i].classList.remove('active');	
					}
					aBtn[bNow].classList.add('active');	
					timer=setInterval(tab,3000);
					bOk=false;
				}
				oUl.addEventListener('transitionend',moveEnd,false)
			}
			return false;
		};
	}	
	
	//导航条
	exports.fnNav=function(id){
		var oBox=document.getElementById(id);
		var oNav=oBox.querySelector('.nav')
		var aLi=oNav.querySelector('ul').children;
		var iI=oNav.querySelectorAll('i');
		var oShow=oBox.querySelector('.show');
		var aDiv=oShow.children;
		var oFun=oShow.children[0];
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(sTop<scrollTop(oNav).top-document.documentElement.clientHeight){
				for(var i=0; i<aDiv.length; i++){
					aDiv[i].classList.remove('show-div');	
					aLi[i].classList.remove('nav-show');
				}
				aDiv[0].classList.add('show-div');	
				aLi[0].classList.add('nav-show');
			}
		},false);
		for(var i=0; i<aLi.length; i++){
			addClass(aLi[i]);
			aLi[i].index=i;
		}
		function addClass(obj){
			obj.addEventListener('click',function(){
				for(var i=0; i<aLi.length; i++){
					aLi[i].classList.remove('nav-show');	
					aDiv[i].classList.remove('show-div');
				}
				this.classList.add('nav-show');
				aDiv[this.index].classList.add('show-div');
			},false)	
		}
	}
	//3d环
	exports.fnFun=function(id){
		var oBox=document.getElementById(id);
		var oSpan=oBox.querySelector('span');
		var aNav=oBox.parentNode.parentNode.children[0].children[0].children;
		var oUl=oBox.children[0];
		var aLi=oUl.children;
		var oP=oBox.querySelector('p');
		var x=0,y=0,speedX=0,speedY=0,lastX=0,lastY=0,timer=null,bOk=false;
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(sTop<scrollTop(oBox).top-document.documentElement.clientHeight){
				for(var i=0; i<aLi.length; i++){
					aLi[i].removeAttribute('style');
				}
				oUl.removeAttribute('style');
			}
			if(sTop>scrollTop(oUl).top+oUl.offsetHeight-document.documentElement.clientHeight){
				startMove();
				bOk=false;
			}
		},false)
		for(var i=0; i<aNav.length; i++){
			fnClick(aNav[i]);
		}
		function fnClick(obj){
			obj.addEventListener('click',function(){
				if(this.index==0){
					setTimeout(function(){
						startMove();	
					},500)
				}else{
					for(var i=0; i<aLi.length; i++){
						aLi[i].removeAttribute('style');
					}
					oUl.removeAttribute('style');
				}
			},false)
		}
		function startMove(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.transition='1s all ease '+(9-i)*100+'ms'
				aLi[i].style.transform='rotateY('+360/9*i+'deg) translateZ(300px)';	
				fnRot(aLi[i]);
				aLi[i].index=i;
			}
			function fnRot(obj){
				obj.addEventListener('transitionend',fnEnd,false)
				function fnEnd(){
					obj.removeEventListener('transitionend',fnEnd,false);
					if(this.index==aLi.length-1){
						bOk=false;
						oP.classList.add('animate');
					}
				}
			}
		}
		oUl.onmousedown=function(ev){
			if(bOk)return;
			bOk=true;
			oSpan.style.display='block';
			var disX=ev.pageX-y;
			var disY=ev.pageY-x;
			document.addEventListener('mousemove',fnMove,false);
			function fnMove(ev){
				y=ev.pageX-disX;
				x=ev.pageY-disY;	
				oUl.style.transform='perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				speedX=ev.pageX-lastX;
				speedY=ev.pageY-lastY;
				lastX=ev.pageX;
				lastY=ev.pageY;
			}
			document.addEventListener('mouseup',fnUp,false);
			function fnUp(){
				document.removeEventListener('mouseup',fnUp,false);
				document.removeEventListener('mousemove',fnMove,false);
				timer=setInterval(function(){
					speedX*=0.95;	
					speedY*=0.95;	
					x+=speedY;
					y+=speedX;
					oUl.style.transform='perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
					if(Math.abs(speedX)<1)speedX=0;
					if(Math.abs(speedY)<1)speedY=0;
					if(speedX==0&&speedY==0){
						clearInterval(timer);	
						bOk=false;
					}
				},30)
			}
			return false;
		};
		oSpan.addEventListener('click',function(){
			if(bOk)return;
			bOk=true;
			this.style.display='none';
			for(var i=0; i<aLi.length; i++){
				aLi[i].removeAttribute('style');
			}
			oUl.removeAttribute('style');
			setTimeout(function(){
				startMove();	
			},500)
		},false)
		oP.addEventListener('animationend',function(){
			oP.classList.remove('animate');
		},false)
	}
	//拖拽轮播图
	exports.fnFood=function(id){
		var oBox=document.getElementById(id);
		var oUl=oBox.getElementsByTagName('ul')[0];
		var aLi=oBox.getElementsByTagName('li');
		var aImg=oBox.getElementsByTagName('img');
		var aNav=oBox.parentNode.parentNode.children[0].children[0].children;
		var aA=oBox.getElementsByTagName('a');
		var oP=oBox.querySelector('p');
		var x=0,y=0,n=4;
		oUl.onmousedown=function(ev){
			var disX=ev.pageX-x;
			document.addEventListener('mousemove',fnMove,false);
			function fnMove(ev){
				x=ev.pageX-disX;
				if(x>oBox.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth){
					x=oBox.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth
				}
				if(x<oBox.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth){
					x=oBox.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth;
				}
				oUl.style.left=x+'px';
				setSize();
			}
			document.addEventListener('mouseup',fnUp,false);
			function fnUp(){
				document.removeEventListener('mouseup',fnUp,false);
				document.removeEventListener('mousemove',fnMove,false);
			}
			return false;
		}
		function setSize(){
			for(var i=0; i<aImg.length; i++){
				var dis=Math.abs(oBox.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2))
				var scale=1-dis/800;
				if(scale<0.5)scale=0.5;
				aImg[i].style.width=600*scale+'px';
				aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[0].offsetWidth)/2+'px';
				aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[0].offsetHeight)/2+'px';
				aImg[i].style.zIndex=parseInt(scale*10000);
			}	
		}
		function setCenter(n){
			oUl.style.left=oBox.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
		}
		for(var i=0; i<aNav.length; i++){
			fnClick(aNav[i]);
		}
		function fnClick(obj){
			obj.addEventListener('click',function(){
				if(this.index==1){
					setCenter(4)
					setSize();
					oP.classList.add('animate2');
				}
			},false)
		}
		aA[0].addEventListener('click',function(){
			n--;
			if(n<0)n=0;
			oUl.style.left=oBox.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
			setSize();
		},false)
		aA[1].addEventListener('click',function(){
			n++;
			if(n>8)n=8;
			oUl.style.left=oBox.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
			setSize();
		},false)
		oP.addEventListener('animationend',function(){
			oP.classList.remove('animate2');
		},false)
	}
	
	//3d轮播图
	exports.fnShopping=function(id){
		var oBox=document.getElementById(id);
		var oUl=oBox.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var aA=oBox.getElementsByTagName('a');
		var aNav=oBox.parentNode.parentNode.children[0].children[0].children;
		var bOk=false;
		var arr=[];
		for(var i=0; i<aLi.length; i++){
			arr.push(aLi[i].className);
			moveEnd(aLi[i]);
		}
		function moveEnd(obj){
			obj.addEventListener('transitionend',function(){
				bOk=false;
			},false);
		}
		aA[0].addEventListener('click',function(){
			if(bOk)return;
			bOk=true;
			arr.unshift(arr.pop());
			for(var i=0; i<aLi.length; i++){
				aLi[i].className=arr[i];	
			}	
		},false)
		aA[1].addEventListener('click',function(){
			if(bOk)return;
			bOk=true;
			arr.push(arr.shift());
			for(var i=0; i<aLi.length; i++){
				aLi[i].className=arr[i];	
			}	
		},false)
		for(var i=0; i<aNav.length; i++){
			fnClick(aNav[i]);
		}
		function fnClick(obj){
			obj.addEventListener('click',function(){
				if(this.index==2){
					bOk=false;
				}
			},false)
		}
	}
	
	//手风琴
	exports.fnSports=function(id){
		var oBox=document.getElementById(id);	
		var oUl=oBox.querySelector('ul');
		var aLi=oUl.querySelectorAll('li');
		var aNav=oBox.parentNode.parentNode.children[0].children[0].children;
		var defaultW=45;
		var W=0;
		var W2=0;
		for(var i=0; i<aNav.length; i++){
			fnClick(aNav[i]);
		}
		function fnClick(obj){
			obj.addEventListener('click',function(){
				if(this.index==3){
					W=oUl.offsetWidth;
					W2=W-defaultW*aLi.length;
					for(var i=1; i<aLi.length; i++){
						aLi[i].style.transition='none';
						aLi[i].style.transform='translateX('+(W-defaultW*(aLi.length-i))+'px)';
					}
				}
			},false)
		}
		for(var i=0; i<aLi.length; i++){
			(function(index){
				aLi[i].onmouseover=function(){
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.transition='1s all ease';
						if(i<=index){
							aLi[i].style.transform='translateX('+i*defaultW+'px)';
						}else{
							aLi[i].style.transform='translateX('+(W2+i*defaultW)+'px)';
						}
					}
				};
			})(i)
		}
	}
	
	//拖拽碰撞
	exports.fnDrag=function(id){
		var oUl=document.getElementById(id);
		var aLi=oUl.children;	
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			for(var i=0; i<aLi.length; i++){
				if(sTop>scrollTop(aLi[i]).top-document.documentElement.clientHeight){
					aLi[i].style.transform='translateX(0px)';
					aLi[i].style.transition='1s all ease';
				}else{
					aLi[i].style.transform='translateX(684px)';
					aLi[i].style.transition='none';
				}
			}
		},false)
	}
	
	//图片切换
	exports.fnChange=function(id){
		var oUl=document.getElementById(id);
		var aLi=oUl.children;	
		var oBtn=oUl.parentNode.querySelector('.button')
		var arr=[],bOk=false,n=0;
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			for(var i=0; i<aLi.length; i++){
				if(sTop>scrollTop(oUl).top-600){
					oUl.classList.add('movetop');
				}else{
					oUl.classList.remove('movetop');
					for(var i=0; i<aLi.length; i++){
						aLi[i].removeAttribute('style');	
					}
				}
			}
		},false)
		oBtn.addEventListener('click',function(){
			if(bOk)return;
			bOk=true;
			this.classList.add('active');	
			reSetLi();
			setTimeout(function(){
				fnDown();
			},300)
		},false)
		function reSetLi(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.transition='none';
				arr.push({
					left:aLi[i].offsetLeft,	
					top:aLi[i].offsetTop,	
					width:aLi[i].offsetWidth,	
					height:aLi[i].offsetHeight
				});
				aLi[i].style.left=arr[i].left+'px';
				aLi[i].style.top=arr[i].top+'px';
			}
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.position='absolute';	
				aLi[i].style.margin=0;	
			}
		}
		function fnDown(){
			var i=aLi.length;
			var timer=setInterval(function(){
				i--;
				(function(index){
					moveJs(aLi[i],{left:oUl.offsetWidth/2,top:oUl.offsetHeight,width:10,height:10},{fn:function(){
						if(index==0){
							fnUp();	
						}	
					}})	
				})(i)
				if(i==0){
					clearInterval(timer)	
				}	
			},200)	
		}
		function fnUp(){
			var i=aLi.length;
			var timer=setInterval(function(){
				i--;
				(function(index){
					moveJs(aLi[i],arr[i],{fn:function(){
						if(index==0){
							oBtn.classList.remove('active');
							bOk=false;
						}	
					}})	
				})(i)
				if(i==0){
					clearInterval(timer);
				}	
			},200)	
		}
	}
	
	//固定菜单栏
	exports.fnMath=function(id){
		var oBox=document.getElementById(id);	
		var oLi=oBox.parentNode.querySelector('#life_drag').children[2];
		var oDl=oBox.querySelector('dl');
		var aDd=oDl.querySelectorAll('dd');
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			var y=sTop-scrollTop(oBox).top;
			if(sTop<scrollTop(oBox).top-document.documentElement.clientHeight){
				oDl.classList.remove('life-show');
			}
			if(sTop>scrollTop(oBox).top-55){
				oDl.style.transition='none';
				oDl.style.position='fixed';
				oDl.style.top=55+'px';
				oDl.style.left=50+'%';
				oDl.style.marginLeft=-490+'px';
			}else{
				oDl.removeAttribute('style');
			}
			if(sTop>1900){
				for(var i=0; i<aDd.length; i++){
					aDd[i].classList.remove('active');	
				}	
				aDd[1].classList.add('active');
			}else{
				for(var i=0; i<aDd.length; i++){
					aDd[i].classList.remove('active');	
				}	
				aDd[0].classList.add('active');
			}
		},false)
		oLi.addEventListener('transitionend',function(){
			oDl.classList.add('life-show');
		},false);
	}
})