$(function() {
	$(".print").bind('contextmenu', function() {
		$("#help dt").text('表示')
		$("#help dd").text('この付箋はこの上にはりつけた付箋の内容を右下のエリアに表示するものです。たとえば、上に文字列変数の付箋を張り付け実行ボタンを押すと、その文字列の内容が表示されます。');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
	$(".fourOp").bind('contextmenu', function() {
		$("#help dt").text('四則付箋（+、-、*、/）')
		$("#help dd").text('これは計算をする付箋です。計算記号を選択し、実行することで計算が行われます。この付箋単体だと、実行時に計算は行われますが、内容はどこにも入りません。そのため、代入付箋の右枠にこの付箋を置いてつかうことが多いでしょう。');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
	$(".brackets").bind('contextmenu', function() {
		$("#help dt").text('括弧')
		$("#help dd").text('これは先に計算を行いたい場合に使うものです。四則付箋をこの中に張り付けることで、その部分が最優先に計算されるようになります。その逆も可能で、四則付箋の中に張り付けることもできます。');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
	$(".concatOp").bind('contextmenu', function() {
		$("#help dt").text('文字列連結')
		$("#help dd").text('文字列を結合します。');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
	$(".compOp").bind('contextmenu', function() {
		$("#help dt").text('比較演算')
		$("#help dd").text('これは比較を行う付箋です。');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
	$(".logicOp").bind('contextmenu', function() {
		$("#help dt").text('論理演算')
		$("#help dd").text('これは論理演算を行うものです。これを使うには2進数の知識が必要です。2進数の知識がすでにあり、論理演算をしっている方にはこの付箋の説明はおそらく必要ないでしょう。もし分からないけど、興味のある方は論理演算で調べるといいかも？使わなくてもプログラムを作れますし、使えなくても大丈夫です。でも、使い方は難しいですが使えるとプログラマに一歩近づいたといっても過言ではないでしょうね！');
		$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
		return false;
	});
});