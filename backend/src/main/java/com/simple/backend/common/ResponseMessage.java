package com.simple.backend.common;

public interface ResponseMessage {
    // 200
    String SUCCESS = "Success"; // = public static final String SUCCESS = "SU";

    // 400
    String VALIDATION_FAILED = "Validation failed";
    String DUPLICATED_EMAIL = "Duplicated email";
    String DUPLICATED_NICKNAME = "Duplicated nickname";
    String DUPLICATED_TEL_NUMBER = "Duplicated tel number";
    String NOT_FOUND_USER = "User not found";
    String NOT_FOUND_BOARD = "Board not found";

    // 401
    String LOGIN_FAILED = "Login failed";
    String AUTHORIZATION_FAILED = "Authorization failed";

    // 403
    String NO_PERMISSION = "don't have permission";

    // 500
    String DATABASE_ERROR = "Database Error";   
}
