package org.zsl.clustermonitor.service;

import org.zsl.clustermonitor.domain.HealthCheck;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 14-12-26-上午10:51
 */
public interface WarningService {

    public void warn(List<HealthCheck> healthChecks);

    public void warn(HealthCheck healthCheck);

}
