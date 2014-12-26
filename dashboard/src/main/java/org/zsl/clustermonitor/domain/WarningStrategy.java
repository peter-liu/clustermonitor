package org.zsl.clustermonitor.domain;

/**
 * TODO description
 * Created by liusz on 14-12-26-上午10:14
 */
public class WarningStrategy {

    private String target;

    private String method;

    private String content;

    private String executionCron;

    private Integer executionInterval = 30;

    private Integer warningPeriod = 600;

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getExecutionCron() {
        return executionCron;
    }

    public void setExecutionCron(String executionCron) {
        this.executionCron = executionCron;
    }

    public Integer getExecutionInterval() {
        return executionInterval;
    }

    public void setExecutionInterval(Integer executionInterval) {
        this.executionInterval = executionInterval;
    }

    public Integer getWarningPeriod() {
        return warningPeriod;
    }

    public void setWarningPeriod(Integer warningPeriod) {
        this.warningPeriod = warningPeriod;
    }
}
