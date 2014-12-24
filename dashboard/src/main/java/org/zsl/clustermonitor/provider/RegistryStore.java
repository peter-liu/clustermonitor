package org.zsl.clustermonitor.provider;

import org.zsl.clustermonitor.domain.*;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:42
 */
public interface RegistryStore {

    public void store(NodeRegistry nodeRegistry);

    public void delete(String ip, Integer port);

    public Node getNode(String ip, Integer port);

    public List<Node> getNodes();

    public Attribute getAttribute(String ip, Integer port, String qualifier);

    public HealthCheck getHealthCheck(String ip, Integer port, String qualifier);

    public Operation getOperation(String ip, Integer port, String qualifier);
}
