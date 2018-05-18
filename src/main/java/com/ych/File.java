package com.ych;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.LinkedList;

/**
 * Created by Administrator on 2018/3/8 0008.
 */
public class File {
    public static void moveFile(String filepath1,String filepath2)
    {
        LinkedList<String> List1=new LinkedList<>();
        LinkedList<String> List2=new LinkedList<>();
        List1.add(filepath1);
        List2.add(filepath2);
        while(List1.size()>0)
        {
            new java.io.File(List2.getFirst()).mkdir();
            java.io.File file=new java.io.File(List1.getFirst());
            if(!file.exists())
            {
                System.out.println("源文件不存在");
                return;
            }
            else if(file.isFile()){
                copyfile(file,List2.getFirst());
            }else if(file.isDirectory()){
                java.io.File[] files=file.listFiles();
                for(java.io.File file1:files)
                {
                    if(file1.isFile()){
                        copyfile(file1,List2.getFirst());
                    }else if(file1.isDirectory()){
                        List1.add(file1.getPath());
                        List2.add(List2.getFirst()+ java.io.File.separator+file1.getName().toString());
                    }
                }
            }
            List1.removeFirst();
            List2.removeFirst();
        }
    }

    public static void copyfile(java.io.File file, String destination)
    {
        try {
            InputStream fileInputStream=new FileInputStream(file);
            FileOutputStream fileOutputStream=new FileOutputStream(
                    destination+ java.io.File.separator+file.getName().toString()
            );
            byte[] b=new byte[1024];
            int len;
            while((len=fileInputStream.read(b))!=-1)
            {
                fileOutputStream.write(b,0,len);
            }
            fileOutputStream.flush();
            fileOutputStream.close();
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
