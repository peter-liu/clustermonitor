package org.zsl.clustermonitor.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.zsl.clustermonitor.domain.HealthCheck;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.service.NodeService;

import javax.annotation.Resource;
import java.util.List;

/**
 * TODO description
 * Created by liusz on 14-12-24-下午7:31
 */
@Controller
@RequestMapping("/node/management")
public class NodeManagementController {

    @Resource
    private NodeService nodeService;

    @RequestMapping(value = { "/", "" })
    public Object index() {

        ModelAndView view = new ModelAndView("node/node.index");

        List<Node> nodes = nodeService.getNodes();

        view.addObject("nodes", nodes);

        return view;
    }

    @RequestMapping( value = {"/register"})
    @ResponseBody
    public Object register(String ip,Integer port,String config){
        nodeService.register(ip,port,config);
        return "success";
    }

    @RequestMapping( value = {"/read"})
    @ResponseBody
    public Object read(String ip,String port,String attributeQualifier){
        Integer portInt = Integer.valueOf(port);
        return JSONObject.toJSONString(nodeService.read(ip, portInt, attributeQualifier));
    }

    @RequestMapping( value = {"/checkHealth"})
    @ResponseBody
    public Object checkHealth(String ip,Integer port,String healthCheckQualifier){
        nodeService.check(ip,port,healthCheckQualifier);
        HealthCheck healthCheck = nodeService.getNode(ip, port).getHealthCheck(healthCheckQualifier);
        return JSONObject.toJSONString(ImmutableMap.of("health",healthCheck.isExpected(),"value",healthCheck.getCurrentValue()));
    }

    @RequestMapping( value = {"/exec"})
    @ResponseBody
    public Object exec(String ip,Integer port,String operationQualifier){
        return JSONObject.toJSONString(nodeService.exec(ip, port, operationQualifier, null));
    }




}
