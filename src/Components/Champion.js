import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import UpIcon from "@material-ui/icons/ExpandLess";
import DownIcon from "@material-ui/icons/ExpandMore";

import { sum } from "ramda";

const Champion = ({ name, image, passive, spells }) => {
    const [lvl, setLvl] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });
    console.log("Champion -> lvl", lvl)
    const [cds, setCds] = useState({});

	useEffect(() => {}, [lvl]);
	
	const upLvl = skill => () => setLvl(l => ({ ...l, [skill]: Math.min(l[skill] + 1, 18) }));
	const downLvl = skill => () => setLvl(l => ({ ...l, [skill]: Math.max(l[skill] - 1, 0) }));

    return (
        <Box mb={2} display="flex" flexDirection="column" border="1px solid #eee" borderRadius="5px">
            <Box display="flex" px={2} position="relative" bottom="-35px" justifyContent="space-between">
                <Box display="flex">
                    <img src={`/api/ddragon/img/champion/${image.full}`} wdith="50" height="50" />
                    <Typography variant="subtitle2" style={{ marginLeft: 5 }}>
                        {name}
                    </Typography>
                </Box>
				<Box bgcolor="#eee" borderRadius="5px" p={1}>
					lvl {Math.max(sum(Object.values(lvl)), 1)}
				</Box>
            </Box>
            <Paper>
                <Box py={1} px={2} display="flex">
                    <Box display="flex" justifyContent="space-evenly" flexGrow="1" alignItems="center">
                        <Box display="flex" cursor="pointer">
                            <img src={`/api/ddragon/img/passive/${passive.image.full}`} wdith="40" height="40" />
                            <Typography variant="caption" style={{ marginLeft: 2 }}>
                                10s
                            </Typography>
                        </Box>
                        {spells.map((spell, i) => (
                            <Box display="flex" key={spell.id} alignItems="center">
                                <Box display="flex" flexDirection="column" zIndex="25">
                                    <UpIcon onClick={upLvl(i)} />
                                    <DownIcon onClick={downLvl(i)} />
                                </Box>

                                <img src={`/api/ddragon/img/spell/${spell.image.full}`} wdith="40" height="40" />

                                <Box display="flex" flexDirection="column" borderRadius="5px" ml={.2}>
                                    <Typography variant="caption" color="#ff0000" style={{ fontWeight: "bold" }}>
                                        10s
                                    </Typography>

									<Typography variant="caption">lvl {lvl[i]}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Champion;
