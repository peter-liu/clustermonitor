package org.zsl.clustermonitor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
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

}
