package org.zsl.clustermonitor.domain;

/**
 * TODO refactory
 * Created by liusz on 2014/12/23-22:09
 */
public class HealthCheck extends ServiceResource {

    private ServiceResource target;

    private String expectValue;

    private String cron;

    private Integer interval;

    private boolean isExpected = true;

    private Object currentValue;

    public HealthCheck(Attribute attribute, String expectValue) {
        this.target = attribute;
        this.expectValue = expectValue;
    }

    public HealthCheck(Operation operation) {
        this.target = operation;
    }

    public HealthCheck(Operation operation, String expectValue) {
        if (operation.getRetType().equals("void")) {
            throw new RuntimeException("operation do not has return value !");
        }
        this.target = operation;
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
        return target.getService();
    }

    public void setService(Service service) {
        target.setService(service);
    }

    public String getName() {
        return target.getName();
    }

    public String getDesc() {
        return target.getDesc();
    }

    public Object getMonitorObject() {
        return target;
    }

    public String getQualifier() {
        return target.getQualifier();
    }
}
