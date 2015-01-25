var links = [{label: "Free<br/>フリープログラミング", bg: '#FFBF7F'},  //orange
             {label: "Programming theme<br/>プログラミング課題", bg: '#BBFF99'}, //green
             {label: "Account management<br/>アカウント管理", bg: '#FFB2FF'}, //pink
	     {label: 'Edit theme<br/>課題編集', bg: '#99CCFF'}  //blue
	    ];

//ページ移動した後に戻ってくるとレイアウトが崩れるなり
var windowHeight = window.innerHeight;
if(windowHeight === 0) windowHeight = 238;
var radius = windowHeight*0.52,
circle = document.createElement('div'),
//borderSize = radius*0.021;
borderSize = radius*0.03;
totalArea = 44, 
increment = totalArea/(links.length-1),
startPoint = 0-(totalArea/2),
fontSize = radius*0.06,
linkSize = radius*0.07;

styleCircle();
addCircle();
addLinks();
styleLinks();

function styleCircle() {
    circle.style.border= borderSize+'px solid #000';
    circle.style.width = radius*2+'px';
    circle.style.height = radius*2.0+'px';
    circle.style.borderRadius = radius+'px';
    circle.style.position = 'absolute';
    circle.style.top = '-'+radius*0.2+'px';
    circle.style.left = radius*-1+'px';

}

function addCircle() {
    document.body.appendChild(circle);
}

function addLinks() {
    for (var i=0, l=links.length; i<l; i++) {
	link = document.createElement('a'),
	hover = document.createElement('span');
	if(i == 0) link.href = "http://google.com";
	if(i == 1) link.href = "http://yahoo.co.jp";
	if(i == 2) link.href = "http://supersonico.jp/";
	if(i == 3) link.href = "http://www.kawasaki-motors.com/mc/";
	link.dataset.color = links[i].bg;
	link.style.display = 'inline-block';
	link.style.textDecoration = 'none';
	link.style.color = '#000';
	link.style.position = 'absolute';
	link.style.zIndex = 100;
	link.innerHTML = links[i].label;
	link.style.fontSize = 5;
	hover.style.position = 'absolute';
	hover.style.display = 'inline-block';
	hover.style.zIndex = 50;
	hover.style.opacity = 0;
	document.body.appendChild(link);
	document.body.appendChild(hover);
	link.addEventListener('mouseover', linkOver);
	link.addEventListener('mouseout', linkOut);
	links[i].elem = link;
	links[i].hover = hover;
    }
}

function styleLinks() {
    for (var i=0, l=links.length; i<l; i++) {
	var link = links[i].elem, hover = links[i].hover, deg = startPoint+(i*increment);  
	link.style.paddingLeft = radius*1.2+'px';
	link.style.fontSize = fontSize+'px';
	link.style.height = linkSize+'px';
	link.style.lineHeight = linkSize+'px';
	setTransformOrigin(link, '0px '+linkSize*0.5+'px');
	setTransition(link, 'all 0.4s ease-out');
	setTransform(link, 'rotate('+deg+'deg)');
	link.style.left = borderSize+'px';
	link.style.top = (windowHeight/2) - (windowHeight*0.1)+borderSize+'px';
	hover.style.left = borderSize+'px';
	setTransformOrigin(hover, '0px '+linkSize*0.5+'px');
	setTransition(hover, 'all 0.2s ease-out');
	setTransform(hover, 'rotate('+deg+'deg)');
	hover.style.top = (windowHeight*0.4)+borderSize +'px';
	hover.style.width = radius+(borderSize/2)+'px';
	hover.style.height = linkSize+'px';
	hover.style.borderRight = borderSize*2+'px solid #000';
    }
}

window.onresize = function() {
    windowHeight = window.innerHeight;
    radius = windowHeight*0.6,
    borderSize = radius*0.021;  
    fontSize = radius*0.12,
    linkSize = radius*0.25;
    styleCircle();
    styleLinks();
}

function linkOver(e) {
    var thisLink = e.target;
    thisHover = thisLink.nextSibling;
    thisLink.style.paddingLeft = radius*1.25+'px';
    thisHover.style.opacity = 1;
    document.body.style.backgroundColor = thisLink.dataset.color;
    document.all.item('freeText').style.visibility='visible';
    //	if(i == 0) document.write("aiueo1;")
    //	if(i == 1) document.write("aiueo2;")
    //	if(i == 2) document.write("aiueo3;")
    //	if(i == 3) document.write("aiueo4;")
}

function linkOut(e) {
    var thisLink = e.target, thisHover = thisLink.nextSibling;
    thisLink.style.paddingLeft = radius*1.2+'px';
    thisHover.style.opacity = 0;
    document.all.item('freeText').style.visibility='hidden';
    document.body.style.backgroundColor = '#D0F1F4';
}

function setTransform(element, string) {
    element.style.webkitTransform = string;
    element.style.MozTransform = string;
    element.style.msTransform = string;
    element.style.OTransform = string;
    element.style.transform = string;
}

function setTransformOrigin(element, string) {
    element.style.webkitTransformOrigin = string;
    element.style.MozTransformOrigin = string;
    element.style.msTransformOrigin = string;
    element.style.OTransformOrigin = string;
    element.style.transformOrigin = string;
}

function setTransition(element, string) {
    element.style.webkitTransition = string;
    element.style.MozTransition = string;
    element.style.msTransition = string;
    element.style.OTransition = string;
    element.style.transition = string;
}

