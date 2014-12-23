package org.zsl.clustermonitor.domain;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.beanutils.BeanUtils;
import org.zsl.clustermonitor.helper.Protocol;
import org.zsl.clustermonitor.helper.invoker.InvokerHepler;

import java.util.Iterator;
import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-21:33
 */
public class NodeRegistry {

    /**
     * 基础信息
     */
    private String system;

    private String ip;

    private Integer port;

    private Protocol protocol;

    private List<String> serviceNames;

    private List<String> healthCheckNames;

    private JSONObject rawConfig;

    /**
     * 衍生信息
     */
    private Node node;


    public void init(){
        // populate node
        this.node = new Node(system,ip,port,protocol);

        // populate services
        List<Service> services =  InvokerHepler.listService(node,serviceNames);

        // adjust duplicate attribute and operation
        //                  attribute and healthcheck
        for(Service service: services){
            List<Attribute> attributes = service.getAttributes();
            Iterator<Attribute> attrIterator= attributes.iterator();

            while(attrIterator.hasNext()){
                Attribute attribute = attrIterator.next();
                if(getHealthCheckNames().contains(attribute.getQualifier())){
                    attrIterator.remove();
                    HealthCheck healthCheck = new HealthCheck(attribute,"OK");
                    service.addHealthCheck(healthCheck);
                }
            }
        }

        node.setServices(services);
    }

    public List<Operation> getAllOperations() {
        return null; // TODO
    }

    public List<Attribute> getAllAttributes() {
        return null; // TODO
    }

    public List<HealthCheck> getALlHealthCheck(){
        return null;
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

    public Protocol getProtocol() {
        return protocol;
    }

    public void setProtocol(Protocol protocol) {
        this.protocol = protocol;
    }

    public List<String> getServiceNames() {
        return serviceNames;
    }

    public void setServiceNames(List<String> serviceNames) {
        this.serviceNames = serviceNames;
    }

    public List<String> getHealthCheckNames() {
        return healthCheckNames;
    }

    public void setHealthCheckNames(List<String> healthCheckNames) {
        this.healthCheckNames = healthCheckNames;
    }

    public JSONObject getRawConfig() {
        return rawConfig;
    }

    public void setRawConfig(JSONObject rawConfig) {
        this.rawConfig = rawConfig;
    }

    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }
}
