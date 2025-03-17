import React from 'react';
import componentStyles from "@/styles/custom-component.module.css";

/**
 * コンポーネント  ：カスタム年月選択コンポーネント
 * 作成           ：2025/03/14 FIS坂井
 * 更新           ：未実施
 */
const YmSelector = ({ selectedYear, selectedMonth, onYearChange, onMonthChange }) => {
    // 現年度を取得（年月選択欄用）
    const currentYear = new Date().getFullYear();
    // 年度リスト作成
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);
    // 月リスト作成
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className={componentStyles.ymSelectorArea}>
            <select className={componentStyles.box_yearSelect} name="selectedYear" value={selectedYear} onChange={onYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <b>年</b>

            <select className={componentStyles.box_monthSelect} name="selectedMonth" value={selectedMonth} onChange={onMonthChange}>
                {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <b>月</b>
        </div>
    );
};

export default YmSelector;