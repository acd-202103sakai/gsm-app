import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    // カスタム入力フィールド
    const CustomInput = ({ value, onClick }) => (
        <div 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                padding: '8px', 
                cursor: 'pointer' 
            }} 
            onClick={onClick}
        >
            <input
                type="text"
                value={value}
                readOnly
                placeholder="日付を選択"
                style={{ 
                    border: 'none', 
                    outline: 'none', 
                    flex: 1 
                }}
            />
            <span 
                style={{ 
                    marginLeft: '8px', 
                    fontSize: '20px' 
                }}
            >
                📅
            </span>
        </div>
    );

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                customInput={<CustomInput />}
            />
        </div>
    );
}

export default CustomDatePicker;
