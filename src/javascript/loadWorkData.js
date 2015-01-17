jQuery(function() {
	var dataStart = $("#workspace").html();
	$("#load").change(function() {
		//alert($("#workspace").html());
		//workspaceが変更されているか判別
		if(dataStart != $("#workspace").html()){
//********************保存シークエンス開始*****************
			// alert("workspace判別");
			var workId = $("#load").val();			
			if(workId == ''){
//********************************************* 新規保存
			//新規保存をするかどうかを問うアラート
		    swal({
				  title: "新規保存を行いますか?",
				  text: "新規保存を行ったあと，読み込みを行います",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  cancelButtonText: "No, cancel plx!",
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
						confirmButtonText: "Yes, delete it!",
						cancelButtonText: "No, cancel plx!",
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
				  confirmButtonText: "Yes, delete it!",
				  cancelButtonText: "No, cancel plx!",
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
						confirmButtonText: "Yes, delete it!",
						cancelButtonText: "No, cancel plx!",
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
	    $.ajax({
	    	url: 'free4.html',
	    	type: 'GET',
	    	cache: false,
	    	data: {
	           cookie: cookie,
	           work_id: workIdLoad
	    	},
	    	dataType: 'html',
	    	}).done(function( data, textStatus, jqXHR ) {
	        	alert("load ok");
	        	// alert(workIdLoad);
	        	// alert(data);
	        	$("#wrap").html(data);
			}).fail(function( jqXHR, textStatus, errorThrown ) {
	        	alert("load fail");
		});
	}
	//新規保存メソッド
	function　newSave(){
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var data = $("workspace").val();
    $.ajax({
      url: 'free.html',
      type: 'POST',
      cache: false,
      data: {
         data: work,
         name: name,
         comment: comment,
         cookie: cookie
      },
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("新規保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("新規保存fail");
    });
  }
  //上書きメソッド
  function save(){
    var workIdSave = $("#load").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    $.ajax({
      url: 'free6666.html',
      type: 'POST',
      cache: false,
      data: {
         data: work,
         comment: comment,
         workId: workIdSave,
         cookie: cookie
      },
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("上書き保存fail");
    });
  }
});