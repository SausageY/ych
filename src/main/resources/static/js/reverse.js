var time=-1;
var interyal;

function input() {
    var input=$(".text-input").val();
    if($("#g0").length>0){
            d3.select("#g0").remove();
            clearInterval(interyal);
        }
        var svg=d3.select("#canvas");
        var g=svg.append("g").attr("id","g0").attr("opacity",0);
        g.append("text").attr("x",20).attr("y",300).attr("class","code").text("reslut=");
        g.append("text").attr("x",60).attr("y",300).attr("id","subSolution0").attr("class","code").attr("opacity",0);
        if(time<0) {
             time = ((input.length * 2-1)*4 + 3) / anSpeed;
            $("#inputButton").attr("onclick","").text(parseInt(time));
        }
        interyal= setInterval(function () {
            $("#inputButton").attr("onclick","").text(parseInt(time));
            if(time<0)
            {
                $("#inputButton").attr("onclick","input()").text("factorial");
            }
            time-=0.5;
        },500);
        reverse(input);
}

function reverse(input) {
    var pos=0;
    var removeg=1;
    //用于绘制递归初始界面
    var n=input.length;
    for(var i=n;i>1;i--)
    {
        changeTextColor("code1",0+pos*4000,500);//建一个新的栈
        var b=parseInt(pos/5);
        printG(input.substring(n-i,n),250+b*200,30+(pos%5)*80,i).transition().delay((4000*pos)/anSpeed).duration(2500/anSpeed).ease(d3.easeElastic)
            .attr("opacity",1);
        changeTextColor("code2",1000+pos*4000,500);
        changeTextColor("code5",2000+pos*4000,500);
        var subString=input.substring(n-i+1,n);
        d3.select("#subProblem"+i).transition().duration(1000/anSpeed).delay((2000+4000*pos)/anSpeed).text(subString).attr("opacity",1);
        changeTextColor("code6",3000+pos*4000,500);
        pos++;
    }
    changeTextColor("code1",0+pos*4000,500);
    var b=parseInt(pos/5);
    printG(input.substring(n-1,n),250+b*200,30+(pos%5)*80,1).transition().delay((4000*pos)/anSpeed).duration(2500/anSpeed).ease(d3.easeElastic)
        .attr("opacity",1);
    changeTextColor("code2",1000+pos*4000,500);
    changeTextColor("code3",2000+pos*4000,500);
    moveText(1,2,2000+pos*4000);
    setTimeout(function(){
        d3.select("#g"+removeg).transition().duration(2000/anSpeed).remove();
        removeg++;
    },(3000+pos*4000)/anSpeed);
    d3.select("#g1").transition().delay((4000+pos*4000)/anSpeed).duration(1000/anSpeed).remove();
    pos++;
    //用于演示递归收尾界面
    for(var i=2;i<=n;i++)
    {
        changeTextColor("code7",0+pos*4000,500);
        var subSolution=$("#subSolution"+i).text();
        var word0=input.substr(n-i,1);
        d3.select("#solution"+i).text(subSolution+word0);
        d3.select("#solution"+i).transition().delay((pos*4000)/anSpeed).duration(1000/anSpeed).ease(d3.easeElastic)
            .attr("opacity",1);
        changeTextColor("code8",1000+pos*4000,500);
        if(i!=n) {
            moveText(i, i + 1, 1000 + pos * 4000);
        }else {
            d3.select("#g0").transition().delay((1000+pos*4000)/anSpeed).duration(1000/anSpeed).ease(d3.easeElastic)
                .attr("opacity",1);
            moveText(i,0,1000 + pos * 4000);
        }
        setTimeout(function(){
            d3.select("#g"+removeg).transition().duration(2000/anSpeed).remove();
            removeg++;
        },(2000+pos*4000)/anSpeed);
        pos++;
    }
}

function printG(input,x,y,id) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","g"+id).attr("opacity",0);
    g.append("line").attr("x1",x).attr("y1",y).attr("x2",x+170).attr("y2",y).attr("id","line"+id)
        .attr("stroke","#d00355").attr("stroke-width",1);
    g.append("rect").attr("x", x+90).attr("y", y).attr("id","wordRect"+id);
    g.append("rect").attr("x", x+90).attr("y", y+20).attr("id","subProblemRect"+id);
    g.append("rect").attr("x", x+90).attr("y", y+40).attr("id","subSolutionRect"+id);
    g.append("rect").attr("x", x+90).attr("y", y+60).attr("id","solutionRect"+id);
    g.append("text").attr("x",x+5).attr("y",y+15).attr("id","reverse"+id).attr("class","code").text("reverse").attr("fill","blue");
    g.append("text").attr("x",x+60).attr("y",y+15).attr("id","wordText"+id).attr("class","code").text("word");
    g.append("text").attr("x",x+20).attr("y",y+35).attr("id","subProblemText"+id).attr("class","code").text("subProblem");
    g.append("text").attr("x",x+20).attr("y",y+55).attr("id","subSolutionText"+id).attr("class","code").text("subSolution");
    g.append("text").attr("x",x+40).attr("y",y+75).attr("id","solutionText"+id).attr("class","code").text("solution");
    g.append("text").attr("x",x+130).attr("y",y+15).attr("id","word"+id).attr("class","number").text(input);
    g.append("text").attr("x",x+130).attr("y",y+35).attr("id","subProblem"+id).attr("class","number").attr("opacity",0);
    g.append("text").attr("x",x+130).attr("y",y+55).attr("id","subSolution"+id).attr("class","number").attr("opacity",0);
    g.append("text").attr("x",x+130).attr("y",y+75).attr("id","solution"+id).attr("class","number").attr("opacity",0);
    initG();
    return g;
}

function initG() {
    d3.selectAll("rect").attr("width",80).attr("height",20).attr("fill","white")
        .attr("stroke-width",1).attr("stroke","black");
}


function moveText(id1,id2,delay) {
    var pre;
    if(id1==1) {
        pre="#word";
    }
    else {
        pre="#solution";
    }
    var text=$(pre+id1).text();
    $("#subSolution"+id2).attr("opacity",0).text(text);
    var x=$("#subSolution"+id2).attr("x");
    var y=$("#subSolution"+id2).attr("y");
    if(id2==0)
    {
        x=parseInt(x)+(text.length/2)*7.15;
    }
    d3.select(pre+id1).transition().delay(function (d, i) {
        return delay /anSpeed;
    }).duration(1000/anSpeed)
        .ease(d3.easeCircle).attr("x",x).attr("y",y).
    transition().duration(1500/anSpeed)
        .ease(d3.easeCircle).attr("opacity",0);
    d3.select("#subSolution"+id2).transition().delay(function (d, i) {
        return (delay+1000)/anSpeed;
    }).duration(1000/anSpeed)
        .ease(d3.easeCircle).attr("opacity",1);
}