jQuery(function() {
  // dataStart = getWorkspace();
  // nameStart = $("#programName").val();
  // commentStart = $("#comment").val();
  $("#save").on("click", function() {
    var workId = $("#load").val();
    if(workId == ''){
      // 新規保存
      newSave();
    }else{
       //　上書き保存
      save();
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
      url: "freeProg/prgInsert",
      type: 'POST',
      dataType: 'html',
      data: {
                "prgName": name,
                "comment": comment,
                "workSpaceData": work
            },
      }).done(function( data, textStatus, jqXHR ) {
          swal("新規保存が完了しました!!", "", "success");
          // alert("新規保存ok");
          var id = data.split(",");
          $("#load").append($("<option>").val(id[1]).text(name));
          $("select[id='load']").val(id[1]);
          workIdStart = $("#load").val();
          nameStart = $("#programName").val();
          commentStart = $("#comment").val();
          dataStart = getWorkspace();
	       // alert(data);
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          swal("新規保存に失敗しました", "", "error");
          // alert("新規保存fail");
    });
  }
  //上書きメソッド
  function save(){
    var workIdSave = $("#load").val();
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var work = getWorkspace();
    var url = 'freeProg/prgUpdate?prgID='+workIdSave+'&prgName='+name+'&comment='+comment+'&workSpaceData='+work;
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
          swal("上書き保存が完了しました!!", "", "success");
          dataStart = getWorkspace();
          nameStart = $("#programName").val();
          commentStart = $("#comment").val();
          // alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          swal("上書き保存に失敗しました", "", "error");
          // alert("上書き保存fail");
    });
  }
});
