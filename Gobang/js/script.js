var me = true;
var chessboard = [];
for(var i=0;i<15;i++){
  chessboard[i] =[];
  for (var j=0;j<15; j++){
	chessboard[i][j] = 0;
  }
}
var chess =document.getElementById("chess");
var context = chess.getContext("2d");
var img =new Image();
img.src = "image/logo.jpg";



img.onload = function () {
  //context.drawImage(img,0,0,450,450);
  chessBox();
};
//画棋盘
context.strokeStyle ="#BFBFBF";
var chessBox = function () {
  for(var i=0;i<15; i++){
	context.moveTo(15+i*30,15);  //起始坐标
	context.lineTo(15+i*30,435);  //终点
	context.stroke();
	context.moveTo(15,15+i*30);  //起始坐标
	context.lineTo(435, 15+i*30);  //终点
	context.stroke();
  }
};
//画棋子
var Piece = function (i,j,me) {

  context.beginPath();
  context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
  context.stroke();
  var my_gradient=context.createRadialGradient(15+i*30,15+j*30,2,15+i*30,15+j*30,13);
  if(me){
	my_gradient.addColorStop(0,"#0A0A0A");
	my_gradient.addColorStop(1,"#636766");
  }else {
	my_gradient.addColorStop(0,"#D1D1D1");
	my_gradient.addColorStop(1,"#F9F9F9");
  }
  context.fillStyle=my_gradient;
  context.fill();
};
//鼠标点击事件
chess.onclick =function (e) {
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x/30);
  var j =Math.floor(y/30);
if(chessboard[i][j] == 0){
  Piece(i,j,me);
  if(me){
	chessboard[i][j] = 1;
  }else {
	chessboard[i][j] = 2;
  }
  me = !me;
  console.log(chessboard[i][j]);
}




};