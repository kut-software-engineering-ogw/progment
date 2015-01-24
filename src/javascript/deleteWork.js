jQuery(function() {
  var dataStart = getWorkspace();
  $("#delete").on("click", function() {
    //削除をするかどうかを問うアラートの表示
    swal({
          title: "選択したデータの削除を行いますか?",
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
            swal("削除が完了しました!!", "", "success");
            deleteWork();
            return false;
            } else {
              return false;
            }
        });
  });
  //読み込んでいるデータの削除を行うメソッド
  function deleteWork(){
    var workId  = $("#load").val();
    var cookie  = $.cookie('user_id');
    var url ="freeProg/prgDelete?prgID="+workId;
    alert(workId);
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'html'
      }).done(function( data, textStatus, jqXHR ) {
          alert("ok");
          alert(data);
          $("select[id='load']").val("");
          $("#load option[value='"+workId+"']").remove();
          $("#workspace").html(dataStart);
          $("#comment").val("");
          $("#programName").val("");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("fail");
    });
  }
});