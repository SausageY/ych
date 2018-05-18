function addValue(id,data,delay) {
    setTimeout(function () {
        var g=d3.select("#g"+id);
        var rect=g.select("rect");
        var width=rect.attr("width");
        rect.transition().attr("width",parseInt(width)+35);
        for(var i=0;i<data.length;i++){
            g.select("#t"+i).text(data[i]);
        }
    },delay/anSpeed)
}

function addValue2(id,data,delay) {
    setTimeout(function () {
        var g=d3.select("#g"+id);
        for(var i=0;i<data.length;i++){
            var a=g.select("#t"+i).attr("x");
            var b=data[i];
            g.select("#t"+i).text(data[i]);
        }
        for(var j=data.length;j<3;j++){
            g.select("#t"+j).text("");
        }
    },delay/anSpeed)
}


function moveValue(start_id,start_index,end_id,end_index,delay,time) {
    var g_start=d3.select("#g"+start_id);
    var g_end=d3.select("#g"+end_id);
    var end_x=g_end.select("#t"+end_index).attr("x");
    var end_y=g_end.select("#t"+end_index).attr("y");
    var start_x=g_start.select("#t"+start_index).attr("x");
    var start_y=g_start.select("#t"+start_index).attr("y");
    g_start.select("#t"+start_index).transition().delay(delay/anSpeed).duration(time/anSpeed)
        .attr("x",end_x).attr("y",end_y).on("end",function () {
        g_end.select("#t"+end_index).text(g_start.select("#t"+start_index).text());
        g_start.select("#t"+start_index).text("").attr("x",start_x).attr("y",start_y);
    })
}

function removeValue(id,index,delay) {
   var g=d3.select("#g"+id);
   g.select("#t"+index).transition().delay(delay/anSpeed).text("");
}

function printNode(id,x,y,width,height,data,size,delay) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","g"+id);
    g.append("rect").attr("x", x).attr("y", y).attr("width", 0).attr("id","rect"+id)
        .attr("height", height).attr("fill", "white").attr("stroke-width", 1).attr("stroke", "black")
        .transition()
        .delay(function (d, i) {
            return delay*1000/anSpeed;
        }).duration(2000/anSpeed)
        .ease(d3.easeCircle)
        .attr("width", width).on("end",function () {
        if(Array.isArray(data)){
            for(var i=0;i<data.length;i++){
                g.select("#t"+i).text(data[i]);
            }
        }else {
            g.select("#t0").text(data);
        }
    });
    for(var i=0;i<size+1;i++) {
        x=parseInt(x);
        y=parseInt(y);
        g.append("text").attr("dy", "1em").attr("x", x+17.5+i*35)
            .attr("y", y + height / 4).attr("text-anchor", "middle").attr("id", "t"+i)
            .attr("onclick","rectProperty(this)")
            .style("font", "12px Open Sans");
    }
    return g;
}


function addNodeLine(id,x1,y1,delay) {
    setTimeout(function () {
        var x2=parseInt($("#rect"+id).attr("x"))+parseInt($("#rect"+id).attr("width"))/2;
        var y2=parseInt($("#rect"+id).attr("y"));
        printLine(id,x1,y1,x2,y2,"#000",1,0,2000);
        $("#g"+id).append($("#line"+id));
    },delay/anSpeed);
}


function movebTreeNodes(node1,x,y,delay,type) {
    if(node1.parent==root||type==1) {
        moveRectCX2(node1,x,y,delay);
    }else {
        moveG_B(node1, x, y, delay * 1000, 1000);
    }
    node1.x=node1.x+x;
    node1.y=node1.y+y;
    for(var i=0;i<node1.child.length;i++){
        movebTreeNodes(node1.child[i],x,y,delay,2);
    }
}

function moveRectCX2(node1,x,y,delay) {
    moveLine("line"+node1.id,0,0,x,y,delay*1000,1000);
    moveRectOrText("rect"+node1.id,x,y,delay*1000,1000);
    moveText_B(node1,x,y,delay*1000,1000);
}

function moveG_B(node,x,y,delay,time) {
    setTimeout(function () {
        if($("#g"+node.id).children("line").length>0)
        {
            var line_id=$("#g"+node.id).children("line").attr("id");
            moveLine(line_id,x,y,x,y,0,time);
        }
        if($("#g"+node.id).children("rect").length>0)
        {
            var rect_id=$("#g"+node.id).children("rect").attr("id");
            moveRectOrText(rect_id,x,y,0,time);
        }
        if($("#g"+node.id).children("text").length>0)
        {
            moveText_B(node,x,y,0,time);
        }
    },delay/anSpeed)
}

function moveText_B(node1,x,y,delay,time) {
    setTimeout(function () {
        for(var i=0;i<nodeMaxSize+1;i++){
            var t=d3.select("#g"+node1.id).select("#t"+i);
            var ox=parseInt(t.attr("x"));
            var oy=parseInt(t.attr("y"));
            t.transition()
                .duration(time/anSpeed)
                .ease(d3.easeCircle)
                .attr("x",ox+x)
                .attr("y",oy+y);
        }
    },delay/anSpeed);
}

function changeRectLength(node,x,delay) {
    setTimeout(function () {
        var ox=parseInt($("#rect"+node.id).attr("width"));
        d3.select("#rect"+node.id).transition().attr("width",ox+x);
        if(node.child.length>0){
            for(var i=0;i<node.child.length;i++){
                $("#line"+node.child[i].id).attr("x1",parseInt(node.x)+35*i);
            }
        }
    },delay/anSpeed)
}



function avoidOverlap(node,reslut,delay) {
    setTimeout(function () {
        if(reslut.length==0&&node!=root) {
            var deep = 0;
            while (node.parent != null) {
                node = node.parent;
                deep++;
            }
            getSameDeepNode(root, 0, reslut, deep);
        }
        var total_w=0;
        for(var i=0;i<reslut.length;i++){
            total_w+=getWidth(reslut[i]);
        }
        var star=parseInt(577-total_w/2);
        for(var i=0;i<reslut.length;i++){
            var width=getWidth(reslut[i]);
            var subx=0;
            if(width<=105){
                 subx=star-reslut[i].x;
            }else {
                 subx = star + width / 2 - reslut[i].x;
            }
            movebTreeNodes(reslut[i],subx,0,0,1);
            star=star+width;
        }
    },delay/anSpeed);
}

function getWidth(node) {
    var width=0;
    if(node.child.length==0) {
        return parseInt($("#rect"+node.id).attr("width"))+35;
    }
    for(var i=0;i<node.child.length;i++){
        width+=getWidth(node.child[i]);
    }
    return width;
}

function getSameDeepNode(node,deep,reslut,target) {
   if(deep==target){
       reslut.push(node);
   }else{
       deep++;
       for(var i=0;i<node.child.length;i++){
           getSameDeepNode(node.child[i],deep,reslut,target);
       }
   }
}

function sortLine(node,delay) {
    setTimeout(function () {
        if(node.child.length>0){
            for(var i=0;i<node.child.length;i++){
                d3.select("#line"+node.child[i].id).attr("x1",node.x+i*35).attr("y1",node.y+30);
            }
        }
        },delay/anSpeed);
}

