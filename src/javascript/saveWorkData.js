jQuery(function() {
  $("#save").on("click", function() {
    var workId = $("#load").val();
    if(workId == ''){
      // 新規保存
      swal("新規保存が完了しました!!", "", "success");
      newSave();
    }else{
       //　上書き保存
      swal("上書き保存が完了しました!!", "", "success");
      save();
    }
  });
  //新規保存メソッド
  function　newSave(){
    var name = $("#programName").val();
    var comment = $("#comment").val();
    var cookie  = $.cookie('user_id');
    var data = $("workspace").val();
    $.ajax({
      url: 'free.html',
      type: 'POST',
      data: {
         data: work,
         name: name,
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
      data: {
         data: work,
         comment: comment,
         workId: workIdSave,
         cookie: cookie,
      },
      dataType: 'html',
      }).done(function( data, textStatus, jqXHR ) {
          alert("上書き保存ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("上書き保存fail");
    });
  }
});
