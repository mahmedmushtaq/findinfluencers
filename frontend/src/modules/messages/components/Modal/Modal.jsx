import clsx from "clsx";
import React from "react";
import styles from "../../../../../styles/scss/Modal.module.scss";

const Modal = (props) => {
  const findByKey = (name) =>
    props.children.map((child) => {
      if (child.key === name) return child;
    });

  const closeModal = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains("modal-close")) {
      return props.click();
    }
  };

  return (
    <div
      className={clsx(styles["modal-mask"], "modal-close")}
      onClick={closeModal}
    >
      <div className={clsx(styles["modal-wrapper"])}>
        <div className={clsx(styles["modal-container"])}>
          <div className={clsx(styles["modal-header"])}>
            {findByKey("header")}
          </div>

          <div className={clsx(styles["modal-body"])}>{findByKey("body")}</div>

          <div className={clsx(styles["modal-footer"])}>
            <button className={clsx("modal-close")} onClick={closeModal}>
              CLOSE
            </button>
            {findByKey("footer")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
