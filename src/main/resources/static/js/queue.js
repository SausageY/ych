var storenum=new Array();
var currentNum=0;
var qtop=0;

$(function () {
    getRect();
})

function getRect(){
    var width=50;
    var height=50;
    var rectnum=15;
    if($(".rectOne").length==0)  {
        for (var i = 0; i < rectnum; i++) {
            printRect(i,200 + i * (width+1),100,width,height,i,d3.easeElastic);
        }
        printRect(rectnum,914,151,width,height,i,d3.easeElastic);
        for (var i = 0; i < rectnum; i++) {
            printRect(i+rectnum+1,914-i*(width+1),202,width,height,i,d3.easeElastic);
        }
        printRect(rectnum*2+1,200,151,width,height,i,d3.easeElastic);
    }
};

function input(){
    var input=$(".text-input").val();
    if(storenum.length<32&&input!="") {
        var current = printWord(input, 110, 60, "sans-serif", "15", 0, d3.easeElastic);
        var x=$("#rect"+currentNum).attr("x");
        var y=$("#rect"+currentNum).attr("y");
        current.transition().duration(2000/anSpeed)
            .ease(d3.easeElastic)
            .attr("x",parseInt(x)+10).attr("y",parseInt(y)+30);
        if (storenum.length > 1) {
            var a;
            if((currentNum-1)<0){
                a=currentNum-1+32;
            }else {
                a=currentNum-1;
            }
            changeStroke(a, "black", 1);
            changeStroke(currentNum, "#1d1bd0", 10);
        } else if(storenum.length == 1){
            changeStroke(qtop, "#d00355", 10);
            changeStroke(currentNum, "#1d1bd0", 10);
        }else if (storenum.length == 0) {
            changeStroke(currentNum, "#d0d01f", 10);
        }
        storenum.push(input);
        currentNum=(currentNum+1)%32;
    }
};

function pop(){
    var object=d3.select("#id"+qtop).transition()
        .duration(2000/anSpeed)
        .ease(d3.easeBounce)
        .attr("y", 0);
    object.remove();
    storenum.splice(0,1);
    if(storenum.length==0)
    {
        changeStroke(qtop,"black",1);
        qtop=0;
    }else if(storenum.length==1){
        changeStroke(qtop,"black",1);
        qtop=(qtop+1)%32;
        changeStroke(qtop,"#d0d01f",10);
    }else {
        changeStroke(qtop,"black",1);
        qtop=(qtop+1)%32;
        changeStroke(qtop,"#d00355",10);
    }
};

function clean(){
    $("#rect"+qtop).attr("stroke", "black").attr("stroke-width",1);
    var a;
    if((currentNum-1)<0){
        a=currentNum-1+32;
    }else {
        a=currentNum-1;
    }
    $("#rect"+a).attr("stroke", "black").attr("stroke-width",1);
    for(var i=0;i<32;i++) {
        d3.select("#id"+i).transition().duration(2000/anSpeed).ease(d3.easeBounce).attr("y", Math.floor(Math.random() * 500)).attr("x", Math.floor(Math.random() * 1000)).attr("font-size", 0)
            .transition()
            .duration(2000/anSpeed)
            .ease(d3.easeCircle)
            .attr("opacity",0);
    }
    currentNum=0;
    qtop=0;
    setTimeout(function(){
        d3.selectAll("text").remove();
        storenum.splice(0,storenum.length);
    },2000/anSpeed);

};



function printRect(id,x,y,width,height,delay,animation) {
    var svg=d3.select("#canvas");
    svg.append("rect").attr("x", x).attr("y", y).attr("width", 0).attr("id","rect"+id)
        .attr("height", height).attr("fill", "white").attr("stroke-width", 1).attr("stroke", "black")
        .attr("class", "rectOne").transition()
        .delay(function (d, i) {
            return delay * 200/anSpeed;
        }).duration(2000/anSpeed)
        .ease(animation)
        .attr("width", width);
};

function printWord(text,x,y,family,size,delay,animation) {
    var svg=d3.select("#canvas");
    return svg.append("text").attr("class","myText").attr("x",x).attr("y",0).text(text)
        .attr("font-family",family).attr("font-size",size).attr("id","id"+currentNum).transition()
        .delay(delay * 200/anSpeed).duration(2000/anSpeed)
        .ease(animation)
        .attr("y", y);
};

function changeStroke(id,color,width) {
    d3.select("#rect"+id).transition()
        .duration(2000/anSpeed)
        .ease(d3.easeElastic)
        .attr("stroke", color).attr("stroke-width",width);
}