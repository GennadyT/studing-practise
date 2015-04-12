package by.bsu;

import java.util.*;

/**
 * Created by Gennady Trubach on 11.02.2015.
 * FAMCS 2d course 5th group
 */
public class JuiceFactory {
    private List<Juice> juices;

    public JuiceFactory(List<Juice> juices) {
        this.juices = juices;
    }

    public Set<String> getAllComponents(){
        Set<String> set = new LinkedHashSet<String>();
        Iterator<Juice> it = juices.iterator();
        while(it.hasNext()){
            set.addAll(it.next().getComponents());
        }
        return set;
    }

    public int makeJuices() {
        List<Juice> sortedJuices = new ArrayList<Juice>(juices);
        sortedJuices.sort(new Comparator<Juice>() {
            @Override
            public int compare(Juice o1, Juice o2) {
                return o1.getComponentsCount() - o2.getComponentsCount();
            }
        });
        int washingCount = 0;
        Juice juice = null;
        for (int i = 0; i < sortedJuices.size(); i++) {
            int index = i + 1;
            while (index != sortedJuices.size() && toCompare((juice = sortedJuices.get(index)), sortedJuices.get(i))) {
                index++;
            }
            if(index == sortedJuices.size()){
                washingCount++;

            }
            else {
                juice.setReady(true);
            }
        }
        return washingCount;
    }

    private boolean toCompare(Juice first, Juice second){
        return first.isReady() || !first.contains(second);
    }
}
