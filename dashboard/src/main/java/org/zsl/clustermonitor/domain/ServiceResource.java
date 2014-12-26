package org.zsl.clustermonitor.domain;

/**
 * basic monitor resouce abstraction
 * Created by liusz on 2014/12/25-22:09
 */
public class ServiceResource {

    private Service service;

    private String qualifier;

    private String name;

    private String desc;

    private String invokingExceptionMessage;

    private Exception invokingException;

    public String getQualifier() {
        return qualifier;
    }

    public void setQualifier(String qualifier) {
        this.qualifier = qualifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getInvokingExceptionMessage() {
        return invokingExceptionMessage;
    }

    public void setInvokingExceptionMessage(String invokingExceptionMessage) {
        this.invokingExceptionMessage = invokingExceptionMessage;
    }

    public Exception getInvokingException() {
        return invokingException;
    }

    public void setInvokingException(Exception invokingException) {
        this.invokingException = invokingException;
    }
}
