package org.zsl.clustermonitor.service;

import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.HealthCheck;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:32
 */
public interface NodeService {

    public void register(String ip, Integer port, String config);

    public void unregister(String ip, Integer port);

    public Node getNode(String ip, Integer port);

    public List<Node> getNodes();

    public Object read(Attribute attribute);

    public boolean check(HealthCheck check);

    public Object exec(Operation operation, Object[] params);

    public Object read(String ip, Integer port, String qualifer);

    public boolean check(String ip, Integer port, String qualifer);

    public Object exec(String ip, Integer port, String qualifer, Object[] params);


}
