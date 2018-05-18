var root=null;
var current=0;
var delay=0;

function insert() {
    var data=$(".text-input").val();
    console.log("insert "+data);
    if(root==null)
    {
     root=new node(data,null);
     root.x=560;
     root.y=30;
     root.id=current;
     printCircle(current++,560,30,15,data,0,2000,"black");
    }
    else {
      var temp=root;
      insertNode(data,temp,"black");
      delay=0;
    }
};

function del() {
    var data=$(".text-input").val();
    var temp=root;
    var node1=findNode(data,temp);
    if(node1!=-1){
        moveNode(node1,delay);
    }
    delay=0;
};

function find(){
    var data=$(".text-input").val();
    var temp=root;
    findNode(data,temp);
    delay=0;
};

function node(data,parent) {
    this.data=data;
    this.parent=parent;
    this.l_chilren=null;
    this.r_chilren=null;
    this.x=null;
    this.y=null;
    this.id=null;
};


