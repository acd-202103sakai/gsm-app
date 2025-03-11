import commonStyles from "../styles/common-layout.module.css"
import BackButton from '@/components/BackButton';

function BodyHeader({ pageName }) {
    return (
        <div className={commonStyles.main_header}>
            <div className={commonStyles.backBtnArea}>
                <BackButton />
            </div>
            <div className={commonStyles.pageNameArea}>
                <div className={commonStyles.pageNameArea_name}>
                    <h2 >{pageName}</h2>
                </div>
            </div>
        </div>
    );
}

export default BodyHeader;