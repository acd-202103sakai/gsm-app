import { createContext, useState } from "react";

// 講座登録更新画面のコンテキストを作成
const KozaEntryUpdateContext = createContext();

// Provider コンポーネントを作成
export const KozaEntryUpdateProvider = ({ children }) => {
  const [kozaEntryUpdateData, setKozaEntryUpdateData] = useState({
    /* 画面モード */
    // 講座登録更新画面の画面モード（01: 登録モード、02: 更新モード）
    screenMode: "01",
    /* 参照情報欄 */
    // 講座一覧
    kozaList: [],
    // 講座一覧より選択した講座の講座ID
    selectedKozaId: "",
    /* 講座情報入力欄 */
    // 講座正式名称
    kozaName: "",
    // 簡易口座名
    kozaIName: "",
    // 講座短縮名称
    kozaShortName: "",
    // 講座解析名称
    kozaAnalyticsName: "",
    // 講座ドメイン名
    kozaDomain: "",
    // 講座説明
    kozaDescription: "",
    /* 講座試験年月一覧表 */
    // 講座に紐づく講座試験年月一覧
    kozaExamYmList: [],
    // 講座試験年月一覧で選択された講座試験年月
    selectedExamYmList: [],
    // 講座試験年月一覧ヘッダの全チェックステータス
    isCheckedAll: false,
  });

  return (
    <KozaEntryUpdateContext.Provider value={{ kozaEntryUpdateData, setKozaEntryUpdateData }}>
      {children}
    </KozaEntryUpdateContext.Provider>
  );
};

// コンテキストをエクスポート
export default KozaEntryUpdateContext;
