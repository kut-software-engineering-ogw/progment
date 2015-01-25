var	dataStart = 0;
var	nameStart = 0;
var	commentStart = 0;
var	workIdStart = 0;

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
	        	$("#outputArea").val("");
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
});