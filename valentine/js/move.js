
$(document).ready(function () {
  var content=$("#content");
  var contentUl=content.find(":first");  //ul
  var contentLiS=contentUl.find("li");    //li
  var conWidth=content.width();
  var conHeight=content.height();
  var contentLiWidth=$(window).width();
  var contentLiHeight=$(window).height();
  var boyWidth=contentLiWidth*0.11;
  var boyHeight=contentLiHeight*0.23;
  var boyTop=contentLiHeight*0.39;
  var doorLeft=$(".door_left");
  var dooRight=$(".door_right");


  //ul的宽度
  contentUl.css({
	"width": contentLiS.length*conWidth+"px",
	"height": conHeight+"px"
  });
  //li的高宽
  $.each(contentLiS, function (index) {
	console.log($(document).height());

	contentLiS.eq(index).css({
	  "width": contentLiWidth,
	  "height": contentLiHeight
	});
  });
  //小男孩的位置
  $("#boy").css({
	"width": boyWidth,
	"height": boyHeight,
	"top": boyTop
  });
  //背景的宽和高   //没有办法调整宽和高  是一个静态的   非动态的
  $(".a_background").css({
	"width":  contentLiWidth,
 	 "height": contentLiHeight
  });
//男孩走动
/*var n, t, count=0;
$(".boy").everyTime("0.6s",function () {
  $(this).css({
	"left":"+=20px"
  })
},6, $(".wrap-content").everyTime("1s", function () {
  $(this).css({
	"left": "-=60px"
  })
})
);
*/
/*var t,boy=$(".boy"),
  boyOffsetLeft=boy.offsetLeft;
t=setInterval(function () {
  boy.css({
	"left":"+=20px"
  });

  if(boyOffsetLeft > 200){
	clearInterval(t);
  }
},30);
*/
  var boy=document.getElementById("boy");
  var ul=document.getElementsByClassName("wrap-content")[0];

  //第一步男孩走动
  //男孩走动的函数
  function set() {
	setTimeout(function () {
	  
	},30)
  }

  var t=setInterval(function () {
	Iz++;
	imgs.src= "images/image-origin/"+Iz+".png";
	if(Iz>3){
	  Iz=0;
	}
  },600);

  startMove(boy,{left: 800}, 30, 5,
	//第二步ul走动

	function () {
	startMove(ul, {left: -1240},30,-20,
	  //第三步男孩消失

	  function () {
		$(boy).addClass("fadeIn");
		window.setTimeout(function () {
		  $(boy).removeClass("fadeIn");
		  $(boy).children("img").attr("src", "images/image-origin/boy-flower1.png");
		  window.setTimeout(function () {
			$(boy).addClass("withFlower");
		  },1000);

		  clearInterval(t);
		}, 2500);


		$(doorLeft).addClass("open_door_left");
		$(dooRight).addClass("open_door_right");

		/*if ($(boy).hasClass("fadeIn")){
		  $(boy).children("img").attr("src", "images/image-origin/boy-flower1.png");
		//  $(boy).removeClass("fadeIn");
		}*/

	  })
  });
  var Iz=1;
  var imgs=boy.firstElementChild;

});



