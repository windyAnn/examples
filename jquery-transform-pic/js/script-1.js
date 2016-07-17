var loopPlayerInt = (function ($) {
  var prev = null,
	next = null,
	autoPlay = null,
	imgList = null,
	transformOrigin = "128px 600px",
	transformOriginImg = "128px 800px",
	imgArrAll = createImg([["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg"],
	  ["images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg"],
	  ["images/9.jpg", "images/10.jpg", "images/11.jpg", "images/12.jpg"]]),
	imgArrIndex = 0,
	imgAngle = 45;

  function init() {
	prev = $(".prev");
	next = $(".next");
	autoPlay = $(".autoPlay");
	imgList = $("#main ul li");
	var imgOrigin = imgList.css("transform-origin", transformOrigin);
	configer();
	setEvent()
  }

  function configer() {
	var a = 5,
	  b = -5;
	//imgList.transform({origin: origin});
	imgList.each(function (i) {
	  //var rotateDeg = Math.random()*30;
	  $(this).css({"transform": "rotate(" + (a + b * i) + "deg)"});

	})
  }

  function setEvent() {
	prev.bind("click", function () {

	  EventGo(-1);
	  return false;
	});
	next.bind("click", function () {
	  EventGo(1);
	  return false;
	});
	autoPlay.bind("click", function () {

	})
  }

  function EventGo(d) {
	imgArrIndex += d;
	$(imgList).each(function (i) {
	  var imgItem = $(this),
		thisImg = imgItem.children("img"),
		targetImg = $(imgArrAll[imgArrIndex][i]);
		imgItem.append(targetImg);
	  targetImg.css({
		"transform-origin": transformOrigin,
		"transform" : "rotate("+(0-d)*imgAngle+"deg)"
	  });
	  thisImg.css({"transform-origin": transformOriginImg});
	  thisImg.animate({
		"transform": "rotate("+d*imgAngle+"deg)"
	  });
	  targetImg.animate({"transform": "rotate("+0+"deg)"})

	})
  }

  function createImg(arr) {
	var ImgArr = [];
	//遍历数组arr
	$(arr).each(function (i, ele) {
	  ImgArr[i] = [];
	  $(ele).each(function (j, e) {

		var img = new Image();
		img.src = arr[i][j];
		ImgArr[i][j] = img;
	  })

	});
	return ImgArr;
  }

  return init;
})(jQuery);
loopPlayerInt();