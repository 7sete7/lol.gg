import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { PlaceholderText } from 'Components/Placeholder';

const TopBar = ({ children }) => (
	<AppBar position="sticky">
		<Toolbar>
			<Container maxWidth="md">
				<Box display="flex" width="50%" minHeight="45px">
					<PlaceholderText width="30%" height="auto" />
					<Box display="flex" flexDirection="column" width={1}>
						<PlaceholderText />
						<PlaceholderText width="60%" marginTop={0} />
					</Box>
				</Box>
                <Box>
                    {children}
                </Box>
			</Container>
		</Toolbar>
	</AppBar>
);

export default TopBar;
