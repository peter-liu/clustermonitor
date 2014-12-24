package org.zsl.clustermonitor.domain;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class Operation {

    private String name;

    private String qualifier;

    private String displayName;

    private String retType;

    private String desc;

    private JSONObject[] paramDefinitions;

    private Service service;

    public String getQualifier() {
        if(StringUtils.isEmpty(qualifier)){
            qualifier = this.getService().getName()+":"+this.getName();
        }
        return qualifier;
    }

    public void setQualifier(String qualifier) {
        this.qualifier = qualifier;
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public JSONObject[] getParamDefinitions() {
        return paramDefinitions;
    }

    public void setParamDefinitions(JSONObject[] paramDefinitions) {
        this.paramDefinitions = paramDefinitions;
    }
}
