package com.ych;
import java.io.*;
import java.util.*;

public class Sort {

    static class Point{
        Integer x;
        Integer y;
        Point(Integer x,Integer y) {
            this.x = x;
            this.y = y;
        }
    }
    public static  void  main(String args[]) {
        System.out.println(-1%32);
    }
//    public static  void  main(String args[]) throws UnsupportedEncodingException {
//        Scanner s=new Scanner(System.in);
//        String a=s.nextLine();
//        int n=Integer.parseInt(a.split(" ")[0]);
//        int k=Integer.parseInt(a.split(" ")[1]);
//        ArrayList<Integer> nandu=new ArrayList<>();
//        ArrayList<Integer> baochou=new ArrayList<>();
//        ArrayList<Integer> Ai=new ArrayList<>();
//        for(int i=0;i<n;i++)
//        {
//            String temp=s.nextLine();
//            int a1=Integer.parseInt(temp.split(" ")[0]);
//            int a2=Integer.parseInt(temp.split(" ")[1]);
//            nandu.add(a1);
//            baochou.add(a2);
//        }
//        String temp=s.nextLine();
//        quicksort(nandu,baochou,0,n-1);
//        String[] b1=temp.split(" ");
//        for(String b2:b1)
//        {
//            Ai.add(Integer.parseInt(b2));
//        }
//        for(Integer c:Ai)
//        {
//            int max=0;
//            int x=0;
//            for(int i=0;i<nandu.size();i++)
//            {
//                if(c>=nandu.get(i))
//                {
//                    max=baochou.get(i);
//                }
//                else {
//                    x=1;
//                    System.out.println(max);
//                    break;
//                }
//            }
//            if(x==0)
//            System.out.println(max);
//        }
//        ArrayList<Point> points = new ArrayList<>();
//        for(int i=0;i<4;i++) {
//            String point1 = a.substring(a.indexOf("[") + 1, a.indexOf("]"));
//            a=a.substring(a.indexOf("]")+1);
//            Integer x=Integer.parseInt(point1.split(",")[0]);
//            Integer y=Integer.parseInt(point1.split(",")[1]);
//            Point p=new Point(x,y);
//            points.add(p);
//        }
//        System.out.println("Output:"+methon(points));
// }

//    public  static int meth(int n,int k)
//    {
//        int num=0;
//        int i=0;
//        if(k>=2)
//        {
//            i=k;
//        }else {
//            i=2;
//        }
//        for(;i<n-k;i++)
//        {
//            num+=n-i;
//        }
//        for()
//        return num;
//    }

    public static  boolean methon(ArrayList<Point> points)
    {
        Integer length=-1;
        for(int i=0;i<points.size()-1;i++)
        {
           if(length==-1)
           {
               Point p1=points.get(i);
               Point p2=points.get(i+1);
               length=(p2.y-p1.y)*(p2.y-p1.y)+(p2.x-p1.x)*(p2.x-p1.x);
           }else {
               Point p1=points.get(i);
               Point p2=points.get(i+1);
               Integer temp=(p2.y-p1.y)*(p2.y-p1.y)+(p2.x-p1.x)*(p2.x-p1.x);
               if(temp!=length)
                   return false;
           }
        }
        return true;
    }


    public static  void selectedsort(ArrayList<Integer> List)
    {
        for(int i=0;i<List.size();i++)
        {
            int Smallpos=i;
            Integer Smallnum=List.get(i);
            for(int j=i+1;j<List.size();j++)
            {
                if(List.get(j)<Smallnum)
                {
                    Smallnum=List.get(j);
                    Smallpos=j;
                }
            }
            if(Smallpos!=i)
            {
                List.set(Smallpos,List.get(i));
                List.set(i,Smallnum);
            }
        }
    }

    public static void maopaosort(ArrayList<Integer> List)
    {
         for(int i=0;i<List.size();i++)
             for(int j=0;j<List.size()-i-1;j++)
             {
                 if(List.get(j)>List.get(j+1))
                 {
                     Integer temp=List.get(j);
                     List.set(j,List.get(j+1));
                     List.set(j+1,temp);
                 }
             }
    }

    public static  void quicksort(ArrayList<Integer> List,ArrayList<Integer> List2,Integer first,Integer last)
    {
        if(first<last)
        {
            Integer stand=List.get(first);
            Integer leftpos=first+1;
            Integer rightpos=last;
            while(leftpos<rightpos)
            {
                if(List.get(leftpos)>stand)
                {
                    if(List.get(rightpos)<stand)
                    {
                        Integer temp=List.get(rightpos);
                        Integer temp2=List2.get(rightpos);
                        List.set(rightpos,List.get(leftpos));
                        List.set(leftpos,temp);
                        List2.set(rightpos,List2.get(leftpos));
                        List2.set(leftpos,temp2);
                        leftpos++;
                        rightpos--;
                    }else {
                        rightpos--;
                    }
                }else {
                    leftpos++;
                }
            }
            if(List.get(rightpos)>stand)
            {
                List.set(first,List.get(rightpos-1));
                List.set(rightpos-1,stand);
                quicksort(List,List2,first,rightpos-2);
                quicksort(List,List2,rightpos,last);
            }else {
                List.set(first,List.get(rightpos));
                List.set(rightpos,stand);
                quicksort(List,List2,first,rightpos-1);
                quicksort(List,List2,rightpos+1,last);
            }

        }
    }

}