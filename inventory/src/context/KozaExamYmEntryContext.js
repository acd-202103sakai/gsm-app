import { createContext, useState } from "react";

// 講座試験年月登録更新画面のコンテキストを作成
const KozaExamYmEntryContext = createContext();

// Provider コンポーネントを作成
export const KozaExamYmEntryProvider = ({ children }) => {
  const [kozaExamYmEntryData, setKozaExamYmEntryData] = useState({
    /* 画面モード */
    // 講座試験年月登録更新画面の画面モード（01: 登録モード、02: 更新モード）
    screenMode: "01",
    // 年月繰越状態（01: 未繰越状態、02: 年月繰越状態）
    carriedFoewardYmState: "01",
    /* 講座試験年月情報入力欄 */
    // 講座ID
    selectedKozaId: "",
    // 講座正式名称
    kozaName: "",
    // 年月繰越範囲
    selectedCarriedFoewardRange: "",
    // 試験年月_年度
    selectedExamYear: "",
    // 試験年月_月
    selectedExamMonth: "",
    // 試験日
    examDate: "",
    // 販売開始日
    saleStartDate: "",
    // 販売終了日
    saleEndDate: "",
    /* 商品セット一覧表 */
    // 講座試験年月に紐づく商品セット一覧
    productSetList: [],
    // 商品セット一覧で選択された商品セット
    selectedProductSetList: [],
    // 商品セット一覧ヘッダの全チェックステータス
    isCheckedAll: false,
  });

  return (
    <KozaExamYmEntryContext.Provider value={{ kozaExamYmEntryData, setKozaExamYmEntryData }}>
      {children}
    </KozaExamYmEntryContext.Provider>
  );
};

// コンテキストをエクスポート
export default KozaExamYmEntryContext;
