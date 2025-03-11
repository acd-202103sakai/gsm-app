// 動的な引数を受け取る成功メッセージ
export const SUCCESS_MESSAGES = {
    REGISTERED: (item) => `${item}の登録が完了しました。`,
    UPDATED: (item) => `${item}の更新が完了しました。`,
    DELETED: (item) => `${item}の削除が完了しました。`,
};

// 動的な引数を受け取るエラーメッセージ
export const ERROR_MESSAGES = {
    REGISTERED: (item) => `${item}の登録に失敗しました。`,
    UPDATED: (item) => `${item}の更新に失敗しました。`,
    DELETED: (item) => `${item}の削除に失敗しました。`,
    SELECTED: (item) => `${item}データの取得に失敗しました。`,
    KOZA_NOT_SELECTED: "講座が選択されていません。",
    EXAM_DATE_NOT_SELECTED: "削除する講座試験年月を1件以上選択してください。",
};

// 警告メッセージ
export const WARNING_MESSAGES = {
    CONFIRM_DELETE: (item) => `選択した${item}を削除しますか？`,
};