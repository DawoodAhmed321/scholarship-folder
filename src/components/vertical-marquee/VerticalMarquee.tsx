// components/VerticalMarquee.js
import React from "react";
import { TOffer } from "@/configs/interface";
import styles from "./VerticalMarquee.module.css";

interface IVerticalMarquee<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function VerticalMarquee<T>({ items, renderItem }: IVerticalMarquee<T>) {
  return (
    <div className={styles.marqueeContainer}>
      <div className={`${styles.marqueeContent} ${styles.marqueeInner}`}>
        {items.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
        {items.map((item, index) => (
          <div key={`${index}-duplicate`}>{renderItem(item, index)}</div>
        ))}
      </div>
    </div>
  );
}

export default VerticalMarquee;
