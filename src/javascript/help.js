$(function() {
	$(".print").bind('contextmenu', function() {
	$("#help dt").text('表示')
	$("#help dd").text('この付箋はこの上にはりつけた付箋の内容を右下のエリアに表示するものです。たとえば、上に文字列変数の付箋を張り付け実行ボタンを押すと、その文字列の内容が表示されます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
	});
	$(".assign").bind('contextmenu', function() { //append 
	$("#help dt").text('代入付箋')
	$("#help dd").text('これは代入を行う付箋です。左の付箋には変数付箋を張り付け、右の付箋に左の付箋にいれたい内容をもつ付箋を張り付けます。実行結果として、左の付箋に右の付箋の内容が入ってることになります。');
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
	$("#help dd").text('左に張り付けられた付箋と、右に貼り付けられた付箋をくっつけます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".compOp").bind('contextmenu', function() {
	$("#help dt").text('比較演算')
	$("#help dd").text('これは比較を行う付箋です。左の付箋と右の付箋を比較し、「＝」であれば左と右の付箋の内容が同じかどうかを調べる付箋になります。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".logicOp").bind('contextmenu', function() {
	$("#help dt").text('論理演算')
	$("#help dd").text('これは論理演算を行うものです。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".if").bind('contextmenu', function() {
	$("#help dt").text('条件分岐1')
	$("#help dd").text('これはもし左の付箋の内容が自分が思う正しい内容の場合に、右の付箋の内容を実行するものです。ですから、左の付箋には比較の付箋が入ることになります。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".ifelse").bind('contextmenu', function() {
	$("#help dt").text('条件分岐2')
	$("#help dd").text('これはもし左の付箋の内容が自分が思う正しい内容の場合は真ん中の付箋の内容を実行し、もし自分が想定する内容でない場合は、右の付箋の内容を実行する付箋です。ですから、左の付箋には比較の付箋が入ることになります。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".for").bind('contextmenu', function() {
	$("#help dt").text('繰り返し1')
	$("#help dd").text('これは、貼り付けた付箋の内容を、指定した回数分、繰り返す付箋です。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".while").bind('contextmenu', function() {
	$("#help dt").text('繰り返し2')
	$("#help dd").text('これは、左に貼り付けた付箋の内容が正しければ、右の付箋の内容を繰り返すための付箋です。上の付箋と違い、付箋の内容が正しければ無限に繰り返されます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".intBlock.constBlock").bind('contextmenu', function() {
	$("#help dt").text('数字')
	$("#help dd").text('この付箋は数字を入れる付箋です。矢印をクリックすることで値を増やすこともでき、かつキーボードから数字を入力することもできます。代入付箋の右側にはりつけて、変数付箋に内容を入れることなどができます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".charBlock.constBlock").bind('contextmenu', function() {
	$("#help dt").text('文字列')
	$("#help dd").text('この付箋は文字列を入れる付箋です。キーボードから好きな文字を入力でき、代入付箋の右側にはりつけて、変数付箋に内容を入れることなどができます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".boolBlock.constBlock").bind('contextmenu', function() {
	$("#help dt").text('論理')
	$("#help dd").text('この付箋は論理(true,false)を入れる付箋です。trueは正しい、falseは間違いに対応しています。比較付箋に貼り付けて、正しいか、正しくないかの判定などで使います。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".charBlock.varBlock").bind('contextmenu', function() {
	$("#help dt").text('変数(文字列)')
	$("#help dd").text('これは文字列（単語or文）を書き込む付箋です。キーボードから自由に入力することができます。もし表示の付箋に貼り付ければ、入力した文字列が右下のエリアに表示されます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".intBlock.varBlock").bind('contextmenu', function() {
	$("#help dt").text('変数(整数)')
	$("#help dd").text('これは整数を書き込む付箋です。マウスで数値を増やしたり、キーボードから数字を入力したりすると、それが数字としての役割を果たします。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".boolBlock.varBlock").bind('contextmenu', function() {
	$("#help dt").text('変数(論理)')
	$("#help dd").text('これは論理(true,false)を入れる変数です。trueは正しい、falseは間違いに対応しています。比較付箋に貼り付けて、正しいか、正しくないかの判定などで使います。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".subroutineDistination").bind('contextmenu', function() {
	$("#help dt").text('サブルーチン（呼び出し先）')
	$("#help dd").text('これはサブルーチンの本体です。サブルーチンとはメインで呼び出される途中の処理で、ある処理を別に書いておいて、途中で処理をするものです。この付箋はサブルーチンの処理を作るもので、ここに、行いたい処理を付箋として貼っておきます。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
    $(".subroutine").bind('contextmenu', function() {
	$("#help dt").text('サブルーチン（呼び出し）')
	$("#help dd").text('これはサブルーチンを呼び出すための付箋です。これをメインの途中で貼り付けることで、そこにサブルーチンの内容を張り付けたことと同じ効果を持っています。');
	$("#help dt").css({'font-size':'17px', 'border-bottom':'1px solid #fff'});
	return false;
    });
});
