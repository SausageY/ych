//package algorithms.tree;
//
//public class SplayTree<E extends Comparable<E>> extends DefaultBSTree<E> implements BSTree<E> {
//
//
//
//    static class SplayTreeNode<E extends Comparable<E>> extends BSTNode<E>
//    {
//
//        SplayTreeNode<E> parent;
//
//        SplayTreeNode(SplayTreeNode<E> parent,E key) {
//            super(key);
//            this.parent=parent;
//
//
//        }
//
//    }
//
//
//
//    @Override
//    public boolean delete(E ele) {
//        return _delete((SplayTreeNode<E>)root,ele);
//    }
//
//
//
//    private boolean _delete(SplayTreeNode<E> pointer, E ele) {
//        int cmp=ele.compareTo(pointer.key);
//        while(cmp!=0)
//        {
//            if(cmp<0)
//            {
//                pointer=(SplayTreeNode<E>)pointer.left;
//            }
//            else
//            {
//                pointer=(SplayTreeNode<E>)pointer.right;
//            }
//            if(pointer==null)return false;
//            cmp=ele.compareTo(pointer.key);
//        }
//        //okay find it
//        SplayTreeNode<E> p=pointer.parent;
//        if(pointer.left==null)
//        {
//            if(p!=null)
//            {
//                keep_right(pointer);
//                splay(p);
//            }
//            else {
//                root = p.right;
//                if(root!=null)((SplayTreeNode<E>)root).parent=null;
//            }
//
//        }
//        else if(pointer.right==null)
//        {
//            if(p!=null)
//            {
//                keep_left(pointer);
//                splay(p);
//            }
//            else {
//                root = p.left;
//                if(root!=null)((SplayTreeNode<E>)root).parent=null;
//            }
//        }
//        else
//        {
//            SplayTreeNode<E> todo=(SplayTreeNode<E>)pointer.left;
//            SplayTreeNode<E> todoP=null;
//            while(todo.right!=null)
//            {
//                todoP=todo;
//                todo=(SplayTreeNode<E>)todo.right;
//            }
//            pointer.key=todo.key;
//            if (todoP != null) {
//                todoP.right = todo.left;
//                if (todo.left != null)
//                    ((SplayTreeNode<E>) todo.left).parent = todoP;
//            }
//            else
//            {
//                pointer.left=null;
//            }
//            splay(pointer.parent);
//
//        }
//        return true;
//    }
//
//
//
//    private void keep_left(SplayTreeNode<E> pointer) {
//        SplayTreeNode<E> p=pointer.parent;
//        if(p.left==pointer)
//        {
//            p.left=pointer.left;
//            if(p.left!=null)((SplayTreeNode<E>)p.left).parent=p;
//        }
//        else if(p.right==pointer)
//        {
//            p.right=pointer.left;
//            if(p.right!=null)((SplayTreeNode<E>)p.right).parent=p;
//        }
//
//    }
//
//
//
//    private void keep_right(SplayTreeNode<E> pointer) {
//        SplayTreeNode<E> p=pointer.parent;
//        if(p.left==pointer)
//        {
//            p.left=pointer.right;
//            if(p.left!=null)((SplayTreeNode<E>)p.left).parent=p;
//        }
//        else if(p.right==pointer)
//        {
//            p.right=pointer.right;
//            if(p.right!=null)((SplayTreeNode<E>)p.right).parent=p;
//        }
//
//    }
//
//
//
//
//
//
//
//    protected void splay(SplayTreeNode<E> cur) {
//
//        if(cur==null)return;
//
//        while(cur!=root)
//        {
//            if(cur.parent==root)
//            {
//                //single Rotation
//                SingleRotation(cur,cur.parent);
//                cur.parent=null;
//                root=cur;
//
//            }
//            else if(cur.parent.left==cur&&cur.parent.parent.left==cur.parent)
//            {
//
//                cur=Left_ZigZig(cur,cur.parent,cur.parent.parent);
//
//            }
//            else if(cur.parent.right==cur&&cur.parent.parent.right==cur.parent)
//            {
//                cur=Right_ZigZig(cur,cur.parent,cur.parent.parent);
//            }
//            else if(cur.parent.left==cur&&cur.parent.parent.right==cur.parent)
//            {
//                cur=RL_ZigZag(cur,cur.parent,cur.parent.parent);
//            }
//            else if(cur.parent.right==cur&&cur.parent.parent.left==cur.parent)
//            {
//                cur=LR_ZigZag(cur,cur.parent,cur.parent.parent);
//            }
//            else
//            {
//                System.out.println("Oooops!!!");
//            }
//        }
//    }
//
//
//
//    private SplayTreeNode<E> LR_ZigZag(SplayTreeNode<E> cur,
//                                       SplayTreeNode<E> p, SplayTreeNode<E> g) {
//        SplayTreeNode<E> gp=g.parent;
//
//        g.left=cur.right;
//        setParent(cur.right,g);
//
//        g.parent=cur;
//        cur.right=g;
//
//        p.right=cur.left;
//        setParent(cur.left,p);
//
//        p.parent=cur;
//        cur.left=p;
//        if(gp!=null)
//        {
//            if(gp.left==g)
//            {
//                gp.left=cur;
//            }
//            else
//            {
//                gp.right=cur;
//
//            }
//        }
//        else root=cur;
//        cur.parent=gp;
//        return cur;
//    }
//
//
//
//    private SplayTreeNode<E> RL_ZigZag(SplayTreeNode<E> cur,
//                                       SplayTreeNode<E> p, SplayTreeNode<E> g) {
//        SplayTreeNode<E> gp=g.parent;
//
//        g.right=cur.left;
//        setParent(cur.left,g);
//
//        g.parent=cur;
//        cur.left=g;
//
//        p.left=cur.right;
//        setParent(cur.right,p);
//
//        p.parent=cur;
//        cur.right=p;
//        if(gp!=null)
//        {
//            if(gp.left==g)
//            {
//                gp.left=cur;
//            }
//            else
//            {
//                gp.right=cur;
//
//            }
//        }
//        else root=cur;
//        cur.parent=gp;
//        return cur;
//    }
//
//
//
//    protected SplayTreeNode<E> Right_ZigZig(SplayTreeNode<E> cur, SplayTreeNode<E> p,
//                                            SplayTreeNode<E> g) {
//        SplayTreeNode<E> gp=g.parent;
//
//        g.right=p.left;
//        setParent(p.left,g);
//
//
//        p.right=cur.left;
//        setParent(cur.left,p);
//
//        g.parent=p;
//        p.left=g;
//
//        p.parent=cur;
//        cur.left=p;
//        if(gp!=null)
//        {
//            if(gp.left==g)
//            {
//                gp.left=cur;
//            }
//            else
//            {
//                gp.right=cur;
//
//            }
//        }
//        else root=cur;
//        cur.parent=gp;
//        return cur;
//
//    }
//
//
//
//    protected SplayTreeNode<E> Left_ZigZig(SplayTreeNode<E> cur, SplayTreeNode<E> p,
//                                           SplayTreeNode<E> g) {
//        SplayTreeNode<E> gp=g.parent;
//        g.left=p.right;
//        setParent(p.right,g);
//
//        g.parent=p;
//        p.right=g;
//
//
//        p.left=cur.right;
//        setParent(cur.right,p);
//
//        p.parent=cur;
//        cur.right=p;
//        if(gp!=null)
//        {
//            if(gp.left==g)
//            {
//                gp.left=cur;
//            }
//            else
//            {
//                gp.right=cur;
//
//            }
//        }
//        else root=cur;
//        cur.parent=gp;
//        return cur;
//
//    }
//
//
//
//    final void setParent(BSTNode<E> c, BSTNode<E> p) {
//        if(c!=null)((SplayTreeNode<E>)c).parent=(SplayTreeNode<E>)p;
//
//    }
//
//
//
//    private void SingleRotation(SplayTreeNode<E> cur, SplayTreeNode<E> p) {
//        if(p.left==cur)
//        {
//
//            p.left=cur.right;
//            if(cur.right!=null)((SplayTreeNode<E>)cur.right).parent=p;
//            cur.right=p;
//            p.parent=cur;
//
//        }
//        else if(p.right==cur)
//        {
//            p.right=cur.left;
//            if(cur.left!=null)((SplayTreeNode<E>)cur.left).parent=p;
//            cur.left=p;
//            p.parent=cur;
//
//        }
//
//
//    }
//
//
//
//    @Override
//    public void insert(E ele) {
//
//        if (root == null) {
//            root = new SplayTreeNode<E>(null,ele);
//            return;
//        }
//        _insert((SplayTreeNode<E>)root,ele);
//    }
//
//    private final void _insert(SplayTreeNode<E> pointer,E ele)
//    {
//
//        int cmp=pointer.key.compareTo(ele);
//        if(cmp==0)
//        {
//            throw new IllegalArgumentException();
//        }
//        if(cmp>0)
//        {
//            if(pointer.left==null)
//            {
//                pointer.left =new SplayTreeNode<E>(pointer,ele);
//                splay((SplayTreeNode<E>)pointer.left);
//                return;
//            }
//            _insert((SplayTreeNode<E>)pointer.left,ele);
//
//        }
//        else
//        {
//            if(pointer.right==null)
//            {
//                pointer.right=new SplayTreeNode<E>(pointer,ele);
//                splay((SplayTreeNode<E>)pointer.right);
//                return ;
//            }
//            _insert((SplayTreeNode<E>)pointer.right,ele);
//        }
//    }
//
//
//
//
//    @Override
//    public boolean search(E ele) {
//        return _search((SplayTreeNode<E>)root,ele);
//    }
//
//
//    private boolean _search(SplayTreeNode<E> pointer, E ele) {
//        if(pointer==null)return false;
//        int cmp=pointer.key.compareTo(ele);
//        if(cmp==0)
//        {
//            splay(pointer);
//            return true;
//        }
//
//        if(cmp>0)
//        {
//
//
//            return _search((SplayTreeNode<E>)pointer.left,ele);
//
//        }
//        else
//        {
//
//
//            return _search((SplayTreeNode<E>)pointer.right,ele);
//        }
//    }
//
//
//    /**
//     *
//     */
//    public SplayTree() {
//
//    }
//
//}
//
//伸展树java代码