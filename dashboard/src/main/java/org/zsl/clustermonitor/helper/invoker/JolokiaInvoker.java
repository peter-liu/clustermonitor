package org.zsl.clustermonitor.helper.invoker;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.jolokia.client.J4pClient;
import org.jolokia.client.request.J4pExecRequest;
import org.jolokia.client.request.J4pListRequest;
import org.jolokia.client.request.J4pReadRequest;
import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.domain.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:25
 */
public class JolokiaInvoker extends Invoker {

    @Override public Object exec(Operation operation, Object[] params) {
        try {
            String objectName = StringUtils.replace(operation.getService().getName(), "/", ":");
            Node node = operation.getService().getNode();

            J4pClient j4p = new J4pClient(
                    "http://" + node.getIp() + ":" + node.getPort() + "/" + node.getBasePath() + "/");

            J4pExecRequest execRequest = new J4pExecRequest(objectName, operation.getName());// TODO exec操作目前暂不支持参数传递

            return Objects.toString(j4p.execute(execRequest).asJSONObject().get("value"),"void");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override public Object read(Attribute attribute) {
        try {

            String objectName = StringUtils.replace(attribute.getService().getName(), "/", ":");
            Node node = attribute.getService().getNode();

            J4pClient j4p = new J4pClient(
                    "http://" + node.getIp() + ":" + node.getPort() + "/" + node.getBasePath() + "/");

            J4pReadRequest readRequest = new J4pReadRequest(objectName, attribute.getName());

            return j4p.execute(readRequest).asJSONObject().get("value").toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override public List<Service> listService(Node node, List<String> serviceNames) {
        List<Service> ret = new ArrayList<>();
        try {
            J4pClient j4p = new J4pClient("http://" + node.getIp() + ":" + node.getPort() + "/" + node.getBasePath());

            J4pListRequest listRequest = new J4pListRequest("");

            JSONObject serviceList = JSON.parseObject(j4p.execute(listRequest).asJSONObject().toJSONString());

            serviceList = serviceList.getJSONObject("value");

            if (serviceList == null || serviceList.isEmpty()) {
                throw new RuntimeException("not existed service!");
            }

            for (String serviceName : serviceNames) {

                String[] qualifiers = serviceName.split(":");

                JSONObject domain = serviceList.getJSONObject(qualifiers[0]);
                JSONObject service = domain.getJSONObject(qualifiers[1]);

                ret.add(transformToService(serviceName,service));
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        return ret;
    }

    protected Service transformToService(String serviceName , JSONObject serviceObject) {
        Service ret = new Service();

        //JSONObject serviceConfig = object;//object.getJSONObject(objectName);
        // {"desc":"引擎控制器","op":{"stop":{"ret":"void","desc":"中止服务","args":[]},"start":{"ret":"void","desc":"启动引擎","args":[]}

        //MonService monService = new MonService();
        ret.setName(serviceName);
        ret.setDesc(serviceObject.getString("desc"));

        // populate operations
        JSONObject operations = serviceObject.getJSONObject("op");

        if (operations != null && !operations.isEmpty()) {
            Set<String> operationKeys = operations.keySet();
            if (CollectionUtils.isNotEmpty(operationKeys)) {
                for (String key : operationKeys) {
                    JSONObject optConfig = operations.getJSONObject(key);
                    Operation operation = new Operation();
                    operation.setDesc(optConfig.getString("desc"));
                    operation.setName(key);
                    operation.setParamDefinitions(
                            optConfig.getJSONArray("args")
                                    .toArray(new JSONObject[optConfig.getJSONArray("args").size()]));
                    operation.setName(key);
                    operation.setRetType(optConfig.getString("ret"));
                    ret.addOperation(operation);
                }
            }
        }

        // populate attributes
        // "attr":{"LoggerNames":{"desc":"LoggerNames","type":"[Ljava.lang.String;","rw":false},"ObjectName":{"desc":"ObjectName","type":"javax.management.ObjectName","rw":false}
        JSONObject attrs = serviceObject.getJSONObject("attr");
        if (attrs != null && !attrs.isEmpty()) {
            Set<String> attrKeys = attrs.keySet();
            if (CollectionUtils.isNotEmpty(attrKeys)) {
                for (String key : attrKeys) {
                    JSONObject attrConfig = attrs.getJSONObject(key);
                    Attribute attribute = new Attribute();
                    attribute.setDesc(attrConfig.getString("desc"));
                    attribute.setName(key);
                    attribute.setType(attrConfig.getString("type"));
                    ret.addAttribute(attribute);
                }
            }
        }

        return ret;

    }
}
