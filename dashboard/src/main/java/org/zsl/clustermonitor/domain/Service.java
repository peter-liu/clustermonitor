package org.zsl.clustermonitor.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

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

    private AtomicInteger errorCount = new AtomicInteger(0);

    private List<HealthCheck> errorHealthChecks = new ArrayList<>();

    public List<HealthCheck> getErrorHealthChecks() {
        return errorHealthChecks;
    }

    public void setErrorHealthChecks(List<HealthCheck> errorHealthChecks) {
        this.errorHealthChecks = errorHealthChecks;
    }

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

//    public void addHealthCheck(Collection<HealthCheck> healthchecks) {
//        this.healthChecks.addAll(healthchecks);
//    }

    public void addHealthCheck(HealthCheck healthCheck) {
        healthCheck.setService(this);
        this.healthChecks.add(healthCheck);
    }

    public void addOperation(Operation operation) {
        operation.setService(this);
        this.operations.add(operation);
    }

    public void addAttribute(Attribute attribute) {
        attribute.setService(this);
        this.attributes.add(attribute);
    }

    public Attribute getAttribute(String qualifier) {
        for (Attribute attribute : attributes) {
            if (attribute.getName().equals(qualifier)) {
                return attribute;
            }
        }
        return null;
    }

    public Operation getOperation(String qualifier) {
        for (Operation operation : operations) {
            if (operation.getName().equals(qualifier)) {
                return operation;
            }
        }
        return null;
    }

    public HealthCheck getHealthCheck(String qualifier) {
        for (HealthCheck healthCheck : healthChecks) {
            if (healthCheck.getName().equals(qualifier)) {
                return healthCheck;
            }
        }
        return null;

    }

    public void addError(HealthCheck healthCheck){
        this.errorCount.getAndIncrement();
        this.errorHealthChecks.add(healthCheck);
    }

    public void removeError(HealthCheck healthCheck){
        this.errorCount.getAndDecrement();
        this.errorHealthChecks.remove(healthCheck);
    }

    public int getErrorCount(){
        return this.errorCount.get();
    }

}
