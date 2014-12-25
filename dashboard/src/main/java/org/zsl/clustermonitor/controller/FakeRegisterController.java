package org.zsl.clustermonitor.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.zsl.clustermonitor.service.NodeService;

import javax.annotation.Resource;

/**
 * TODO description
 * Created by liusz on 14-12-25-上午9:43
 */
@Controller
@RequestMapping("/node/register")
public class FakeRegisterController {

    @Resource
    private NodeService nodeService;

    @RequestMapping("/regnode")
    @ResponseBody
    public Object register(){
        String config =
                "{\"system\":\"Promotion-Engine\",\"basePath\":\"jolokia\",\"healthchecks\":" +
                        "[\"prom:name=appMgt/heartbeats\"]," +
                        "\"protocol\":\"LocalTest\"," +
                        "\"services\":[\"prom:name=appMgt\",\"prom:name=engineMgt\"" +
                        "]}";

        nodeService.register("127.0.0.1", 8080, config);
        nodeService.register("127.0.0.1", 8081, config);

        return JSON.toJSONString(nodeService.getNode("127.0.0.1",8080));
    }
}
