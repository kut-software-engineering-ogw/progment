jQuery(function() {
	//アコーディオン
	$("#blockListArea").accordion({
		active:false,
		collapsible:true
	});


	//ドラッグ属性
	//メソッドレベル
	$("#main, .sub").draggable({
		cancel:"#mainList, .subList",
		containment:"#workspace"
	});
	//ネスト構造のブロック
	$(".nestBlock").draggable({
		connectToSortable:"#mainList, .subList, .nestArea",
		helper:"clone",
		revert:true,
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
		revert:true
	});

	//ソート属性
	$("#mainList, .subList").sortable({
		connectWith:"ul",
		revert:true,
		update:function  (event,ui) {
			//ブロックリストから追加された場合の属性付加処理
			if(ui.item.hasClass('inList')){
				ui.item.removeClass('inList');
				if(ui.item.hasClass("nestBlock"))
					appendSort(ui.item);
				else if(ui.item.children().hasClass("intArea"))
					appendIntArea(ui.item);
				else if(ui.item.children().hasClass("charArea"))
					appendCharArea(ui.item);
				else if(ui.item.children().hasClass('dataArea'))
					appendDataArea(ui.item);
			}
		}
	});
	//ソート属性を付加する関数
	function appendSort (obj) {
		obj.children(".nestArea").sortable({
			connectWith:"ul",
			revert:true,
			update:function  (event,ui) {
				if(ui.item.hasClass('inList')){
					ui.item.removeClass('inList');
					if(ui.item.hasClass("nestBlock"))
						appendSort(ui.item);
					else if(ui.item.children().hasClass("intArea"))
						appendIntArea(ui.item);
					else if(ui.item.children().hasClass("charArea"))
						appendCharArea(ui.item);
					else if(ui.item.children().hasClass('dataArea'))
						appendDataArea(ui.item);
				}
			}
		});
	};

	//ドロップ属性を付加する関数
	//int型のデータブロック
	//intBlock:定数or変数，mathBlock:数式
	function appendIntArea (obj) {
		obj.children(".intArea").droppable({
			//int型と数式のみをドロップ許可
			accept: ".intBlock, .mathBlock",
			//イベント伝播への対処
			greedy: true,
			drop: function  (event,ui) {
				//既にブロックが入っている場合は格納処理を行わない
				if($(this).children().length > 0)
					return;
				//ブロックリストからドロップされた場合の処理
				else if(ui.draggable.hasClass("inList")){
					cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					if(ui.draggable.hasClass('mathBlock'))
						appendIntArea(cloneObj);
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				}else{
					$(this).append(ui.draggable);
				}
			}
		});
	};
	//char型
	//charBlock:文字列or変数,strBlock:文字列の処理(例:連結や分割)
	function appendCharArea (obj) {
		obj.children(".charArea").droppable({
			//文字列型と文字列の処理のみをドロップ許可
			accept: ".charBlock, .strBlock",
			//イベント伝播への対処
			greedy: true,
			drop: function  (event,ui) {
				//既にブロックが入っている場合は格納処理を行わない
				if($(this).children().length > 0)
					return;
				//ブロックリストからドロップされた場合の処理
				else if(ui.draggable.hasClass("inList")){
					cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					if(ui.draggable.hasClass('strBlock'))
						appendCharArea(cloneObj);
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				}else{
					$(this).append(ui.draggable);
				}
			}
		});
	};
	//Boolean型
	//boolBlock:論理値or論理変数,logicBlock:論理演算
	function appendBoolArea (obj) {
		obj.children(".boolArea").droppable({
			//boolean型と論理演算のみをドロップ許可
			accept: ".boolBlock, .logicBlock",
			//イベント伝播への対処
			greedy: true,
			drop: function  (event,ui) {
				//既にブロックが入っている場合は格納処理を行わない
				if($(this).children().length > 0)
					return;
				//ブロックリストからドロップされた場合の処理
				else if(ui.draggable.hasClass("inList")){
					cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					if(ui.draggable.hasClass('logicBlock'))
						appendBoolArea(cloneObj);
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				}else{
					$(this).append(ui.draggable);
				}
			}
		});
	};
	//変数型
	function appendVarArea (obj) {
		obj.children(".varArea").droppable({
			//boolean型と論理演算のみをドロップ許可
			accept: ".varBlock",
			//イベント伝播への対処
			greedy: true,
			drop: function  (event,ui) {
				//既にブロックが入っている場合は格納処理を行わない
				if($(this).children().length > 0)
					return;
				//ブロックリストからドロップされた場合の処理
				else if(ui.draggable.hasClass("inList")){
					cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('logicBlock'))
					// 	appendBoolArea(cloneObj);
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				}else{
					$(this).append(ui.draggable);
				}
			}
		});
	};

	//data型
	function appendDataArea (obj) {
		//alert(obj.children().hasClass('dataArea'));
		obj.children(".dataArea").droppable({
			//データ型のみをドロップ許可
			accept: ".intBlock, .mathBlock, .charBlock, .strBlock, .boolBlock, .logicBlock, .varBlock",
			//イベント伝播への対処
			greedy: true,
			drop: function  (event,ui) {
				//既にブロックが入っている場合は格納処理を行わない
				if($(this).children().length > 0)
					return;
				//ブロックリストからドロップされた場合の処理
				else if(ui.draggable.hasClass("inList")){
					cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					if(ui.draggable.hasClass('mathBlock'))
						appendIntArea(cloneObj);
					else if(ui.draggable.hasClass('str'))
						appendCharArea(cloneObj);
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				}else{
					$(this).append(ui.draggable);
				}
			}
		});
	};
});