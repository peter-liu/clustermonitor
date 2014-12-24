package org.zsl.clustermonitor.provider.impl;

import org.zsl.clustermonitor.domain.*;
import org.zsl.clustermonitor.provider.RegistryStore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:42
 */
public class MemoryRegistryStore implements RegistryStore{

    private Map<String, NodeRegistry> registries = new HashMap<>();

//    private MultiKeyMap registries = new MultiKeyMap();

    @Override public void store(NodeRegistry nodeRegistry) {
        String nodeQualifier = this.buildNodeQualifier(nodeRegistry);
        registries.put(nodeQualifier,nodeRegistry);
    }

    @Override public void delete(String ip, Integer port) {
        String nodeQualifier = this.buildNodeQualifier(ip,port);
        registries.remove(nodeQualifier);
    }

    @Override public Node getNode(String ip, Integer port) {
        String nodeQualifier = this.buildNodeQualifier(ip,port);
        return registries.get(nodeQualifier).getNode();
    }

    @Override public List<Node> getNodes() {
        List<Node> nodes = new ArrayList<>();

        for(NodeRegistry nodeRegistry : registries.values()){
            nodes.add(nodeRegistry.getNode());
        }
        return nodes;
    }

    @Override public Attribute getAttribute(String ip, Integer port, String qualifier) {
        String nodeQualifier = buildNodeQualifier(ip,port);
        Node node = registries.get(nodeQualifier).getNode();
        return node.getAttribute(qualifier);
    }

    @Override public HealthCheck getHealthCheck(String ip, Integer port, String qualifier) {
        String nodeQualifier = buildNodeQualifier(ip,port);
        Node node = registries.get(nodeQualifier).getNode();
        return node.getHealthCheck(qualifier);
    }

    @Override public Operation getOperation(String ip, Integer port, String qualifier) {
        String nodeQualifier = buildNodeQualifier(ip,port);
        Node node = registries.get(nodeQualifier).getNode();
        return node.getOperation(qualifier);
    }

    private String buildNodeQualifier(NodeRegistry nodeRegistry){
        return buildNodeQualifier(nodeRegistry.getIp(),nodeRegistry.getPort());
    }

    private String buildNodeQualifier(String ip,Integer port){
        return ip+"_"+port;
    }
}
