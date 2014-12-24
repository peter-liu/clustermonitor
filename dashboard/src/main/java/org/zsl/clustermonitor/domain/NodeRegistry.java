package org.zsl.clustermonitor.domain;

import com.alibaba.fastjson.JSONObject;
import org.zsl.clustermonitor.helper.Protocol;
import org.zsl.clustermonitor.helper.invoker.InvokerHelper;

import java.util.ArrayList;
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

    private List<String> serviceNames = new ArrayList<>();

    private List<String> healthCheckNames = new ArrayList<>();

    private JSONObject rawConfig;

    /**
     * 衍生信息
     */
    private Node node;


    public void init(){
        // populate node
        this.node = new Node(system,ip,port,protocol);

        node.setBasePath(rawConfig.getString("basePath"));
        node.setSystem(rawConfig.getString("system"));

        // populate services
        List<Service> services = InvokerHelper.listService(node, serviceNames);

        node.setServices(services);

        // adjust duplicate attribute and operation
        //                  attribute and healthcheck
        for(String healthCheckName : healthCheckNames){
            String[] qualifiers = healthCheckName.split("/");

            Service service = node.getService(qualifiers[0]);

            Attribute attribute = service.getAttribute(qualifiers[1]);
            if(  attribute != null){
                service.getAttributes().remove(attribute);
                HealthCheck healthCheckWrapper = new HealthCheck(attribute,"OK");
                service.addHealthCheck(healthCheckWrapper);
                break;
            }

            Operation operation = service.getOperation(qualifiers[1]);
            if( operation != null ){
                service.getOperations().remove(operation);
                HealthCheck healthCheckWrapper = new HealthCheck(operation);
                if(!operation.getRetType().equals("void")){
                    healthCheckWrapper.setExpectValue("OK");
                }
                service.addHealthCheck(healthCheckWrapper);
                break;
            }
        }

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

    public void addRegisterServiceName(String serviceName) {
        this.getServiceNames().add(serviceName);
    }

    public void addHealthCheckName(String healthcheck) {
        this.getHealthCheckNames().add(healthcheck);
    }
}
