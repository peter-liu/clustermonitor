package org.zsl.clustermonitor.service;

import org.zsl.clustermonitor.domain.*;

import java.util.List;
import java.util.Objects;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:32
 */
public interface NodeServcie {

    public void register(String ip, Integer port, String config);

    public void unregister(String ip, Integer port);

    public Node getNode(String ip, Integer port);

    public List<Node> getNodes();

    public Object read(Attribute attribute);

    public void check(HealthCheck check);

    public Object exec(Operation operation, Object[] params);

    public Object read(String qualifer);

    public Object check(String qualifer);

    public Object exec(String qualifer, Object[] params);

    public List<Service> getAllServices();

    public List<Attribute> getAllAttributes();

    public List<HealthCheck> getAllHealthChecks();
}
