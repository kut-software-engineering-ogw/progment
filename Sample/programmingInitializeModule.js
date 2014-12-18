jQuery(function() {
	//ドラッグ属性
	$("#main").draggable({
		cancel:"#mainList",
		containment:"#workspace"
	});
	$(".nestBlock").draggable({
		connectToSortable:"#mainList, .nestArea",
		helper:"clone",
		revert:true,
		cancel:".nestArea",
		zIndex:10
	});
	$(".mathBlock").draggable({
		connectToSortable:"#mainList, nestArea",
		helper:"clone",
		revert:true,
		zIndex:10
	});
	$(".intBlock").draggable({
		helper:"clone",
		revert:true,
		zIndex:100
	});
	$(".processBlock").draggable({
		connectToSortable:"#mainList, nestArea",
		helper:"clone",
		revert:true,
		zIndex:10
	})

	//ソート属性
	$("#mainList").sortable({
		connectWith:"ul",
		revert:true,
		update:function  (event,ui) {
			if(ui.item.hasClass("nestBlock"))
				appendSort(event, ui);
			if(ui.item.hasClass("mathBlock"))
				appendIntArea(event, ui);
		}
	});
	function appendSort (event, ui) {
		ui.item.children(".nestArea").sortable({
			connectWith:"ul",
			revert:true,
			update:function  (event,ui) {
				if(ui.item.hasClass("nestBlock"))
					appendSort(event, ui);
				if(ui.item.hasClass("mathBlock"))
					appendIntArea(event, ui);
			}
		});
	};

	//ドロップ属性
	function appendIntArea (event, ui) {
		ui.item.children(".intArea").droppable({
			accept: ".intBlock",
			drop: function  (event,ui) {
				// if(ui.draggable.hasClass("inlist")){
					cloneObj=ui.draggable.clone();
					cloneObj.draggable({
						revert:true,
						zIndex:100
					});
					$(this).append(cloneObj);
				// }else{

				// }
			}
		});
	};
});