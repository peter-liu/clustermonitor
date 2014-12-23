package org.zsl.clustermonitor.helper.invoker;

import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.domain.Service;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:22
 */
public abstract class Invoker {

    public abstract Object exec(Operation operation,Object[] params);

    public abstract Object read(Attribute attribute);

    public abstract List<Service> listService(Node node, List<String> serviceNames);

}
