import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import getSummoner from "DAL/getSummoner";
import getActiveMatch from "DAL/getActiveMatch";

import AppBar from "Components/TopBar";
import Placeholder from "Components/Placeholder";
import Champion from "Components/Champion";

const Detail = () => {
	const { name } = useParams();
	const [user, setUser] = useState({});
	const [match, setMatch] = useState();
    console.log("Detail -> user", user)
    console.log("Detail -> match", match)

	useEffect(() => {
		getSummoner(name).then(setUser);
	}, [name]);

	useEffect(() => {
		if (user && user.id) {
			getActiveMatch(user.id).then(setMatch);
		}
	}, [user]);

	return (
		<>
			<AppBar />
			<Box width={1} height="15vh" bgcolor="#d6b0ff">
				<Container maxWidth="md">
					<Box display="flex" flexWrap="wrap" flexGrow={1} p={2}>
						<Box
							width={0.3}
							minWidth="100px"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Placeholder width="70px" height="70px" borderRadius="20px" waitFor={user.profileIconId}>
								<img src={`/api/ddragon/img/profileicon/${user.profileIconId}.png`} width="70" height="70" />
							</Placeholder>
						</Box>
						<Box p={2} minWidth="150px">
							<Placeholder width="100px" waitFor={user.name}>
								<Typography variant="h6">{user.name}</Typography>
							</Placeholder>
						</Box>
					</Box>
				</Container>
			</Box>
			<Container maxWidth="md">
				{!match && <p>LOADING MATCH...</p>}
				{match && !match.active && <p>Nenhuma partida ativa irmao</p>}
				
				{match && match.active && (
					<Box py={2}>
						{match.champs.map(champ => <Champion key={champ.id} {...champ} />)}
					</Box>
				)}
			</Container>
		</>
	);
};

export default Detail;
