import React, { useState } from "react";
import styles from "./styles/checkbox.module.sass";
import CheckIcon from "@mui/icons-material/Check";

function CheckBox({ onSelect, selected }) {
  const [select, setSelect] = useState(selected || false);
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.box} ${select && styles.selected}`}
        onClick={() => setSelect((old) => !old)}
      >
        <CheckIcon fontSize="large" />
      </div>
    </div>
  );
}

export default CheckBox;
