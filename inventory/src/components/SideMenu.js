import commonStyles from "../styles/common-layout.module.css"

const SideMenu = () => (
    <div className={commonStyles.sideMenu}>
        <ul>
            <li>
                <a href="#">講座登録更新</a>
            </li>
            <li>
                <a href="#">モジュール作成</a>
            </li>
            <li>
                <a href="#">販売商品作成</a>
            </li>
        </ul>
    </div>
);

export default SideMenu;