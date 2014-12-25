package org.zsl.clustermonitor.domain;

import com.google.common.base.Joiner;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.scheduling.quartz.SimpleTriggerBean;
import org.zsl.clustermonitor.helper.Protocol;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * TODO description
 * Created by liusz on 2014/12/23-21:34
 */
public class Node {

    private String system;
    private String ip;
    private Integer port;
    private Protocol protocol;
    private String basePath;
    private List<Service> services;

    public Node(String system, String ip, Integer port, Protocol protocol) {
        this.system = system;
        this.ip = ip;
        this.port = port;
        this.protocol = protocol;
    }

    public String getQualifer() {
        return Joiner.on("_").join(system, ip.replaceAll("[.]", "_"), port);
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
        if (CollectionUtils.isNotEmpty(services)) {
            for (Service service : services) {
                service.setNode(this);
            }
        }
        this.services = services;
    }

    public Service getService(String name) {
        for (Service service : services) {
            if (name.equals(service.getName())) {
                return service;
            }
        }
        return null;
    }

    public Protocol getProtocol() {
        return protocol;
    }

    public void setProtocol(Protocol protocol) {
        this.protocol = protocol;
    }

    public String getBasePath() {
        return basePath;
    }

    public void setBasePath(String basePath) {
        this.basePath = basePath;
    }

    public Attribute getAttribute(String qualifier) {
        String[] qualifiers = qualifier.split("/");

        for (Service service : services) {
            if (service.getName().equals(qualifiers[0])) {
                return service.getAttribute(qualifiers[1]);
            }
        }
        return null;
    }

    public HealthCheck getHealthCheck(String qualifier) {
        String[] qualifiers = qualifier.split("/");

        for (Service service : services) {
            if (service.getName().equals(qualifiers[0])) {
                return service.getHealthCheck(qualifiers[1]);
            }
        }
        return null;
    }

    public Operation getOperation(String qualifier) {
        String[] qualifiers = qualifier.split("/");

        for (Service service : services) {
            if (service.getName().equals(qualifiers[0])) {
                return service.getOperation(qualifiers[1]);
            }
        }
        return null;

    }

    public Integer getErrorCount() {
        Integer errorCount = 0;
        for (Service service : services) {
            errorCount += service.getErrorCount();
        }
        return errorCount;
    }

    public List<HealthCheck> getErrorHealthChecks() {
        List<HealthCheck> ret = new ArrayList<>();
        for (Service service : services) {
            ret.addAll(service.getErrorHealthChecks());
        }
        return ret;
    }

    /**
     * TODO refactory
     * @return
     */
    public List<HealthCheck> getAllHealthChecks() {
        List<HealthCheck> ret = new ArrayList<>();
        for (Service service : services) {
            ret.addAll(service.getHealthChecks());
        }
        return ret;
    }

    /**
     * TODO refactory
     * @return
     */
    public List<Attribute> getAllAttributes(){
        List<Attribute> ret = new ArrayList<>();
        for (Service service : services) {
            ret.addAll(service.getAttributes());
        }
        return ret;
    }


    /**
     * TODO refactory
     * @return
     */
    public List<Operation> getAllOperations(){
        List<Operation> ret = new ArrayList<>();
        for (Service service : services) {
            ret.addAll(service.getOperations());
        }
        return ret;
    }


}
