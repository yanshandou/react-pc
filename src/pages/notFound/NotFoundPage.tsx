import React from "react";
import styles from "./NotFoundPage.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import notFoundImage from "../../assets/images/very_sorry.png";

export const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.NotFoundPage}>
        <h1>404 页面未找到</h1>
        <p>很抱歉，你所访问的页面不存在或已被移除。</p>
        <img src={notFoundImage} alt="Not Found" />
        <p>
				<button className={styles.homeButton} onClick={() => window.location.href = '/'}>返回首页</button>
				</p>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
