jQuery(function() {
	//アコーディオン
	$("#blockListArea").accordion({
		active:false,
		collapsible:true
	});
	//ドラッグ属性
	//メソッドレベル
	$("#main").draggable({
		cancel:"#mainList, .subList",
		containment:"#workspace"
	});
	$(".sub").draggable({
		cancel:".subList, .functionName",
		containment:"#workspace",
		helper:"clone",
		zIndex:40,
		revert:false
	});
	//ネスト構造のブロック
	$(".nestBlock").draggable({
		connectToSortable:"#mainList, .subList, .nestArea",
		helper:"clone",
		revert:false,
		cancel:".nestArea"
	});
	//データ処理ブロック
	$(".mathBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		helper:"clone",
		zIndex:50,
		revert:false 
	});
	$(".strBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		helper:"clone",
		zIndex:50,
		revert:false 
	});
	$(".logicBlock").draggable({
		//connectToSortable:"#mainList, .subList, nestArea",
		helper:"clone",
		zIndex:50,
		revert:false 
	});
	//データブロック
	$(".intBlock").draggable({
		helper:"clone",
		revert:true,
		zIndex:100
	});
	$(".charBlock").draggable({
		helper:"clone",
		revert:true,
		zIndex:100
	});
	$(".boolBlock").draggable({
		helper:"clone",
		revert:true,
		zIndex:100
	});
	//処理ブロック
	$(".processBlock").draggable({
		connectToSortable:"#mainList, .subList, .nestArea",
		helper:"clone",
		revert:false
	});

	//ソート属性
	$("#mainList").sortable({
		connectWith:"ul",
		revert:true,
		update:function  (event,ui) {
			//ブロックリストから追加された場合の属性付加処理
			if(ui.item.hasClass('inList')){
				ui.item.removeClass('inList');
				// if(ui.item.hasClass("nestBlock"))
				// 	annexSort(ui.item);
				// if(ui.item.children().hasClass("intArea"))
				// 	annexIntArea(ui.item);
				// if(ui.item.children().hasClass("charArea"))
				// 	annexCharArea(ui.item);
				// if(ui.item.children().hasClass("boolArea"))
				// 	annexBoolArea(ui.item);
				// if(ui.item.children().hasClass("varArea"))
				// 	annexVarArea(ui.item);
				// if(ui.item.children().hasClass('dataArea'))
				// 	annexDataArea(ui.item);
				annexController(ui.item);
			}
		}
	});

	$("#workspace").droppable({
		accept: ".block, .sub",
		greedy:true,
		drop: function(event, ui){
			if(ui.draggable.hasClass('inList')){
				var parentOffset = $("#workspace").offset();
				var dropped = ui.draggable.clone().draggable({
					containment:"#workspace",
				});
				dropped.css('position', 'absolute');
				if(dropped.hasClass('processBlock')||dropped.hasClass('nestBlock'))
					dropped.draggable("option","connectToSortable","#mainList, .subList, .nestArea");
				else if(dropped.hasClass('sub'))
					dropped.draggable("option","cancel",".subList, .functionName");
				dropped.removeClass('inList');
				dropped.css('left', (ui.position.left+'px'));
				dropped.css('top', (ui.position.top+'px'));
				annexController(dropped);
				$(this).append(dropped);
			}else if(!(ui.draggable.parent().attr('id')=="workspace")){
				var parentOffset = $("#workspace").offset();
				var dropped = ui.draggable.draggable({
					containment:"#workspace",
				});
				dropped.css('position', 'absolute');
				if(dropped.hasClass('processBlock')||dropped.hasClass('nestBlock'))
					dropped.draggable("option","connectToSortable","#mainList, .subList, .nestArea");
				dropped.removeClass('inList');
				dropped.css('left', (ui.position.left+'px'));
				dropped.css('top', (ui.position.top+'px'));
				annexController(dropped);
				$(this).append(dropped);
			}
		}
	})

	$("#dustbin").droppable({
		accept: "#workspace .block, #workspace .sub",
		greedy: true,
		drop: function(event, ui){
			if(ui.draggable.hasClass('inList'))
				return;
			ui.draggable.remove()
		}
	});
});