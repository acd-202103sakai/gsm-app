import styles from "../styles/Home.module.css"
import tableStyles from "../styles/Table.module.css"
import Header from '@/components/Header.js';
import KozaList from "@/components/KozaList";
import SideMenu from "@/components/SideMenu";

const Home = () => {
  return (
    <div>
      <header>
        <title>
          システム名-講座登録
        </title>
      </header>
      <Header />
      <div className={styles.container}>
        <SideMenu />
        <div className={styles.main}>
          <div className={styles.screenName}>
            <h2>講座登録</h2>
          </div>
          <div>
            <div className={styles.contentsArea}>
              <div className={styles.contentsAreaName}>
                <b>講座選択</b>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <a>参照したい講座を選択してください。</a>
                </div>
                <div className={styles.refComponent}>
                  <KozaList />
                  <div className={styles.refButtonArea}>
                    <a href="" className={styles.refButton}>参照</a>
                  </div>
                </div>
                <div className={styles.warningComment}>
                  <a>※新規講座作成の場合は選択不要です。以下の講座情報入力欄に進んでください。</a>
                </div>
              </div>
            </div>
            <div className={styles.contentsArea}>
              <div className={styles.contentsAreaName}>
                <b>講座情報</b>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座正式名称</b>
                </div>
                <div>
                  <input type="text" id="koza-seishiki-name"></input>
                </div>
                <div className={styles.warningComment}>
                  <a>※商品名表示に使用されます。</a>
                </div>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>簡易講座名</b>
                </div>
                <div>
                  <input type="text" id="koza-seishiki-name"></input>
                </div>
                <div className={styles.warningComment}>
                  <a>※管理画面で使用されることが多い講座名です。</a>
                </div>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座短縮名</b>
                </div>
                <div>
                  <input type="text" id="koza-seishiki-name"></input>
                </div>
                <div className={styles.warningComment}>
                  <a>※サイト上で主な講座名表示形式となります。</a>
                </div>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座解析用名</b>
                </div>
                <div>
                  <input type="text" id="koza-seishiki-name"></input>
                </div>
                <div className={styles.warningComment}>
                  <a>※管理画面で使用されることが多く、GA4等に送る講座文字列としても使用されます。</a>
                </div>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座ドメイン名</b>
                </div>
                <div>
                  <input type="text" id="koza-seishiki-name"></input>
                </div>
                <div className={styles.warningComment}>
                  <a>※URLの講座を判別する文字列として使用されます。</a>
                </div>
              </div>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座説明</b>
                </div>
                <div>
                  <textarea className={styles.longTextInputBox}></textarea>
                </div>
              </div>
            </div>
            <div className={styles.contentsArea}>
              <div className={styles.contentsBox}>
                <div>
                  <b>講座試験年月一覧</b>
                </div>
                <div className={tableStyles.customTableArea}>
                  <div>
                    <table className={tableStyles.customTable}>
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" className={styles.checkBox}></input>
                          </th>
                          <th>試験年月</th>
                          <th>試験日</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="checkbox" className={styles.checkBox}></input>
                          </td>
                          <td>2025年4月</td>
                          <td>2025年4月17日</td>
                          <td>
                            <a href="" className={styles.updLink}>編集</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" className={styles.checkBox}></input>
                          </td>
                          <td>2025年10月</td>
                          <td>2025年10月16日</td>
                          <td>
                            <a href="" className={styles.updLink}>編集</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.customButtonArea}>
                    <a href="" className={styles.insertButton}>追加</a>
                    <a href="" className={styles.delButton}>削除</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="" className={styles.entryButton}>登録</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home