var loopPlayerInt = (function ($) {
  var prev = null,
	next = null,
	autoPlay =null,
	imgList = null,
	oUl = $("#main ul").eq(0),
	
	imgLiWidth = null;


  function init() {
	prev = $(".prev");
	next = $(".next");
	autoPlay = $(".autoPlay");
	imgList = $("#main ul li");
	imgLiWidth = parseInt(imgList.eq(0).css("width"));//取出来是240
	 oUl.css("width", imgLiWidth*24+"px");
	console.log(oUl.css("width"));
	configer();
	prev.on("click",function () {

	});
	next.on("click",function () {
	  var aa = oUl.css("transform");
	  oUl.animate({left:"-1000px"});
	  console.log(oUl.css("left"));
	});
  }
  function configer() {
	imgList.each(function (i) {
	  var rotateDeg = Math.random()*30;
	  $(this).css({"transform" : "rotate("+rotateDeg+"deg)"});
	  console.log( $(this).css("transform" ));
	})
  }
  return init;
})(jQuery);
loopPlayerInt();