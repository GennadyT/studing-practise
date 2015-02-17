package by.bsu;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Gennady Trubach on 11.02.2015.
 * FAMCS 2d course 5th group
 */
public class Main {
    public static void main(String[] args) {
        try{
            JuiceFactory jf = new JuiceFactory(initFactory());
            PrinterFactory pf = new PrinterFactory(jf);
            pf.printAllComponents();
            pf.printAllComponentsByCodes();
            pf.printMinWashingCount();
        }
        catch (IOException io){
            System.err.println(io);
        }
        catch (InterruptedException ie){
            System.err.println(ie);
        }
    }

    public static List<Juice> initFactory() throws IOException{
        BufferedReader br = new BufferedReader(new FileReader("juice.in"));
        List<Juice> juices = new ArrayList<Juice>();
        String str;
        while((str = br.readLine()) != null){
            juices.add(new Juice(str));
        }
        return juices;
    }
}
