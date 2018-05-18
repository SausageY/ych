var mode=1;
var numArray=new Array();
var interyal;
var time=-1;
$(function init() {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","reslut").attr("opacity",1);
    g.append("text").attr("x",500).attr("y",50).attr("class","code v").text("reslut=").attr("opacity",0);
    g.append("text").attr("x",540).attr("y",50).attr("id","reslutText").attr("class","code").attr("opacity",0);
    printSmallRect();
})

function cancleEvent(delay) {
    if(interyal!=null)
    {
        clearInterval(interyal);
    }
    if(time<0) {
        time = delay / anSpeed;
        $("#inputButton").attr("onclick","").text(parseInt(time));
        $("#popButton").attr("onclick","").text(parseInt(time));
        $("#cleanButton").attr("onclick","").text(parseInt(time));
    }
    interyal= setInterval(function () {
        $("#inputButton").attr("onclick","").text(parseInt(time));
        $("#popButton").attr("onclick","").text(parseInt(time));
        $("#cleanButton").attr("onclick","").text(parseInt(time));
        if(time<0)
        {
            $("#inputButton").attr("onclick","liner()").text("Linear Search");
            $("#popButton").attr("onclick","binary()").text("Binary Search");
            $("#cleanButton").attr("onclick","size()").text("Change Size");
        }
        time-=0.5;
    },500);
}

function liner() {
    var searchval=$(".text-input").val();
    var delay=0;
    var index=0;
    var len;
    $("#inputButton").attr("onclick","").text("计算中...");
    $("#popButton").attr("onclick","").text("计算中...");
    $("#cleanButton").attr("onclick","").text("计算中...");
    if(d3.selectAll(".code").attr("opacity")=="1")
    {
        d3.selectAll(".code").attr("opacity",0);
        d3.select("#gib").remove();
    }
    if($("#gil").length<=0)
    {
        instructionLinear();
    }
    d3.select(".v").attr("opacity",1);
    d3.selectAll(".linear").attr("opacity",1);
        changeTextColor("code1",(delay++)*1000,1000);
        changeGraphStroke("rect0","#d0d01f",delay*1000,5,1000);
        changeTextColor("code2",(delay++)*1000,1000);
    if(mode==1)
    {
        len=30;
    }else {
        len=150;
    }
    while(index<len&&numArray[index]<searchval) {
        changeGraphStroke("rect"+index,"#d00355",delay*1000,5,1000);
        changeTextColor("code3", (delay++) * 1000, 1000);
        index++;
        changeGraphStroke("rect"+index,"#d0d01f",delay*1000,5,1000);
        changeTextColor("code4", (delay++) * 1000, 1000);
    }
    d3.select("#reslut").attr("opacity",1);
    if(index>len||numArray[index]!=searchval)
    {
        if(index<len)
        {
            if(numArray[index]<searchval)
            {
                changeGraphStroke("rect"+index,"#d00355",delay*1000,5,1000);
            }else if(numArray[index]>searchval){
                changeGraphStroke("rect"+index,"#3f52d0",delay*1000,5,1000);
            }
        }
        changeTextColor("code5", (delay++) * 1000, 1000);
        changeTextColor("code6", (delay++) * 1000, 1000);
        d3.selectAll("#reslutText"). transition().delay((delay++) * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity", 1).text("-1");
        cancleEvent(delay);
        return delay;
    }else {
        changeGraphStroke("rect" + index, "#46d030", delay * 1000, 5, 1000);
        changeTextColor("code5", (delay++) * 1000, 1000);
        changeTextColor("code7", (delay++) * 1000, 1000);
        d3.selectAll("#reslutText").transition().delay((delay++) * 1000 / anSpeed).ease(d3.easeCircle).attr("opacity", 1).text(index);
        cancleEvent(delay);
        return delay;
    }
}

function binary() {
    var searchval=$(".text-input").val();
    var delay=0;
    var low=0;
    var len;
    $("#inputButton").attr("onclick","").text("计算中...");
    $("#popButton").attr("onclick","").text("计算中...");
    $("#cleanButton").attr("onclick","").text("计算中...");
    if(mode==1)
    {
        len=30;
    }
    else {
        len=150;
    }
    var high=len-1;
    if(d3.selectAll(".code").attr("opacity")=="1")
    {
        d3.selectAll(".code").attr("opacity",0);
        d3.select("#gil").remove();
    }
    if($("#gib").length<=0)
    {
        instructionBinary();
    }
    d3.select(".v").attr("opacity",1);
    d3.selectAll(".binary").attr("opacity",1);
    changeTextColor("code8",(delay++)*1000,1000);
    changeGraphStroke("rect"+low,"#d0d01f",delay*1000,5,1000);
    changeTextColor("code9",(delay++)*1000,1000);
    changeGraphStroke("rect"+high,"#d00355",delay*1000,5,1000);
    changeTextColor("code10",(delay++)*1000,1000);
    while(low<=high)
    {
        changeTextColor("code11",(delay++)*1000,1000);
        changeTextColor("code12",(delay++)*1000,1000);
        var mid=parseInt((low+high)/2);
        if(numArray[mid]==searchval)
        {
            changeGraphStroke("rect"+mid,"#46d030",delay*1000,5,1000);
            changeTextColor("code13",(delay++)*1000,1000);
            changeTextColor("code14", (delay++) * 1000, 1000);
            d3.selectAll("#reslutText"). transition().delay((delay++) * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity", 1).text(mid);
            cancleEvent(delay);
            return delay;
        }else {
           if(numArray[mid]<searchval)
           {
               changeGraphStroke("rect"+mid,"#1d1bd0",delay*1000,5,1000);
               changeTextColor("code13",(delay++)*1000,1000);
                 low=mid+1;
               changeTextColor("code15",(delay++)*1000,1000);
               for(var i=0;i<low;i++)
               {
                   d3.select("#g"+i).transition().delay((delay) * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity",0);
               }
               changeGraphStroke("rect"+low,"#d0d01f",delay*1000,5,1000);
               changeTextColor("code16",(delay++)*1000,1000);
           }else {
               changeGraphStroke("rect"+mid,"#de56ff",delay*1000,5,1000);
               changeTextColor("code13",(delay++)*1000,1000);
               changeTextColor("code15",(delay++)*1000,1000);
               changeTextColor("code17",(delay++)*1000,1000);
               for(var i=mid;i<=high;i++)
               {
                   d3.select("#g"+i).transition().delay((delay) * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity",0);
               }
               high=mid-1;
               changeGraphStroke("rect"+high,"#d00355",delay*1000,5,1000);
               changeTextColor("code18",(delay++)*1000,1000);

           }
        }
    }
    d3.selectAll("#reslutText"). transition().delay(delay * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity", 1).text("-1");
    changeTextColor("code19",(delay++)*1000,1000);
    for(var i=0;i<len;i++)
    {
        d3.select("#g"+i).transition().delay((delay) * 1000/ anSpeed).ease(d3.easeCircle).attr("opacity",1);
    }
    cancleEvent(delay);
    return delay;
}


function size() {
    d3.selectAll("g").remove();
    var svg = d3.select("#canvas");
    var g=svg.append("g").attr("id","reslut").attr("opacity",0);
    g.append("text").attr("x",500).attr("y",50).attr("class","code v").text("reslut=");
    g.append("text").attr("x",540).attr("y",50).attr("id","reslutText").attr("class","code").attr("opacity",0);
    if(mode==1)
    {
        printBigRect();
        mode=2;
    }else if(mode==2)
    {
        printSmallRect();
        mode=1;
    }
}

function printSmallRect() {
    initArray(30);
    for(var i=0;i<30;i++) {
        printRect(i, 100 + 50 * (i % 15), 250 + parseInt(i / 15) * 100, 50, 50, i * 500, numArray[i]).selectAll("text")
            .transition().delay(i * 500 / anSpeed).ease(d3.easeCircle).attr("opacity", 1);
    }
}

function printBigRect() {
    initArray(150);
    for(var i=0;i<150;i++)
    {
        printRect(i,100+30*(i%30),250+parseInt(i/30)*50,30,30,i*500,numArray[i]).selectAll("text")
            .transition().delay(i*500/anSpeed).ease(d3.easeCircle).attr("opacity",1);
    }
}

function printRect(id,x,y,height,width,delay,text) {
    var svg = d3.select("#canvas");
    var g = svg.append("g").attr("id", "g" + id);
    g.append("rect").attr("x", x).attr("y", y).attr("width", 0).attr("id", "rect" + id)
        .attr("height", height).attr("fill", "white").attr("stroke-width", 1).attr("stroke", "black")
        .attr("class", "rectOne").transition()
        .delay(function (d, i) {
            return delay / anSpeed;
        }).duration(2000 / anSpeed)
        .ease(d3.easeBounce)
        .attr("width", width);
    g.append("text").attr("x", x+width/2).attr("y", y+height/2+5).attr("id", "text" + id).attr("class", "number").text(text).attr("opacity",0);
    g.append("text").attr("x", x+width/2).attr("y", y+height+15).attr("id", "index" + id).attr("class", "number").text(id).attr("opacity",0);
    return g;
}

function initArray(length) {
    numArray.splice(0,numArray.length);
    for(var i=0;i<length;i++) {
        var t=Math.floor(Math.random() * 1000)
        numArray.push(t);
    }
    var compare = function (x, y) {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    }
    numArray.sort(compare);
}

function instructionLinear() {
    var svg = d3.select("#canvas");
    var g = svg.append("g").attr("id", "gil");
    g.append("rect").attr("x", 500).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#d0d01f");
    g.append("text").attr("x", 515).attr("y", 120).attr("class", "number").text("index");
    g.append("rect").attr("x", 540).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#d00355");
    g.append("text").attr("x", 555).attr("y", 120).attr("class", "number").text("小于");
    g.append("rect").attr("x", 580).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#3f52d0");
    g.append("text").attr("x", 595).attr("y", 120).attr("class", "number").text("大于");
    g.append("rect").attr("x", 620).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#46d030");
    g.append("text").attr("x", 635).attr("y", 120).attr("class", "number").text("等于");
    return g;
}

function instructionBinary() {
    var svg = d3.select("#canvas");
    var g = svg.append("g").attr("id", "gib");
    g.append("rect").attr("x", 500).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#d0d01f");
    g.append("text").attr("x", 515).attr("y", 120).attr("class", "number").text("low");
    g.append("rect").attr("x", 540).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#d00355");
    g.append("text").attr("x", 555).attr("y", 120).attr("class", "number").text("high");
    g.append("rect").attr("x", 580).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#46d030");
    g.append("text").attr("x", 595).attr("y", 120).attr("class", "number").text("等于");
    g.append("rect").attr("x", 620).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#1d1bd0");
    g.append("text").attr("x", 635).attr("y", 120).attr("class", "number").text("小于");
    g.append("rect").attr("x", 660).attr("y", 100).attr("width",30)
        .attr("height", 30).attr("fill", "white").attr("stroke-width", 5).attr("stroke", "#de56ff");
    g.append("text").attr("x", 675).attr("y", 120).attr("class", "number").text("大于");
}