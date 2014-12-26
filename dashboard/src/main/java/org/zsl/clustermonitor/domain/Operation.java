package org.zsl.clustermonitor.domain;

import com.alibaba.fastjson.JSONObject;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class Operation extends ServiceResource {

    private String displayName;

    private String retType;

    private JSONObject[] paramDefinitions;

    private Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getRetType() {
        return retType;
    }

    public void setRetType(String retType) {
        this.retType = retType;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public JSONObject[] getParamDefinitions() {
        return paramDefinitions;
    }

    public void setParamDefinitions(JSONObject[] paramDefinitions) {
        this.paramDefinitions = paramDefinitions;
    }
}
