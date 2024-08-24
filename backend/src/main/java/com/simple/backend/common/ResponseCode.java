package com.simple.backend.common;

// interface에서는 전부 public static final로 인식
public interface ResponseCode {
    // 200
    String SUCCESS = "SU"; // = public static final String SUCCESS = "SU";

    // 400
    String VALIDATION_FAILED = "VF";
    String DUPLICATED_EMAIL = "DE";
    String DUPLICATED_NICKNAME = " DN";
    String DUPLICATED_TEL_NUMBER = "DT";
    String NOT_FOUND_USER = "NU";
    String NOT_FOUND_BOARD = "NB";

    // 401
    String LOGIN_FAILED = "LF";
    String AUTHORIZATION_FAILED = "AF";

    // 403
    String NO_PERMISSION = "NP";

    // 500
    String DATABASE_ERROR = "DBE";
}
