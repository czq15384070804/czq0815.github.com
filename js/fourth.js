// JavaScript Document
define(function(require,exports,module){
	var ran=require('public.js').ran;
	exports.creatMess=function(id){
		var oBox=document.getElementById(id);
		var oEm=oBox.querySelector('em');
		var oUl=oBox.querySelector('ul');
		var oClone=oBox.querySelector('#mess_clone');
		var oCreate=oBox.querySelector('#mess_create');	
		var oTextarea=oCreate.querySelector('textarea');
		var oInput=oCreate.querySelector('input');
		var oA=oCreate.querySelector('a');
		var aP=oUl.querySelectorAll('p');
		var arr=['#f5bdd4','#f6e55e','#cee77c','#a1d3f0'];
		var count=0;
		var json={};
		var N=localStorage.getItem('n')||0;
		if(N){
			oEm.style.display='none';	
		}
		for(var i=0; i<N; i++){
			json={
				name:localStorage.getItem('name'+i),
				mess:localStorage.getItem('mess'+i),
				date:localStorage.getItem('date'+i),	
				time:localStorage.getItem('time'+i)
			}
			cloneNode(json);
		}
		oA.addEventListener('click',function(){
			if(oInput.value=='请输入昵称'){
				alert('用户名不能为空，请输入昵称');
				return;	
			}
			if(oTextarea.value=='请输入留言......'){
				alert('内容不能为空，请输入内容');
				return;	
			}
			var aLi=oUl.children;
			if(oUl.children.length>0){
				oEm.style.display='none'
			}
			json={
				name:oInput.value,
				mess:oTextarea.value,
				date:timer().year+'-'+addZore((timer().month+1))+'-'+addZore(timer().date),	
				time:addZore(timer().hour)+':'+addZore(timer().minute)+':'+addZore(timer().second)
			}
			cloneNode(json);
			for(var key in json){
				localStorage.setItem(key+N,json[key]);	
				arr.push(key+N);
			}
			N++;
			localStorage.setItem('n',N)
			oInput.value='请输入昵称';
			oTextarea.value='请输入留言......';
		},false)
		oTextarea.addEventListener('focus',function(){
			if(this.value=='请输入留言......'){
				this.value='';	
			}
		},false)
		oTextarea.addEventListener('blur',function(){
			if(this.value==''){
				this.value='请输入留言......';	
			}
		},false)
		oInput.addEventListener('focus',function(){
			if(this.value=='请输入昵称'){
				this.value='';	
			}
		},false)
		oInput.addEventListener('blur',function(){
			if(this.value==''){
				this.value='请输入昵称';	
			}
		},false)
		function addZore(n){
			return n<10?'0'+n:''+n;	
		}
		function timer(){
			var oDate=new Date();
			var y=oDate.getFullYear();
			var m=oDate.getMonth();
			var d=oDate.getDate();
			var H=oDate.getHours();
			var M=oDate.getMinutes();
			var S=oDate.getSeconds();
			return {year:y,month:m,date:d,hour:H,minute:M,second:S}
		}
		function cloneNode(json){
			var oLi=oClone.cloneNode(true);
			oLi.removeAttribute('id');
			oLi.removeAttribute('style');
			oLi.innerHTML=oLi.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
				return json[s.match(/\w+/g)];
			})
			oUl.appendChild(oLi);
			var oSpanColor=oLi.querySelectorAll('li')[0].querySelector('span');
			var aBtn=oLi.querySelectorAll('li')[1].querySelectorAll('i');
			var oCount=oLi.querySelectorAll('li')[1].querySelectorAll('span');
			var oDelete=oLi.querySelectorAll('li')[1].querySelector('a');
			var i=0,n=0;
			oSpanColor.style.backgroundColor=arr[ran(0,4)];
			aBtn[0].onclick=function(){
				i++
				oCount[0].innerHTML=i;	
			};
			aBtn[1].onclick=function(){
				n++
				oCount[1].innerHTML=n;	
			};
			oDelete.onclick=function(){
				N--;
				localStorage.removeItem('name'+N);
				localStorage.removeItem('mess'+N);
				localStorage.removeItem('date'+N);
				localStorage.removeItem('time'+N);
				localStorage.setItem('n',N);
				oUl.removeChild(this.parentNode.parentNode.parentNode.parentNode);	
				if(oUl.children.length<2){
					oEm.style.display='block';
				}
				if(N==0){
					oEm.style.display='block';
					localStorage.removeItem('n');
				}
			};
		}
	}	
})