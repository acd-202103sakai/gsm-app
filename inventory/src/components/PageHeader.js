import { SYSTEM_NAMES } from "@/constants/systemName";
import commonStyles from "../styles/common-layout.module.css"

const PageHeader = () => (
    <div className={commonStyles.header}>
        <h1 className={commonStyles.header_systemName}>{SYSTEM_NAMES.SYSTEM_NAME}</h1>
    </div>
);

export default PageHeader;