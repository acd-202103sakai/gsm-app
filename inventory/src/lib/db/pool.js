import { Pool } from "pg";
import dotenv from "dotenv";

/*
 * 概要  ：PostgreSQLデータベースへの接続を管理する
 * 作成  ：2025/02/12 FIS坂井
 * 更新  ：未実施
 */
// 環境変数を読み込む
dotenv.config();

// データベース接続設定を管理するための設定オブジェクト
const dbConfig = {
  host: process.env.INVENTORY_DATABASE_HOST, // ホスト名
  user: process.env.INVENTORY_DATABASE_USERNAME, // ユーザー名
  password: process.env.INVENTORY_DATABASE_PASSWORD, // パスワード
  database: process.env.INVENTORY_DATABASE_NAME, // データベース名
  port: Number(process.env.INVENTORY_DATABASE_PORT), // ポート番号
  max: Number(process.env.PGMAX),  // 最大接続数
  idleTimeoutMillis: Number(process.env.PGIDLE_TIMEOUT),  // 接続のアイドルタイムアウト
  connectionTimeoutMillis: Number(process.env.PGCONNECTION_TIMEOUT),  // 接続のタイムアウト
};

// グローバル変数を使って接続プールを保持し、再接続を防ぐ
if (!global.pool) {
  // コネクションプールを作成
  global.pool = new Pool(dbConfig);

  /* 開発用に使用してもいい
  // プール接続時にログを表示
  global.pool.on('connect', () => {
    console.log('★DB Connected');
  });

  // コネクションがプールから取得された時にログを表示
  global.pool.on('acquire', () => {
    console.log('■Connection acquired');
  });

  // コネクションがプールに戻された時にログを表示
  global.pool.on('release', () => {
    console.log('▲Connection released');
  });

  // プールでエラーが発生した場合のログ
  global.pool.on("error", (err) => {
    console.error("Unexpected DB pool error:", err);
  });
  */
}

// プールのコネクションをエクスポート
const pool = global.pool;
export default pool;
