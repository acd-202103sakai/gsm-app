import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import componentStyles from "@/styles/custom-component.module.css";

/**
 * コンポーネント  ：カスタム日付選択コンポーネント
 * 作成           ：2025/03/14 FIS坂井
 * 更新           ：未実施
 */
const CustomDatePicker = ({ selectedDate, onChange }) => {
    // reactのオリジナルDatePickerをカスタム(なぜかCSSのスタイルが適用されないため、スタイルは直指定)
    const CustomInput = ({ value, onClick }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={onClick}>
            <input type="text" value={value} readOnly placeholder="日付を選択" style={{ border: 'none', outline: 'none', flex: 1, fontSize: '15px' }} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="black">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12zm-9-10h4v2h-4zm0 4h4v2h-4zM7 11h2v2H7zm0 4h2v2H7zM16 5h-3V3h-2v2H8V3H6v2H5v2h14V5z" />
            </svg>
        </div>
    );

    return (
        <DatePicker
            className={componentStyles.inputBox_middle}
            selected={selectedDate}
            onChange={onChange}
            dateFormat="yyyy年MM月dd日"
            customInput={<CustomInput />}
        />
    );
};

export default CustomDatePicker;