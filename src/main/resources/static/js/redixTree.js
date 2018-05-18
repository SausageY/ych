var root=null;
var current=0;
var delay=0;
function redixNode(data,parent) {
    this.parent=parent;
    this.child=new Array();
    this.x=null;
    this.y=null;
    this.data=data;
    this.id=null;
    this.flag=1;
    this.width=30;
}

function insert() {
    var data=$(".text-input").val();
    if(!isNaN(data)){
        return;
    }else {
        data = data.toUpperCase();
        if (data != "") {
            if (root == null) {
                root = new redixNode(data, null);
                root.x = 560;
                root.y = 30;
                root.id = current;
                printCircle(current++, 560, 30, 15, data, 0, 2000, "red");
            } else {
                insertNode(data);
                delay=0;
            }
        }
    }
}

function insertNode(data) {
    changeGraphStroke("circle"+root.id,"#fff463",delay++*1000,3,1000);
    delay++;
    if(root.data!="") {
        var len = -1;
        if ((len = getMaxSameString(root.data, data)) == -1) {
            var newNode = new redixNode("", null);
            newNode.flag=0;
            newNode.x = 560;
            newNode.y = 30;
            newNode.id = current;
            printCircle(current++, 560, 30, 15, "", delay * 1000, 2000, "black");
            moveAll(root, 0, 40);
            printLine(root.id, 560, 45, 560, 52, "black", 1, delay * 1000, 2000);
            $("#g" + root.id).append($("#line" + root.id));
            newNode.child.push(root);
            root.parent = newNode;
            root = newNode;
            root.width+=30;
            addNode(root, data,1);
        } else {
                if (data == root.data) {
                    d3.select("#circle" + root.id).transition().delay(delay * 1000 / anSpeed)
                        .attr("stroke", "red");
                } else if (len == data.length - 1) {
                    d3.select("#circle" + root.id).transition().delay(delay * 1000 / anSpeed)
                        .attr("stroke", "red");
                    d3.select("#text" + root.id).transition().delay(delay * 1000 / anSpeed)
                        .text(data);
                    var dif = root.data.substring(len + 1, root.data.length);
                    root.data=data;
                    root.flag=1;
                    addNode(root, dif,1);
                } else if(len==root.data.length-1){
                    addNodeParentNotRoot(root, data.substring(len + 1, data.length),2);
                }else {
                    addNodeParentNotRoot(root, data,1);
                }
            }
    }else {
        addNodeParentNotRoot(root,data,1);
    }
}

function addNodeParentNotRoot(node,data,flag) {
    //flag=2 用于避免重复字符 比如g gg
    if(node.child.length==0&&(getMaxSameString(node.data,data)==-1||flag==2)){
        addNode(node, data,1);
    }else {
        var len=-1;
        if((len=getMaxSameString(node.data,data))!=-1) {
            //node是否是红色的 决定第二个子节点的颜色 node的子树如何成为第二个节点的子树
            if(node.child.length>0){
                d3.select("#text" + node.id).transition().delay(delay++ * 1000 / anSpeed).text(node.data.substring(len + 1, node.data.length));
                moveAll(node, 0, 40);
                var newNode=new redixNode(data.substring(0,len+1),node.parent);
                newNode.id=current;
                newNode.x = node.x;
                newNode.y = node.y-40;
                newNode.flag=0;
                printCircle(current++, newNode.x, newNode.y, 15, data.substring(0,len+1), delay * 1000, 2000, "black");
                printLine(node.id,newNode.x,newNode.y+15,node.x,newNode.y+22,"black",1,delay*1000,1000);
                $("#g"+node.id).append($("#line"+node.id));
                if(node.parent!=null) {
                    var index = node.parent.child.indexOf(node);
                    node.parent.child.splice(index, 1);
                    node.parent.child.push(newNode);
                }else {
                    root=newNode;
                }
                newNode.child.push(node);
                node.parent=newNode;
                delay+=3;
                addNode(newNode, data.substring(len + 1, data.length), 1);
            }else {
                d3.select("#circle" + node.id).transition().delay(delay * 1000 / anSpeed).attr("stroke", "#000");
                d3.select("#text" + node.id).transition().delay(delay * 1000 / anSpeed).text(data.substring(0, len + 1));
                addNode(node, data.substring(len + 1, data.length), 2);
                delay += 3;
                var newNode = addNode(node, node.data.substring(len + 1, node.data.length), 1);
                node.data = data.substring(0, len + 1);
                node.flag = 0;
            }
        }else {
            for (var i = 0; i < node.child.length; i++) {
                if ((len = getMaxSameString(node.child[i].data, data)) != -1) {
                    if (data == node.child[i].data) {
                        d3.select("#circle" + node.child[i].id).transition().delay(delay * 1000 / anSpeed)
                            .attr("stroke", "red");
                        break;
                    } else if (len == data.length - 1) {
                        d3.select("#circle" + node.child[i].id).transition().delay(delay * 1000 / anSpeed)
                            .attr("stroke", "red");
                        d3.select("#text" + node.child[i].id).transition().delay(delay * 1000 / anSpeed)
                            .text(data);
                        var dif = node.child[i].data.substring(len + 1, node.child[i].data.length);
                        node.child[i].data=data;
                        node.child[i].flag=1;
                        addNode(node.child[i], dif, 1);
                        break;
                    } else if (len == node.child[i].data.length - 1) {
                        changeGraphStroke("circle" + node.child[i].id, "#fff463", delay++ * 1000, 3, 1000);
                        delay++;
                        addNodeParentNotRoot(node.child[i], data.substring(len + 1, data.length),2);
                        break;
                    } else {
                        addNodeParentNotRoot(node.child[i], data,1);
                    }
                }
            }
            if (len == -1) {
                addNode(node, data, 1);
            }
        }
    }
}

function getMaxSameString(str1,str2) {
    var max = str1.length > str2.length ? str1 : str2;
    var min = (max == str1 ? str2 : str1);
    for(var i=0;i<min.length;i++){
        if(max[i]!=min[i]){
            return i-1;
        }
    }
    return min.length-1;
}

function addNode(node,data,f) {
    var newNode=new redixNode(data,node);
    newNode.id=current;
    if(node.child.length==0){
        newNode.x=node.x;
        newNode.y=node.y+40;
        printLine(current,node.x,node.y+15,node.x,node.y+22,"black",1,delay*1000,1000);
        printCircle(current++,newNode.x,newNode.y,15,data,delay++*1000,1000,"red");
        $("#g"+newNode.id).append($("#line"+newNode.id));
    }else {
        var preNode=node.child[node.child.length-1];
        newNode.x=preNode.x-preNode.width/2-15;
        newNode.y=preNode.y;
        var radio=getRatio(newNode,newNode.parent);
        var x1=newNode.parent.x+(newNode.x-newNode.parent.x)*radio;
        var y1=newNode.parent.y+(newNode.y-newNode.parent.y)*radio;
        var x2=newNode.x-(newNode.x-newNode.parent.x-3)*radio;
        var y2=newNode.y-(newNode.y-newNode.parent.y+4)*radio;
        printLine(current,x1,y1,x2,y2,"black",1,delay*1000,1000);
        printCircle(current++,newNode.x,newNode.y,15,data,delay++*1000,1000,"red");
        $("#g"+newNode.id).append($("#line"+newNode.id));
        if(node!=root){
        var temp=node;
        while(temp.parent!=root){
            temp=temp.parent;
        }
        if(temp.parent==root) {
            var index = root.child.indexOf(temp);
            for (var i = index + 1; i < root.child.length; i++) {
                moveAll(root.child[i], -30, 0);
            }
            delay += 2;
        }
        }
    }
    node.child.push(newNode);
    while(node.parent!=null) {
        node.width =getWidth(node);
        node = node.parent;
    }
    node.width=getWidth(node);
    delay++;
    if(f==1) {
        setTimeout(function () {
            setPosition(root);
        }, delay * 1000 / anSpeed);
    }
    return newNode;
}

function getWidth(node) {
    var width=0;
    if(node.child.length==0) {
        return 30;
    }
    for(var i=0;i<node.child.length;i++){
         width+=getWidth(node.child[i]);
    }
    return width;
}

function getRatio(node1,node2) {
    var l=Math.sqrt(Math.pow((node1.x-node2.x),2)+Math.pow((node1.y-node2.y),2));
    return 15/l;
}

function setPosition(node) {
    if(node.width<=30){
        return;
    }else {
          for(var i=0;i<node.child.length;i++){
              setPosition(node.child[i]);
          }
          var subx=node.child[node.child.length-1].x-15+node.width/2-node.x;
          node.x=node.child[node.child.length-1].x-15+node.width/2;
          setGPostion(node,subx);
    }
}

function setGPostion(node,subx) {
    moveCircleCX2(node,subx,0,0,1000);
    for(var i=0;i<node.child.length;i++){
        var subNode=node.child[i];
        var radio=getRatio(node,subNode);
        var x1=parseInt(node.x+(subNode.x-node.x)*radio);
        var y1=parseInt(node.y+(subNode.y-node.y)*radio);
        var x2=parseInt(subNode.x-(subNode.x-node.x)*radio);
        var y2=parseInt(subNode.y-(subNode.y-node.y)*radio);
        var oldx1=$("#line"+subNode.id).attr("x1");
        var oldy1=$("#line"+subNode.id).attr("y1");
        var oldx2=$("#line"+subNode.id).attr("x2");
        var oldy2=$("#line"+subNode.id).attr("y2");
        var subx=x1-oldx1;
        var suby=y1-oldy1;
        var subx2=x2-oldx2;
        var suby2=y2-oldy2;
        moveLine("line"+subNode.id,subx,suby,subx2,suby2,0,1000);
    }
}

function moveAll(node,subx,suby) {
    moveG_T("g"+node.id, subx, suby, delay * 1000, 2000);
    node.x+=subx;
    node.y+=suby;
    for(var i=0;i<node.child.length;i++){
        moveAll(node.child[i],subx,suby);
    }
}

function find() {
    var data=$(".text-input").val();
    if(!isNaN(data)){
        return;
    }else {
        data = data.toUpperCase();
        if(data!=""){
            if(findNode(root,data)!=-1 ){
                alert("找到啦~~~");
            }
        }
    }
}

function findNode(node,data) {
     changeGraphStroke("circle"+node.id,"#fff463",delay++*1000,3,1000);
     delay++;
    var len=-1;
     if(node.data==data&&node.flag==1){
         return node;
     }else if((len=getMaxSameString(node.data,data))!=-1){
         if(len==node.data.length-1){
             data=data.substring(len+1,data.length);
         }
     }
     if(node.child.length>0){
         for(var i=0;i<node.child.length;i++){
             if((len=getMaxSameString(data,node.child[i].data))!=-1){
                 if(data==node.child[i].data){
                     return node.child[i];
                 }
                 return findNode(node.child[i],data.substring(len+1,data.length));
             }
         }
     }
    alert("找不到啊~~~~");
    return -1;
}


function del() {
    var data=$(".text-input").val();
    if(!isNaN(data)){
        return;
    }else {
        data = data.toUpperCase();
        if(data!=""){
            var node=null;
            if((node=findNode(root,data))!=-1 ){
                if(node.child.length==0){
                   d3.select("#g"+node.id).transition().delay(delay*1000/anSpeed).remove();
                    var index=node.parent.child.indexOf(node);
                    if(index>-1){
                        node.parent.child.splice(index,1);
                    }
                    mergeNode(node.parent);
                }else {
                    d3.select("#circle"+node.id).transition().delay(delay*1000/anSpeed)
                        .attr("stroke","black");
                    node.flag=0;
                    mergeNode(node);
                }
            }
        }
    }
}

function mergeNode(node) {
    if(node.child.length==1&&node.flag==0) {
        if(node.child[0].flag==1) {
            d3.select("#circle" + node.id).transition().delay(delay * 1000 / anSpeed)
                .attr("stroke", "red");
            node.flag=1;
        }
        d3.select("#text"+node.id).transition().delay(delay*1000/anSpeed)
            .text(node.data+node.child[0].data);
        node.data=node.data+node.child[0].data;
        for(var i=0;i<node.child[0].child.length;i++){
            node.child[0].child[i].parent=node;
        }
        var subx=node.x-node.child[0].x;
        var suby=node.y-node.child[0].y;
        d3.select("#line"+node.child[0].id).transition().delay(delay*1000/anSpeed)
            .remove();
        moveAll(node.child[0],subx,suby);
        delay++;
        d3.select("#g"+node.child[0].id).transition().delay(delay*1000/anSpeed)
            .remove();
        node.child=node.child[0].child;
    }
}