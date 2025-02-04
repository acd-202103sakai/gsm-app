import styles from "../styles/Home.module.css"
import Header from '@/components/Header.js';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 className={styles.screenname}>講座登録</h1>
      </div>
      <div>
        <div>
          <h3>講座選択</h3>
          <div className={styles.box}>
            <p>参照したい講座を選択してください。</p>
            <select>
              <option value="" selected>-選択してください-</option>
              <option value="gyosei">行政書士</option>
              <option value="sharoushi">社会保険労務士</option>
              <option value="fp">ファイナンシャルプランナー</option>
              <option value="takken">宅地建物取引士</option>
              <option value="mankan">マンション管理士・管理業務主任者</option>
              <option value="boki">簿記</option>
              <option value="tsukanshi">通関士</option>
              <option value="it">ITパスポート</option>
              <option value="ryokou">旅行業務取扱管理者</option>
              <option value="shusho">中小企業診断士</option>
              <option value="nenkin">年金アドバイザー3級</option>
              <option value="kikenbutsu">危険物取扱者乙種4類</option>
              <option value="koumuin">公務員試験対策</option>
              <option value="hoikushi">保育士</option>
              <option value="shoshi">司法書士</option>
              <option value="fe">基本情報技術者</option>
              <option value="gaimuin">証券外務員</option>
            </select>
            <button type="button" name="kozaSelectButton">参照</button>
            <p>※新規講座作成の場合は選択不要です。以下の講座情報入力欄に進んでください。</p>
          </div>
        </div>
        <div>
          <h3>講座情報入力</h3>
          <div className={styles.box}>
            <div className={styles.box2}>
              <b>講座正式名称</b>
              <br></br>
              <input type="text" id="koza-seishiki-name" name="koza-seishiki-name"></input>
              <p>※商品名表示に使用されます。</p>
            </div>
            <div className={styles.box2}>
              <b>簡易講座名</b>
              <br></br>
              <input type="text" id="kani-koza-name" name="kani-koza-name"></input>
              <p>※管理画面で使用されることが多い講座名です。</p>
            </div>
            <div className={styles.box2}>
              <b>講座短縮名</b>
              <br></br>
              <input type="text" id="koza-tanshuku-name" name="koza-tanshuku-name"></input>
              <p>※サイト上での主な講座名表示形式となります。</p>
            </div>
            <div className={styles.box2}>
              <b>講座解析名</b>
              <br></br>
              <input type="text" id="koza-kaiseki-name" name="koza-kaiseki-name"></input>
              <p>※管理画面で使用されることが多く、GA4などに送る講座文字列としても使用されます。</p>
            </div>
            <div className={styles.box2}>
              <b>講座ドメイン名</b>
              <br></br>
              <input type="text" id="koza-domein-name" name="koza-domein-name" placeholder="半角英字"></input>
              <p>※URLの講座を判別する文字列として使用されます。</p>
            </div>
            <div>
              <b>講座説明</b>
              <br></br>
              <input type="text" id="koza-setsumei" name="koza-setsumei"></input>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.box}>
            <b>講座試験年月一覧</b>
            <table border="1">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox"></input>
                  </th>
                  <th>試験年月</th>
                  <th>試験日</th>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>2025年4月</td>
                  <td>2025年4月17日</td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>2025年10月</td>
                  <td>2025年10月16日</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div>
        <button type="button">登録</button>
      </div>
    </div>
  );
}

export default Home