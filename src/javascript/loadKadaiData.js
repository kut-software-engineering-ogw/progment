jQuery(function() {
	$("#load").on('change', function() {
		loadKadaiWork();
	});
}

	//作業データ読み込みメソッド
	function loadKadaiWork(){
	    var workIdLoad = $("#load").val();
	    var url = "expProg?prgId="+workIdLoad;
	    $.ajax({
	    	url: url,
	    	type: 'GET',
	    	cache: false,
	    	dataType: 'html',
	    	}).done(function( work, textStatus, jqXHR ) {
	        	var data = work.replace(/SEMICOLON/g, ";");
	        	$("#workspace").html($('#workspace', $(data)).html());
	        	$("#comment").val($('#comment', $(data)).val());
	        	$("#programName").val($('#programName', $(data)).val());
	        	$("#limitList").val($('#limitList', $(data)).val());
	        	$("#answer").val($('#answer', $(data)).val());
	        	$("#outputArea").val("");
	        	swal("読み込みが完了しました!!", "", "success");
	        	reInitialize();
			}).fail(function( jqXHR, textStatus, errorThrown ) {
				swal("読み込みに失敗しました", "", "error");
	        	// alert("load fail");
		});
	}
});