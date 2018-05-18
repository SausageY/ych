var time=-1;
var interyal;
var currentCircleid=0;
var board;
var delay=0;
var noConfictid=0;
function  input() {
    var input=$(".text-input").val();
    input=parseInt(input);
    if($("#board").length>0) {
        d3.select("#board").remove();
        d3.select("#bigboard").remove();
        clearInterval(interyal);
    }
    if(input>8||input<0||isNaN(input)) {
        input=8;
    }
    if(time<0) {
        // time = ((input.length * 2-1)*4 + 3) / anSpeed;
        $("#inputButton").attr("onclick","").text(parseInt(time));
    }
    interyal= setInterval(function () {
        $("#inputButton").attr("onclick","").text(parseInt(time));
        if(time<0)
        {
            $("#inputButton").attr("onclick","input()").text("Queens");
        }
        time-=0.5;
    },500);
    board=new Array(input);
    for(var i=0;i<input;i++)
    {
        board[i]=-1;
    }
    nqueens(input);
}


function nqueens(size) {
    //初始化棋盘
    changeTextColor("code1",(delay++)*1000,1000);
    printBoard(size).transition().delay(delay*1000/anSpeed).duration(2000/anSpeed).ease(d3.easeCircle).attr("opacity",1);
    printBigBoard(size).transition().delay(delay*1000/anSpeed).duration(2000/anSpeed).ease(d3.easeCircle).attr("opacity",1);
    changeTextColor("code2",(delay++)*1000,1000);
    changeTextColor("code3",(delay++)*1000,1000);
    //开始递归queens
       queens(0,size);
}

function queens(current,size) {
    var i=currentCircleid;
    var x=295+parseInt(current/5)*410;
    var y=50+(current%5)*80;
    printQueens(current,size,x,y,currentCircleid).transition().delay(delay*1000/anSpeed).duration(2000/anSpeed).ease(d3.easeCircle).attr("opacity",1);
    currentCircleid++;
    changeTextColor("code4",(delay++)*1000,1000);
    changeTextColor("code5",(delay++)*1000,1000);
    var pos;
    if(current==size) {
        changeTextColor("code6",(delay++)*1000,1000);
        d3.select("#queens" + i).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
        d3.select("#done" + (i-1)).transition().delay((delay++)*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("true").attr("opacity",1);
        return true;
    }else {
        for(var j=0;j<size;j++) {
            d3.select("#qi" + i).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text(j);
            changeTextColor("code8", (delay++)*1000, 1000);
            board[current]=j;
            pos=current*size+j;
            d3.select("#boardText" + current).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text(j);
            d3.select("#bigboardText" + pos).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("Q");
            changeTextColor("code9", (delay++)*1000, 1000);
            changeTextColor("code10", (delay++)*1000, 1000);
            var result=noConficts(current,size,x,y+80);
            if(result==true)
            {
                var b;
                b=queens(current+1,size);
                if(b==true) {
                        d3.select("#queens" + i).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
                        d3.select("#done" + (i-1)).transition().delay((delay++)*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("true").attr("opacity",1);
                        return true;
                }else {
                    d3.select("#bigboardText" + pos).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("");
                }
            }
            else {
                d3.select("#bigboardText" + pos).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("");
            }
        }
    }
    d3.select("#queens" + i).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
    d3.select("#done" + (i-1)).transition().delay((delay++)*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("false").attr("opacity",1);
    d3.select("#bigboardText" + pos).transition().delay(delay*1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text("");
    return false;
}

function noConficts(cur,size,x,y){
    printNoConfict(cur,x,y,noConfictid).transition().delay(delay*1000/ anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).attr("opacity",1);
    changeTextColor("code15", (delay++)*1000, 1000);
    for(var i=0;i<cur;i++) {
        d3.select("#ci" + noConfictid).transition().delay(delay * 1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).text(i).attr("opacity",1);
        changeTextColor("code16", (delay++)*1000, 1000);
        changeTextColor("bigboardText"+(i*size+board[i]), delay*1000, 1000);//改变棋盘两个Q的颜色
        changeTextColor("bigboardText"+(cur*size+board[cur]), delay*1000, 1000);
        changeTextColor("code17", (delay++)*1000, 1000);
        if(board[cur]==board[i]){
            changeTextColor("code18", (delay++)*1000, 1000);
            d3.select("#noConfict"+noConfictid).transition().delay(delay * 1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
            noConfictid++;
            return false;
        }else {
            changeTextColor("code19", (delay++)*1000, 1000);
            if((cur-i)==Math.abs(board[cur]-board[i]))
            {
                changeTextColor("code20", (delay++)*1000, 1000);
                d3.select("#noConfict"+noConfictid).transition().delay(delay * 1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
                noConfictid++;
                return false;
            }
        }
    }
    d3.select("#noConfict"+noConfictid).transition().delay(delay * 1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).remove();
    changeTextColor("code21", (delay++)*1000, 1000);
    noConfictid++;
    return true;

}



function printBoard(size) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","board").attr("opacity",0);
    for(var i=0;i<size;i++) {
        g.append("rect").attr("x",500+i*20).attr("y", 50).attr("id", "boardRect" + i).attr("width",20).attr("height",20).attr("fill","white")
            .attr("stroke-width",1).attr("stroke","black");
        g.append("text").attr("x",505+i*20).attr("y", 65).attr("id", "boardText" + i).attr("class", "code").text("-1");
    }
    return g;
}

function printQueens(current,size,x,y,id) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","queens"+id).attr("opacity",0);
    g.append("line").attr("x1",x).attr("y1",y).attr("x2",x+140).attr("y2",y).attr("id","line"+id)
        .attr("stroke","#d00355").attr("stroke-width",1);
    g.append("rect").attr("x", x+90).attr("y", y).attr("id","currentRect"+id).call(initQueensRect);
    g.append("rect").attr("x", x+90).attr("y", y+20).attr("id","sizeRect"+id).call(initQueensRect);
    g.append("rect").attr("x", x+90).attr("y", y+40).attr("id","qiRect"+id).call(initQueensRect);
    g.append("rect").attr("x", x+90).attr("y", y+60).attr("id","doneRect"+id).call(initQueensRect);
    g.append("text").attr("x",x).attr("y",y+15).attr("id","queensText"+id).attr("class","code").text("queens").attr("fill","blue");
    g.append("text").attr("x",x+45).attr("y",y+15).attr("id","currentText"+id).attr("class","code").text("current");
    g.append("text").attr("x",x+65).attr("y",y+35).attr("id","sizeText"+id).attr("class","code").text("size");
    g.append("text").attr("x",x+80).attr("y",y+55).attr("id","qiText"+id).attr("class","code").text("i");
    g.append("text").attr("x",x+55).attr("y",y+75).attr("id","doneText"+id).attr("class","code").text("done");
    g.append("text").attr("x",x+115).attr("y",y+15).attr("id","current"+id).attr("class","number").text(current);
    g.append("text").attr("x",x+115).attr("y",y+35).attr("id","size"+id).attr("class","number").text(size);
    g.append("text").attr("x",x+115).attr("y",y+55).attr("id","qi"+id).attr("class","number");
    g.append("text").attr("x",x+115).attr("y",y+75).attr("id","done"+id).attr("class","number").attr("opacity",0);
    return g;
}

function initQueensRect(selection) {
    selection.attr("width",50).attr("height",20).attr("fill","white")
        .attr("stroke-width",1).attr("stroke","black");
}


function printBigBoard(size) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","bigboard").attr("opacity",0);
    for(var i=0;i<size;i++) {
        for(var j=0;j<size;j++) {
            var id=i*size+j;
            g.append("rect").attr("x", 500 + i * 20).attr("y", 90 + j * 20).attr("id", "bigboardRect" + id).attr("width", 20).attr("height", 20).attr("fill", "white")
                .attr("stroke-width", 1).attr("stroke", "black");
            g.append("text").attr("x", 505 + i * 20).attr("y", 105 + j * 20).attr("id", "bigboardText" + id).attr("class", "code");
        }
    }
    return g;
}

function printNoConfict(current,x,y,id) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","noConfict"+id).attr("opacity",0);
    g.append("line").attr("x1",x).attr("y1",y).attr("x2",x+140).attr("y2",y).attr("id","line"+id)
        .attr("stroke","#d00355").attr("stroke-width",1);
    g.append("text").attr("x",x).attr("y",y+15).attr("id","noConfictsText"+id).text("noConficts").attr("fill","blue").style("font","10px Open Sans");
    g.append("rect").attr("x", x+90).attr("y", y).attr("id","curRect"+id).call(initQueensRect);
    g.append("rect").attr("x", x+90).attr("y", y+20).attr("id","ciRect"+id).call(initQueensRect);
    g.append("text").attr("x",x+115).attr("y",y+15).attr("id","cur"+id).attr("class","number").text(current);
    g.append("text").attr("x",x+115).attr("y",y+35).attr("id","ci"+id).attr("class","number").attr("opacity",0);
    g.append("text").attr("x",x+65).attr("y",y+15).attr("id","curText"+id).attr("class","code").text("cur");
    g.append("text").attr("x",x+80).attr("y",y+35).attr("id","ciText"+id).attr("class","code").text("i");
    return g;
}
