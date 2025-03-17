import React from 'react';
import CustomDatePicker from '@/components/CustomDatePicker';

/**
 * コンポーネント  ：カスタム開始終了日付選択コンポーネント
 * 作成           ：2025/03/14 FIS坂井
 * 更新           ：未実施
 */
const SalePeriodSelector = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    return (
        <div>
            <CustomDatePicker selectedDate={startDate} onChange={onStartDateChange} />
            <b>　～　</b>
            <CustomDatePicker selectedDate={endDate} onChange={onEndDateChange} />
        </div>
    );
};

export default SalePeriodSelector;