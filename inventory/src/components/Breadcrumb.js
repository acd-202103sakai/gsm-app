import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BREADCRUMB_PAGE_NAMES } from "@/constants/breadcrumbPageNames";
import commonStyles from "../styles/common-layout.module.css"

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumbHistory, setBreadcrumbHistory] = useState(["/"]); // 初期値としてホーム（`/`）を設定

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;

      // 現在のパスが履歴の最後に含まれていなければ追加
      setBreadcrumbHistory((prevHistory) => {
        if (prevHistory[prevHistory.length - 1] !== currentPath) {
          return [...prevHistory, currentPath];
        }
        return prevHistory;
      });
    }
  }, [router.asPath]);

  return (
    <div className={commonStyles.breadcrumb}>
      {breadcrumbHistory.map((path, index) => {
        const isLast = index === breadcrumbHistory.length - 1;
        return (
          <span key={path}>
            {index > 0 && " > "}
            {isLast ? (
              <span>
                {BREADCRUMB_PAGE_NAMES[path] || path}
              </span>
            ) : (
              <Link href={path}>{BREADCRUMB_PAGE_NAMES[path] || path}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
