/**
 * Created by shiyong on 6/23.
 */


var a = {
  bbb: 4,
  ccc: 5,
  fun1: function (a) {
	console.log(this.bbb, a);
  },
  kkkk: 4
};

a.name = "aaaa";
a.fun1("cccc");


$("div").addClass();
$("div").each(function (i, elem) {
  this
});
var curClas = curPage.getAttribute("class");
curClas += "page" + "active";
curPage.setAttribute("class", "active");

