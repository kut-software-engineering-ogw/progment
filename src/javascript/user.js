
var array = ["3年", "A", "12", "testA", 
                 "2年", "C", "15", "testB",
                 	"1年", "B", "25", "testC",
                 		"1年", "F", "9", "testD"];
function tablecleate(){


    var i, j, k;
    k = 0;
    for (j = 0; j < array.length;) {
      document.write("<tr class = 'r_");
      document.write(k);
      document.write("' >")
      for(i=0;i< 4; i++, j++) {
      if (i == 0){
      	//学年の項
      	document.write("<td class='d_year'>");
      	document.write("<input type='text' name='usrYear_[");
      	document.write(k);
      	document.write("]' value='");
      	document.write(array[j]);
      	document.write("'></td>");
      }
      
      if (i == 1){
      	//クラスの項
      	document.write("<td class='d_class'>");
      	document.write("<input type='text' name='usrClass_[");
      	document.write(k);
      	document.write("]' value='");
      	document.write(array[j]);
      	document.write("'></td>");
      }
      
      if (i == 2){
      	//番号の項
      	document.write("<td class='d_number'>");
      	document.write("<input type='text' name='usrNumber_[");
      	document.write(k);
      	document.write("]' value='");
      	document.write(array[j]);
      	document.write("'></td>");
      }
      
      if (i == 3){
      	//アカウント情報の項
      	document.write("<td class='d_account'>");
      	document.write("<input type='text'  size='47' name='usrAccount_[");
      	document.write(k);
      	document.write("]' value='");
      	document.write(array[j]);
      	document.write("'></td>");
      	
      	//削除ボタンについての記述
      	document.write("<td class='d_dbutton'>");
      	document.write("<button type='button' name='user_id__[");
      	document.write(k);
      	document.write("]' value=''>削除</button></td>");
      	
      	//以下識別のための、ページ上では見えない要素についての処理
 		document.write("<td>");
      	document.write("<input class='d_action' type='hidden' name='action_[");
      	document.write(k);
      	document.write("]' value=0>");
      	document.write("</td>");
    	
      }
	k++;
      }
    document.write("</tr>");
    }
}

function del(e){
  	$(e.target).closest("tr").toggle();
  	}
  	
  	
 jQuery(document).ready(function(){
  	$("#addButton").live("click", function(){$("#infoTable").append("<tbody id='infoTable'><tr><td class='d_year'><input type='text' name='usrYear' value=''></td><td class='d_class'><input type='text' name='usrClass' value=''></td><td class='d_number'><input type='text' name='usrNumber' value=''></td><td class='d_account'><input type='text' size='47' name='usrAccount' value=''></td><td class='d_dbutton'><button type='button' name='user_id' value='2'>削除</button></td><td><input class='d_action' type='hidden' name='action' 'value='1'></td></tr></tbody>");}
	)});
	
	
	
//jQuery(document).ready(function(){
//$("#addButton").click(function(){function{$("td").append("<td class='d_year'><input type='text' name='usrYear' value='1'></td><td class='d_class'><input type='text' name='usrClass' value='1'></td><td class='d_number'><input type='text' name='usrNumber' value='1'></td><td class='d-account'><input type='text' size='47' name='usrAccount' value='1'></td><td class='d-dbutton'><button type='button' name='user_id' value='2'>削除</button></td><td><input class='d_action' type='hidden' name='action' 'value='1'></td>");}
//	});

//jQuery(document).ready(function(){
//	$("#addButton").click(function(){
//		var temp=$("#infoTable").children("tr").html();
//		console.log(temp);
//	});
//});