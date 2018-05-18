var time=-1;
var interyal;
function input() {
    var input=$(".text-input").val();
    input=parseInt(input);
    if(isNaN(input))
    {
        alert("请输入数字0~10");
    }else {
        if($("#g0").length>0){
            d3.select("#g0").remove();
            clearInterval(interyal);
        }
        var svg=d3.select("#canvas");
        var g=svg.append("g").attr("id","g0").attr("opacity",0);
        g.append("text").attr("x",20).attr("y",300).attr("class","code").text("reslut=");
        g.append("text").attr("x",60).attr("y",300).attr("id","subValue0").attr("class","code").attr("opacity",0);
        if (input > 10 || input < 0) {
            input=10;
            $(".text-input").val(10);
        }
            if(time<0) {
                time = ((input * 2-1)*3 + 3) / anSpeed;
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
            factorial(input);
    }
}

function factorial(n) {
    var pos=0;
    var removeg=1;
    //用于绘制递归初始界面
 for(var i=n;i>0;i--)
 {
   changeTextColor("code2",0+pos*3000,500);
   changeTextColor("code4",1000+pos*3000,500);
   if(i!=1) {
       changeTextColor("code5", 2000+pos*3000, 500);
   }
   var b=parseInt(pos/5);
   printG(i,250+b*150,30+(pos%5)*60,i).transition().delay((3000*pos)/anSpeed).duration(3000/anSpeed).ease(d3.easeElasticIn)
       .attr("opacity",1);
   pos++;
 }
 //用于演示递归收尾界面
    for(var i=1;i<=n;i++)
    {
        changeTextColor("code6",0+pos*3000,500);
        d3.select("#returnValue"+i).transition().delay((pos*3000)/anSpeed).duration(1000/anSpeed).ease(d3.easeElasticIn)
            .attr("opacity",1);
        changeTextColor("code7",1000+pos*3000,500);
        var number=$("#n"+i).text();
        var subValue=$("#subValue"+i).text();
        var returnValue=$("#returnValue"+i).text();
        if(subValue==""){
            $("#returnValue"+i).text(number);
        }else {
            number=parseInt(number);
            subValue=parseInt(subValue);
            var reslut=number*subValue;
            $("#returnValue"+i).text(reslut);
        }
        if(i!=n) {
            moveText(i, i + 1, 1000 + pos * 3000);
        }else {
            d3.select("#g0").transition().delay((1000+pos*3000)/anSpeed).duration(1000/anSpeed).ease(d3.easeElasticIn)
                .attr("opacity",1);
            moveText(i,0,1000 + pos * 3000);
        }
        setTimeout(function(){
            d3.select("#g"+removeg).remove();
            removeg++;
        },(3000+pos*3000)/anSpeed);
        pos++;
    }


}

//绘制递归栈
function printG(input,x,y,id) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","g"+id).attr("opacity",0);
    g.append("line").attr("x1",x).attr("y1",y).attr("x2",x+130).attr("y2",y).attr("id","line"+id)
        .attr("stroke","#d00355").attr("stroke-width",1);
    g.append("rect").attr("x", x+80).attr("y", y).attr("id","nRect"+id);
    g.append("rect").attr("x", x+80).attr("y", y+20).attr("id","subValueRect"+id);
    g.append("rect").attr("x", x+80).attr("y", y+40).attr("id","returnValueRect"+id);
    g.append("text").attr("x",x+5).attr("y",y+15).attr("id","factorial"+id).attr("class","code").text("factorial").attr("color","blue");
    g.append("text").attr("x",x+60).attr("y",y+15).attr("id","nText"+id).attr("class","code").text("n");
    g.append("text").attr("x",x+20).attr("y",y+35).attr("id","subText"+id).attr("class","code").text("subValue");
    g.append("text").attr("x",x+5).attr("y",y+55).attr("id","returnText"+id).attr("class","code").text("returnValue");
    g.append("text").attr("x",x+105).attr("y",y+15).attr("id","n"+id).attr("class","number").text(input);
    g.append("text").attr("x",x+105).attr("y",y+35).attr("id","subValue"+id).attr("class","number");
    g.append("text").attr("x",x+105).attr("y",y+55).attr("id","returnValue"+id).attr("class","number").attr("opacity",0);
    initG();
    return g;
}

function initG() {
    d3.selectAll("rect").attr("width",50).attr("height",20).attr("fill","white")
        .attr("stroke-width",1).attr("stroke","black");
}


function moveText(id1,id2,delay) {
    var text=$("#returnValue"+id1).text();
    $("#subValue"+id2).attr("opacity",0).text(text);
    var x=$("#subValue"+id2).attr("x");
    var y=$("#subValue"+id2).attr("y");
    if(id2==0)
    {
       x=parseInt(x)+(text.length/2)*7.15;
    }
    d3.select("#returnValue"+id1).transition().delay(function (d, i) {
        return delay /anSpeed;
    }).duration(1000/anSpeed)
        .ease(d3.easeCircle).attr("x",x).attr("y",y).transition().delay(function (d, i) {
        return (delay+1000)/anSpeed;
    }).duration(1000/anSpeed)
        .ease(d3.easeCircle).attr("opacity",0);
    d3.select("#subValue"+id2).transition().delay(function (d, i) {
        return (delay+1000)/anSpeed;
    }).duration(1000/anSpeed)
        .ease(d3.easeCircle).attr("opacity",1);
}

function pasue() {
    $("rect").style.WebkitAnimationPlayState="paused";
    $("text").style.WebkitAnimationPlayState="paused";
    $("#popButton").attr("onclick","go()");
}

function go() {
    $("rect").style.WebkitAnimationPlayState="running";
    $("text").style.WebkitAnimationPlayState="running";
    $("#popButton").attr("onclick","pasue()");
}