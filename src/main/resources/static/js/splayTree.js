var delay=0;
var current=0;
var root=null;
var myOut=null;
var numArray=new Array();
function splayNode(data,parent) {
    this.data=data;
    this.parent=parent;
    this.l_chilren=null;
    this.r_chilren=null;
    this.x=null;
    this.y=null;
    this.id=null;
}

function splay(node,data,bz) {
    if(node==null){
        return node;
    }
    var N=new splayNode(null,null);
    var l=N;
    var r=N;
    while(true){
        var cmp=data-node.data;
        if(cmp<0){
            if(node.l_chilren==null){
                break;
            }
            if((data-node.l_chilren.data)<0){
               node=singleRightRotation(node);
               delay+=3;
               if(node.l_chilren==null){
                   break;
               }
            }
            //右子树链 就把新的右节点链到右子树上去
            if(r!=N){
             moveNodeToNode2(r,node);
                delay+=3;
                if(isLeft(node)){
                    node.parent.l_chilren=null;
                }else {
                    node.parent.r_chilren=null;
                }
            }
            r.l_chilren=node;
            node.parent=r;
            r=node;
            node=node.l_chilren;
        }else if(cmp>0){
            if(node.r_chilren==null){
                break;
            }
            if((data-node.r_chilren.data)>0){
                node=singleLeftRotation(node);
                delay+=3;
                if(node.r_chilren==null){
                    break;
                }
            }
            //左子树链 就把新的左节点链到左子树上去
            if(l !=N){
                moveNodeToNode(l,node);
                delay+=2;
                if(isLeft(node)){
                    node.parent.l_chilren=null;
                }else {
                    node.parent.r_chilren=null;
                }
            }
            l.r_chilren=node;
            node.parent=l;
            l=node;
            node=node.r_chilren;
        }else {
            break;
        }
    }
    root=node;
    node.parent=null;
    l.r_chilren=null;
    r.l_chilren=null;
    var flag=0;
    //移动l节点到根节点左子树
    if(N.r_chilren!=null){
        var id1=N.r_chilren.id;
            setTimeout(function () {
                d3.select("#line"+id1).remove();
            },delay*1000/anSpeed);
            delay++;
            var cx=N.r_chilren.x;
            var cy=N.r_chilren.y;
            var subx=520-parseInt(cx);
            var suby=60-parseInt(cy);
            aviodCash(N.r_chilren,subx,suby,delay,2);
            setTimeout(function () {
                printLine(id1,548,39,535,48,"#000",1,0,1000);
                $("#g"+id1).append($("#line"+id1));
            },delay*1000/anSpeed);
        }
        //移动目标节点左子树到l节点右子树
        if(node.l_chilren!=null&&l!=N) {
            var id2=node.l_chilren.id;
            node.l_chilren.parent = l;
            setTimeout(function () {
                d3.select("#line"+id2).remove();
            },delay*1000/anSpeed);
            delay++;
            var cx=node.l_chilren.x;
            var cy=node.l_chilren.y;
            var subx=560-parseInt(cx);
            var suby=90-parseInt(cy);
            aviodCash(node.l_chilren,subx,suby,delay,2);
            setTimeout(function () {
                printLine(id2,532,69,545,78,"#000",1,0,1000);
                $("#g"+id2).append($("#line"+id2));
            },delay*1000/anSpeed);
        }
        //移动r节点到根节点右子树
        if(N.l_chilren!=null){
            var id3=N.l_chilren.id;
            setTimeout(function () {
                d3.select("#line"+id3).remove();
            },delay*1000/anSpeed);
            delay++;
            var cx=N.l_chilren.x;
            var cy=N.l_chilren.y;
            var subx=600-parseInt(cx);
            var suby=60-parseInt(cy);
            aviodCash(N.l_chilren,subx,suby,delay,2);
            setTimeout(function () {
                printLine(id3,572,39,585,48,"#000",1,0,1000);
                $("#g"+id3).append($("#line"+id3));
            },delay*1000/anSpeed);
        }
        //移动目标节点右子树到r节点左子树
        if(node.r_chilren!=null&&r!=N) {
            node.r_chilren.parent = r;
            var id4=node.r_chilren.id;
            setTimeout(function () {
                d3.select("#line"+id4).remove();
            },delay*1000/anSpeed);
            delay++;
            var cx=node.r_chilren.x;
            var cy=node.r_chilren.y;
            var subx=560-parseInt(cx);
            var suby=90-parseInt(cy);
            aviodCash(node.r_chilren,subx,suby,delay,2);
            setTimeout(function () {
                printLine(id4,588,69,575,78,"#000",1,0,1000);
                $("#g"+id4).append($("#line"+id4));
            },delay*1000/anSpeed);
        }
        //移动目标节点或目标节点的前驱节点或后驱节点到根节点
    l.r_chilren=node.l_chilren;
    r.l_chilren=node.r_chilren;
    //画节点冲突 要用setTimeOut
    myOut=setTimeout(function () {
        d3.select("#line"+node.id).remove();
        var cx=node.x;
        var cy=node.y;
        var subx=560-parseInt(cx);
        var suby=30-parseInt(cy);
        root=null;
        if(l==N&&r==N&&node.l_chilren!=null&&node.r_chilren!=null) {
            aviodCash(node.l_chilren,subx,suby,0,2);
            aviodCash(node.r_chilren,subx,suby,0,2);
        }else if(r==N&&node.r_chilren!=null){
            aviodCash(node.r_chilren,subx,suby,0,2);
        }else if(l==N&&node.l_chilren!=null){
            aviodCash(node.l_chilren,subx,suby,0,2);
        }
        root=node;
        moveG_T("g"+node.id,subx,suby,0,1000);
        node.x=560;
        node.y=30;
    },delay++*1000/anSpeed);
    node.l_chilren=N.r_chilren;
    node.r_chilren=N.l_chilren;
    if(N.r_chilren!=null) {
        N.r_chilren.parent = node;
    }
    if(N.l_chilren!=null) {
        N.l_chilren.parent = node;
    }
    if(bz==1) {
        setTimeout(function () {
            rotationCash(node, 0);
        }, delay++ * 1000 / anSpeed);
    }
    return node;
}

function insert(data) {
    if(data==undefined) {
        var data = $(".text-input").val();
        $(".text-input").val("");
    }
    if(root==null)
    {
        root=new splayNode(data,null);
        root.x=560;
        root.y=30;
        root.id=current;
        printCircle(current++,560,30,15,data,0,2000,"black");
    }
    else {
        var temp=root;
        insertNode(data,temp,"black");
        root=splay(root,data,1);
        // clearInterval(interyal);
        // forbiddenButton(delay/anSpeed);
        // delay=0;
    }
}

function insertNode(data,node1,color){
    if(data<node1.data)
    {
        if(node1.l_chilren==null)
        {
            node1.l_chilren=new splayNode(data,node1);
            node1.l_chilren.id=current;
            node1.l_chilren.x=parseInt(node1.x)-40;
            node1.l_chilren.y=parseInt(node1.y)+30;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            printLine(current,node1.x-12,node1.y+9,node1.x-25,node1.y+18,"#000",1,delay*1000,2000);
            printCircle(current,node1.l_chilren.x,node1.l_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay+=2;
            return node1.l_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertNode(data,node1.l_chilren,color);
        }
    }else {
        if(node1.r_chilren==null)
        {
            node1.r_chilren=new splayNode(data,node1);
            node1.r_chilren.id=current;
            node1.r_chilren.x=parseInt(node1.x)+40;
            node1.r_chilren.y=parseInt(node1.y)+30;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            printLine(current,node1.x+12,node1.y+9,node1.x+25,node1.y+18,"#000",1,delay*1000,2000);
            printCircle(current,node1.r_chilren.x,node1.r_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay+=2;
            return node1.r_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertNode(data,node1.r_chilren,color);
        }
    }
};

function singleRightRotation(node1) {
    var node2=node1.l_chilren;
    moveNode_C(node2,node1,delay++);
    if(node1==root)
    {
        var line=printLine(node1.id,node1.x+12,node1.y+9,node1.x+12,node1.y+9,"#000",1,delay*1000,2000);
        $("#g"+node1.id).append($("#line"+node1.id));
        root=node2;
    }else {
        if(isLeft(node1)) {
            node1.parent.l_chilren=node2;
        }else {
            node1.parent.r_chilren = node2;
        }
    }
    if(node1.r_chilren==null)
    {
        var move_x1 = parseInt($("#circle" + node1.id).attr("cx")) + 12 - $("#line" + node1.id).attr("x1");
        var move_y1 = parseInt($("#circle" + node1.id).attr("cy")) + 9 - $("#line" + node1.id).attr("y1");
        var move_x2 = parseInt($("#circle" + node1.id).attr("cx")) + 25 - $("#line" + node1.id).attr("x2");
        var move_y2 = parseInt($("#circle" + node1.id).attr("cy")) + 18 - $("#line" + node1.id).attr("y2");
        moveLine("line" + node1.id, move_x1, move_y1, move_x2, move_y2, delay * 1000, 2000);
        moveCircle("circle"+node1.id,40,30,delay*1000,2000);
        moveRectOrText("text"+node1.id,40,30,delay*1000,2000);
        node1.x+=40;
        node1.y+=30;
    }else {
        moveNode_D(node1,node1.r_chilren,delay);
    }
    if(node2.r_chilren!=null) {
        var temp = new splayNode("-1", null);
        temp.id="temp";
        temp.x = node1.x - 40;
        temp.y = node1.y + 30;
        d3.select("#canvas").append("line").
        attr("x1",node1.x-12).attr("y1",node1.y+9).attr("x2",node1.x-25).attr("y2",node1.y+18).attr("id","linetemp").attr("opacity",0);
        moveNode_A(node2.r_chilren,temp,delay);
        setTimeout(function () {
            d3.select("#linetemp").remove();
        },(delay+1)*1000/anSpeed);
        node2.r_chilren.parent = node1;
    }
    node1.l_chilren=node2.r_chilren;
    node2.parent=node1.parent;
    node1.parent=node2;
    node2.r_chilren=node1;
    return node2;
}

function singleLeftRotation(node1) {
    var node2=node1.r_chilren;
    moveNode_D(node2,node1,delay++);
    if(node1==root)
    {
        var line=printLine(node1.id,node1.x-12,node1.y+9,node1.x-25,node1.y+18,"#000",1,delay*1000,2000);
        $("#g"+node1.id).append($("#line"+node1.id));
        root=node2;
    }else {
        if(isLeft(node1)) {
            node1.parent.l_chilren=node2;
        }else {
            node1.parent.r_chilren = node2;
        }
    }
    if(node1.l_chilren==null)
    {
        var move_x1 = parseInt($("#circle" + node1.id).attr("cx")) - 12 - $("#line" + node1.id).attr("x1");
        var move_y1 = parseInt($("#circle" + node1.id).attr("cy")) + 9 - $("#line" + node1.id).attr("y1");
        var move_x2 = parseInt($("#circle" + node1.id).attr("cx")) - 25 - $("#line" + node1.id).attr("x2");
        var move_y2 = parseInt($("#circle" + node1.id).attr("cy")) + 18 - $("#line" + node1.id).attr("y2");
        moveLine("line" + node1.id, move_x1, move_y1, move_x2, move_y2, delay * 1000, 2000);
        moveCircle("circle"+node1.id,-40,30,delay*1000,2000);
        moveRectOrText("text"+node1.id,-40,30,delay*1000,2000);
        node1.x-=40;
        node1.y+=30;
    }else {
        moveNode_C(node1,node1.l_chilren,delay);
    }
    if(node2.l_chilren!=null) {
        var temp = new splayNode("-1", null);
        temp.id="temp";
        temp.x = node1.x + 40;
        temp.y = node1.y + 30;
        d3.select("#canvas").append("line").
        attr("x1",node1.x+12).attr("y1",node1.y+9).attr("x2",node1.x+25).attr("y2",node1.y+18).attr("id","linetemp").attr("opacity",0);
        moveNode_A(node2.l_chilren, temp, delay);
        setTimeout(function () {
            d3.select("#linetemp").remove();
        },(delay+1)*1000/anSpeed);
        node2.l_chilren.parent = node1;
    }
    node1.r_chilren=node2.l_chilren;
    node2.parent=node1.parent;
    node1.parent=node2;
    node2.l_chilren=node1;
    return node2;
}

function del() {
  var data=$(".text-input").val();
  root=removeNode(root,data);
  delay=0;
}

function removeNode(node,data) {
    if(node!=null){
        var node1=findNode(data,root);
        if(node1!=-1){
            node=splay(node,data,2);
            delay+=3;
            var x=null;
            if(node.l_chilren!=null){
                setTimeout(function () {
                     d3.select("#g"+node1.id).remove();
                     x=splay(node.l_chilren,data,1);
                    },delay++*1000/anSpeed);
                setTimeout(function () {
                    x.r_chilren=node.r_chilren;
                },delay++*1000/anSpeed);
            }else {
                root=node.r_chilren;
            }
        }
    }
}

function moveNodeToNode(node1,node2) {
        setTimeout(function () {
            d3.select("#line"+node2.id).remove();
        },delay*1000/anSpeed);
        delay++;
        var cx=node2.x;
        var cy=node2.y;
        var subx=node1.x+40-parseInt(cx);
        var suby=node1.y+30-parseInt(cy);
        var x1=node1.x+12;
        var y1=node1.y+9;
        var x2=node1.x+25;
        var y2=node1.y+18;
        aviodCash(node2,subx,suby,delay,2);
        setTimeout(function () {
            printLine(node2.id,x1,y1,x2,y2,"#000",1,0,1000);
            $("#g"+node2.id).append($("#line"+node2.id));
        },delay*1000/anSpeed);
}


function moveNodeToNode2(node1,node2) {
        setTimeout(function () {
            d3.select("#line"+node2.id).remove();
        },delay*1000/anSpeed);
        delay++;
        var cx=node2.x;
        var cy=node2.y;
        var subx=node1.x-40-parseInt(cx);
        var suby=node1.y+30-parseInt(cy);
        var x1=node1.x-12;
        var y1=node1.y+9;
        var x2=node1.x-25;
        var y2=node1.y+18;
        aviodCash(node2,subx,suby,delay,2);
        setTimeout(function () {
            printLine(node2.id,x1,y1,x2,y2,"#000",1,0,1000);
            $("#g"+node2.id).append($("#line"+node2.id));
        },delay*1000/anSpeed);
}


function rotationCash(node1,delay) {
    if(node1.l_chilren==null&&node1.r_chilren==null){
        return isCrash(node1,delay);
    }
    if(node1.l_chilren!=null){
        delay=rotationCash(node1.l_chilren,delay);

    }
    if(node1.r_chilren!=null){
        delay=rotationCash(node1.r_chilren,delay);
    }
    return delay;
}

function circleProperty(obj) {
    var data=$(obj).text();
    var node1=smallFind(data,root);
    if(node1.l_chilren!=null) {
        $("#code2").text("l_chilren=" + node1.l_chilren.data);
    }else {
        $("#code2").text("l_chilren=null");
    }
    if(node1.r_chilren!=null){
        $("#code3").text("r_chilren="+node1.r_chilren.data);
    }else {
        $("#code3").text("r_chilren=null");
    }
    if(node1.parent!=null) {
        $("#code4").text("parent="+node1.parent.data);
    }else {
        $("#code4").text("parent=null");
    }
    $("#code5").text("x="+node1.x);
    $("#code6").text("y="+node1.y);
    $("#code7").text("circle.x="+$("#circle"+node1.id).attr("cx"));
}

function smallFind(data,node1) {
    if(data==node1.data)
    {
        return node1;
    }
    else {
        if(data<node1.data&&node1.l_chilren!=null)
        {
            return smallFind(data,node1.l_chilren);
        }else if(data>node1.data&&node1.r_chilren!=null){
            return smallFind(data,node1.r_chilren);
        }else {
            return -1;
        }
    }
}

function find() {
    var data=$(".text-input").val();
    splay(root,data,1);
    delay=0;
}

function autoTest() {
    d3.selectAll("g").remove();
    numArray.splice(0,numArray.length);
    for(var i=0;i<20;i++) {
        var t=Math.floor(Math.random() * 1000)
        numArray.push(t);
    }
    var c=0;
    var str="";
    // numArray=[544,702,10,163,667,943,381,86,233,72,934,569,735,652,363,873,90,871,188,781];
    for(var i=0;i<numArray.length;i++){
        str+=numArray[i]+" ";
    }
    console.log("test:"+str);
    autoInsert(c);
}

function autoInsert(c) {
    insert(numArray[c]);
    delay+=10;
    setTimeout(function () {
        var flag=checkOut(root);
        if(!flag){
            var str="";
            for(var i=0;i<=c;i++){
                str+=numArray[i]+" ";
            }
            console.log("error:"+str);
        }else {
            c++;
            if(c<numArray.length){
                delay=0;
                autoInsert(c);
            }
        }
    },delay*1000/anSpeed);
}

function checkOut(node) {
    var id=node.id;
    if($("#circle"+id).attr("cx")!=node.x){
        console.log(node.data+" id="+node.id+" cx="+$("#circle"+id).attr("cx")+
            " nx="+node.x);
        return false;
    }
    if($("#circle"+id).attr("cy")!=node.y){
        console.log(node.data+" id="+node.id+" cy="+$("#circle"+id).attr("cy")+
            " ny="+node.y);
        return false;
    }
    if(node.l_chilren!=null){ return checkOut(node.l_chilren);}
    if(node.r_chilren!=null){ return checkOut(node.r_chilren);}
    return true;
}