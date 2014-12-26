package org.zsl.clustermonitor.helper.invoker;

import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.domain.Service;
import org.zsl.clustermonitor.helper.Protocol;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:27
 */
public class InvokerHelper {

    private static Map<Protocol, Invoker> invokerMap = new HashMap<>();

    static {
        invokerMap.put(Protocol.JMX, new JMXInvoker());
        invokerMap.put(Protocol.Jolokia, new JolokiaInvoker());
        invokerMap.put(Protocol.LocalTest, new LocalTestInvoker());
    }

    public static Object exec(Operation operation, Object[] params) {
        Node node = operation.getService().getNode();
        return invokerMap.get(node.getProtocol()).exec(operation, params);
    }

    public static Object read(Attribute attribute) {
        Node node = attribute.getService().getNode();
        Object ret = invokerMap.get(node.getProtocol()).read(attribute);
        attribute.setCurrentValue(Objects.toString(ret,"Null"));
        return ret;
    }

    public static List<Service> listService(Node node,List<String> serviceNames) {
        return invokerMap.get(node.getProtocol()).listService(node,serviceNames);
    }

}
