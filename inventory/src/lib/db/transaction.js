import pool from "./pool.js";
import { API_MESSAGES, TRANSACTION_FLOWS } from "@/constants/api";

/**
 * トランザクションを実行する関数
 * - コネクションを取得し、トランザクションを開始・コミット・ロールバックを適切に行う
 * - コールバック関数を引数として受け取り、トランザクション内で実行する
 * 
 * @param {Function} callback - トランザクション内で実行する処理（SQLクエリなど）
 * @returns {Promise} - トランザクション処理が正常に完了した結果を返す
 * @throws {Error} - トランザクション中にエラーが発生した場合、エラーを投げる
 */
export const runTransaction = async (callback) => {
  // コネクションを取得
  const client = await pool.connect();
  
  try {
    // トランザクション開始
    await client.query(TRANSACTION_FLOWS.BEGIN);
    // コールバック関数を実行し、結果を取得
    const result = await callback(client);
    // トランザクションの変更を確定
    await client.query(TRANSACTION_FLOWS.COMMIT);
    // 結果を返す
    return result;

  } catch (error) {
    // エラーが発生した場合、トランザクションをロールバック
    await client.query(TRANSACTION_FLOWS.ROLLBACK);
    // エラーログを記録
    console.error(API_MESSAGES.TRANSACTION_ERROR, error);
    // エラーを再スローして上層でキャッチできるようにする
    throw error;
    
  } finally {
    // コネクションを返却
    client.release();
  }
};
