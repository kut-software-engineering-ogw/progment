var	dataStart = 0;
var	nameStart = 0;
var	commentStart = 0;
var	workIdStart = 0;

jQuery(function() {
	dataStart = getWorkspace();
	nameStart = $("#programName").val();
	commentStart = $("#comment").val();
	var workIdStartAboid = 0;
	// $("#load option[value='']").val("start");
	workIdStart = $("#load").val();
	$("#load").on('change', function() {
		workIdStartAboid = workIdStart;
		//alert($("#workspace").html());
		//workspaceが変更されているか判別
		if(dataStart != getWorkspace() || nameStart != $("#programName").val() || commentStart != $("#comment").val()){
//********************保存シークエンス開始*****************
			// alert("workspace判別");
			// var workId = $("#load").val();			
			if(workIdStart == ""){
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
						// swal("新規保存と読み込みが完了しました!!", "", "success");
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
								// swal("読み込みが完了しました!!", "", "success");
					    		loadWork();
					    		workIdStart = $("#load").val();
					    		return false;
							} else {
								swal("キャンセルしました", "", "error");
								$("select[id='load']").val(workIdStart);
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
					    		// swal("読み込みが完了しました!!", "", "success");
					    		loadWork();
					    		workIdStart = $("#load").val();
								return false;
							} else {
								swal("キャンセルしました", "", "error");
								$("select[id='load']").val(workIdStart);
								return false;
							}
						});
				  	}
				});
		    }
		    return false;
		}else if(workIdStart==""){
			loadWork();
			workIdStart = $("#load").val();
			// alert("4");
			return false;
		}else{
//****************保存シークエンスを飛ばした場合*****************
			// swal("読み込みが完了しました!!", "", "success");			
			loadWork();
			workIdStart = $("#load").val();
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
	        	// alert("load ok");
	        	// alert(data);
	        	// $("#wrap").html(data);
	        	// alert(work);
	        	var data = work.replace(/SEMICOLON/g, ";");
	        	$("#workspace").html($('#workspace', $(data)).html());
	        	$("#comment").val($('#comment', $(data)).val());
	        	$("#programName").val($('#programName', $(data)).val());
	        	$("#outputArea").val("");
	        	// alert($("#workspace", $(data)).html());
	        	swal("読み込みが完了しました!!", "", "success");
	        	reInitialize();
	        	dataStart = getWorkspace();
	        	nameStart = $("#programName").val();
				commentStart = $("#comment").val();
				workIdStart = $("#load").val();

			}).fail(function( jqXHR, textStatus, errorThrown ) {
				swal("読み込みに失敗しました", "", "error");
	        	// alert("load fail");
		});
	}
	//新規保存メソッド
	function　newSave(){
	    var name = $("#programName").val();
	    var comment = $("#comment").val();
	    var cookie  = $.cookie('user_id');
	    var work = getWorkspace();
	    var url = "freeProg/prgTableInsert?prgName="+name+"&comment="+commnet+"&workSpaceData="+work;
	    // alert($("#load").val());
	    $.ajax({
	      url: "freeProg/prgInsert",
	      type: 'POST',
	      dataType: 'html',
	      data: {
                "prgName": name,
                "comment": comment,
                "workSpaceData": work
            },
	      }).done(function( data, textStatus, jqXHR ) {
	        // alert("新規保存ok");
          var id = data.split(",");
          $("#load").append($("<option>").val(id[1]).text(name));
          $("select[id='load']").val(id[1]);
	        swal("新規保存が完了しました!!", "", "success");
	    }).fail(function( jqXHR, textStatus, errorThrown ) {
	    	swal("新規保存に失敗しました", "", "error");
	        // alert("新規保存fail");
	    });
  }
  //上書きメソッド
  function save(){
    var work = getWorkspace();
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var url = 'freeProg/prgUpdate?prgID='+workIdStartAboid+'&prgName='+name+'&comment='+comment+'&workSpaceData='+work;
    $.ajax({
      url: "freeProg/prgUpdate",
      type: 'POST',
	  dataType: 'html',
	  data: {
                "prgID" : workIdSave,
                "prgName": name,
                "comment": comment,
                "workSpaceData": work
            },
      }).done(function( data, textStatus, jqXHR ) {
      	swal("上書き保存が完了しました!!", "", "success");
        // alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
    	swal("上書き保存に失敗しました", "", "error");
        // alert("上書き保存fail");
    });
  }
});