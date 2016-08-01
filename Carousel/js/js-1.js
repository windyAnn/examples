

/*引进函数*/
;(function ($) {
  /*定义一个函数，上面new一下，后变成了对象*/
  var Carousel = function (poster) {
	var self = this;
	//保持单个旋转木马
	this.poster = poster;
	this.posterItemMain = poster.find("ul");
	this.posterItems = poster.find("li.poster-item");
	if(this.posterItems.length%2 ===0){
	  this.posterItemMain.append(this.posterItems.eq(0).clone());
	  this.posterItems = this.posterItemMain.children();
	}
	this.nextBtn = poster.find(".poster-next-btn");
	this.prevBtn = poster.find(".poster-prev-btn");
	this.posterFirstItem = poster.find("li").eq(0);

	this.posterLastItem = poster.find("li").last();
	this.rotateFlag = true;
	this.setting = {
	  'width': 1000,     //幻灯片的宽度
	  'height': 270,     //幻灯片的高度
	  'poserWidth': 600,   //幻灯片第一张的宽
	  'posterHeight': 270,  //幻灯片第一张的高度
	  'vericalAlign': 'middle',
	  'scale': 0.9,       //记录显示的大小关系
	  'speed': 500
	};
	$.extend(this.setting, this.getSetting());

	this.setSettingValue();
	this.setPosterPos();

	this.nextBtn.click(function () {
	  if (self.rotateFlag){
		self.rotateFlag = false;
		self.carouseRotate("left");
	  }
	});
	this.prevBtn.click(function () {
	  if (self.rotateFlag){
		self.rotateFlag = false;
		self.carouseRotate("right");
	  }
	});
	//轮播
	if(this.setting.autoPlay){
	  this.autoPlay();
	 	self.poster.hover(function () {
		  clearInterval(self.timer);
		},function () {
		  self.autoPlay();
		})
	}
  };
  Carousel.prototype = {
	//轮播
	autoPlay:function () {
	  var that = this;
	  this.timer = window.setInterval(function () {
		that.nextBtn.click();
	  },this.setting.speed)
	},
	//this.carouseRotate()旋转
	carouseRotate: function (direction) {
	  var self = this;
	  var zIndexArr = [];
	  if (direction === "left") {
		this.posterItems.each(function () {
		  var that = $(this),
		  //如果that.prev().get(0)是假（undefine）（if不成立）,则执行self.posterLastItem
			prev = that.prev().get(0) ? that.prev() : self.posterLastItem,

			width = prev.css("width"),
			height = prev.css("height"),
			top = prev.css("top"),
			left = prev.css("left"),
		    opacity = prev.css("opacity"),
			zIndex = prev.css("zIndex");
		  zIndexArr.push(zIndex);

		  that.animate({
			width:width,
			height:height,
			top:top,
			left:left,
			opacity:opacity
		  },self.setting.delay,function () {
			self.rotateFlag = true;
		  })
		});
		this.posterItems.each(function (i) {
		  $(this).css("zIndex",zIndexArr[i]);  //怎么拿到zIndexArr的数据了   何为闭包呢？
		})
	  }
	  else if (direction === "right") {

		this.posterItems.each(function () {
		  var that = $(this),
		  //如果that.prev().get(0)是假（undefine）（if不成立）,则执行self.posterLastItem
			next = that.next().get(0) ? that.next() : self.posterFirstItem,
		  //	console.log(that.prev());
			width = next.css("width"),
			height = next.css("height"),
			top = next.css("top"),
			left = next.css("left"),
			opacity = next.css("opacity"),
			zIndex = next.css("zIndex");
		  zIndexArr.push(zIndex);
		  that.animate({
			width:width,
			height:height,
			top:top,
			left:left,
			opacity:opacity
		  },function () {
			self.rotateFlag = true;
		  })
		});
		this.posterItems.each(function (i) {
		  $(this).css("zIndex", zIndexArr[i])
		})
	  }

	},


	//设置右点击事件

	//设置剩余的针的位置
	setPosterPos: function () {
	  var self = this.setting;
	  var that = this;
	  var sliceItems = this.posterItems.slice(1),  //2至后面的
		sliceSize = Math.ceil(sliceItems.length / 2),
		rightSlice = sliceItems.slice(0, sliceSize),   //右边的图片
		level = Math.floor(this.posterItems.length / 2),
		leftSlice = sliceItems.slice(sliceSize);   //左边的图片
	  //设置右边帧的位置和宽度高度
	  var firstWidth = this.setting.poserWidth,   //第一张的宽度
		firstHeight = this.setting.posterHeight,    //第一张的高度
		gap = ((this.setting.width - this.setting.poserWidth) / 2) / level,    //相隔之间的距离
		firstLeft = (this.setting.width - this.setting.poserWidth) / 2, //第一张的left
	  //初始化，定义变量：右边的宽度高度，left,top值等
		rightWidth = firstWidth,
		rightHeight = firstHeight,
		rightLeft = firstLeft,
	  ////初始化，定义变量：左边边的宽度高度，left,top值等
		leftWidth = firstWidth,
		leftHeight = firstHeight,
		leftLeft = firstLeft;

	  //所有的排列数据是1，右234，,左边要从下面开始排567
	  var liLength = this.posterItems.length;
	  //设置右边的宽高，top  left
	  rightSlice.each(function (i) {
		level--;
		rightWidth = rightWidth * self.scale;
		rightHeight = rightHeight * self.scale;
		//left:第一张的宽度+左边的宽度+gap-第二张的宽度
		rightLeft = firstWidth + firstLeft + gap * (i + 1) - rightWidth;
		var j=i;
		$(this).css({
		  zIndex: level,
		  width: rightWidth,
		  height: rightHeight,
		  opacity: 1 / (++j),  //这个是从1开始的
		  //left:第一张的宽度+左边的宽度+gap-第二张的宽度
		  left: rightLeft,
		  //top: (总高度-rh)/2
		  top: that.setVerticalAlign(rightHeight)
		})
	  });

	  //设置左边帧的位置和宽度高度，从底下开始排
	  var oloop =Math.floor(this.posterItems.length/2) ;
	  leftWidth = rightSlice.last().width();
	  leftHeight = rightSlice.last().height();
	  leftSlice.each(function (i) {
		//left:  第一张的left-gap
		leftLeft = gap * i;


		$(this).css({
		  zIndex: i,
		  width: leftWidth,
		  height: leftHeight,
		  opacity: 1/ oloop,
		  //left:第一张的宽度+左边的宽度+gap-第二张的宽度
		  left: leftLeft,
		  //top: (总高度-rh)/2
		  top: that.setVerticalAlign(leftHeight)
		});
		leftWidth = leftWidth/self.scale;
		leftHeight = leftHeight/self.scale;
		oloop--;

	  })
	},

	//设置对齐方式
	setVerticalAlign: function (height) {
	  var vericalAlign = this.setting.vericalAlign;
	  if (vericalAlign === "middle") {
		return (this.setting.posterHeight - height) / 2;  //这里怎么把top传出去呢
	  }
	  else if (vericalAlign === "top") {
		return 0;
	  }
	  else if (vericalAlign === "bottom") {
		return this.setting.posterHeight - height;
	  }
	  else {
		return (this.setting.posterHeight - height) / 2;
	  }
	},


	//设置宽度高度值(包括第一张的宽高  left值
	setSettingValue: function () {
	  this.poster.css({
		width: this.setting.width,
		height: this.setting.height
	  });
	  this.posterItemMain.css({
		width: this.setting.width,
		height: this.setting.height
	  });
	  var w = (this.setting.width - this.setting.poserWidth) / 2;
	  this.nextBtn.css({
		width: w,
		height: this.setting.height,
		zIndex: Math.ceil(this.posterItems.length / 2)
	  });
	  this.prevBtn.css({
		width: w,
		height: this.setting.height,
		zIndex: Math.ceil(this.posterItems.length / 2)
	  });
	  this.posterFirstItem.css({
		width: this.setting.poserWidth,
		height: this.setting.posterHeight,
		left: w,
		zIndex:Math.floor((this.posterItems.length)/2)
	  })
	},
	//获取人工配置参数
	getSetting: function () {
	  /*切记   这里的json严格要求='{
	   "width":800,
	   "height":270外单引号   内上引号}'*/
	  var setting = this.poster.attr("data-setting");
	  if (setting && setting != "") {
		return $.parseJSON(setting);
	  } else {
		return {};
	  }
	}
  };
  Carousel.init = function (posters) {
	var that = this;
	posters.each(function () {
	  var aaa = new that($(this));    //应该$(this)是posters，posters是$(".J_Poster")
	  var c = 1;
	  // new that相当于new一个Carousel对象，然后传进去一个参数$(this)，*/
	});

  };

  window["Carousel"] = Carousel;

})(jQuery);


$(document).ready(function () {
  Carousel.init($(".J_Poster"));
});