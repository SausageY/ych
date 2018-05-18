var storenum=new Array();
var currentNum=0;
var time=-1;
var interyal;
$(function () {
    getdef();
})


function input(){
    var input=$(".text-input").val();
    var locate=$(".text-input-location").val();
    AddObject(input,locate);
};

function AddObject(input,locate) {
    if(storenum.length<30&&input!="") {
        if(locate==""||locate>=storenum.length) {
            if (storenum.length==0) {
                printRect(currentNum,160+100*currentNum, 80, 50, 50, 0, d3.easeElastic, input);
                currentNum++;
            }else if(storenum.length<10) {
                printRect(currentNum,160+100*currentNum, 80, 50, 50, 0, d3.easeElastic, input);
                printLine(currentNum,110+100*currentNum,105,150+100*currentNum,105,"black",2,0,d3.easeElastic);
                currentNum++;
            }else if(storenum.length%10==0)
            {
                var x=document.getElementById("rect"+(currentNum-1)).x.animVal.value;
                var y=document.getElementById("rect"+(currentNum-1)).y.animVal.value;
                printRect(currentNum,x,y+100, 50, 50, 0, d3.easeElastic, input);
                printLine(currentNum,x+25,y+50,x+25,y+90,"black",2,0,d3.easeElastic);
                currentNum++;
            }else if(storenum.length>10&&storenum.length<20){
                printRect(currentNum,1060-100*(currentNum-10),180, 50, 50, 0, d3.easeElastic, input);
                printLine(currentNum,1060-100*(currentNum-11),205,1120-100*(currentNum-10),205,"black",2,0,d3.easeElastic);
                currentNum++;
            }else {
                printRect(currentNum,160+100*(currentNum-20),280, 50, 50, 0, d3.easeElastic, input);
                printLine(currentNum,210+100*(currentNum-21),305,150+100*(currentNum-20),305,"black",2,0,d3.easeElastic);
                currentNum++;
            }
            storenum.push(input);
        }else {
                clearInterval(interyal);
                forbiddenButton(2.2/anSpeed);
                storenum.splice(locate,0,input);
                addNode(locate,input);
        }
    }
}

function pop(){
    var input=$(".text-input").val();
    var locate=$(".text-input-location").val();
    if(locate!="")
    {
        removeRect(locate);
        storenum.splice(locate,1);
    }else if(input!=""){
        var pos=storenum.indexOf(input);
        if(pos==-1)
        {
            alert("未找到输入数字");
        }else {
            clearInterval(interyal);
            forbiddenButton(2.2/anSpeed);
            removeRect(pos);
            storenum.splice(locate,1);
        }
    }
};

function clean(){
    d3.selectAll("line").remove();
    d3.selectAll("g").remove();
    storenum.splice(0,storenum.length);
    currentNum=0;
};




function addNode(id,input) {
        var rect_x=$("#rect"+id).attr("x");
        var rect_y=$("#rect"+id).attr("y");
        var zz=id;
        if(id==0)
        {
            zz=1;
        }
        var line_x1=$("#line"+zz).attr("x1");
        var line_x2=$("#line"+zz).attr("x2");
        var line_y1=$("#line"+zz).attr("y1");
        var line_y2=$("#line"+zz).attr("y2");
        moveG(id,currentNum-1,1);//2000
        var temp=d3.select("#text"+(currentNum-1)).text();
        d3.select("#g"+(currentNum-1)).remove();
        d3.select("#line"+(currentNum-1)).remove();
        changeid(id,currentNum-1,1);
        storenum.pop();
        setTimeout(function () {
            AddObject(temp,"");
        },2000/anSpeed);
        printRect(id,rect_x,rect_y,50,50,0,d3.easeElastic,input).attr("opacity","0").transition().delay(1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).attr("opacity",1);
        printLine(id,line_x1,line_y1,line_x2,line_y2,"black",2,0,d3.easeElastic).attr("opacity","0").transition().delay(1000 / anSpeed).duration(1000 / anSpeed).ease(d3.easeCircle).attr("opacity",1);
};


function moveG(start,end,mode) {
    if (mode == 1) {
        for (var i = start; i < end; i++) {
            var b = parseInt(i) + parseInt(mode);
            var x = $("#rect" + b).attr("x");
            var y = $("#rect" + b).attr("y");
            var x2 = $("#text" + b).attr("x");
            var y2 = $("#text" + b).attr("y");
            d3.select("#rect" + i).transition().duration(2000 / anSpeed)
                .ease(d3.easeCircle)
                .attr("x", x).attr("y", y);
            d3.select("#text" + i).transition()
                .duration(2000 / anSpeed)
                .ease(d3.easeCircle)
                .attr("x", x2).attr("y", y2);
            if ($("#line" + i).length > 0) {
                if ($("#line" + b).length > 0) {
                    var x1 = $("#line" + b).attr("x1");
                    var y1 = $("#line" + b).attr("y1");
                    x2 = $("#line" + b).attr("x2");
                    y2 = $("#line" + b).attr("y2");
                    d3.select("#line" + i).transition()
                        .duration(2000 / anSpeed)
                        .ease(d3.easeCircle)
                        .attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
                } else {
                    d3.select("#line" + i).remove();
                }
            }
        }
    } else if (mode == -1) {
        for (var i = end - 1; i >= start; i--) {
            var b = parseInt(i) + parseInt(mode);
            var x = $("#rect" + b).attr("x");
            var y = $("#rect" + b).attr("y");
            var x2 = $("#text" + b).attr("x");
            var y2 = $("#text" + b).attr("y");
            d3.select("#rect" + i).transition()
                .duration(2000 / anSpeed)
                .ease(d3.easeCircle)
                .attr("x", x).attr("y", y);
            d3.select("#text" + i).transition()
                .duration(2000 / anSpeed)
                .ease(d3.easeCircle)
                .attr("x", x2).attr("y", y2);
            if ($("#line" + i).length > 0) {
                if ($("#line" + b).length > 0) {
                    var x1 = $("#line" + b).attr("x1");
                    var y1 = $("#line" + b).attr("y1");
                    x2 = $("#line" + b).attr("x2");
                    y2 = $("#line" + b).attr("y2");
                    d3.select("#line" + i).transition()
                        .duration(2000 / anSpeed)
                        .ease(d3.easeCircle)
                        .attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
                } else {
                    d3.select("#line" + i).remove();
                }
            }
        }
    }
};

function changeid(start,end,mode) {
    for(var i=start;i<end;i++)
    {
        i=parseInt(i);
        var g=i+parseInt(mode);
        var rectid="rect"+i;
        var lineid="line"+i;
        var gid="g"+i;
        var textid="text"+i;
        $("[id='"+rectid+"'][class=1]").attr("id","rect"+g).attr("class","0");
        $("[id='"+lineid+"'][class=1]").attr("id","line"+g).attr("class","0");
        $("[id='"+gid+"'][class=1]").attr("id","g"+g).attr("class","0");
        $("[id='"+textid+"'][class=1]").attr("id","text"+g).attr("class","0");
    }
    d3.selectAll("rect").attr("class","1");
    d3.selectAll("line").attr("class","1");
    d3.selectAll("g").attr("class","1");
    d3.selectAll("text").attr("class","1");
};

function removeRect(id) {
    id=parseInt(id);
    moveG(id+1,currentNum,-1);
    d3.select("#g"+id).remove();
    d3.select("#line"+id).remove();
    changeid(id+1,currentNum,-1);
    currentNum--;
};


function forbiddenButton(t) {
    if(time<0) {
        time = t;
        $("#inputButton").attr("onclick","").text(parseInt(time));
        $("#popButton").attr("onclick","").text(parseInt(time));
        $("#cleanButton").attr("onclick","").text(parseInt(time));
    }
    interyal= setInterval(function () {
        if(time<0)
        {
            $("#inputButton").attr("onclick","input()").text("input");
            $("#popButton").attr("onclick","pop()").text("pop");
            $("#cleanButton").attr("onclick","clean()").text("clean");
        }else {
            $("#inputButton").text(parseInt(time));
            $("#popButton").text(parseInt(time));
            $("#cleanButton").text(parseInt(time));
            time-=0.5;
        }
    },500);
};
