package org.zsl.clustermonitor.test;

import junit.framework.TestCase;
import org.junit.BeforeClass;
import org.junit.Test;
import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.helper.Protocol;
import org.zsl.clustermonitor.provider.RegistryStore;
import org.zsl.clustermonitor.provider.impl.MemoryRegistryStore;
import org.zsl.clustermonitor.service.impl.NodeServiceImpl;

/**
 * TODO description
 * Created by liusz on 14-12-24-下午2:35
 */

public class DomainTestCase extends TestCase {

    private static NodeServiceImpl nodeServiceImpl;

    @BeforeClass
    public void setUp() {
        nodeServiceImpl = new NodeServiceImpl();
        RegistryStore registryStore = new MemoryRegistryStore();
        nodeServiceImpl.setRegistryStore(registryStore);
        System.out.println("set up");

        System.out.println(Protocol.valueOf("Jolokia"));
    }

    @Test
    public void testInitializeNode() {
        String config =
                "{\"system\":\"Promotion-Engine\",\"basePath\":\"jolokia\",\"healthchecks\":" +
                        "[\"prom:name=appMgt/heartbeats\"]," +
                            "\"protocol\":\"Jolokia\"," +
                            "\"services\":[\"prom:name=appMgt\",\"prom:name=engineMgt\"" +
                        "]}";

        nodeServiceImpl.register("127.0.0.1", 8080, config);

        Node node = nodeServiceImpl.getNode("127.0.0.1", 8080);

        Attribute attribute = node.getAttribute("prom:name=engineMgt/Version");

        Object result = nodeServiceImpl.read(attribute);
        System.out.println(result);

        Operation operation = node.getOperation("prom:name=engineMgt/stop");

        nodeServiceImpl.exec(operation, null);

        nodeServiceImpl.exec("127.0.0.1", 8080, "prom:name=engineMgt/stop", null);

        System.out.println(nodeServiceImpl.check("127.0.0.1", 8080, "prom:name=appMgt/heartbeats"));

        System.out.println(node.getErrorCount());
    }

    //    @Test
    //    public void testReadAttribute() {
    //        System.out.println("read attribute");
    //
    //    }
    //
    //    @Test
    //    public void testExecOperation() {
    //        System.out.println("exec attribute");
    //
    //    }
    //
    //    @Test
    //    public void testHealthCheck() {
    //        System.out.println("health check");
    //    }
}
