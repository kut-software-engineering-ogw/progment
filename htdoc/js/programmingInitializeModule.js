//グローバル変数
codeStr="";
preamble="";
subroutine="";
varNum=0;
varNameTable={hoge:"foo"};
funNum=0;
functionNameTable={hoge:"foo"};
exeMode="nomal";
hogeNum=0;
blockNum=1;
// delayTime=0;
funlib="";//"output=(function (str){oldtxt=$(\"#outputArea\").val();output=oldtxt+str+\"\\n\";$(\"#outputArea\").val(output);});";
stackNum=0;
generator=[];
result=undefined;
OutText="";
limitList = new Object();
programmingMode=$("#programmingMode").val();

jQuery(function() {
	//アコーディオン
	$("#blockListArea").accordion({
		active:false,
		collapsible:true,
		heightStyle:"content"
	});

	//メインメソッドのソート属性
	$("#mainList").sortable({
		connectWith:"ul",
		revert:true,
		update:function  (event,ui) {
			//ブロックリストから追加された場合の属性付加処理
			if(ui.item.hasClass('inList')){
				ui.item.removeClass('inList');
				blockGenerated(ui.item);
				annexController(ui.item);
			}
		}
	});

	//ドラッグ属性
	//メソッドレベル
	$("#main").draggable({
		cancel:"#mainList",
		containment:"#workspace"
	});
	$("#kadai").draggable({
		cancel:"#kadaiList",
		containment:"#workspace"
	});
	// $("#workspace .sub").draggable({
	// 	cancel:".subList, .functionName",
	// 	containment:"#workspace",
	// 	zIndex:40,
	// });
	//ブロックリストの初期化
	initializeBlockList();
	//workspaceの初期化
	initializeWorkspace();
	//workspaceのドロップ属性
	$("#workspace").droppable({
		accept: ".block, .sub",
		tolerance: "fit",
		greedy:true,
		// tolerance:"intersect",
		drop: function(event, ui){
			//console.log(event.relatedTarget);
			//dropArea|nestArea→workspaceの処理
			if(!(ui.draggable.parent().attr('id')=="workspace")&&!(ui.draggable.hasClass('inList'))){
				console.log("workspace外")
				var workspaceOffset = $("#workspace").offset();
				var parentOffset= ui.draggable.parent().offset();
				var dropped = ui.draggable;
				annexDraggable(dropped);
				dropped.css('position', 'absolute');
				dropped.css('backgroud-color', 'red');
				console.log(1);
				dropped.css('left', (ui.position.left-workspaceOffset.left+parentOffset.left+'px'));
				dropped.css('top', (ui.position.top-workspaceOffset.top+parentOffset.top+'px'));
				console.log("dropped:"+ui.position.left+"\n"+ui.position.top);
				console.log("dropped:"+workspaceOffset.left+"\n"+workspaceOffset.top);
				annexController(dropped);
				$(this).append(dropped);
			}else if(ui.draggable.hasClass('ui-draggable-dragging')){
				console.log("移動中"+ui.draggable.attr('class'));
			}else if(ui.draggable.hasClass('inList')){
				//リストからのドロップ時の処理
				console.log("リストからドロップ");
				console.log(ui.draggable.attr('class'));
				var workspaceOffset = $("#workspace").offset();
				var dropped = ui.draggable.clone();
				annexDraggable(dropped);
				dropped.css('position', 'absolute');
				dropped.removeClass('inList');
				dropped.css('left', (ui.position.left-workspaceOffset.left+'px'));
				dropped.css('top', (ui.position.top-workspaceOffset.top+'px'));
				console.log("dropped:"+ui.position.left+"\n"+ui.position.top);
				console.log("dropped:"+workspaceOffset.left+"\n"+workspaceOffset.top);				
				annexController(dropped);
				blockGenerated(dropped);
				$(this).append(dropped);
			}
			//onsole.log($(".ui-draggable-dragging").parent());
		}
	})
	
	//ゴミ箱の処理
	$("#dustbin").droppable({
		accept: "#workspace .block, #workspace .sub",
		greedy: true,
		tolerance: "pointer",
		drop: function(event, ui){
			console.log(ui.draggable.attr('class'));
			if(ui.draggable.hasClass('inList'))
				return;
			else if(ui.draggable.attr('id')=="kadaiRoutine")
				return;
			blockDeleted(ui.draggable);
			ui.draggable.remove()
		}
	});

	// トレース実行時に使用するボタンの非表示
	$("#next").hide();

	// 課題モード時の初期化処理
	if(programmingMode=="kadai")
		initializeKadaiMode();
});

//プログラムをサーバから読み込んだ際の再初期化処理用メソッド
function reInitialize () {
	//ソート属性
	$("#mainList").sortable({
		connectWith:"ul",
		revert:true,
		update:function  (event,ui) {
			//ブロックリストから追加された場合の属性付加処理
			if(ui.item.hasClass('inList')){
				ui.item.removeClass('inList');
				blockGenerated(ui.item);
				annexController(ui.item);
			}
		}
	});

	//ドラッグ属性
	//メソッドレベル
	$("#main").draggable({
		cancel:"#mainList",
		containment:"#workspace"
	});
	$("#kadai").draggable({
		cancel:"#kadaiList",
		containment:"#workspace"
	});
	$("#workspace .sub").draggable({
		cancel:".subList, .functionName",
		containment:"#workspace",
		zIndex:40,
	});
	//workspaceの初期化
	initializeWorkspace();
	//workspaceのドロップ属性
	$("#workspace").droppable({
		accept: ".block, .sub",
		tolerance: "fit",
		greedy:true,
		// tolerance:"intersect",
		drop: function(event, ui){
			//console.log(event.relatedTarget);
			//dropArea|nestArea→workspace
			if(!(ui.draggable.parent().attr('id')=="workspace")&&!(ui.draggable.hasClass('inList'))){
				console.log("workspace外")
				var workspaceOffset = $("#workspace").offset();
				var parentOffset= ui.draggable.parent().offset();
				var dropped = ui.draggable;
				annexDraggable(dropped);
				dropped.css('position', 'absolute');
				dropped.css('backgroud-color', 'red');
				console.log(1);
				dropped.css('left', (ui.position.left-workspaceOffset.left+parentOffset.left+'px'));
				dropped.css('top', (ui.position.top-workspaceOffset.top+parentOffset.top+'px'));
				console.log("dropped:"+ui.position.left+"\n"+ui.position.top);
				console.log("dropped:"+workspaceOffset.left+"\n"+workspaceOffset.top);
				annexController(dropped);
				$(this).append(dropped);
			}else if(ui.draggable.hasClass('ui-draggable-dragging')){
				console.log("移動中"+ui.draggable.attr('class'));
			}else if(ui.draggable.hasClass('inList')){
				console.log("リストからドロップ");
				console.log(ui.draggable.attr('class'));
				var workspaceOffset = $("#workspace").offset();
				var dropped = ui.draggable.clone();
				annexDraggable(dropped);
				dropped.css('position', 'absolute');
				dropped.removeClass('inList');
				dropped.css('left', (ui.position.left-workspaceOffset.left+'px'));
				dropped.css('top', (ui.position.top-workspaceOffset.top+'px'));
				console.log("dropped:"+ui.position.left+"\n"+ui.position.top);
				console.log("dropped:"+workspaceOffset.left+"\n"+workspaceOffset.top);				
				annexController(dropped);
				blockGenerated(dropped);
				$(this).append(dropped);
			}
			//onsole.log($(".ui-draggable-dragging").parent());
		}
	})

	$("#dustbin").droppable({
		accept: "#workspace .block, #workspace .sub",
		greedy: true,
		tolerance: "pointer",
		drop: function(event, ui){
			console.log(ui.draggable.attr('class'));
			if(ui.draggable.hasClass('inList'))
				return;
			else if(ui.draggable.attr('id')=="kadaiRoutine")
				return;
			blockDeleted(ui.draggable);
			ui.draggable.remove()
		}
	});

	if(programmingMode=="kadai")
		initializeKadaiMode();
}


//ブロックリストの初期化メソッド
function initializeBlockList () {
	$(".inList.sub").draggable({
		cancel:".subList, .functionName",
		containment:"#workspace",
		helper:"clone",
		zIndex:40,
		revert:false
	});
	//ネスト構造のブロック
	$(".inList.nestBlock").draggable({
		connectToSortable:"#mainList, .subList, .nestArea",
		containment:"#workspace",
		helper:"clone",
		revert:false,
		cancel:".nestArea,input"
	});
	//データ処理ブロック
	$(".inList.mathBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		containment:"#workspace",
		helper:"clone",
		zIndex:50,
		cancel:"",
		revert:false
	});
	$(".inList.strBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		containment:"#workspace",
		helper:"clone",
		zIndex:50,
		revert:false 
	});
	$(".inList.logicBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		containment:"#workspace",
		helper:"clone",
		zIndex:50,
		revert:false 
	});
	//データブロック
	$(".inList.constBlock,.inList.varBlock").draggable({
		containment:"#workspace",
		helper:"clone",
		revert:true,
		zIndex:100
	});
	//処理ブロック
	$(".inList.processBlock").draggable({
		connectToSortable:"#mainList, .subList, .nestArea",
		containment:"#workspace",
		helper:"clone",
		revert:false
	});
}

//ブロックの種類を取得するメソッド
function getBlockType (obj) {
	var classList=obj.get(0).className.split(" ");
	var classNum=classList.length-1;
	while(classNum>=0){
		switch (classList[classNum]){
			case "sub":
				return "sub";
			case "subroutine":
				return "subroutine";
			case "print":
				return "print";
			case "fourOp":
				return "fourOp"
			case "brackets":
				return "brackets";
			case "concatOp":
				return "concatOp";
			case "compOp":
				return "compOp";
			case "logicOp":
				return "logicOp";
			case "constBlock":
				return "constBlock";
			case "varBlock":
				return "varBlock";
			case "assign":
				return "assign";
			case "for":
				return "for";
			case "while":
				return "while";
			case "if":
				return "if";
			case "ifelse":
				return "ifelse";
			default:
				classNum--;
				break;
		}
	}
	return "unknown";
}

//workspaceの初期化処理
function initializeWorkspace () {
	$("#workspace .block").each(function  () {
		console.log($(this).attr("class"));
		annexDraggable($(this));
		annexController($(this));
	});
}

//ドラッグ属性を付与する関数
function annexDraggable (obj) {
	// var classList=obj.get(0).className.split(" ");
	// var classNum=classList.length;
	var blockType=getBlockType(obj);
	switch(blockType){
		case "sub":
			obj.draggable({
				cancel:".subList, .functionName",
				containment:"#workspace",
				zIndex:40,
			});
			break;
		case "print":
		case "assign":
		case "subroutine":
			obj.draggable({
				connectToSortable:"#mainList, .subList, .nestArea",
				containment:"#workspace",
				revert:false
			});
			break;
		case "for":
		case "while":
		case "if":
		case "ifelse":
			obj.draggable({
				connectToSortable:"#mainList, .subList, .nestArea",
				containment:"#workspace",
				revert:false,
				cancel:".nestArea,input"
			});
			break;
		case "fourOp":
		case "brackets":
		case "concatOp":
		case "compOp":
		case "logicOp":
			obj.draggable({
				zIndex:50,
				containment:"#workspace",
				revert:false 
			});
			break;
		case "constBlock":
		case "varBlock":
			obj.draggable({
				zIndex:100,
				containment:"#workspace",
				revert:false 
			});
			break;
		default:
			console.log(classList);
			break;
	}
}

//課題モード時の初期化モジュール
function initializeKadaiMode () {
	console.log("課題初期化START------------------------------------");
	limitList = new Object();
	blockGenerateControl();
	console.log("ブロックリスト初期化終わり")
	// console.log("kore:"+$("#main").children('').hasClass('ui-sortable'));
	// $("#main").children(".ui-sortable").sortable( 'disable' );
	forbiddenDraggingWorkspace($("#main"));
	console.log("課題初期化END--------------------------------------");
}

//課題モードでworkspace中の課題ルーチン以外のドラッグ禁止処理メソッド
function forbiddenDraggingWorkspace (obj) {
	obj.children('').children('.block').each(function  () {
		forbiddenDraggingWorkspace($(this));
	});
	obj.draggable({ disabled: true });
	if(obj.children('').hasClass('ui-sortable')){
		obj.children(".ui-sortable").sortable( 'disable' );
		console.log("disableSortable:"+obj.attr('class'));
	}
	console.log(obj.attr('class'));
}

//ブロックリスト管理モジュールの処理
//制限情報の適応メソッド
function blockGenerateControl () {
	//サブルーチン
	$(".inList.sub").draggable("disable");
	$(".inList.sub").hide();
	//ネスト構造のブロック
	$(".inList.nestBlock").draggable("disable");
	$(".inList.nestBlock").hide();
	//データ処理ブロック
	$(".inList.mathBlock").draggable("disable");
	$(".inList.mathBlock").hide();
	$(".inList.strBlock").draggable("disable");
	$(".inList.strBlock").hide();
	$(".inList.logicBlock").draggable("disable");
	$(".inList.logicBlock").hide();
	//データブロック
	$(".inList.constBlock,.inList.varBlock").draggable("disable");
	$(".inList.constBlock,.inList.varBlock").hide();
	//処理ブロック
	$(".inList.processBlock").draggable("disable");
	$(".inList.processBlock").hide();
	//ブロック制限情報の取得
	var limitStr=$("#limitList").val();
	//ブロック単位の分割
	var temp=limitStr.split(",");
	//ブロック情報と個数情報の分割
	for(var key in temp){
		var temp2=temp[key].split(":");
		// for(var k in temp2)
		// 	console.log("k="+k+"\\"+temp2[k]);
		limitList[temp2[0]]=temp2[1];
	}
	for(var key in limitList){
		console.log(key+"→"+limitList[key]);
		$(".inList"+key).draggable("enable");
		$(".inList"+key).show();
	}
}

//ブロック生成時の個数制御メソッド
function blockGenerated (obj) {
	if(!($("#programmingMode").val()=="kadai"))
		return;
	var blockType="."+getBlockType(obj);
	if(blockType==".varBlock"||blockType==".constBlock"){
		if(obj.hasClass('intBlock'))
			blockType=".intBlock"+blockType;
		else if(obj.hasClass('charBlock'))
			blockType=".charBlock"+blockType;
		else if(obj.hasClass('boolBlock'))
			blockType=".boolBlock"+blockType;
	}
	var target=$(".inList"+blockType);
	if(limitList[blockType]==1){
		$(".inList"+blockType).draggable({ disabled: true });
		$(".inList"+blockType).hide();
	}
	limitList[blockType]--;
	//console.log("Type:"+blockType+"\n"+target.html()+limitList[blockType]);
}

//ブロック削除時の個数制御メソッド
function blockDeleted (obj) {
	if(!($("#programmingMode").val()=="kadai"))
		return;
	obj.children('').children('.block').each(function () {
		blockDeleted($(this));
	});
	var blockType="."+getBlockType(obj);
	if(obj.hasClass('intBlock'))
		blockType=".intBlock"+blockType;
	else if(obj.hasClass('charBlock'))
		blockType=".charBlock"+blockType;
	else if(obj.hasClass('boolBlock'))
		blockType=".boolBlock"+blockType;
	console.log(blockType)
	if(limitList[blockType]==0){
		$(".inList"+blockType).draggable({ disabled: false });
		$(".inList"+blockType).show();
	}
	limitList[blockType]++;
}