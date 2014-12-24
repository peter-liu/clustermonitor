package org.zsl.clustermonitor.controller;/*
 * 
 */

import org.apache.commons.lang3.exception.ExceptionUtils;

import com.alibaba.fastjson.JSONObject;

// TODO: Auto-generated Javadoc

/**
 * The Class OperationResult.
 */
public class OperationResult {

    /**
     * The message.
     */
    private String message;

    /**
     * The success.
     */
    private boolean success;

    /**
     * The data.
     */
    private Object data;

    /**
     * Failed.
     *
     * @param e the e
     * @return the operation result
     */
    public static OperationResult failed(Exception e) {
        return failed(e.toString(), e);
    }

    /**
     * Failed.
     *
     * @return the operation result
     */
    public static OperationResult failed() {
        return failed(null, null);
    }

    /**
     * Failed.
     *
     * @param message the message
     * @return the operation result
     */
    public static OperationResult failed(String message) {
        return failed(message, null);
    }

    /**
     * Failed.
     *
     * @param message the message
     * @param data    the data
     * @return the operation result
     */
    public static OperationResult failed(String message, Object data) {
        OperationResult result = new OperationResult();
        result.setMessage(message);
        result.setSuccess(false);
        result.setData(data);
        return result;

    }

    /**
     * Success.
     *
     * @param message the message
     * @param data    the data
     * @return the operation result
     */
    public static OperationResult success(String message, Object data) {
        OperationResult result = new OperationResult();
        result.setMessage(message);
        result.setSuccess(true);
        result.setData(data);
        return result;
    }

    /**
     * Success.
     *
     * @param message the message
     * @return the operation result
     */
    public static OperationResult success(String message) {
        return success(message, null);
    }

    /**
     * Success.
     *
     * @return the operation result
     */
    public static OperationResult success() {
        return success(null, null);
    }

    /**
     * Gets the message.
     *
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message.
     *
     * @param message the new message
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Gets the data.
     *
     * @return the data
     */
    public Object getData() {
        return data;
    }

    /**
     * Sets the data.
     *
     * @param data the new data
     */
    public void setData(Object data) {
        // 如果data为Exception,则进行提取
        if (data instanceof Throwable) {
            JSONObject obj = new JSONObject();
            obj.put("details", ExceptionUtils.getStackTrace((Throwable) data));
            obj.put("message", ((Throwable) data).getMessage());
            this.data = obj;
        } else {
            this.data = data;
        }
    }

    /**
     * Checks if is success.
     *
     * @return true, if is success
     */
    public boolean isSuccess() {
        return success;
    }

    /**
     * Sets the success.
     *
     * @param success the new success
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

}
