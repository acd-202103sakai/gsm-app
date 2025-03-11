export const API_PATHS = {
  KOZA: "/api/koza",
  KOZA_EXAM_YM: "/api/kozaExamYm",
};

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const API_STATUS_CODES = {
  GET_SUCCESS: 200,
  POST_SUCCESS: 201,
  PUT_SUCCESS: 200,
  PATCH_SUCCESS: 200,
  DELETE_SUCCESS: 200,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

export const TRANSACTION_FLOWS = {
  BEGIN: "BEGIN",
  COMMIT: "COMMIT",
  ROLLBACK: "ROLLBACK",
};

export const API_MESSAGES = {
  METHOD_NOT_ALLOWED: "Method Not Allowed",
  DATEBASE_QUERY_ERROR: "Database query error:",
  API_REQUEST_FAILURE: "api request failure",
  API_ERROR: "APIエラー:",
  UNKNOWN_ERROR: "不明なエラー",
  TRANSACTION_ERROR: "トランザクションエラー:",
};