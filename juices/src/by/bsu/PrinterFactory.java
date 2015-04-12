package by.bsu;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/**
 * Created by Gennady Trubach on 12.02.2015.
 * FAMCS 2d course 5th group
 */
public class PrinterFactory {
    private JuiceFactory jf;

    public PrinterFactory(JuiceFactory jf) {
        this.jf = jf;
    }

    public void printAllComponents() throws IOException{
        StringBuilder sb = new StringBuilder();
        for(String component : jf.getAllComponents()){
            sb.append(component)
              .append('\n');
        }
        PrintWriter pw = new PrintWriter(new File("juice1.out"));
        pw.print(sb.toString().trim());
        pw.close();
    }

    public void printAllComponentsByCodes() throws IOException, InterruptedException{
        List<String> list = new ArrayList<String>(jf.getAllComponents());
        Thread sort = new Thread(new Sorter(list));
        sort.start();
        sort.join();
        StringBuilder sb = new StringBuilder();
        for(String component : list){
            sb.append(component)
              .append('\n');
        }
        PrintWriter pw = new PrintWriter(new File("juice2.out"));
        pw.print(sb.toString().trim());
        pw.close();
    }

    public void printMinWashingCount() throws IOException{
        PrintWriter pw = new PrintWriter(new File("juice3.out"));
        pw.print(jf.makeJuices());
        pw.close();
    }
}
