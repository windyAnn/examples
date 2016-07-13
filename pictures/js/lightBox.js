(function ($) {
  var LightBox =function () {
	this.lightBoxMask = $('<div id="lightBox-mask">');
	this.lightBoxPopup = $('<div id="lightBox-popup">');
	this.readDOM();
	this.picView = this.lightBoxPopup.find("div.lightBox-view");   //图片按钮的父级的Div
	this.BtnPrev = this.picView.find("div.lightBox-btn-prev");   //向上按钮
	this.BtnNext = this.picView.find("div.lightBox-btn-next");   //向下按钮
	this.imgView = this.picView.find("img.lightBox-pic");
	this.description = this.lightBoxPopup.find("div.lightBox-description");//描绘区
	this.title = this.lightBoxPopup.find("p.lightBox-title");    //标题区
	this.picIndex =  this.lightBoxPopup.find("span.lightBox-index");   //索引区
	this.closeBtn = this.lightBoxPopup.find("div.lightBox-close");


	this.bodyNode = $(document.body);

	this.groupName = null;
	this.groupData = [];  //存储数据
	var self = this;
	this.bodyNode.delegate(".js-lightBox,[data-role='lightBox']" , "click", function (e) {
	//阻止事件冒泡
	e.stopPropagation();
	var currentGroupName = $(this).attr("data-group");
	  if(currentGroupName!=self.groupName){
		self.groupName = currentGroupName;
		self.getGroup();
	  }
	  //初始化弹出
	  self.initPopup($(this));
	})
  };
  LightBox.prototype = {
	showMaskPopup: function (sourceSrc,currentId) {
	  var self =this;
	  this.picView.hide();
	  this.description.hide();
	  this.lightBoxMask.fadeIn();
	  var winWidth = $(window).width(),
		winHeight = $(window).height();

	  this.lightBoxPopup.fadeIn();
	  this.lightBoxPopup.css({
		width : winWidth/2,
		height : winHeight/2,
		"margin-left" : -winWidth/(2*2),
		 "margin-top" :  -winHeight
	  }).animate({
		"margin-top" :  -winHeight/4
	  },function () {
		//加载图片
		self.picOnload(sourceSrc);

	  });
	 this.Index = this.getIndex(currentId);
	  var groupDataLength = this.groupData.length;
	  if(groupDataLength > 1){
		if(this.Index === 0){
		  this.BtnPrev.removeClass("disabled");
		  this.BtnNext.addClass("disabled");

		}else if(this.Index === groupDataLength-1){

		  this.BtnPrev.addClass("disabled");
		  this.BtnNext.removeClass("disabled");
		}else {
		  this.BtnPrev.removeClass("disabled");
		  this.BtnNext.removeClass("disabled");
		}
	  }

	},
	picOnload: function(sourceSrc){
	  var self =this;
	  this.preOnloadPic(sourceSrc,function () {
		self.imgView.attr("src",sourceSrc);

		self.imgView.get(0).onload = function () {
		  var picWidth = this.width,   //为什么获取不到width和height
			picHeight =  this.height;
		  console.log(picWidth, "---", picHeight);
		};

		console.log(self.imgView);
	  });
	},
	preOnloadPic : function (src, callback) {
	  var img =new Image();
	  img.src = src;
	  if(!!window.ActiveXObject){ //如果是IE
		img.onreadystatechange = function () {
		  if(this.readyState=="complete"){
			callback();
		  }
		}
	  }else {
		img.onload =function () {
		  callback();
		}
	  }
	  img.src =src;

	},
	getIndex : function (currentId) {
	  var index = 0;
	  $(this.groupData).each(function (i) {
		index = i;
		if(this.id === currentId){
		  return false;
		}
	  });
	  return index;
	},

	initPopup : function (currentObj) {
	  var self =this,
		sourceSrc = currentObj.attr("data-source"),
		currentId = currentObj.attr("data-id");
	  this.showMaskPopup(sourceSrc,currentId);
	},
	getGroup : function () {
	  var self = this;
	  var groupList = this.bodyNode.find("[data-group="+this.groupName+"]");
	  self.groupData.length = 0;
	  groupList.each(function () {
		self.groupData.push({
		  src : $(this).attr("data-source"),
		  id : $(this).attr("data-id"),
		  caption : $(this).attr("data-caption")
		});
	  });
	},
	readDOM : function () {
	  var DomInside = $(
		'<div class="lightBox-view">'+
		'<div class="lightBox-btn lightBox-btn-prev lightBox-btn-prev-back"></div>'+
		'<img  class="lightBox-pic" src="images/1-1.jpg">'+
		'<div class="lightBox-btn lightBox-btn-next lightBox-btn-next-back"></div>'+
		'</div>'+
		'<div class="lightBox-description">'+
		'<div class="lightBox-caption">'+
		'<p class="lightBox-title">图片标题</p>'+
		'<span class="lightBox-index">图片索引</span>'+
		'</div>'+
		'<div class="lightBox-close"></div>'+
		'</div>');
	  this.lightBoxPopup.append(DomInside);
	   $(document.body).append(this.lightBoxMask,this.lightBoxPopup);

	}
  };
  window["LightBox"] = LightBox;
})(jQuery);



$(document).ready(function () {
	var lightBox = new LightBox();
});