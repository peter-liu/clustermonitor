package org.zsl.clustermonitor.service;

import org.zsl.clustermonitor.domain.HealthCheck;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 14-12-26-上午10:11
 */
public interface HealthCheckService {

    /**
     * check health and warining intervally in background
     *
     * @param healthCheck
     */
    public void scheduleHealthCheck(HealthCheck healthCheck);

    /**
     * mannully warning
     *
     * @param healthCheck
     * @param message
     */
    public void warningHealthCheck(HealthCheck healthCheck, String message);

    /**
     * remove health checks
     * @param healthChecks
     */
    public void unscheduleHealthCheck(List<HealthCheck> healthChecks);

    /**
     * remove health check
     * @param healthCheck
     */
    public void unscheduleHealthCheck(HealthCheck healthCheck);
}
