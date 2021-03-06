window.onload = function(){
	waterfall('main', 'box');
	var dataInt = {"data" : 
		[
			{"src":"0.jpg"},
			{"src":"1.jpg"},
			{"src":"2.jpg"},
			{"src":"3.jpg"},
			{"src":"4.jpg"},
			{"src":"5.jpg"},
			{"src":"6.jpg"},
			{"src":"7.jpg"},
			{"src":"8.jpg"},
			{"src":"9.jpg"},
			{"src":"10.jpg"},
			{"src":"11.jpg"},
			{"src":"12.jpg"},
			{"src":"13.jpg"},
			{"src":"14.jpg"},
			{"src":"15.jpg"},
			{"src":"16.jpg"},
			{"src":"17.jpg"},
			{"src":"18.jpg"},
			{"src":"19.jpg"},
			{"src":"20.jpg"}
		]
	}
	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			for(var i = 0; i < dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);

				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main', 'box');
		}
	}
}


function waterfall(parent, box){
	var oParent  = document.getElementById(parent);
	var oBoxs = getByClass(oParent, box);
	

	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	

	oParent.style.cssText = 'width:' + oBoxW*cols + 'px; margin: 0 auto';

	var hArr = new Array();

	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		} else{
			var minH = Math.min.apply(null, hArr);
			var index = getMinhIndex(hArr, minH);
			//console.log(index);

			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top =  minH + 'px';
			oBoxs[i].style.left = oBoxW * index + 'px';

			hArr[index] += oBoxs[i].offsetHeight;
		}
	}

}




function getByClass(parent, clsName){
	var boxArr = new Array(),
	 	oElements = parent.getElementsByTagName('*');

	
	for(var i = 0; i < oElements.length; i++){
		if(oElements[i].className.indexOf(clsName) != -1){
			boxArr.push(oElements[i]);
		}
	}
	
	return boxArr;
}

function getMinhIndex(arr, val){
	for(var i in arr){
		if(arr[i] == val) {
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = oParent.getElementsByTagName('*');
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < scrollTop + height) ? true : false;
}