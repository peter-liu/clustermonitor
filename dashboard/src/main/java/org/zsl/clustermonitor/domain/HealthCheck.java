package org.zsl.clustermonitor.domain;

import org.apache.commons.beanutils.BeanUtils;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class HealthCheck extends Attribute {

    private String expectValue;

    private String cron;

    private Integer interval;

    public HealthCheck(Attribute attribute , String expectValue) {
        try {
            BeanUtils.copyProperties(attribute, this);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
}
