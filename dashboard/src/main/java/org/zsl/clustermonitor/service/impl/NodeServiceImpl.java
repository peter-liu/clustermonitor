package org.zsl.clustermonitor.service.impl;

import org.zsl.clustermonitor.domain.*;
import org.zsl.clustermonitor.service.NodeServcie;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:39
 */
public class NodeServiceImpl implements NodeServcie{

    @Override public void register(String ip, Integer port, String config) {

    }

    @Override public void unregister(String ip, Integer port) {

    }

    @Override public Node getNode(String ip, Integer port) {
        return null;
    }

    @Override public List<Node> getNodes() {
        return null;
    }

    @Override public Object read(Attribute attribute) {
        return null;
    }

    @Override public void check(HealthCheck check) {

    }

    @Override public Object exec(Operation operation, Object[] params) {
        return null;
    }

    @Override public Object read(String qualifer) {
        return null;
    }

    @Override public Object check(String qualifer) {
        return null;
    }

    @Override public Object exec(String qualifer, Object[] params) {
        return null;
    }

    @Override public List<Service> getAllServices() {
        return null;
    }

    @Override public List<Attribute> getAllAttributes() {
        return null;
    }

    @Override public List<HealthCheck> getAllHealthChecks() {
        return null;
    }
}
