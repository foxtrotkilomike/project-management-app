enum ResponseStatus {
  'NOT_AUTHORIZED' = 401,
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
