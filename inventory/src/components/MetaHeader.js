import Head from 'next/head';

function MetaHeader({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="商品在庫マスタ管理システム" />
    </Head>
  );
}

export default MetaHeader;
