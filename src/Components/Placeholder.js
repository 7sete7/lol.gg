import React from "react";
import Box from "@material-ui/core/Box";

const bgColor = "rgb(216, 216, 216)";
const PlaceholderText = ({ width = 1, height = "7px", ...props }) => (
    <Box bgcolor={bgColor}  width={width} height={height} marginX="3px" marginY="5px" borderRadius="1px" {...props} />
);

export default PlaceholderText;