package by.bsu;

import java.util.*;

/**
 * Created by Gennady Trubach on 12.02.2015.
 * FAMCS 2d course 5th group
 */
public class Juice {
    private List<String> components;
    private boolean isReady;

    public Juice(String str) {
        this.components = new ArrayList<String>();
        StringTokenizer st = new StringTokenizer(str, " ");
        String component;
        while(st.hasMoreTokens()){
            component = st.nextToken();
            if(!components.contains(component)){
                components.add(component);
            }
        }
        isReady = false;
    }

    public boolean isReady() {
        return isReady;
    }

    public void setReady(boolean isReady) {
        this.isReady = isReady;
    }

    public boolean contains(Juice juice){
        return this.components.containsAll(juice.components);
    }

    public int getComponentsCount(){
        return components.size();
    }

    public List<String> getComponents() {
        return components;
    }
}
