import React from "react";
import BaseHTMLProps from "../../models/BaseHTMLProps";

interface RowProps extends BaseHTMLProps<HTMLDivElement> {

}

const Row: React.FC<RowProps> = (props) => {
  const {style, children} = props
  return <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      flexDirection: "row",
      ...style
    }}>
    {children}
  </div>
}

export default Row
