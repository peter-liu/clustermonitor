package org.zsl.clustermonitor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.zsl.clustermonitor.service.NodeServcie;

import javax.annotation.Resource;

/**
 * TODO description
 * Created by liusz on 14-12-24-下午1:57
 */
@Controller
@RequestMapping("/clustermonitor/register")
public class NodeRegisterController {

    private static Logger logger = LoggerFactory.getLogger(NodeRegisterController.class);

    @Resource
    public NodeServcie nodeService;

    /**
     * 监控节点注册
     *
     * @param ip            监控节点ip
     * @param port          监控节点端口
     * @param monitorConfig 监控类型配置
     * @return 操作结果
     */
    @RequestMapping("/register")
    @ResponseBody
    public OperationResult register(String ip, String port, @RequestParam("config") String monitorConfig) {
        logger.info("{}:{} try registry",ip,port);
        nodeService.register(ip, Integer.valueOf(port), monitorConfig);
        logger.info("{}:{} registry success",ip,port);
        return OperationResult.success();
    }

    /**
     * 取消节点监控
     *
     * @param ip   监控节点ip
     * @param port 监控节点端口
     * @return 操作结果
     */
    @RequestMapping("/unregister")
    @ResponseBody
    public OperationResult unregister(String ip, String port) {
        logger.info("{}:{} try unregistry",ip,port);
        nodeService.unregister(ip, Integer.valueOf(port));
        logger.info("{}:{} unregistry success",ip,port);
        return OperationResult.success();
    }

}
