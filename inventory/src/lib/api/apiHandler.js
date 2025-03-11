import { runTransaction } from "@/lib/db/transaction";
import { errorHandler } from "../utils/errorHandler";
import { API_STATUS_CODES, API_MESSAGES } from "@/constants/api";

/**
 * 共通APIハンドラー
 * 各HTTPメソッドごとの処理を統一的に扱う関数。
 * トランザクションを必ず使用する設計。
 *
 * @param {Object} handlers - 各HTTPメソッドの処理関数（GET, POST, PUT など）
 * @returns {Function} APIリクエストを処理する非同期関数
 */
export const apiHandler = (handlers) => {
  return async (request, response) => {
    const method = request.method; 

    if (handlers[method]) {
      try {
        // トランザクションを必ず使用してAPIを実行
        const result = await runTransaction(async (client) => handlers[method](request, client));

        // 成功時のレスポンス返却
        response.status(result.statusCode).json(result.data);
      } catch (error) {
        // エラー発生時の共通エラーハンドリング
        errorHandler(response, error);
      }
    } else {
      // 未対応のHTTPメソッドの場合
      response.status(API_STATUS_CODES.METHOD_NOT_ALLOWED).json({ message: API_MESSAGES.METHOD_NOT_ALLOWED });
    }
  };
};
