package by.bsu;

import java.util.Comparator;
import java.util.List;

/**
 * Created by Gennady Trubach on 12.02.2015.
 * FAMCS 2d course 5th group
 */
public class Sorter implements Runnable{
    private List<String> list;

    public Sorter(List<String> list) {
        this.list = list;
    }

    @Override
    public void run() {
        list.sort(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o1.compareTo(o2);
            }
        });
    }
}
