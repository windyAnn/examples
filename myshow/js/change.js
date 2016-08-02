

$(document).ready(function () {
	var lx = [];
	var ly = [];
	var rot = [];
	var zIndex = 1;
	$("img").each(function (i, element) {

	  if(i<6){
		lx[i] = parseInt(Math.random() * 50 + 160 * i);
		ly[i] = parseInt(Math.random() * 5  + 20);
		rot[i] = parseInt(Math.random() * 35);
	  }
	  else {
		lx[i] = parseInt(Math.random() * 60 + 180* (i-6));
		ly[i] = parseInt(Math.random() * 100  + 260);
		rot[i] = parseInt(Math.random() * (-35));
	  }
	  
		$(element).css({
			left: lx[i],
			top: ly[i],
			transform: "rotate(" + rot[i] + "deg)"
		}).bind("mouseover", function () {
			zIndex++;
			$(element).css({
				"z-index": zIndex,
				transform: "rotate(" + 0 + "deg) scale(" + 1.5 + ")",
				//transform: "scale(" + 1.2 + ")",
				"box-shadow": "10px 10px 15px #ccc"
			});
		}).bind("mouseout", function () {
			$(element).css({
				transform: "rotate(" + rot[i] + "deg)"
				//transform: "scale(" + 1 + ")"
			});
		});

	})

});