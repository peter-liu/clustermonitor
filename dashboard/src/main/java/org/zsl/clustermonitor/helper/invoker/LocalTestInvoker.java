package org.zsl.clustermonitor.helper.invoker;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.IOUtils;
import org.jolokia.client.J4pClient;
import org.jolokia.client.request.J4pListRequest;
import org.zsl.clustermonitor.domain.Attribute;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.domain.Operation;
import org.zsl.clustermonitor.domain.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * TODO description
 * Created by liusz on 14-12-25-上午9:35
 */
public class LocalTestInvoker extends JolokiaInvoker {
    @Override public Object exec(Operation operation, Object[] params) {
        return "OK";
    }

    @Override public Object read(Attribute attribute) {
        return "OK";
    }

    @Override public List<Service> listService(Node node, List<String> serviceNames) {
        List<Service> ret = new ArrayList<>();
        try {
            //J4pClient j4p = new J4pClient("http://" + node.getIp() + ":" + node.getPort() + "/" + node.getBasePath());

            //J4pListRequest listRequest = new J4pListRequest("");

            //JSONObject serviceList = JSON.parseObject(j4p.execute(listRequest).asJSONObject().toJSONString());

            String text;
            try(InputStream inputStream = this.getClass().getResourceAsStream("/testresponse.txt");){
                text = IOUtils.toString(inputStream, "UTF-8");
            }

            JSONObject serviceList = JSON.parseObject(text);

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


}
