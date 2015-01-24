jQuery(function() {
	var dataStart = getWorkspace();
	var nameStart = $("#programName").val();
    var commentStart = $("#comment").val();
  	$("#newData").on("click", function() {
  		alert("hage")
	  	if(dataStart!=getWorkspace() && nameStart!=$("#programName").val() && commentStart!=$("#comment").val()) {
	  		swal("新規作成を行いました!!", "OK", "success");
	  		newData();
	  	} else {
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
							newData();
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
						    		newData();
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
							newData();
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
						    		newData();
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
	  	}
  	});

	function newData(){
		$("#comment").html("");
	    $("#programName").val("");
	  	$("#workspace").html(dataStart);
	}
	  //新規保存メソッド
  function newSave(){
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var work = getWorkspace();
    var cookie = $.cookie('user_id');
    var url = 'freeProg/prgInsert?prgName='+name+'&comment='+comment+'&workSpaceData='+work;
    
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("新規保存ok");
          $("#load").append($("<option>").val("999").text(name));
	  alert(data);
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("新規保存fail");
    });
  }
  //上書きメソッド
  function save(){
    var workIdSave = $("#load").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var work =$("#workspace").html();
    var url = 'freeProg/prgUpdate?prgID='+workIdSave+'&comment='+comment+'&workSpaceData='+work;
    alert(comment);
    $.ajax({
      url: url,
      type: 'POST',
		// data: {
		//  workSpaceData: work,
		//   comment: comment,
		//  prgId: workIdSave,
		// },
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("上書き保存fail");
    });
  }
});