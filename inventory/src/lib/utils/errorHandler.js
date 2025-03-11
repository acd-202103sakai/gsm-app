import { API_STATUS_CODES, API_MESSAGES } from "@/constants/api";

/**
 * APIエラーを統一的に処理する関数
 * @param {Object} response - HTTPレスポンスオブジェクト
 * @param {Error} error - エラーハンドリング対象のエラーオブジェクト
 */
export const errorHandler = (response, error) => {
    console.error(API_MESSAGES.DATEBASE_QUERY_ERROR, error);
    response.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
  };
  