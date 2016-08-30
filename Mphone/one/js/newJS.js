// JavaScript Document
(function(win,doc){
	function fnFontSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';	
	}
	fnFontSize();
	win.addEventListener('resize',fnFontSize,false)	
})(window,document)
window.addEventListener('DOMContentLoaded',function(){
	//切换图片
	tab('.seventh');
	function tab(id){
		var oSeventh=document.querySelector(id);
		var oSpan=oSeventh.querySelector('span');
		var oDiv=oSeventh.querySelector('div');
		var oH3=oSeventh.querySelector('h3');
		var oUl=oSeventh.querySelector('ul');
		var aLi=oUl.children;
		var arr=[];
		oDiv.onclick=function(){
			oH3.style.opacity=1;
			oH3.style.transform='translateY(-25rem)';
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.background='url(img/image/'+i+'.png) no-repeat -10px 0';
				aLi[i].style.backgroundSize='cover';
				arr.push(aLi[i].className)
			}
		};
		oH3.addEventListener('transitionend',function(){
			if(oH3.style.opacity==1){
				oSpan.style.opacity=1;
				oSpan.style.zIndex=2;
			}
		},false)
		oSpan.onclick=function(){
			oH3.style.opacity=0;
			oH3.style.transform='translateY(0rem)';
			this.style.zIndex=0;
			this.style.opacity=0;
			this.style.webkitTransition='none';
		};
		for(var i=0; i<aLi.length; i++){
			aLi[i].onclick=function(){
				arr.unshift(arr.pop())
				for(var i=0; i<aLi.length; i++){
					aLi[i].className=arr[i];
				}
				this.className='active';	
			};
		}
	}
	//画布
	createOc('.second');
	createOc('.fourth');
	createOc('.sixth');
	createOc('.eighth');
	function createOc(id){
		var oBox=document.querySelector(id);
		var oC=oBox.querySelector('canvas');
		var hb=oC.getContext('2d');
		
		oC.width=oBox.offsetWidth;
		oC.height=oBox.offsetHeight;
		
		hb.fillStyle='#fff';
		hb.fillRect(0,oC.height*90/1000,1,1);
		hb.strokeStyle='#fff';
		oBox.addEventListener('transitionend',function(){
			hb.clearRect(0,0,oC.width,oC.height);
			if(oBox.classList.contains('swiper-slide-active')){
				move({x1:0,x2:oC.width*240/640,y1:oC.height*90/1000,y2:oC.height*180/1000},{time:1000,fn:function(){
					dArc({x:oC.width*240/640,y:oC.height*180/1000});
					move({x1:oC.width*240/640,x2:oC.width*240/640,y1:oC.height*180/1000,y2:oC.height*850/1000},{time:3000,fn:function(){
						dArc({x:oC.width*240/640,y:oC.height*850/1000});
						move({x1:oC.width*240/640,x2:oC.width*340/640,y1:oC.height*850/1000,y2:oC.height*850/1000},{time:600,fn:function(){
							dArc({x:oC.width*340/640,y:oC.height*850/1000});
							move({x1:oC.width*340/640,x2:oC.width*340/640,y1:oC.height*850/1000,y2:oC.height*1000/1000},{time:900})
						}})
					}})
				}})
				dArc({x:oC.width*620/640,y:oC.height*800/1000});
				move({x1:oC.width*620/640,x2:oC.width*400/640,y1:oC.height*800/1000,y2:oC.height*680/1000},{time:1200,fn:function(){
					dArc({x:oC.width*400/640,y:oC.height*680/1000});
					move({x1:oC.width*400/640,x2:oC.width*400/640,y1:oC.height*680/1000,y2:oC.height*130/1000},{time:2600,fn:function(){
						dArc({x:oC.width*400/640,y:oC.height*130/1000});
						dArc({x:oC.width*400/640,y:oC.height*750/1000});
						move({x1:oC.width*400/640,x2:oC.width*400/640,y1:oC.height*750/1000,y2:oC.height*800/1000},{time:400,fn:function(){
							dArc({x:oC.width*400/640,y:oC.height*800/1000});
						}})
					}})
				}})
			}

		},false);
		function dArc(json){
			hb.beginPath();
			hb.arc(json.x,json.y,4,0,360,false);	
			hb.fillStyle='#fff';
			hb.fill();
		}
		function move(json,json2){
			var startX=json.x1;
			var iTargetX=json.x2;
			var disX=iTargetX-startX;
			
			var startY=json.y1;
			var iTargetY=json.y2;
			var disY=iTargetY-startY;
			
			var count=Math.floor(json2.time/16);
			var n=0;
			var timer=setInterval(function(){
				n++;
				var curX=startX+disX*n/count;
				var curY=startY+disY*n/count;
				hb.fillRect(curX,curY,1,1);
				if(n==count){
					clearInterval(timer);	
					json2.fn&&json2.fn()
				}	
			},16)
		}
	}
	//点击变大
	clickBig('.third');
	clickBig('.fifth');
	function clickBig(id){
		var oBox=document.querySelector(id);
		var oImg=oBox.querySelector('img');
		oImg.onclick=function(){
			this.classList.toggle('click');
		};
	}
},false)
