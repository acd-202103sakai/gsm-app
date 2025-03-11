import { API_MESSAGES } from "@/constants/api";

/*
 * 概要  ：共通API呼出関数
 * 作成  ：2025/02/25 FIS坂井
 * 更新  ：未実施
 * 
 * 指定されたURLに対してHTTPリクエストを送信し、レスポンスを返却する。
 * 成功時にはデータとステータスコードを含むオブジェクトを返す。
 * 失敗時にはエラー内容を含むオブジェクトを返す。
 */

/**
 * APIリクエスト関数
 * @param {string} url - リクエスト先のURL
 * @param {string} method - HTTPメソッド (GET, POST, PUT, DELETEなど)
 * @param {Object|null} body - リクエストボディ（オプション、必要に応じて指定）
 * @returns {Promise<Object>} APIレスポンスの結果オブジェクト
 */
export const fetchAPI = async (url, method, body = null) => {
  try {
    // APIリクエストを送信
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    // レスポンスデータをJSON形式でパース
    const responseData = await response.json();

    // レスポンスが失敗ステータスの場合、エラーをスロー
    if (!response.ok) {
      throw new Error(responseData.error || API_MESSAGES.API_REQUEST_FAILURE);
    }

    // 成功時のレスポンスオブジェクトを返却
    return {
      success: true,
      statusCode: response.status, // HTTPステータスコード
      data: responseData,          // APIからのデータ
    };
  } catch (error) {
    // エラー発生時のログ出力とエラーオブジェクトの返却
    console.error(API_MESSAGES.API_ERROR, error);
    return { success: false, error: error.message || API_MESSAGES.UNKNOWN_ERROR };
  }
};
