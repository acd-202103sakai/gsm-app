import { Pool } from "pg";
import dotenv from "dotenv";

/*
 * 概要  ：PostgreSQLデータベースへの接続を管理する
 * 作成  ：2025/02/12 FIS坂井
 * 更新  ：未実施
 */
dotenv.config();

// データベース接続設定を管理するための設定オブジェクト
let dbConfig = {
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  max: Number(process.env.PGMAX),
  idleTimeoutMillis: Number(process.env.PGIDLE_TIMEOUT),
  connectionTimeoutMillis: Number(process.env.PGCONNECTION_TIMEOUT),
};

// ホスト名のみ、環境ごとに異なる
if (process.env.DATABASE_ENV === "local") {
  dbConfig.host = process.env.DATABASE_HOST; // 開発環境
} else {
  dbConfig.host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`; // 検証or本番環境
}

// グローバル変数を使って接続プールを保持し、再接続を防ぐ
if (!global.pool) {
  // コネクションプールを作成
  global.pool = new Pool(dbConfig);

  /*
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