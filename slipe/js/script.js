;(function ($) {
  var Slide = function () {
	this.navUl = $(".slipe-nav");
	this.navLi = this.navUl.find("li");
	 this.sectionUl = $(".section-content");
	  this.sectionLi = this.sectionUl.find("li");
	this.navLiClick();
	this.scrollMove();

  };
  Slide.prototype = {
	//点击事件  具体  点击li则相应的文章出现
	navLiClick: function () {
	  var self = this;
	  var zIndex = 2;

	  this.navLi.each(function (i,elemet) {

		$(this).bind("click",function () {
		  self.navLi.each(function (i,elemet){
			$(this).removeClass("item-active");
		  });
		 $(this).addClass("item-active");
		  zIndex++;
		  console.log($(self.sectionLi[i]).css("z-index",zIndex));
		})
	  })
	},
	//滚动条事件
	scrollMove : function () {
	  
	}

  };
  window["Slide"] = Slide;
})(jQuery);
$(document).ready(function () {
  var slide = new Slide();  //前面的这个要小写
});