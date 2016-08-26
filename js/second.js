// JavaScript Document
define(function(require,exports,module){
	var scrollTop=require('public.js').getPos;
	exports.fnToRight=function(id){
		var oBox=document.getElementById(id);
		var aDiv=oBox.children;
		var aRote=oBox.querySelectorAll('.select');
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			for(var i=0; i<aDiv.length; i++){
				if(sTop>scrollTop(aDiv[i]).top+aDiv[i].offsetHeight-document.documentElement.clientHeight){
					aDiv[i].style.transition='1s all ease';
					aDiv[i].style.transform='translateX(0px)';
				}
				if(sTop<scrollTop(aDiv[i]).top-document.documentElement.clientHeight){
					aDiv[i].style.transition='none';
					aDiv[i].style.transform='translateX(980px)';
				}
				if(sTop==0){
					aDiv[i].removeAttribute('style');
				}
			}	
		},false);
		for(var i=0; i<aDiv.length; i++){
			addRote(aDiv[i]);
			aDiv[i].index=i;	
		}
		function addRote(obj){
			obj.addEventListener('mouseover',function(){
				aRote[this.index].classList.add('active'+this.index+'');	
			},false)	
			obj.addEventListener('mouseout',function(){
				aRote[this.index].classList.remove('active'+this.index+'');	
			},false)	
		}
	};	
	
	//摇一摇，晃一晃
	exports.toBig=function(id){
		var oBox=document.getElementById(id);
		var oUl=oBox.querySelector('ul');	
		var aSpan=oUl.querySelectorAll('span');
		document.addEventListener('mousemove',function(ev){
			for(var i=0; i<aSpan.length; i++){
				var a=scrollTop(aSpan[i]).left-ev.pageX+aSpan[i].offsetWidth/2;
				var b=scrollTop(aSpan[i]).top-ev.pageY+aSpan[i].offsetHeight/2;
				var c=Math.sqrt(a*a+b*b);
				var scale=1-c/300;
				if(scale<0)scale=0;
				aSpan[i].style.transform='scale('+(1+scale)+','+(1+scale)+')';
			}	
		},false)
	}
})