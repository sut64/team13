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
import { ScreeningInterface } from "../models/IScreening";
import { format } from 'date-fns'
import moment from "moment";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function ScreeningList() {
    const classes = useStyles();
    const [screening, setScreening] = React.useState<ScreeningInterface[]>([]);
 console.log("screening",screening)
    const getScreening = async () => {
            const apiUrl = "http://localhost:8080/screenings";
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
    
                    setScreening(res.data);
    
                } else {
    
                    console.log("else");
    
                }
    
             });
    
    };
    
    useEffect(() => {
    
        getScreening();
    
    }, []);
  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลผู้ป่วยคัดกรอง
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="4%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="16%">
                  สกุล
                </TableCell>
                <TableCell align="center" width="5%">
                  วันเดือนปีเกิด
                </TableCell>
                <TableCell align="center" width="20%">
                  ยาที่ใช้
                </TableCell>
                <TableCell align="center" width="15%">
                  อาการที่พบ
                </TableCell>
                <TableCell align="center" width="20%">
                  รายละเอียดเพิ่มเติม
                </TableCell>
                <TableCell align="center" width="10%">
                  คิว
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {screening.map((screening: ScreeningInterface) => (
                <TableRow key={screening.ID}>
                <TableCell align="center">{screening.ID}</TableCell>
                <TableCell align="center">{screening.Patient.Firstname} </TableCell>  
                <TableCell align="center">{screening.Patient.Lastname}</TableCell>
                <TableCell align="center">{screening.Patient.Birthday}</TableCell>
                <TableCell align="center">{screening.MedicalProduct.Name}</TableCell>
                <TableCell align="center">{screening.Illnesses}</TableCell>
                <TableCell align="center">{screening.Scrdate}</TableCell>
                <TableCell align="center">{screening.Queue}</TableCell>

                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
              gutterBottom
            > 
            </Typography>
        <Button
              component={RouterLink}
              to="/ScreeningCreate"
              variant="contained"
              
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
            >
              หน้าหลัก
            </Button>
      </Container>
    </div>
  );
}

export default ScreeningList;
