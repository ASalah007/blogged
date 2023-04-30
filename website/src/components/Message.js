import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/message.sass";
import { motion } from "framer-motion";

function Message({ type, children, onClose }) {
  const [close, setClose] = useState(false);
  return (
    close || (
      <motion.div
        className={"message " + type}
        animate={{ y: "13rem" }}
        transition={{ type: "spring", tension: 120, friction: 14 }}
      >
        <div className="body">{children}</div>
        <div
          className="close-button"
          onClick={() => {
            setClose(true);
            onClose();
          }}
        >
          <CloseIcon fontSize="large" />
        </div>
      </motion.div>
    )
  );
}

export default Message;
