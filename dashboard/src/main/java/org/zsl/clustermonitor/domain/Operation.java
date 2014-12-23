package org.zsl.clustermonitor.domain;

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

    private String[] paramDefinitions;

    private Service service;

    public String getQualifier() {
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

    public String[] getParamDefinitions() {
        return paramDefinitions;
    }

    public void setParamDefinitions(String[] paramDefinitions) {
        this.paramDefinitions = paramDefinitions;
    }
}
