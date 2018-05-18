var storenum=new Array();
var currentNum=1;

$(function () {
    getRect();
})

function getRect(){
    var width=50;
    var height=50;
    var rectnum=15;
    if($(".rectOne").length==0)  {
        for (var i = 0; i < rectnum; i++) {
            printRect(i,200 + i * width,100,width,height,i,d3.easeElastic);
        }
        for (var i = 0; i < rectnum; i++) {
            printRect(i+rectnum,200 + i * width,160,width,height,i,d3.easeElastic);
        }
    }
};

function input(){
    var input=$(".text-input").val();
    if(storenum.length<30&&input!="") {
        var current=printWord(input,110,60,"sans-serif","15",0,d3.easeElastic);
        if(storenum.length<15){
            current.transition().duration(2000/anSpeed)
                .ease(d3.easeElastic)
                .attr("x",210+storenum.length*50).attr("y",130);
        }else {
            current.transition().duration(2000/anSpeed)
                .ease(d3.easeElastic)
                .attr("x",210+(storenum.length-15)*50).attr("y",190);
        }
        if(storenum.length>0)
        {
            changeStroke(storenum.length-1,"black",1);
            changeStroke(storenum.length,"#d00355",5);
        }else if(storenum.length==0){
            changeStroke(storenum.length,"#d00355",5);
        }

        storenum.push(input);
    }
};

function pop(){
    var object=d3.select("#id"+currentNum).transition()
        .duration(2000/anSpeed)
        .ease(d3.easeBounce)
        .attr("y", 0);
    object.remove();
    currentNum--;
    storenum.pop();
    if(storenum.length==0)
    {
        changeStroke(storenum.length,"black",1);
    }else {
        changeStroke(storenum.length,"black",1);
        changeStroke(storenum.length-1,"#d00355",5);
    }
};

function clean(){
    changeStroke(currentNum-2,"black","1");
    for(var i=currentNum;i>1;i--) {
        d3.select("#id"+currentNum).transition().duration(2000/anSpeed).ease(d3.easeBounce).attr("y", Math.floor(Math.random() * 500)).attr("x", Math.floor(Math.random() * 1000)).attr("font-size", 0)
             .transition()
             .duration(2000/anSpeed)
             .ease(d3.easeCircle)
             .attr("opacity",0);
         currentNum--;
    }

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
    currentNum++;
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