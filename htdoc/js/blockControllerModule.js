// jQuery(function() {
	//ドロップ属性の付加処理を管理する関数
	function annexController (obj) {
		if(obj.children().hasClass("nestArea"))
			annexSort(obj);
		if(obj.children().hasClass("intArea"))
			annexIntArea(obj);
		if(obj.children().hasClass("charArea"))
			annexCharArea(obj);
		if(obj.children().hasClass("boolArea"))
			annexBoolArea(obj);
		if(obj.children().hasClass("varArea"))
			annexVarArea(obj);
		if(obj.children().hasClass('dataArea'))
			annexDataArea(obj);
	};

//ソート属性を付加する関数
	function annexSort (obj) {
		obj.children(".nestArea").sortable({
			connectWith:"ul",
			revert:true,
			update:function  (event,ui) {
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
	};

	//ドロップ属性を付加する関数
	//int型のデータブロック
	//intBlock:定数or変数，mathBlock:数式
	function annexIntArea (obj) {
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
					var cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('mathBlock'))
					// 	annexIntArea(cloneObj);
					annexController(cloneObj);
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
	function annexCharArea (obj) {
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
					var cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('strBlock'))
					// 	annexCharArea(cloneObj);
					annexController(cloneObj);
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
	function annexBoolArea (obj) {
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
					var cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('logicBlock'))
					// 	annexBoolArea(cloneObj);
					annexController(cloneObj);
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
	function annexVarArea (obj) {
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
					var cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('logicBlock'))
					// 	annexBoolArea(cloneObj);
					annexController(cloneObj);
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
	function annexDataArea (obj) {
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
					var cloneObj=ui.draggable.clone();
					cloneObj.removeClass('inList');
					// if(ui.draggable.hasClass('mathBlock'))
					// 	annexIntArea(cloneObj);
					// else if(ui.draggable.hasClass('str'))
					// 	annexCharArea(cloneObj);
					annexController(cloneObj);
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
// });