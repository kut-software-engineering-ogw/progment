jQuery(function() {
	var dataStart = getWorkspace();
	var nameStart = $("#programName").val();
    var commentStart = $("#comment").val();
  	$("#newData").on("click", function() {
		swal({
	      title: "新規作成を行いますか?",
	      // text: "新規保存を行ったあと，読み込みを行います",
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
	        swal("新規作成を行いました!!", "", "success");
	        newData();
	        return false;
	       } else {
	       	 swal("キャンセルしました", "", "error");
	         return false;
	       }
	    });
  	});

	function newData(){
		$("select[id='load']").val("");
		$("#comment").val("");
	    $("#programName").val("");
	  	$("#workspace").html(dataStart);
	  	reInitialize();
	}
});