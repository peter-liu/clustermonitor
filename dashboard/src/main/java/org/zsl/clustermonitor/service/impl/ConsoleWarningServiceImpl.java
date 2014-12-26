package org.zsl.clustermonitor.service.impl;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;
import org.zsl.clustermonitor.domain.HealthCheck;
import org.zsl.clustermonitor.service.WarningService;

import java.util.List;

/**
 * TODO description
 * Created by liusz on 14-12-26-上午10:52
 */
@Service
public class ConsoleWarningServiceImpl implements WarningService {

    @Override public void warn(List<HealthCheck> healthChecks) {
        final long currentTime = System.currentTimeMillis();
        String healthCheckNames = Joiner.on(",")
                .join(Lists.transform(healthChecks, new Function<HealthCheck, String>() {
                    @Override public String apply(HealthCheck input) {
                        input.setLastWarningtime(currentTime);
                        return input.getName();
                    }
                }));

        System.err.println(healthCheckNames + " is warning");
    }

    @Override public void warn(HealthCheck healthCheck) {
        System.err.println(healthCheck.getName() + " is warning");
        healthCheck.setLastWarningtime(System.currentTimeMillis());
    }
}
