// JavaScript Document
window.onload=function(){
	function getPos(obj){
		var l=0;
		var t=0; 
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;
		}	
		return {left:l,top:t}
	}
	function onLoad(){
		var aImag=document.getElementsByTagName('img');
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientH=document.documentElement.clientHeight;
		for(var i=0; i<aImag.length; i++){
			if(getPos(aImag[i]).top<scrollTop+clientH){
				aImag[i].src=aImag[i].getAttribute('_src');
			}
		}	
	}
	onLoad();
	window.addEventListener('scroll',onLoad,false);
}
