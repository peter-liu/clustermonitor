package org.zsl.clustermonitor.domain;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class Attribute extends ServiceResource {

    private Service service;

    private String displayName;

    private String type;

    private String currentValue;

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

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(String currentValue) {
        this.currentValue = currentValue;
    }
}
