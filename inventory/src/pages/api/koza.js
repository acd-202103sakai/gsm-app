import { queries } from "@/lib/db/queries";
import { apiHandler } from "@/lib/api/apiHandler";
import { API_METHODS, API_STATUS_CODES } from "@/constants/api";

/**
 * 概要  ：講座情報APIエンドポイント
 * 作成  ：2025/02/25 FIS坂井
 * 更新  ：未実施
 */
export default apiHandler({
  /* 講座情報取得（GET）*/
  [API_METHODS.GET]: async (request, client) => {
    // データベースから講座情報を取得するクエリを実行
    const result = await client.query(queries.selectKozaList);
    
    // 成功した場合、ステータスコードとデータ（講座リスト）を返却
    return { statusCode: API_STATUS_CODES.GET_SUCCESS, data: result.rows };
  },

  /* 講座情報登録（POST）*/
  [API_METHODS.POST]: async (request, client) => {
    // リクエストボディから登録する講座情報を取得
    const { kozaName, kozaIName, kozaShortName, kozaAnalyticsName, kozaDomain, kozaDescription } = request.body;

    // データベースに新しい講座情報を挿入するクエリを実行
    const result = await client.query(queries.insertKoza, [
      kozaName, kozaIName, kozaShortName, kozaAnalyticsName, kozaDomain, kozaDescription,
    ]);

    // 挿入が成功した場合、影響を受けた行数（挿入された講座の数）を返却
    return { statusCode: API_STATUS_CODES.POST_SUCCESS, data: result.rowCount };
  },

  /* 講座情報更新（PUT）*/
  [API_METHODS.PUT]: async (request, client) => {
    // リクエストボディから更新する講座情報を取得
    const { selectedKozaId, kozaName, kozaIName, kozaShortName, kozaAnalyticsName, kozaDomain, kozaDescription } = request.body;

    // データベースで講座情報を更新するクエリを実行
    const result = await client.query(queries.updateKoza, [
      selectedKozaId, kozaName, kozaIName, kozaShortName, kozaAnalyticsName, kozaDomain, kozaDescription,
    ]);

    // 更新が成功した場合、影響を受けた行数（更新された講座の数）を返却
    return { statusCode: API_STATUS_CODES.PUT_SUCCESS, data: result.rowCount };
  },
});

