import React from "react";
import { Link } from "@chakra-ui/core";

function PopupText({ name }) {
  return (
    <div>
      <strong style={{ color: "#086F83" }}>{name}</strong>
      <br />
      <Link color="#4299e1" href={"#" + name}>
        Latest data
      </Link>
      <Link ml="2" color="#4299e1" href={"#" + name + "_statistics"}>
        Statistics
      </Link>
      <br />
      <strong>Click one of the buttons to view details</strong>
    </div>
  );
}
export default PopupText;
