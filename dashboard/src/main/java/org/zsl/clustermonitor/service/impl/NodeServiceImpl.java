package org.zsl.clustermonitor.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.zsl.clustermonitor.domain.*;
import org.zsl.clustermonitor.helper.Protocol;
import org.zsl.clustermonitor.helper.invoker.InvokerHelper;
import org.zsl.clustermonitor.provider.RegistryStore;
import org.zsl.clustermonitor.service.HealthCheckService;
import org.zsl.clustermonitor.service.NodeService;
import org.zsl.clustermonitor.service.WarningService;

import javax.annotation.Resource;
import java.util.List;

/**
 * TODO description
 * Created by liusz on 2014/12/23-23:39
 */
@Service
public class NodeServiceImpl implements NodeService {

    @Resource
    private RegistryStore registryStore;

    @Resource
    private HealthCheckService healthCheckService;

    @Override public void register(String ip, Integer port, String config) {
        JSONObject rawConfig = JSONObject.parseObject(config);

        NodeRegistry nodeRegistry = new NodeRegistry();
        // populate basic properties
        nodeRegistry.setIp(ip);
        nodeRegistry.setPort(port);
        nodeRegistry.setProtocol(Protocol.valueOf(rawConfig.getString("protocol")));
        nodeRegistry.setSystem(rawConfig.getString("system"));

        nodeRegistry.setRawConfig(rawConfig);

        // populate monitor service naems
        JSONArray services = rawConfig.getJSONArray("services");
        for (int idx = 0, l = services.size(); idx < l; idx++) {
            nodeRegistry.addRegisterServiceName(services.getString(idx));
        }

        // populate healthchecks
        JSONArray healthchecks = rawConfig.getJSONArray("healthchecks");
        for (int idx = 0, l = healthchecks.size(); idx < l; idx++) {
            nodeRegistry.addHealthCheckName(healthchecks.getString(idx));
        }

        // initialize node data
        nodeRegistry.init();

        // store node
        registryStore.store(nodeRegistry);

        // register healthchecks in scheduled check job
        // TODO 1: a configurable warning strategy
        // TODO 2: a customized warning strategy
        WarningStrategy warningStrategy = new WarningStrategy();
        warningStrategy.setExecutionInterval(30);
        warningStrategy.setWarningPeriod(300);
        for(HealthCheck healthCheck : nodeRegistry.getNode().getAllHealthChecks()){
            healthCheck.setWarningStrategy(warningStrategy);
            healthCheckService.scheduleHealthCheck(healthCheck);
        }
    }

    @Override public void unregister(String ip, Integer port) {
        registryStore.delete(ip, port);
    }

    @Override public Node getNode(String ip, Integer port) {
        return registryStore.getNode(ip, port);
    }

    @Override public List<Node> getNodes() {
        return registryStore.getNodes();
    }

    @Override public Object read(Attribute attribute) {
        return InvokerHelper.read(attribute);
    }

    @Override public boolean check(HealthCheck check) {
        Object monitorObject = check.getMonitorObject();

        Object result = null;

        if (monitorObject instanceof Attribute) {
            result = InvokerHelper.read((Attribute) monitorObject);
        } else if (monitorObject instanceof Operation) {
            result = InvokerHelper.exec((Operation) monitorObject, null);
        }

        check.setCurrentValue(result);
        return check.isExpected();
    }

    @Override public Object exec(Operation operation, Object[] params) {
        return InvokerHelper.exec(operation, params);
    }

    @Override public Object read(String ip, Integer port, String qualifier) {
        return this.read(registryStore.getAttribute(ip, port, qualifier));
    }

    @Override public boolean check(String ip, Integer port, String qualifier) {
        return this.check(registryStore.getHealthCheck(ip, port, qualifier));
    }

    @Override public Object exec(String ip, Integer port, String qualifier, Object[] params) {
        return this.exec(registryStore.getOperation(ip, port, qualifier), params);
    }

    public RegistryStore getRegistryStore() {
        return registryStore;
    }

    public void setRegistryStore(RegistryStore registryStore) {
        this.registryStore = registryStore;
    }
}
