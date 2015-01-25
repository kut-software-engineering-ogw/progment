//グローバル変数
codeStr="";
preamble="";
subroutine="";
varNum=0;
varNameTable={hoge:"foo"};
funNum=0;
functionNameTable={hoge:"foo"};
exeMode="nomal";
hogeNum=0;
blockNum=1;
delayTime=0;
funlib="";//"output=(function (str){oldtxt=$(\"#outputArea\").val();output=oldtxt+str+\"\\n\";$(\"#outputArea\").val(output);});";
stackNum=0;
generator=[];
result=undefined;
OutText="";


jQuery(document).ready(function(){
	console.log($(".inList.for").draggable('option',"cancel"));

	$("#saveButton").click(function () {
		result=getWorkspace();
	});

	//実行ボタンクリック時の動作
	$("#exeButton").click(function () {
		//exeMode=$("#exeMode").val();
		executionMain();
		if(exeMode=="trace"){
			$("#next").show();
			$("#exeButton").hide();
		}
		if(((programmingMode=="kadai")&&(exeMode=="nomal"))){
			result=$("#outputArea").val();
			answer=$("#answer").val();
			if(result==answer)
				outputTextArea("正解!!");
			else
				outputTextArea("不正解¡¡")
		}
	});

	//nextボタンクリック時の動作
	$("#next").click(function(){
		if(typeof result==="undefined"&&exeMode=="trace")
			console.log("トレース開始");
		else if(!(exeMode=="trace")||result.done==true)
			return;
		result=generator[stackNum].next();
		if(result.done==false){
			outputTextArea(result.value);
			return;
		}
		outputTextArea("ステップ実行を完了しました");
		for(var i=0;i<blockNum;i++){
			$("#blockNumber"+i).attr('id', '');
		}
		$("#next").hide();
		$("#exeButton").show();
	});
});

function getWorkspace () {
	$("#workspace input").each(function  () {
		//console.log("kore"+$(this).parent().html());
		var temp=$(this).parent().html();
		//temp="aaaa value konnichiwa";
		console.log(temp);
		// var start=temp.indexOf("value\"");
		// var end=temp.indexOf("\"",start+6);
		var re = new RegExp("value=\"(.*?)\"");
		temp=temp.replace(re,"value=\""+$(this).val()+"\"");
		console.log(temp);
		$(this).parent().html(temp);
	})
	console.log("保存します");
	console.log($("#workspace").html());
	temp=$("#workspace").html();
	temp=temp.replace(/;/g,"SEMICOLON");
	return temp;
}

function getResult () {
	executionMain();
	return $("#outputArea").val();
}

function outputTextArea(Str){
	oldtxt=$("#outputArea").val();
	output=oldtxt+Str+"\n";
	$("#outputArea").val(output);
}

var traceOutputTextArea = function* () {
	oldtxt=$("#outputArea").val();
	output=oldtxt+Sarg+"\n";
	$("#outputArea").val(output);
	stackNum--;
	yield "『"+Sarg+"』を出力しました";
}

function executionMain () {
	//初期化
	$("#outputArea").val("");
	codeStr="";
	preamble="";
	subroutine=funlib;
	varNum=0;
	funNum=0;
	blockNum=0;
	exeMode=$("#exeMode").val();
	//delayTime=0;
	for(var key in varNameTable)
		delete varNameTable[key];
	for(var key in functionNameTable)
		delete functionNameTable[key];
	//サブルーチン解析
	functionInterpret();
	//課題ルーチン解析
	if(programmingMode=="kadai")
		kadaiInterpret();
	//初期化終わり
	$("#mainList").children('.block').each(function () {
		codeStr+=interpret($(this));
	});
	//通常実行の場合の実行コード
	console.log(exeMode);
	if(exeMode=="nomal")
		codeStr="(function (){"+preamble+subroutine+codeStr+"})";
	//トレース実行の場合の実行コード
	else if(exeMode=="trace")
		codeStr="(function(){mainLine = function* (){"+preamble+subroutine+codeStr+"};})";
	else if(exeMode=="generate"){
		codeStr="function main(){\n"+preamble+codeStr+"}\n"+subroutine+"main();";
	}
	// oldtxt=$("#outputArea").val();
	// output=oldtxt+"出力";
	// $("#outputArea").val(output);
	console.log(codeStr);
	// debug.check(eval(codeStr+"()"));
	if(exeMode=="generate")
		outputTextArea(codeStr);
	else
		eval(codeStr+"()");
	if(exeMode=="trace"){
		result=undefined;
		generator=[];
		stackNum=0;
		outputTextArea("ステップ実行を開始します");
		generator[0]=mainLine();
	}
}

//サブルーチン解析メソッド
function functionInterpret () {
	$("#workspace .sub").each(function () {
		var funName=$(this).children(".functionName").val();
		//名前欄に名前がない場合の処理
		if(funName.length<=0){
			funName="fun"+funNum;
			$(this).children(".functionName").val(funName);
			funNum++;
		}
		//関数名の登録とid付与
		if(!(funName in functionNameTable)){
			functionNameTable[funName]=1;
			$(this).attr('id', funName);
			// alert(3);
		}else{
			//関数名が重複していた場合の処理
			var num=2;
			while(((funName+num) in functionNameTable))
				num++;
			funName=funName+num;
			functionNameTable[funName]=1;
			$(this).attr('id', funName);
			$(this).children(".functionName").val(funName);
		}
		//関数の解析処理
		var funStr="";
		$("#"+funName).children('.subList').children('.block').each(function (){
			funStr+=interpret($(this));
		});
		if(exeMode=="nomal")
			funStr=funName+"=(function (){"+funStr+"});";
		else if(exeMode="trace"){
			funStr=funName+" = (function* (){"+funStr+"stackNum--;yield \""+funName+"の処理を終了します\";});";
			// console.log("ふｎ");
		}
		else if(exeMode="generate"){
			funStr="function "+funName+"(){\n"+funStr+"}\n";
		}
		subroutine+=funStr;
	})
}

//課題ルーチン解析メソッド
function kadaiInterpret () {
		functionNameTable[funName]=1;
		var funStr="";
		$("#kadaiRoutine").children('.subList').children('.block').each(function (){
			funStr+=interpret($(this));
		});
		if(exeMode=="nomal")
			funStr="kadaiRoutine = (function (){"+funStr+"});";
		else if(exeMode=="trace")
			funStr="kadaiRoutine = (function* (){"+funStr+"stackNum--;yield \"課題ルーチンの処理を終了します\";});";
		else if(exeMode=="generate"){
			funStr="function kadaiRoutine(){\n"+funStr+"}\n";
		}
		subroutine+=funStr;
	// });
}


//処理ブロックレベルの解析メソッド
function interpret (obj) {
	// var classList=obj.get(0).className.split(" ");
	// var classNum=classList.length;
	var blockType=getBlockType(obj)
	var optionBefore="";
	var optionAfter="";
	if(exeMode=="trace"){
		obj.attr("id","blockNumber"+blockNum);
		optionBefore="$(\"#blockNumber"+blockNum+"\").addClass('exeBlock',1000, 'easeOutBounce');"
		//optionBefore="$(\"#blockNumber"+blockNum+"\").delay("+delayTime+").effect(\"highlight\",{ color: \"#ff5c5c\"},2500);";
		optionAfter+="$(\"#blockNumber"+blockNum+"\").removeClass('exeBlock',1000, 'easeOutBounce');";
		blockNum++;
		//delayTime+=2500;
	}
	// alert(classList[classNum-3]);
	switch(blockType){
		case "print":
			// alert(obj.html());
			return optionBefore+printCodeGenerate(obj)+optionAfter;
			break;
		case "assign":
			return optionBefore+assignCodeGenerate(obj)+optionAfter;
			break;
		case "for":
			return forCodeGenerate(obj);
			break;
		case "while":
			return whileCodeGenerate(obj);
			break;
		case "if":
			return ifCodeGenerate(obj);
			break;
		case "ifelse":
			return ifelseCodeGenerate(obj);
			break;
		case "subroutine":
			return optionBefore+subroutineCodeGenerate(obj)+optionAfter;
			break;
		default:
			console.log("default:"+blockType);
			return "";
			break;
	}
}
//データブロックレベルの解析メソッド群
function dataBlockInterpret (obj) {
	var dataStr="";
	if(obj.hasClass('intBlock')||obj.hasClass('mathBlock'))
		dataStr="("+intBlockInterpret(obj)+")";
	else if(obj.hasClass('charBlock')||obj.hasClass('strBlock'))
		dataStr=charBlockInterpret(obj);
	else if(obj.hasClass('boolBlock')||obj.hasClass('logicBlock'))
		dataStr="("+boolBlockInterpret(obj)+")";
	else
		dataStr="\"\"";
	return dataStr;
}

function intBlockInterpret (obj) {
	var intStr="";
	var op1="";
	var op2="";
	if(obj.hasClass('intBlock')){
		if(obj.hasClass('varBlock'))
			intStr=getVarName(obj);
		else
			intStr=String(obj.children('.intConstant').children('.constData').val());
	}else if(obj.hasClass('fourOp')){
		op1=intBlockInterpret(obj.children('.op1').children('.block'));
		op2=intBlockInterpret(obj.children('.op2').children('.block'));
		intStr=op1+obj.children('.fourOpSelect').children('.op').val()+op2;
	}else if(obj.hasClass('brackets')){
		intStr="("+intBlockInterpret(obj.children('.intArea').children('.block'))+")";
	}else{
		intStr="0";
	}
	return intStr;
}

function charBlockInterpret (obj) {
	var charStr="";
	var op1="";
	var op2="";
	if(obj.hasClass('charBlock')){
		if(obj.hasClass('varBlock'))
			charStr=getVarName(obj);
		else
			charStr="\""+obj.children('.charConstant').children('.constData').val()+"\"";
	}else if(obj.hasClass('intBlock')||obj.hasClass('mathBlock')){
		charStr="("+intBlockInterpret(obj)+")";
	}else if(obj.hasClass('concatOp')){
		op1=charBlockInterpret(obj.children('.op1').children('.block'));
		op2=charBlockInterpret(obj.children('.op2').children('.block'));
		charStr=op1+"+"+op2;
	}else{
		charStr="\"\"";
	}
	return charStr;
}

function boolBlockInterpret (obj) {
	var boolStr="";
	var op1="";
	var op2="";
	if(obj.hasClass('boolBlock')){
		if(obj.hasClass('varBlock'))
			boolStr=getVarName(obj);
		else
			boolStr=obj.children('.boolConstant').children('.constData').val();
	}else if(obj.hasClass('compOp')){
		op1=dataBlockInterpret(obj.children('.op1').children('.block'));
		op2=dataBlockInterpret(obj.children('.op2').children('.block'));
		boolStr=op1+obj.children('.compOpSelect').children('.op').val()+op2;
	}else if(obj.hasClass('logicOp')){
		op1=boolBlockInterpret(obj.children('.op1').children('.block'));
		op2=boolBlockInterpret(obj.children('.op2').children('.block'));
		switch (obj.children('.logicOpSelect').children('.op').val()){
			case "and":
				boolStr="("+op1+")&&("+op2+")";
				break;
			case "or":
				boolStr="("+op1+")||("+op2+")";
				break;
			case "not":
				boolStr="!("+op1+")";
				break;
			case "xor":
				boolStr="("+op1+")&&!("+op2+")||"+"!("+op1+")&&("+op2+")";
				break;
		}
		// alert("op1:"+op1);
		// alert("op2:"+op2);
		// alert("s:"+obj.html());
	}else{
		boolStr="true";
	}
	return boolStr;
}

//処理ブロックごとの解析メソッド群
function printCodeGenerate (obj) {
	var opstr=dataBlockInterpret(obj.children('.dataArea').children('.block'));
	var printCode="";
	// var printCode="";
	// printCode+="oldtxt=$(\"#outputArea\").val();output=oldtxt+"+opstr+"+\"\\n\";";
	// printCode+="$(\"#outputArea\").val(output);";
	if(exeMode=="nomal")
		printCode="outputTextArea("+opstr+");";
	else if(exeMode=="trace"){
		printCode="stackNum++;Sarg="+opstr+";generator[stackNum]=traceOutputTextArea();yield \"出力処理を行います\";"
	}
	else if(exeMode=="generate"){
		printCode="alert("+opstr+");\n";
	}
	return printCode;
}

function assignCodeGenerate (obj) {
	var varName="";
	var op1="";
	var assignCode="";
	if(exeMode!="generate"){
		varName=getVarName(obj.children('.varArea').children('.varBlock'));
		op1=dataBlockInterpret(obj.children('.dataArea').children('.block'));
		assignCode=varName+"="+op1+";";
		if(exeMode=="trace"){
			assignCode+="yield \""+varName+"=\"+"+varName+";";
		}
	}
	else if(exeMode=="generate"){
		assignCode=varName+"="+op1+";\n";
	}
	// alert(assignCode);
	return assignCode;
}

function forCodeGenerate (obj) {
	var loopTimes=obj.children('.times').val();
	var forCode="";
	forCode+="for(var hoge"+(hogeNum)+"=0;hoge"+(hogeNum)+"<"+loopTimes+";hoge"+(hogeNum++)+"++){";
	obj.children('.nestArea').children('.block').each(function () {
		forCode+=interpret($(this));
	});
	forCode+="}";
	return forCode;
}

function whileCodeGenerate (obj) {
	var loopCondition=boolBlockInterpret(obj.children('.boolArea').children('.block'));
	var whileCode="";
	whileCode+="while("+loopCondition+"){";
	obj.children('.nestArea').children('.block').each(function () {
		interpret($(this));
	});
	whileCode+="}";
	return whileCode;
}

function ifCodeGenerate (obj) {
	var ifCondition=boolBlockInterpret(obj.children('.boolArea').children('.block'));
	ifCode="";
	ifCode+="if("+ifCondition+"){";
	obj.children('.nestArea').children('.block').each(function () {
		ifCode+=interpret($(this));
	});
	ifCode+="}";
	return ifCode;
}

function ifelseCodeGenerate (obj) {
	var ifCondition=boolBlockInterpret(obj.children('.boolArea').children('.block'));
	ifelseCode="";
	ifelseCode+="if("+ifCondition+"){";
	obj.children('.iftrue').children('.block').each(function () {
		ifelseCode+=interpret($(this));
	});
	ifelseCode+="}else{";
	obj.children('.iffalse').children('.block').each(function () {
		ifelseCode=interpret($(this));
	});
	ifelseCode+="}";
	return ifelseCode;
}

function subroutineCodeGenerate (obj) {
	var funName=obj.children('.functionName').val();
	var funStr="";
	if(funName.length<=0||!(funName in functionNameTable))
		funStr="oldtxt=$(\"#outputArea\").val();output=oldtxt+\"サブルーチン名『"+funName+"』の呼び出しに失敗しました．\"+\"\\n\";$(\"#outputArea\").val(output);";
	else if(exeMode=="nomal")
		funStr=funName+"();";
	else if(exeMode=="trace")
		funStr="stackNum++;generator[stackNum]="+funName+"();yield \"サブルーチン"+funName+"を呼び出します.\";"
	else if(exeMode=="generate"){
		funStr=funName+"();";
	}
	return funStr;
}

//変数名管理メソッド
function getVarName (obj) {
	var varName="";
	if (obj.hasClass('intBlock'))
		varName="INT";
	else if(obj.hasClass('charBlock'))
		varName="CHAR";
	else if(obj.hasClass('boolBlock'))
		varName="BOOL";
	else
		varName="UNKNOWN";
	if(obj.children('.varName').val().length>0)
		varName+=obj.children('.varName').val();
	else{
		varName+="item"+String(varNum);
		obj.children('.varName').val("item"+String(varNum))
		varNum++;
	}
	if(!(varName in varNameTable)){
		preamble+=varName;
		if(obj.hasClass('intBlock'))
			preamble+="=0;";
		else if(obj.hasClass('charBlock'))
			preamble+="=\"\";";
		else if(obj.hasClass('boolBlock'))
			preamble+="=true;";
		varNameTable[varName]=1;
	}
	return varName;
}