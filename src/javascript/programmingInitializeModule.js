limitList = new Object();
programmingMode=$("#programmingMode").val();

jQuery(function() {
	//アコーディオン
	$("#blockListArea").accordion({
		active:false,
		collapsible:true,
		heightStyle:"content"
	});

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

	$("#next").hide();

	if(programmingMode=="kadai")
		initializeKadaiMode();
});

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

function initializeWorkspace () {
	$("#workspace .block").each(function  () {
		console.log($(this).attr("class"));
		annexDraggable($(this));
		annexController($(this));
	});
}


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

function blockGenerateControl () {
	$(".inList.sub").draggable("disable");
	//ネスト構造のブロック
	$(".inList.nestBlock").draggable("disable");
	//データ処理ブロック
	$(".inList.mathBlock").draggable("disable");
	$(".inList.strBlock").draggable("disable");
	$(".inList.logicBlock").draggable("disable");
	//データブロック
	$(".inList.constBlock,.inList.varBlock").draggable("disable");
	//処理ブロック
	$(".inList.processBlock").draggable("disable");
	var limitStr=$("#limitList").val();
	// console.log(limitStr);
	var temp=limitStr.split(",");
	// for(var key in temp)
	// 	console.log("key="+key+"\\"+temp[key]);
	// console.log("ここまで");
	for(var key in temp){
		var temp2=temp[key].split(":");
		// for(var k in temp2)
		// 	console.log("k="+k+"\\"+temp2[k]);
		limitList[temp2[0]]=temp2[1];
	}
	for(var key in limitList){
		console.log(key+"→"+limitList[key]);
		$(".inList"+key).draggable("enable");
	}
}

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