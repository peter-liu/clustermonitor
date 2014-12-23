package org.zsl.clustermonitor.helper.invoker;

import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.domain.Service;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:25
 */
public class JolokiaInvoker extends Invoker {

    @Override public Object exec(Operation operation, Object[] params) {
        return null;
    }

    @Override public Object read(Attribute attribute) {
        return null;
    }

    @Override public List<Service> listService(Node node, List<String> serviceNames) {
        return null;
    }
}
