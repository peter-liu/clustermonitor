package org.zsl.clustermonitor.helper;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:18
 */
public enum Protocol {

    Jolokia("jolokia"),
    JMX("JMX");

    private final String name;

    Protocol(String name){
        this.name = name;
    }

}
