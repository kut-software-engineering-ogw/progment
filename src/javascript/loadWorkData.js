jQuery(function() {
	var dataStart = getWorkspace();
	// $("#load option[value='']").val("start");

	$("#load").on('change', function() {
		//alert($("#workspace").html());
		//workspaceが変更されているか判別
		if(dataStart != getWorkspace()){
//********************保存シークエンス開始*****************
			// alert("workspace判別");
			var workId = $("#load").val();			
			if(workId == ""){
//********************************************* 新規保存
			//新規保存をするかどうかを問うアラート
		    swal({
				  title: "新規保存を行いますか?",
				  text: "新規保存を行ったあと，読み込みを行います",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "はい",
				  cancelButtonText: "いいえ",
				  closeOnConfirm: false,
				  closeOnCancel: false
				},
				function(isConfirm){
					if (isConfirm) {
						// alert(isConfirm);
						swal("新規保存と読み込みが完了しました!!", "", "success");
						newSave();
						loadWork();
						return false;
				  	} else {
						swal({
					  	title: "作業中のデータを破棄して読み込みを行いますか?",
						text: "作業中のデータは保存されません",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "はい",
						cancelButtonText: "いいえ",
						closeOnConfirm: false,
						closeOnCancel: false
						},
						function(isConfirm){
							if (isConfirm) {
								swal("読み込みが完了しました!!", "", "success");
					    		loadWork();
					    		return false;
							} else {
								swal("キャンセルしました", "", "error");
								return false;
							}
						});
				  	}
				});
		    	// newSave();
		    	// alert("0");
		    	return false;
		    }else{
		       //　上書き保存
//***************************************************
				//上書き保存をするかどうかを問うアラート
				swal({
				  title: "上書き保存を行いますか?",
				  text: "上書き保存を行ったあと，読み込みを行います",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "はい",
				  cancelButtonText: "いいえ",
				  closeOnConfirm: false,
				  closeOnCancel: false
				},
				function(isConfirm){
					if (isConfirm) {
						// alert(isConfirm);
						swal("上書き保存と読み込みが完了しました!!", "", "success");
						save();
						loadWork();
						return false;
				  	} else {
						swal({
					  	title: "作業中のデータを破棄して読み込みを行いますか?",
						text: "作業中のデータは保存されません",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "はい",
						cancelButtonText: "いいえ",
						closeOnConfirm: false,
						closeOnCancel: false
						},
						function(isConfirm){
							if (isConfirm) {
					    		swal("読み込みが完了しました!!", "", "success");
					    		loadWork();
								return false;
							} else {
								swal("キャンセルしました", "", "error");
								return false;
							}
						});
				  	}
				});
		    }
		    return false;
		}else{
//****************保存シークエンスを飛ばした場合*****************
			swal("読み込みが完了しました!!", "", "success");			
			loadWork();
			// alert("4");
			return false;
		}
	});

	//作業データ読み込みメソッド
	function loadWork(){
	    var workIdLoad = $("#load").val();
	    var cookie  = $.cookie('user_id');
	    var loadSet = $("#load").html();
	    var url = "freeProg?prgId="+workIdLoad;
	    $.ajax({
	    	url: url,
	    	type: 'GET',
	    	cache: false,
	    	// data: {
	     //       cookie: cookie,
	     //       work_id: workIdLoad
	    	// },
	    	dataType: 'html',
	    	}).done(function( work, textStatus, jqXHR ) {
	        	alert("load ok");
	        	// alert(data);
	        	// $("#wrap").html(data);
	        	alert(work);
	        	var data = work.replace(/上田は32/g, ";");
	        	$("#workspace").html($('#workspace', $(data)).html());
	        	$("#comment").html($('#comment', $(data)).html());
	        	$("#programName").val($('#programName', $(data)).val());
	        	// $.getScript("javascript/blockControllerModule.js");
	        	// $.getScript("javascript/executionModule.js");
	        	// $.getScript("javascript/programmingInitializeModule.js");
	        	// $.getScript("https://code.jquery.com/jquery-1.11.1.min.js");
	        	// $.getScript("https://code.jquery.com/ui/1.11.2/jquery-ui.min.js");
	        	// $.getScript("http://code.jquery.com/jquery-migrate-1.2.1.min.js");
	        	alert($("#workspace", $(data)).html());
	        	reInitialize();
			}).fail(function( jqXHR, textStatus, errorThrown ) {
	        	alert("load fail");
		});
	}
	//新規保存メソッド
	function　newSave(){
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var work = getWorkspace();
    var url = "freeProg/prgTableInsert?prgName="+name+"&comment="+commnet+"&workSpaceData="+work;
    alert($("#load").val());
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("新規保存ok");
          $("#load").append($("<option>").val("999").text(name));
          $("select[id='load']").val("999");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("新規保存fail");
    });
  }
  //上書きメソッド
  function save(){
    var work =$("#workspace").html();
    var workIdSave = $("#load").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var url = 'freeProg/prgUpdate?prgId='+workIdSave+'&comment='+comment+'&workSpaceData='+work;

    $.ajax({
      url: url,
      type: 'POST',
		dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("上書き保存fail");
    });
  }
});