package org.zsl.clustermonitor.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * TODO description
 * Created by liusz on 2014/12/23-22:09
 */
public class Service {

    private String name;

    private String displayName;

    private String desc;

    private Node node;

    private List<Operation> operations = new ArrayList<>();

    private List<Attribute> attributes = new ArrayList<>();

    private List<HealthCheck> healthChecks = new ArrayList<>();

    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public List<Operation> getOperations() {
        return operations;
    }

    public void setOperations(List<Operation> operations) {
        this.operations = operations;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute> attributes) {
        this.attributes = attributes;
    }

    public List<HealthCheck> getHealthChecks() {
        return healthChecks;
    }

    public void setHealthChecks(List<HealthCheck> healthChecks) {
        this.healthChecks = healthChecks;
    }

    public void addHealthCheck(Collection<HealthCheck> healthchecks) {
        this.healthChecks.addAll(healthchecks);
    }

    public void addHealthCheck(HealthCheck healthCheck) {
        this.healthChecks.add(healthCheck);
    }
}
