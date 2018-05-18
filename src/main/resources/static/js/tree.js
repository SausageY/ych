function printCircle(id,cx,cy,r,text,delay,time,color) {
 var svg=d3.select("#canvas");
 var g = svg.append("g").attr("id", "g" + id);
     g.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 0).attr("id", "circle" + id)
        .attr("fill", "white").attr("stroke-width", 1).attr("stroke", color)
        .transition()
        .delay(function (d, i) {
            return delay / anSpeed;
        }).duration(time / anSpeed)
        .ease(d3.easeBounce)
        .attr("r", r);
    g.append("text").attr("x", cx).attr("y", cy+5).attr("id", "text" + id).attr("class", "number").text(text).attr("opacity",0)
        .attr("onclick","circleProperty(this)")
        .text(text).transition()
        .delay(function (d, i) {
            return delay / anSpeed;
        }).duration(time / anSpeed)
        .ease(d3.easeBounce)
        .attr("opacity", 1);
    return g;
}



function printLine(id,x1,y1,x2,y2,stroke,stroke_width,delay,time) {
    var svg=d3.select("#canvas");
    return svg.append("line").attr("class","1").attr("x1",x1).attr("y1",y1).attr("x2",x1).attr("y2",y1).attr("id","line"+id)
        .attr("stroke",stroke).attr("stroke-width",stroke_width).transition()
        .delay(function (d, i) {
            return delay/anSpeed;
        }).duration(time/anSpeed)
        .ease(d3.easeBounce)
        .attr("x2", x2)
        .attr("y2",y2)
        .attr("marker-end","url(#arrow)");
};

$(function getArrow(){
    var svg=d3.select("#canvas");
    if($("defs").length==0) {
        var defs = svg.append("defs");
        var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        var arrowMarker = defs.append("marker")
            .attr("id", "arrow")
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", "12")
            .attr("markerHeight", "12")
            .attr("viewBox", "0 0 12 12")
            .attr("refX", "6")
            .attr("refY", "6")
            .attr("orient", "auto");
        arrowMarker.append("path")
            .attr("d", arrow_path)
            .attr("fill", "#000");
    }
});

function moveRectOrText(id,move_x,move_y,delay,time) {
    setTimeout(function () {
    var x=parseInt($("#"+id).attr("x"));
    var y=parseInt($("#"+id).attr("y"));
    d3.select("#"+id).transition()
        .duration(time/anSpeed)
        .ease(d3.easeCircle).on("start",function () {
        console.log(new Date().getTime()+
            " id="+id+" x="+$("#"+id).attr("x")+" y="+$("#"+id).attr("y")+" movex="+move_x+" movey="+move_y);
       })
        .on("end",function () {
            console.log(new Date().getTime()+
                " id="+id+" x="+$("#"+id).attr("x")+" y="+$("#"+id).attr("y"));
        })
        .attr("x",x+move_x)
        .attr("y",y+move_y);
    },delay/anSpeed);
}

function moveLine(id,move_x1,move_y1,move_x2,move_y2,delay,time) {
    setTimeout(function () {
        d3.select("#"+id).transition("moveLine")
        .duration(time/anSpeed)
        .ease(d3.easeCircle).on("start",function () {
            console.log(new Date().getTime()+
                " id="+id+" x1="+$("#"+id).attr("x1")+" y1="+$("#"+id).attr("y1")+
                " x2="+$("#"+id).attr("x2")+" y2="+$("#"+id).attr("y2")+
                " mx1="+move_x1+" my1="+move_y1+" mx2="+move_x2+" my2="+move_y2);
        })
            .on("end",function () {
                console.log(new Date().getTime()+
                    " id="+id+" x1="+$("#"+id).attr("x1")+" y1="+$("#"+id).attr("y1")+
                    " x2="+$("#"+id).attr("x2")+" y2="+$("#"+id).attr("y2"));
        })
        .attr("x1", parseInt($("#"+id).attr("x1"))+move_x1)
        .attr("y1",parseInt($("#"+id).attr("y1"))+move_y1)
        .attr("x2",parseInt($("#"+id).attr("x2"))+move_x2)
        .attr("y2",parseInt($("#"+id).attr("y2"))+move_y2);
    },delay/anSpeed);
}

function moveLine2(id,move_x1,move_y1,move_x2,move_y2,delay,time) {
    setTimeout(function () {
        d3.select("#"+id).transition("moveLine")
            .duration(time/anSpeed)
            .ease(d3.easeCircle).on("start",function () {
            console.log(new Date().getTime()+
                " id="+id+" x1="+$("#"+id).attr("x1")+" y1="+$("#"+id).attr("y1")+
                " x2="+$("#"+id).attr("x2")+" y2="+$("#"+id).attr("y2")+
                " mx1="+move_x1+" my1="+move_y1+" mx2="+move_x2+" my2="+move_y2);
        })
            .on("end",function () {
                console.log(new Date().getTime()+
                    " id="+id+" x1="+$("#"+id).attr("x1")+" y1="+$("#"+id).attr("y1")+
                    " x2="+$("#"+id).attr("x2")+" y2="+$("#"+id).attr("y2"));
            })
            .attr("x1", move_x1)
            .attr("y1",move_y1)
            .attr("x2",move_x2)
            .attr("y2",move_y2);
    },delay/anSpeed);
}

function moveCircle(id,move_x,move_y,delay,time) {
    setTimeout(function () {
        var cx=parseInt($("#"+id).attr("cx"));
        var cy=parseInt($("#"+id).attr("cy"));
        d3.select("#"+id).transition()
            .duration(time/anSpeed)
            .ease(d3.easeCircle).on("start",function () {
            console.log(new Date().getTime()+
                " id="+id+" cx="+cx+" cy="+cy+
            " mx="+move_x+" my="+move_y);
        })
            .on("end",function () {
                console.log(new Date().getTime()+
                    " id="+id+" cx="+cx+" cy="+cy);
            })
            .attr("cx",cx+move_x)
            .attr("cy",cy+move_y);
    },delay/anSpeed);
}

function moveG_T(id,x,y,delay,time) {
   if($("#"+id).children("line").length>0)
   {
       var line_id=$("#"+id).children("line").attr("id");
       moveLine(line_id,x,y,x,y,delay,time);
   }
    if($("#"+id).children("rect").length>0)
    {
        var rect_id=$("#"+id).children("rect").attr("id");
       moveRectOrText(rect_id,x,y,delay,time);
    }
    if($("#"+id).children("text").length>0)
    {
        var text_id=$("#"+id).children("text").attr("id");
        moveRectOrText(text_id,x,y,delay,time);
    }
    if($("#"+id).children("circle").length>0)
    {
        var circle_id=$("#"+id).children("circle").attr("id");
        moveCircle(circle_id,x,y,delay,time);
    }
}

//判断绘制的图形是否重叠
function isCrash(node1,delay) {
    var addX;
    if(node1==null||node1.parent==root||node1==root)
    {
        return delay;
    }
    if(isLeft(node1))
    {
        var parent=node1.parent;
        while(isLeft(parent)&&parent!=null) {
            parent=parent.parent;
        }
        if(parent==null||parent==root) {
            return delay;
        }else {
            parent=parent.parent;
        }
        if(node1.x-20<parent.x) {
            addX=parseInt(parent.x)+20-parseInt(node1.x);
            aviodCash(parent.r_chilren,addX,Math.abs(parseInt(addX*0.75)),delay++,1);
            delay+=2;
            while(parent.r_chilren!=null) {
                parent=parent.r_chilren;
            }
            return isCrash(parent,delay);
        }
        return delay;
    }else {
        var parent=node1.parent;
        while(!isLeft(parent)&&parent!=null) {
            parent=parent.parent;
        }
        if(parent==null||parent==root) {
            return delay;
        }else {
            parent=parent.parent;
        }
        if(node1.x+20>parent.x) {
            addX=parseInt(parent.x)-20-parseInt(node1.x);
            aviodCash(parent.l_chilren,addX,Math.abs(parseInt(addX*0.75)),delay++,1);
            delay+=2;
            while(parent.l_chilren!=null)
            {
                parent=parent.l_chilren;
            }
            return isCrash(parent,delay);
        }
        return delay;
    }
}

//将叶节点所属节点进行平移
function aviodCash(node1,x,y,delay,type) {
    if(node1.parent==root||type==1)
    {
        moveCircleCX2(node1,x,y,delay);
    }else {
        moveG_T("g" + node1.id, x, y, delay * 1000, 1000);
    }
    node1.x=node1.x+x;
    node1.y=node1.y+y;
    if(node1.l_chilren!=null)
    {
        aviodCash(node1.l_chilren,x,y,delay,2);
    }
    if(node1.r_chilren!=null)
    {
        aviodCash(node1.r_chilren,x,y,delay,2);
    }
}

//移动点但是不移动顶点线的X1,Y1
function moveCircleCX2(node1,x,y,delay) {
    moveLine("line"+node1.id,0,0,x,y,delay*1000,1000);
    moveRectOrText("text"+node1.id,x,y,delay*1000,1000);
    moveCircle("circle"+node1.id,x,y,delay*1000,1000);
};

//移动一个圆到另一个圆
function moveCircleToCircle(node1,node2,delay) {
    var subx=node2.x-node1.x;
    var suby=node2.y-node1.y;
    node1.x=node2.x;
    node1.y=node2.y;
    if(node2==root)
    {
        setTimeout(function () {
            d3.select("#line"+node1.id).transition()
                .duration(2000/anSpeed)
                .ease(d3.easeCircle)
                .remove();
        },delay*1000/anSpeed);
    }else {
        setTimeout(function () {
            d3.select("#line" + node1.id).transition()
                .duration(2000 / anSpeed)
                .ease(d3.easeCircle).on("start",function () {
                console.log(new Date().getTime()+
                    " id1=line"+node1.id+" x1="+$("#line" + node1.id).attr("x1")+" y1="+$("#line" + node1.id).attr("y1")+
                    " x2="+$("#line" + node1.id).attr("x2")+" y2="+$("#line" + node1.id).attr("y2"));
            })
                .on("end",function () {
                    console.log(new Date().getTime()+
                        " id1=line"+node1.id+" x1="+$("#line" + node1.id).attr("x1")+" y1="+$("#line" + node1.id).attr("y1")+
                        " x2="+$("#line" + node1.id).attr("x2")+" y2="+$("#line" + node1.id).attr("y2"));
                })
                .attr("x1",$("#line" + node2.id).attr("x1"))
                .attr("y1",$("#line" + node2.id).attr("y1"))
                .attr("x2",$("#line" + node2.id).attr("x2"))
                .attr("y2",$("#line" + node2.id).attr("y2"));
        },delay*1000/anSpeed);
    }
    moveCircle("circle"+node1.id,subx,suby,delay*1000,2000);
    moveRectOrText("text"+node1.id,subx,suby,delay*1000,2000);
}

//查找节点
function findNode(data,node1) {
    if(data==node1.data)
    {
        changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
        return node1;
    }
    else {
        if(data<node1.data&&node1.l_chilren!=null)
        {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return findNode(data,node1.l_chilren);
        }else if(data>node1.data&&node1.r_chilren!=null){
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return findNode(data,node1.r_chilren);
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            setTimeout(function (){alert("找不到节点"+data);},delay*1000);
            return -1;
        }
    }
}

//插入二叉树节点
function insertNode(data,node1,color){
    if(data<node1.data)
    {
        if(node1.l_chilren==null)
        {
            node1.l_chilren=new node(data,node1);
            node1.l_chilren.id=current;
            node1.l_chilren.x=parseInt(node1.x)-40;
            node1.l_chilren.y=parseInt(node1.y)+30;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            var line=printLine(current,node1.x-12,node1.y+9,node1.x-25,node1.y+18,"#000",1,delay*1000,2000);
            var g=printCircle(current,node1.l_chilren.x,node1.l_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay++;
            myOut=setTimeout(function () {
                isCrash(node1.l_chilren,0);
            },delay*1000/anSpeed);
            delay+=2;
            return node1.l_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertNode(data,node1.l_chilren,color);
        }
    }else {
        if(node1.r_chilren==null)
        {
            node1.r_chilren=new node(data,node1);
            node1.r_chilren.id=current;
            node1.r_chilren.x=parseInt(node1.x)+40;
            node1.r_chilren.y=parseInt(node1.y)+30;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            var line=printLine(current,node1.x+12,node1.y+9,node1.x+25,node1.y+18,"#000",1,delay*1000,2000);
            var g=printCircle(current,node1.r_chilren.x,node1.r_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay++;
            myOut=setTimeout(function () {
                isCrash(node1.r_chilren,0);
            },delay*1000/anSpeed);
            delay+=2;
            return node1.r_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertNode(data,node1.r_chilren,color);
        }
    }
};

//判断节点是不是左子树
function isLeft(node1) {
    if(node1!=null&&node1!=root) {
        return node1.parent.l_chilren == node1 ? true : false;
    }else {
        return false;
    }
}

//节点移动 连同剩下的左右子树一起平移
function moveNode_A(node1,node2,delay) {
    var subx=node2.x-node1.x;
    var suby=node2.y-node1.y;
    moveCircleToCircle(node1,node2,delay);
    if(node1.l_chilren!=null)
    {
        aviodCash(node1.l_chilren,subx,suby,delay++,2);
    }
    if(node1.r_chilren!=null)
    {
        aviodCash(node1.r_chilren,subx,suby,delay++,2);
    }
}



//移动右子树 顶点另外移动
function moveNode_B(node1,node2,delay) {
    if(node1.r_chilren!=null) {
        moveNode_A(node1.r_chilren,node1,delay);
    }
    moveCircleToCircle(node1,node2,delay);
}

//单纯移动左子树
function moveNode_C(node1,node2,delay) {
    var subx=node2.x-node1.x;
    var suby=node2.y-node1.y;
    moveCircleToCircle(node1,node2,delay);
    if(node1.l_chilren!=null) {
        aviodCash(node1.l_chilren,subx,suby,delay,2);
    }
}

//单纯移动右子树
function moveNode_D(node1,node2,delay) {
    var subx=parseInt(node2.x-node1.x);
    var suby=parseInt(node2.y-node1.y);
    moveCircleToCircle(node1,node2,delay);
    if(node1.r_chilren!=null) {
        aviodCash(node1.r_chilren,subx,suby,delay,2);
    }
}

//删除节点
function moveNode(node1,delay) {
    var parent=null;
    if(node1.l_chilren==null&&node1.r_chilren==null) {
        if(node1==root) {
            root=null;
        }else if(isLeft(node1)){
            node1.parent.l_chilren=null;
        }else {
            node1.parent.r_chilren=null;
        }
    }else if(node1.l_chilren==null){
        if(node1==root) {
            moveNode_A(root.r_chilren,root,delay);
            root=root.r_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.r_chilren,node1,delay);
            node1.parent.l_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.r_chilren,node1,delay);
            node1.parent.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }
    }else if(node1.r_chilren==null){
        if(node1==root) {
            moveNode_A(root.l_chilren,root,delay);
            root=root.l_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.l_chilren,node1,delay);
            node1.parent.l_chilren=node1.l_chilren;
            node1.l_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.l_chilren,node1,delay);
            node1.parent.r_chilren=node1.l_chilren;
            node1.l_chilren.parent=node1.parent;
        }
    }else {
        var curr=node1.r_chilren;
        var successor=curr;
        var sucParent=null;
        while(curr!=null){
            sucParent=successor;
            successor=curr;
            curr=curr.l_chilren;
        }
        if(successor.r_chilren==null){
            moveNode_A(successor,node1,delay);
        }else {
            moveNode_B(successor,node1,delay);
        }
        if(successor!=node1.r_chilren){
            sucParent.l_chilren=successor.r_chilren;
            successor.r_chilren.parent=sucParent;
            successor.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=successor;
        }
        successor.l_chilren=node1.l_chilren;
        node1.l_chilren.parent=successor;
        if(node1==root){
            root=successor;
            successor.parent=null;
        }else if(isLeft(node1)){
            node1.parent.l_chilren=successor;
            successor.parent=node1.parent;
        }else {
            node1.parent.r_chilren=successor;
            successor.parent=node1.parent;
        }
    }
    d3.select("#g"+node1.id).transition().delay(delay*1000/anSpeed).ease(d3.easeCircle)
        .duration(2000/anSpeed).remove();
    return true;
}

// function printCallStack() {
//     var i = 0;
//     var fun = arguments.callee;
//     do {
//         fun = fun.arguments.callee.caller;
//         console.log(++i + ': ' + fun);
//     } while (fun);
// }