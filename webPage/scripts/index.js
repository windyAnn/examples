//导航
var $nav=$("#nav");
var $li=$nav.find("li");
$li.bind("mouseover mouseout",function () {
  $(this).find("span").toggleClass("on");
});
//校园广告.hover
var $indexServiceBox=$("#indexServiceBox");
var $indexLi=$indexServiceBox.find("li");
$indexLi.bind("mouseenter mouseout",function () {
  $(this).toggleClass("hover");

});







//动画图
$(function(){

  $('.camera_wrap').camera({
	thumbnails: true,
	width: "100%",
	height: '520px'

  });
  /*$('.camera_wrap').camera({
   height: '400px',
   loader: 'bar',
   pagination: false,
   thumbnails: true
   });*/
});

