jQuery(function() {
  $("#save").on("click", function() {
    var workId = $("#load").val();
    alert(workId);
    if(workId == ''){
      // 新規保存
      swal("新規保存が完了しました!!", "", "success");
      newSave();
    }else{
       //　上書き保存
      swal("上書き保存が完了しました!!", "", "success");
      save();
      alert("neet");
    }
  });
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
          $("select[id='load']").val("999");
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
    var work = getWorkSpace();
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
