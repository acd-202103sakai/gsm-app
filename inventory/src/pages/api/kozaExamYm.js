import { queries } from "@/lib/db/queries";
import { apiHandler } from "@/lib/api/apiHandler";
import { API_METHODS, API_STATUS_CODES } from "@/constants/api";

/**
 * 概要  ：講座試験年月情報APIエンドポイント
 * 作成  ：2025/02/25 FIS坂井
 * 更新  ：未実施
 */
export default apiHandler({
  /* 講座に紐づく試験年月一覧情報取得（POST）*/
  [API_METHODS.POST]: async (request, client) => {
    // リクエストボディから参照講座の講座IDを取得
    const { selectedKozaId } = request.body;

    // データベースに新しい講座情報を挿入するクエリを実行
    const result = await client.query(queries.selectKozaExamYmList, [ selectedKozaId ]);
    
    // 成功した場合、ステータスコードとデータ（講座試験年月リスト）を返却
    return { statusCode: API_STATUS_CODES.POST_SUCCESS, data: result.rows };
  },

  /* 講座試験年月情報削除（DELETE）*/
  [API_METHODS.DELETE]: async (request, client) => {
    // リクエストボディから削除する講座試験年月情報を取得
    const { selectedExamYmList } = request.body;

    let deletedCount = 0;  // 削除した行数をカウント

      // トランザクション内で削除処理を行う
      for (const { kozaId, examYm } of selectedExamYmList) {
        // 各試験年月情報を削除
        const result = await client.query(queries.deleteKozaExamYm, [kozaId, examYm]);
        deletedCount += result.rowCount; // 削除された行数をカウント
      }

      // 削除が成功した場合、影響を受けた行数を返却
      return { statusCode: API_STATUS_CODES.DELETE_SUCCESS, data: { deletedCount } };
  },
});