var loopPlayerInt = (function ($) {
  var prev = null,
	next = null,
	autoPlay = null,
	imgList = null,
	transformOrigin = "0px 0px",
	transformOriginImg = "0px 0px",
	imgArrAll = createImg([["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg"],
	  ["images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg"],
	  ["images/9.jpg", "images/10.jpg", "images/11.jpg", "images/12.jpg"]]),
	imgArrIndex = 0,
	imgAngle = 45,
	speedTime = 300,
	clickBool = true,
	play = "play",
	timerInterval = null;

  function init() {
	prev = $(".prev");
	next = $(".next");
	autoPlay = $(".autoPlay");
	imgList = $("#main ul li");
	var imgOrigin = imgList.css("transform-origin", transformOrigin);
	configer();
	setEvent();

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
	imgAutoPlay();
  }

  function EventGo(d) {
	if(clickBool == false)return;
	clickBool = false;
	imgArrIndex += d;
	//console.log(imgArrAll.length-1);
	if(imgArrIndex>imgArrAll.length-1){
	  imgArrIndex = 0;
	}else if(imgArrIndex<0){
	  imgArrIndex = imgArrAll.length-1;
	}
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
	  }
	  );
	 var dureTime = speedTime*i;
	  setTimeout(targetImg.animate({"transform": "rotate("+0+"deg)"},500,function () {
		thisImg.remove();
		if(dureTime == speedTime*(imgList.length-1)){
		  clickBool = true;
		}
	  }),dureTime)
	})
  }
function imgAutoPlay() {
  EventGo(1);
  timerInterval = setInterval(function () {
	EventGo(1);
  },3000);
  autoPlay.bind("click",function () {
	if (play === "play"){
	  clearInterval(timerInterval);
	  play = "pause";
	  autoPlay.html(play);
	}else {
	  timerInterval = setInterval(function () {
		EventGo(1);
	  },3000);
	  play = "play";
	  autoPlay.html(play);
	}
  });


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