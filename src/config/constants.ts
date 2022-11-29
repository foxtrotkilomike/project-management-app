enum ResponseStatus {
  'UNKNOWN_ERROR' = 0,
  'BAD_REQUEST' = 400,
  'NOT_AUTHORIZED' = 401,
  'USER_ALREADY_EXIST' = 409,
  'INTERNAL_SERVER_ERROR' = 500,
  'UNHANDLED_REJECTION' = 503,
}

enum BreakPoints {
  'MOBILE_S' = 320,
  'MOBILE_M' = 425,
  'TABLET' = 768,
  'DESKTOP' = 1280,
}

const MIN_PASSWORD_LENGTH = 8;

export { ResponseStatus, BreakPoints, MIN_PASSWORD_LENGTH };
