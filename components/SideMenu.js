import styles from "../styles/Home.module.css"

const SideMenu = () => (
    <div className={styles.sideMenu}>
        <ul>
            <li>
                <a href="#">講座登録</a>
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