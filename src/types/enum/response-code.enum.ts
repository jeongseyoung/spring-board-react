enum ResponseCode {
  // 200
  SUCCESS = "SU",
  // 400
  VALIDATION_FAILED = "VF",
  DUPLICATED_EMAIL = "DE",
  DUPLICATED_NICKNAME = " DN",
  DUPLICATED_TEL_NUMBER = "DT",
  NOT_FOUND_USER = "NU",
  NOT_FOUND_POST = "NB",

  // 401
  LOGIN_FAILED = "LF",
  AUTHORIZATION_FAILED = "AF",

  // 403
  NO_PERMISSION = "NP",

  // 500
  DATABASE_ERROR = "DBE",
}

export default ResponseCode;
