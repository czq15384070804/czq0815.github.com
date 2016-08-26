// JavaScript Document
define(function(requier,exports,module){
	var scrollTop=requier('public.js').getPos;
	exports.fnMove=function(id){
		var oBox=document.getElementById(id);
		var aUl=oBox.querySelectorAll('ul');
		var aB=oBox.querySelectorAll('b');
		window.addEventListener('scroll',function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
				if(sTop>scrollTop(aUl[i]).top-document.documentElement.clientHeight){
					for(var i=0;i<aUl.length; i++){
						aUl[i].classList.add('top');
					}
				}else{
					for(var i=0;i<aUl.length; i++){
						aUl[i].classList.remove('top');
					}
				}
				if(sTop==0){
					for(var i=0;i<aUl.length; i++){
						aUl[i].classList.remove('top');
					}
				}
				if(sTop>scrollTop(oBox).top){
					for(var i=0; i<aB.length; i++){
						aB[i].classList.add('b'+i+'')
						aB[i].classList.remove('p'+i+'')
					}
				}else{
					for(var i=0; i<aB.length; i++){
						aB[i].classList.add('p'+i+'')
						aB[i].classList.remove('b'+i+'')
					}
				}
		},false)
	}	
})