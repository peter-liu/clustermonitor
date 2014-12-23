package org.zsl.clustermonitor.domain;

import org.zsl.clustermonitor.helper.Protocol;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-21:34
 */
public class Node {

    private String system;
    private String ip;
    private Integer port;
    private Protocol protocol;
    private List<Service> services;

    public Node(String system, String ip, Integer port, Protocol protocol) {
        this.system = system;
        this.ip = ip;
        this.port = port;
        this.protocol = protocol;
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public Protocol getProtocol() {
        return protocol;
    }

    public void setProtocol(Protocol protocol) {
        this.protocol = protocol;
    }
}
