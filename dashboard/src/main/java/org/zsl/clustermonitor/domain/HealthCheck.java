package org.zsl.clustermonitor.domain;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class HealthCheck {

    private Attribute attribute;

    private Operation operation;

    private String expectValue;

    private String cron;

    private Integer interval;

    private boolean isExpected = true;

    private Object currentValue;

    public HealthCheck(Attribute attribute, String expectValue) {
        this.attribute = attribute;
        this.expectValue = expectValue;
    }

    public HealthCheck(Operation operation) {
        this.operation = operation;
    }

    public HealthCheck(Operation operation, String expectValue) {
        if (operation.getRetType().equals("void")) {
            throw new RuntimeException("operation do not has return value !");
        }
        this.operation = operation;
        this.expectValue = expectValue;

    }

    public String getExpectValue() {
        return expectValue;
    }

    public void setExpectValue(String expectValue) {
        this.expectValue = expectValue;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public synchronized boolean isExpected() {
        return isExpected;
    }

    public void setExpected(boolean isExpected) {
        this.isExpected = isExpected;
    }

    public Object getCurrentValue() {
        return currentValue;
    }

    /**
     * TODO decorate-mode
     */

    public synchronized void setCurrentValue(Object currentValue) {
        this.currentValue = currentValue;
        if (isExpected() && !currentValue.equals(expectValue)) {
            getService().addError(this);
        } else if (!isExpected() && currentValue.equals(expectValue)) {
            getService().removeError(this);
        }
    }

    public Service getService() {
        if (attribute != null) {
            return attribute.getService();
        } else if (operation != null) {
            return operation.getService();
        }
        return null;
    }

    public void setService(Service service){
        if (attribute != null) {
            attribute.setService(service);
        } else if (operation != null) {
            operation.setService(service);
        }
    }

    public String getName(){
        if (attribute != null) {
            return attribute.getName();
        } else if (operation != null) {
            return operation.getName();
        }
        return null;
    }

    public Object getMonitorObject() {
        return attribute != null ? attribute : operation;
    }
}
