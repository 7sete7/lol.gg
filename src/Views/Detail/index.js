import React from "react";
import { useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import AppBar from "Components/TopBar";
import Placeholder from "Components/Placeholder";

const Detail = () => {
	const params = useParams();
	console.log("Detail -> params", params);

	return (
		<>
			<AppBar />
			<Box width={1} height="30vh" bgcolor="#d6b0ff">
				<Container maxWidth="md">
					<Box display="flex" flexWrap="wrap" flexGrow={1} p={2}>
						<Box width={0.3} minWidth="100px" display="flex" alignItems="center" justifyContent="center">
							<Placeholder width="70px" height="70px" borderRadius="20px" />
						</Box>
            <Box p={2} minWidth="150px">
              <Placeholder width="100px" />
              <Placeholder width="40px" />
            </Box>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Detail;
