package org.zsl.clustermonitor.domain;

import org.apache.commons.lang3.StringUtils;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class Attribute {

    private Service service;

    private String qualifier;

    private String name;

    private String displayName;

    private String type;

    private String desc;

    private String currentValue ;

    public String getQualifier() {
        if(StringUtils.isEmpty(qualifier)){
            qualifier = this.getService().getName()+"/"+this.getName();
        }
        return qualifier;
    }

    public void setQualifier(String qualifier) {
        this.qualifier = qualifier;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
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

    public String getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(String currentValue) {
        this.currentValue = currentValue;
    }
}
