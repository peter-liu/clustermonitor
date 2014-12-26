package org.zsl.clustermonitor.service.impl;

import org.springframework.stereotype.Service;
import org.zsl.clustermonitor.domain.HealthCheck;
import org.zsl.clustermonitor.service.HealthCheckService;
import org.zsl.clustermonitor.service.NodeService;
import org.zsl.clustermonitor.service.WarningService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

/**
 * TODO description
 * Created by liusz on 14-12-26-上午10:18
 */
@Service
public class JdkTimerHealthCheckServiceImpl implements HealthCheckService {

    private static Timer timer = new Timer();
    @Resource
    private WarningService warningService;
    @Resource
    private NodeService nodeService;

    @Override public void scheduleHealthCheck(HealthCheck healthCheck) {
        timer.schedule(new CheckHealthTimerTask(healthCheck), 0 , healthCheck.getInterval() * 1000);
    }

    @Override public void waringHealthCheck(HealthCheck healthCheck, String message) {
        warningService.warn(healthCheck);
    }

    @Override public void unscheduleHealthCheck(List<HealthCheck> healthChecks) {
        new UnsupportedOperationException(" not implemented ");
    }

    @Override public void unscheduleHealthCheck(HealthCheck healthCheck) {
        new UnsupportedOperationException(" not implemented ");
    }

    private class CheckHealthTimerTask extends TimerTask {

        public HealthCheck healthCheck;

        public CheckHealthTimerTask(HealthCheck healthCheck) {
            this.healthCheck = healthCheck;
        }

        @Override public void run() {
            nodeService.check(this.healthCheck);
            if (this.healthCheck.isWarning()) {
                warningService.warn(healthCheck);
            }
        }
    }

}
