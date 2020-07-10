import React, { useState } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button"

import TopBar from "Components/TopBar";
import useStyles from "./classes";

const Home = () => {
  const [user, setUser] = useState();
  const [match, setMatch] = useState();
  const classes = useStyles();
  let name = "";

  const onSend = async () => {
    try {
      if (!name) return;

      const { data: summ } = await axios.get(`/summoner/${name}`);
      setUser(summ);

      if (summ) {
        const { data: activeMatch } = await axios.get(`/active-match/${summ.id}`);
        setMatch(activeMatch);
      }
    } catch (e) {
      console.error(e);
      setUser(null);
    }
  };

  const onGoClick = () => {
    window.location.hash = `/summoner/${name}`;
    // ipcMain.emit("redirect", 1, 2, 3);
  }

  return (
    <>
      <TopBar />
      <Container maxWidth="md" style={{ background: "#d6b0ff" }}>
        <Box paddingTop="30%">
          <Container maxWidth="xs" disableGutters>
            <Box bgcolor="primary.main" position="relative" bottom="-20px" p={3} display="flex" justifyContent="center">
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="baseline">
                  <Typography component="h2" color="textSecondary" className={classes.title}>
                    leo
                  </Typography>
                  <Typography variant="h6">.gg</Typography>
                </Box>
                <Box py={2}>
                  <Paper square>
                    <Box display="flex" p={1} alignItems="center">
                      <InputBase placeholder="Invocador" onChange={({ target }) => name = target.value} />
                      <Divider className={classes.divider} />
                      <Select value="BR" disabled disableUnderline>
                        <MenuItem value="BR">BR</MenuItem>
                      </Select>
                      <Box ml={1}>
                        <Button variant="outlined" onClick={onGoClick}>GO!</Button>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default Home;
