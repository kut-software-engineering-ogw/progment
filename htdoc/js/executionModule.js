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

jQuery(document).ready(function(){
	$("#saveButton").click(function () {
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
	});

	//main関数
	$("#exeButton").click(function () {
		executionMain();
		if($("#programmingMode").val()=="kadai"){
			result=$("#outputArea").val();
			answer=$("#answer").val();
			if(result==answer)
				outputTextArea("正解!!");
			else
				outputTextArea("不正解¡¡")
		}
	});

	$("#Test").click(function () {
		executionMain();
		return $("#outputArea").val();
	})
});

function outputTextArea(Str){
	oldtxt=$("#outputArea").val();
	output=oldtxt+Str+"\n";
	$("#outputArea").val(output);
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
	delayTime=0;
	for(var key in varNameTable)
		delete varNameTable[key];
	for(var key in functionNameTable)
		delete functionNameTable[key];
	//サブルーチン解析
	functionInterpret();
	//初期化終わり
	$("#mainList").children('.block').each(function () {
		codeStr+=interpret($(this));
	});
	codeStr="(function (){"+preamble+subroutine+codeStr+"})";
	// oldtxt=$("#outputArea").val();
	// output=oldtxt+"出力";
	// $("#outputArea").val(output);
	console.log(codeStr);
	// debug.check(eval(codeStr+"()"));
	eval(codeStr+"()");
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
			alert(3);
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
		funStr=funName+"=(function (){"+funStr+"});";
		subroutine+=funStr;
	})
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
		// optionBefore="$(\"#blockNumber"+blockNum+"\").addClass('exeBlock');"
		optionBefore="$(\"#blockNumber"+blockNum+"\").delay("+delayTime+").effect(\"highlight\",{ color: \"#ff5c5c\"},2500);";
		// optionAfter+="$(\"#blockNumber"+blockNum+"\").removeClass('exeBlock');";
		blockNum++;
		delayTime+=2500;
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
			return subroutineCodeGenerate(obj);
			break;
		default:
			alert("default:"+blockType);
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
			intStr=String(obj.children('.constData').val());
	}else if(obj.hasClass('fourOp')){
		op1=intBlockInterpret(obj.children('.op1').children('.block'));
		op2=intBlockInterpret(obj.children('.op2').children('.block'));
		intStr=op1+obj.children('.op').val()+op2;
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
			charStr="\""+obj.children('.constData').val()+"\"";
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
			boolStr=obj.children('.constData').val();
	}else if(obj.hasClass('compOp')){
		op1=dataBlockInterpret(obj.children('.op1').children('.block'));
		op2=dataBlockInterpret(obj.children('.op2').children('.block'));
		boolStr=op1+obj.children('.op').val()+op2;
	}else if(obj.hasClass('logicOp')){
		op1=boolBlockInterpret(obj.children('.op1').children('.block'));
		op2=boolBlockInterpret(obj.children('.op2').children('.block'));
		switch (obj.children('.op').val()){
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
	var printCode="outputTextArea("+opstr+");";
	// var printCode="";
	// printCode+="oldtxt=$(\"#outputArea\").val();output=oldtxt+"+opstr+"+\"\\n\";";
	// printCode+="$(\"#outputArea\").val(output);";
		return printCode+"";
	if(exeMode=="trace")
	return printCode;
}

function assignCodeGenerate (obj) {
	var varName="";
	var op1="";
	var assignCode="";
	varName=obj.children('.varArea').children('.varBlock').children('.varName').val();
	op1=dataBlockInterpret(obj.children('.dataArea').children('.block'));
	assignCode=varName+"="+op1+";";
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
	else
		funStr=funName+"();";
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