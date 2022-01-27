import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import { AppointInterface } from "../models/IAppoint";

import moment from 'moment';


const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);







function WatchAppointtList() {
  const classes = useStyles();

  const [pats, setWatchAppoint] = React.useState<AppointInterface[]>([]);

  const getWatchAppoint = async () => {

    const apiUrl = "http://localhost:8080/appoints";

    const requestOptions = {

      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

    };

    fetch(apiUrl, requestOptions)

      .then((response) => response.json())

      .then((res) => {

        console.log(res.data);

        if (res.data) {

          setWatchAppoint(res.data);

        } else {

          console.log("else");

        }

      });

  };



  useEffect(() => {

    getWatchAppoint();

  }, []);



  return (

    <div>

      <Container className={classes.container} maxWidth="md" >

        <Box display="flex">

          <Box flexGrow={1}>

            <Typography

              component="h2"

              variant="h6"

              color="primary"

              gutterBottom

            >

              ประวัติการนัดหมาย

            </Typography>

          </Box>

          <Box>

            <Button

              component={RouterLink}

              to="/appointcreate"

              variant="contained"

              color="primary"

            >

              เพิ่มบันทึกการนัดหมาย

            </Button>

          </Box>

        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>

          <Table className={classes.table} aria-label="simple table">

            <TableHead>

              <TableRow>

                <TableCell align="left" width="25%">

                  ผู้ป่วย

                </TableCell>


                <TableCell align="left" width="20%">


                  ทันตแพทย์

                </TableCell>

                <TableCell align="left" width="25%">

                  วันที่นัด

                </TableCell>


                <TableCell align="left" width="20%">


                  เหตุที่นัด

                </TableCell>

                <TableCell align="left" width="10%">

                  ห้อง

                </TableCell>


              </TableRow>

            </TableHead>

            <TableBody>

              {pats.map((pats: AppointInterface) => (

                <TableRow key={pats.ID}>

                  <TableCell align="left">{pats.Patient.Firstname} {pats.Patient.Lastname}</TableCell>

                  <TableCell align="left">{pats.Dentist.Firstname} {pats.Dentist.Lastname}</TableCell>

                  <TableCell align="left">{moment(pats.AppointTime).format("YYYY-MM-DDTHH:mm")}</TableCell>

                  <TableCell align="left">{pats.RemedyType.Name}</TableCell>

                  <TableCell align="left">{pats.Room}</TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Container>

    </div>

  );
}
export default WatchAppointtList;
