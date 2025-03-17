import { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { COMMON_CONSTANTS } from "@/constants/commonConstants";
import { PAGE_NAMES } from "@/constants/pageNames";
import { ROUTING_PATHS } from "@/constants/routingPaths";
import { API_PATHS, API_METHODS } from "@/constants/api";
import { BUTTON_LABELS } from "@/constants/buttons";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, WARNING_MESSAGES } from "@/constants/messages";
import { fetchAPI } from "@/lib/api/fetchApi";
import KozaEntryUpdateContext from "@/context/KozaEntryUpdateContext";
import KozaExamYmEntryContext from "@/context/KozaExamYmEntryContext";
import componentStyles from "@/styles/custom-component.module.css";
import buttonStyles from "@/styles/custom-button.module.css";
import tableStyles from "@/styles/custom-table.module.css";
import PageWrapper from '@/components/PageWrapper';
import YmSelector from '@/components/YmSelector';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomPeriodSelector from '@/components/CustomPeriodSelector';

/*
 * 画面  ：講座試験年月登録更新画面
 * 作成  ：2025/02/25 FIS坂井
 * 更新  ：未実施
 */
const KozaEXAMYmEntry = () => {
    // コンテキスト内で保持されている画面情報（データと更新関数）の取得および管理
    const { kozaExamYmEntryData, setKozaExamYmEntryData } = useContext(KozaExamYmEntryContext);
    // Next.jsのuseRouterフックを使用して、ルーターオブジェクトを取得（画面遷移先パス指定用）
    const router = useRouter();

    /*
     * 初回レンダリング時処理（初期表示処理）
     */
    useEffect(() => {
    }, []);

    /*
     * 画面入力欄内容変更時（入力時）処理
     */
    // 日付、年月系以外の入力内容変更時処理
    const handleChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, [e.target.name]: e.target.value });
    };

    // 試験年月の年度選択肢変更時処理
    const handleYearChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, selectedExamYear: e.target.value });
    };

    // 試験年月の月選択肢変更時処理
    const handleMonthChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, selectedExamMonth: e.target.value });
    };

    // 試験日変更時処理
    const handleExamDateChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, examDate: e });
    };

    // 販売期間の販売開始日付変更時処理
    const handleSaleStartDateChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, saleStartDate: e });
    };

    // 販売期間の販売終了日付変更時処理
    const handleSaleEtartDateChange = (e) => {
        setKozaExamYmEntryData({ ...kozaExamYmEntryData, saleEndDate: e });
    };

    /*
     * 講座試験年月一覧表内チェックボックス押下時処理
     */
    const handleCheckboxChange = (kozaId, examYm) => {
        // コンテキスト内の selectedExamYmList を更新する
        setKozaExamYmEntryData((prev) => {
            // すでに選択済みの講座ID・試験年月が存在するかチェック
            const exists = prev.selectedExamYmList.some(
                (item) => item.kozaId === kozaId && item.examYm === examYm
            );

            // 存在していれば削除、存在していなければ新規追加
            const updatedExamYmList = exists
                ? prev.selectedExamYmList.filter(
                    (item) => !(item.kozaId === kozaId && item.examYm === examYm) // 条件に一致する要素を除外
                )
                : [...prev.selectedExamYmList, { kozaId, examYm }]; // 一致しなければ新しい項目を追加

            // 更新後の selectedExamYmList をコンテキストに反映
            return {
                ...prev,
                selectedExamYmList: updatedExamYmList,
            };
        });
    };

    /*
     * 講座試験年月一覧表ヘッダ一括チェックボックス押下時処理
     */
    const handleHeaderCheckboxChange = () => {
        // 一括選択/解除の状態を切り替え、選択リストを更新
        setKozaExamYmEntryData((prev) => {
            const newCheckedState = !prev.isCheckedAll; // 現在の状態を反転

            // 全チェックボックスの状態を更新
            const updatedSelectedExamYmList = newCheckedState
                ? prev.kozaExamYmList.map((kozaExamYm) => ({
                    kozaId: kozaExamYm.koza_id,
                    examYm: kozaExamYm.exam_ym,
                })) // すべて選択
                : []; // すべて解除

            return {
                ...prev,
                isCheckedAll: newCheckedState, // 全選択状態を更新
                selectedExamYmList: updatedSelectedExamYmList, // 更新した選択リストを反映
            };
        });
    };

    return (
        <PageWrapper pageName={PAGE_NAMES.KOZA_EXAM_YM_ENTRY}>
            <div>
                <div className={componentStyles.contentsArea}>
                    <div className={componentStyles.contentsArea_name}>
                        <b>試験年月情報入力</b>
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>対象講座：{kozaExamYmEntryData.kozaName}</b>
                        </div>
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>試験年月</b>
                        </div>
                        <YmSelector
                            selectedYear={kozaExamYmEntryData.selectedExamYear}
                            selectedMonth={kozaExamYmEntryData.selectedExamMonth}
                            onYearChange={handleYearChange}
                            onMonthChange={handleMonthChange}
                        />
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>年月繰越</b>
                        </div>
                        <div className={componentStyles.refComponent}>
                            <div>
                                <select className={componentStyles.selectBox_middle} name="selectedCarriedFoewardRange" value={kozaExamYmEntryData.selectedCarriedFoewardRange} onChange={handleChange}
                                    disabled={kozaExamYmEntryData.carriedFoewardYmState !== COMMON_CONSTANTS.SCREEN_MODE_ENTRY}>
                                    <option value="">-選択してください-</option>
                                    <option value="salesProductCarriedFoeward">販売商品まで繰越</option>
                                    <option value="itemCarriedFoeward">アイテムまで繰越</option>
                                </select>
                            </div>
                            <div>
                                {kozaExamYmEntryData.carriedFoewardYmState === "01" ? (
                                    <button className={buttonStyles.button_ref}>{BUTTON_LABELS.CARRYOVER}</button>
                                ) : (
                                    <button className={buttonStyles.button_ref}>{BUTTON_LABELS.DECARRYOVER}</button>
                                )}
                            </div>
                        </div>
                        <div className={componentStyles.comment_warning}>
                            <a>※年月繰越が不要な場合、選択および年月繰越ボタン押下不要</a>
                        </div>
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>試験日</b>
                        </div>
                        <CustomDatePicker selectedDate={kozaExamYmEntryData.examDate} onChange={handleExamDateChange} />
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>販売期間</b>
                        </div>
                        <CustomPeriodSelector
                            startDate={kozaExamYmEntryData.saleStartDate}
                            endDate={kozaExamYmEntryData.saleEndDate}
                            onStartDateChange={handleSaleStartDateChange}
                            onEndDateChange={handleSaleEtartDateChange}
                        />
                    </div>
                </div>
                <div className={componentStyles.contentsArea}>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>商品セット一覧</b>
                        </div>
                        <div className={tableStyles.tableArea}>
                            <div>
                                <table className={tableStyles.table}>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    className={tableStyles.table_checkBox}
                                                    checked={kozaExamYmEntryData.isCheckedAll}
                                                    onChange={handleHeaderCheckboxChange}
                                                />
                                            </th>
                                            <th>商品ID</th>
                                            <th>商品セット名</th>
                                            <th>価格（税込）</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kozaExamYmEntryData.productSetList.map((productSet) => (
                                            <tr key={productSet.koza_id + productSet.exam_ym}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className={tableStyles.table_checkBox}
                                                        checked={kozaExamYmEntryData.selectedProductSetList.some(item => item.kozaId === productSet.koza_id && item.examYm === productSet.exam_ym)}
                                                        onChange={() => handleCheckboxChange(productSet.koza_id, kozaExamYm.exam_ym)}
                                                    />
                                                </td>
                                                <td>{productSet.exam_ym.slice(0, 4)}年{productSet.exam_ym.slice(4, 6)}月</td>
                                                <td>{productSet.exam_date.slice(0, 4)}年{productSet.exam_date.slice(4, 6)}月{productSet.exam_date.slice(6, 8)}日</td>
                                                <td>{productSet.exam_date.slice(0, 4)}年{productSet.exam_date.slice(4, 6)}月{productSet.exam_date.slice(6, 8)}日</td>
                                                <td>
                                                    <a href="" className={buttonStyles.link_update}>編集</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {kozaExamYmEntryData.screenMode === COMMON_CONSTANTS.SCREEN_MODE_ENTRY ? (
                                <div className={tableStyles.table_buttonArea}>
                                    <button className={buttonStyles.disabledButton_insert} disabled>{BUTTON_LABELS.ADDITION}</button>
                                    <button className={buttonStyles.disabledButton_del} disabled>{BUTTON_LABELS.DELETE}</button>
                                </div>
                            ) : (
                                <div className={tableStyles.table_buttonArea}>
                                    <button className={buttonStyles.button_insert}>{BUTTON_LABELS.ADDITION}</button>
                                    <button className={buttonStyles.button_del}>{BUTTON_LABELS.DELETE}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {kozaExamYmEntryData.screenMode === COMMON_CONSTANTS.SCREEN_MODE_ENTRY ? (
                    <button className={buttonStyles.button_entry}>{BUTTON_LABELS.REGISTER}</button>
                ) : (
                    <button className={buttonStyles.button_entry}>{BUTTON_LABELS.UPDATE}</button>
                )}
            </div>
        </PageWrapper>
    );
}

export default KozaEXAMYmEntry