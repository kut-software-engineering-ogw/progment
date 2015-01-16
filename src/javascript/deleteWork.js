jQuery(function() {
  $("#delete").change(function() {
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
    var workId  = $("#delete").val();
    var cookie  = $.cookie('user_id');
    $.ajax({
      url: 'free.html',
      type: 'POST',
      data: {
          work_id: workId,
          cookie: cookie
      },
      dataType: 'text'
      }).done(function( data, textStatus, jqXHR ) {
          alert("ok");
    }).fail(function( jqXHR, textStatus, errorThrown ) {
          alert("fail");
    });
  }
});