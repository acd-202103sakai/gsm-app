import { useRouter } from "next/router";
import { BUTTON_LABELS } from "@/constants/buttons";
import commonStyles from "../styles/common-layout.module.css"

const BackButton = () => {
    const router = useRouter();

    // 一ページ目（ホーム）なら戻るボタンを非表示にする
    const isFirstPage = router.pathname === "/";

    if (isFirstPage) return null; // ホームなら何も描画しない

    return (
        <button onClick={() => router.back()} className={commonStyles.backBtnArea_btn}>
            {BUTTON_LABELS.BACK}
        </button>
    );
};

export default BackButton;
