const YmSelector = ({ onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select onChange={(e) => onChange('year', parseInt(e.target.value))}>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <b>年</b>

            <select onChange={(e) => onChange('month', parseInt(e.target.value))}>
                {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <b>月</b>
        </div>
    );
};
export default YmSelector;