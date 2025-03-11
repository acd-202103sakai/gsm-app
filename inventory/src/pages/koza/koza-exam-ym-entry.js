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
import DatePicker from '@/components/DatePicker';
import YmSelector from '@/components/YmSelector';

/*
 * 画面  ：講座試験年月登録更新画面
 * 作成  ：2025/02/25 FIS坂井
 * 更新  ：未実施
 */
const KozaEXAMYmEntry = () => {
    // コンテキスト内で保持されている画面情報（データと更新関数）の取得および管理
    const { kozaExamYmEntryData, setKozaExamYmEntryData } = useContext(KozaExamYmEntryContext);
    // コンテキスト内で保持されている講座登録更新画面情報（データと更新関数）の取得および管理※対象講座名取得用
    const { kozaEntryUpdateData, setKozaEntryUpdateData } = useContext(KozaEntryUpdateContext);
    // Next.jsのuseRouterフックを使用して、ルーターオブジェクトを取得（画面遷移先パス指定用）
    const router = useRouter();

    /*
     * 初回レンダリング時処理（初期表示処理）
     */
    useEffect(() => {
        // 参照講座一覧の取得
        fetchKozaList();
    }, []);

    /*
     * 画面入力欄内容変更時（入力時）処理
     */
    const handleChange = (type, eOrValue) => {
        if (type === 'year' || type === 'month') {
            // 年度・月選択時
            setKozaExamYmEntryData((prev) => ({
                ...prev,
                [type === 'year' ? 'selectedExamYear' : 'selectedExamMonth']: eOrValue,
            }));
        } else {
            // 通常の入力欄変更時
            setKozaExamYmEntryData((prev) => ({
                ...prev,
                [eOrValue.target.name]: eOrValue.target.value,
            }));
        }
    };

    /*
     * 登録ボタン押下処理
     */
    const handleRegister = async () => {
        // fetchAPI を使用して API 呼び出し
        const response = await fetchAPI(API_PATHS.KOZA_ENTRY_UPDATE, API_METHODS.POST, kozaEntryUpdateData);

        if (response.success) {
            // 登録成功時の処理
            alert(SUCCESS_MESSAGES.REGISTERED(COMMON_CONSTANTS.KOZA));

            // 画面初期化処理（コンテキスト内初期化、参照講座一覧再取得）
            resetScreen();
        } else {
            // 登録失敗時の処理
            alert(`${ERROR_MESSAGES.REGISTERED(COMMON_CONSTANTS.KOZA)}: ${response.error}`);
        }
    };

    /*
     * 更新ボタン押下処理
     */
    const handleUpdate = async () => {
        // fetchAPI を使用して API 呼び出し
        const response = await fetchAPI(API_PATHS.KOZA_ENTRY_UPDATE, API_METHODS.PUT, kozaEntryUpdateData);

        if (response.success) {
            // 更新成功時の処理
            alert(SUCCESS_MESSAGES.UPDATED(COMMON_CONSTANTS.KOZA));
        } else {
            // 更新失敗時の処理
            alert(`${ERROR_MESSAGES.UPDATED(COMMON_CONSTANTS.KOZA)}: ${response.error}`);
        }
    };

    /*
     * 参照ボタン押下処理
     */
    const handleRef = () => {
        // 選択済講座の講座ID取得
        const selectedKozaId = kozaEntryUpdateData.selectedKozaId;

        // 参照講座選択済チェック（未選択の場合、アラート表示 & 処理中断）
        if (!refKozaSelectedCheck(selectedKozaId)) return;

        // 選択した講座の講座情報を取得
        setSelectedKozaInfo(selectedKozaId);

        // 参照講座に紐づく講座試験年月情報の一覧取得
        getKozaExamYmList(selectedKozaId);
    };

    /*
     * 参照解除ボタン押下処理
     */
    const handleDeRef = () => {
        // 画面初期化処理（コンテキスト内初期化、参照講座一覧再取得）
        resetScreen();
    };

    /*
     * 講座試験年月一覧表内チェックボックス押下時処理
     */
    const handleCheckboxChange = (kozaId, examYm) => {
        // コンテキスト内の selectedExamYmList を更新する
        setKozaEntryUpdateData((prev) => {
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
        setKozaEntryUpdateData((prev) => {
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

    /*
     * 講座試験年月一覧表内削除ボタン押下時処理
     */
    const handleDelete = () => {
        // 削除対象（チェックON）講座試験年月リスト取得
        const selectedExamYmList = kozaEntryUpdateData.selectedExamYmList;

        // 削除対象選択済チェック（未選択の場合、アラート表示 & 処理中断）
        if (!delKozaExamYmSelectedCheck(selectedExamYmList)) return;

        // 削除対象が選択されている場合、削除実施確認メッセージを表示する。
        const confirmDelete = window.confirm(WARNING_MESSAGES.UPDATED(COMMON_CONSTANTS.KOZA_EXAM_YM));
        // 画面にて「キャンセル」が選択された場合処理を中断
        if (!confirmDelete) return;

        // 「OK」が選択された場合、削除処理実行
        delKozaExamYmData(selectedExamYmList);
    };

    /*
     * 講座試験年月一覧表内「追加ボタン」押下時処理
     */
    const handleNavigation = () => {
        // 講座試験年月登録更新画面に遷移
        router.push(ROUTING_PATHS.KOZA_EXAM_YM_ENTRY);
    };

    /*
     * 参照講座一覧の取得処理
     */
    const fetchKozaList = async () => {
        // apiを実行し、DBより参照講座一覧データを取得する
        const response = await fetch(API_PATHS.KOZA_ENTRY_UPDATE, {
            method: API_METHODS.GET,
        });

        // 取得した参照講座一覧をコンテキスト内の画面情報にセットする
        const data = await response.json();
        setKozaEntryUpdateData(prev => ({ ...prev, kozaList: data }));
    }

    /*
     * 画面初期化処理（コンテキスト内初期化、参照講座一覧再取得）
     */
    const resetScreen = () => {
        // コンテキスト内の画面情報初期化処理
        setKozaEntryUpdateData({
            screenMode: COMMON_CONSTANTS.SCREEN_MODE_ENTRY,
            kozaList: [],
            selectedKozaId: "",
            kozaName: "",
            kozaIName: "",
            kozaShortName: "",
            kozaAnalyticsName: "",
            kozaDomain: "",
            kozaDescription: "",
            kozaExamYmList: [],
            selectedExamYmList: [],
            isCheckedAll: false,
        });

        // 参照講座一覧の取得
        fetchKozaList();
    };

    /*
     * 参照講座選択済チェック（未選択時アラート表示）
     */
    const refKozaSelectedCheck = (selectedKozaId) => {
        // 参照講座を選択していない場合
        if (!selectedKozaId) {
            alert(ERROR_MESSAGES.KOZA_NOT_SELECTED);
            return false;
        }
        // 選択されている場合
        return true;
    };

    /*
     * 選択した講座の講座情報取得処理
     */
    const setSelectedKozaInfo = (selectedKozaId) => {
        // 参照講座一覧より、選択済み講座の講座情報を取得する
        const selectedKozaInfo = kozaEntryUpdateData.kozaList.find(koza => String(koza.koza_id) === String(selectedKozaId));

        // 取得した講座情報をコンテキスト内の画面情報にセットする
        setKozaEntryUpdateData(prev => ({
            ...prev,
            screenMode: COMMON_CONSTANTS.SCREEN_MODE_UPDATE,
            kozaName: selectedKozaInfo.koza_name,
            kozaIName: selectedKozaInfo.koza_i_name,
            kozaShortName: selectedKozaInfo.koza_short_name,
            kozaAnalyticsName: selectedKozaInfo.koza_analytics_name,
            kozaDomain: selectedKozaInfo.koza_domain,
            kozaDescription: selectedKozaInfo.koza_description,
        }));
    };

    /*
     * 参照講座に紐づく講座試験年月情報の一覧取得
     */
    const getKozaExamYmList = async (selectedKozaId) => {
        // DBより、選択した講座に紐づく講座試験年月一覧情報を取得する
        const response = await fetchAPI(API_PATHS.KOZA_EXAM_YM_LIST, API_METHODS.POST, { selectedKozaId });

        if (response.success) {
            // 取得した講座試験年月一覧情報をコンテキスト内の画面情報にセット
            setKozaEntryUpdateData(prev => ({
                ...prev,
                kozaExamYmList: response.data,
                selectedExamYmList: [],
                isCheckedAll: false,
            }));
        } else {
            // 取得失敗時のエラー処理
            alert(`${ERROR_MESSAGES.SELECTED(COMMON_CONSTANTS.KOZA_EXAM_YM_LIST)}: ${response.error}`);
        }
    };

    /*
     * 削除対象選択済チェック（未選択の場合アラート表示）
     */
    const delKozaExamYmSelectedCheck = (selectedExamYmList) => {
        // 削除対象の講座試験年月を選択していない場合
        if (selectedExamYmList.length === 0) {
            alert(ERROR_MESSAGES.EXAM_DATE_NOT_SELECTED);
            return false;
        }
        // 選択されている場合
        return true;
    };

    /*
     * 参照講座に紐づく講座試験年月情報の一覧取得
     */
    const delKozaExamYmData = async (selectedExamYmList) => {
        // apiを実行し、DBより講座試験年月情報を削除する
        const response = await fetchAPI(API_PATHS.KOZA_EXAM_YM_LIST, API_METHODS.DELETE, { selectedExamYmList });

        // 成功・失敗判定
        if (response.success) {
            alert(SUCCESS_MESSAGES.DELETED(COMMON_CONSTANTS.KOZA_EXAM_YM));
            // 参照講座に紐づく講座試験年月情報の一覧再取得
            getKozaExamYmList(kozaEntryUpdateData.selectedKozaId);
        } else {
            alert(`${ERROR_MESSAGES.DELETED(COMMON_CONSTANTS.KOZA_EXAM_YM)}: ${response.error}`);
        }
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
                            <b>対象講座：{kozaEntryUpdateData.kozaName}</b>
                        </div>
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>試験年月</b>
                        </div>
                        <div>
                            <YmSelector onChange={handleChange} />
                        </div>
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>年月繰越</b>
                        </div>
                        <div className={componentStyles.refComponent}>
                            <div className={componentStyles.box_ref}>
                                <select name="selectedKozaId" value={kozaEntryUpdateData.selectedKozaId} onChange={handleChange} disabled={kozaEntryUpdateData.screenMode !== COMMON_CONSTANTS.SCREEN_MODE_ENTRY}>
                                    <option value="">-選択してください-</option>
                                    <option value="">販売商品まで繰越</option>
                                    <option value="">アイテムまで繰越</option>
                                </select>
                            </div>
                            <div className={componentStyles.ref_buttonArea}>
                                {kozaEntryUpdateData.screenMode === "01" ? (
                                    <button onClick={handleRef} className={buttonStyles.button_ref}>{BUTTON_LABELS.CARRYOVER}</button>
                                ) : (
                                    <button onClick={handleDeRef} className={buttonStyles.button_ref}>{BUTTON_LABELS.DECARRYOVER}</button>
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
                        <DatePicker />
                    </div>
                    <div className={componentStyles.contentsArea_contentsBox}>
                        <div>
                            <b>販売期間</b>
                        </div>
                        <div>
                            <input type="text" name="kozaDomain" value={kozaEntryUpdateData.kozaDomain} onChange={handleChange} required />
                        </div>
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
                                                    checked={kozaEntryUpdateData.isCheckedAll}
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
                                        {kozaEntryUpdateData.kozaExamYmList.map((kozaExamYm) => (
                                            <tr key={kozaExamYm.koza_id + kozaExamYm.exam_ym}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className={tableStyles.table_checkBox}
                                                        checked={kozaEntryUpdateData.selectedExamYmList.some(item => item.kozaId === kozaExamYm.koza_id && item.examYm === kozaExamYm.exam_ym)}
                                                        onChange={() => handleCheckboxChange(kozaExamYm.koza_id, kozaExamYm.exam_ym)}
                                                    />
                                                </td>
                                                <td>{kozaExamYm.exam_ym.slice(0, 4)}年{kozaExamYm.exam_ym.slice(4, 6)}月</td>
                                                <td>{kozaExamYm.exam_date.slice(0, 4)}年{kozaExamYm.exam_date.slice(4, 6)}月{kozaExamYm.exam_date.slice(6, 8)}日</td>
                                                <td>{kozaExamYm.exam_date.slice(0, 4)}年{kozaExamYm.exam_date.slice(4, 6)}月{kozaExamYm.exam_date.slice(6, 8)}日</td>
                                                <td>
                                                    <a href="" className={buttonStyles.link_update}>編集</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={tableStyles.table_buttonArea}>
                                <button onClick={handleNavigation} className={buttonStyles.button_insert}>{BUTTON_LABELS.ADDITION}</button>
                                <button onClick={handleDelete} className={buttonStyles.button_del}>{BUTTON_LABELS.DELETE}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {kozaExamYmEntryData.screenMode === COMMON_CONSTANTS.SCREEN_MODE_ENTRY ? (
                    <button onClick={handleRegister} className={buttonStyles.button_entry}>{BUTTON_LABELS.REGISTER}</button>
                ) : (
                    <button onClick={handleUpdate} className={buttonStyles.button_entry}>{BUTTON_LABELS.UPDATE}</button>
                )}
            </div>
        </PageWrapper>
    );
}

export default KozaEXAMYmEntry