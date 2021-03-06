import React, { useEffect, useState } from "react";
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
import { blue } from '@mui/material/colors';
import CreateIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { PatientInterface } from "../models/IPat";
import PatientData from './PatientData';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({

        container: { marginTop: theme.spacing(2) },
        table: { minWidth: 500 },
        tableSpace: { marginTop: 20 },
        Font: { fontSize: '16px' },

    })

);

function WatchPatientList(this: any) {
    const classes = useStyles();
    const [pats, setWatchPatient] = React.useState<PatientInterface[]>([]);
    const [DeleteValue, setDeleteValue] = React.useState(false);
/*  
    const [Search, setSearch] = React.useState<String>();
    const [Searchtable, setSearchtable] = React.useState<PatientInterface[]>([]);

    const handleSearchChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id
        const { value } = event.target;
        console.log("ID", id, "Value", value)
        setSearch(value)
    };
*/
    const getWatchPatient = async () => {
        const apiUrl = "http://localhost:8080/patients";
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
                    setWatchPatient(res.data);
                } else {
                    console.log("else");
                }
            });

    };

    function DeletePatient(DeleteUserID: number) {

        const apiUrl = `http://localhost:8080/patient/${DeleteUserID}`;
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log("DeleteUser", res)
            });
        setDeleteValue(!DeleteValue);
    }

    useEffect(() => {
        getWatchPatient();
    }, [DeleteValue]);

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
                            ??????????????????????????????????????????
                        </Typography>
                    </Box>

                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Patientcreate"
                            variant="contained"
                            color="primary"
                        >
                            <CreateIcon />???????????????????????????????????????????????????
                        </Button>
                    </Box>
                </Box>



                <TableContainer component={Paper} className={classes.tableSpace} >

                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow >
                                
                                <TableCell align="center" width="4%" className={classes.Font}>ID</TableCell>
                                <TableCell align="left" width="5%" className={classes.Font}>????????????</TableCell>
                                <TableCell align="left" width="5%" className={classes.Font}>?????????????????????</TableCell>
                                <TableCell align="left" width="5%" className={classes.Font}>?????????????????????????????????????????????</TableCell>
                                <TableCell align="center" width="1%" className={classes.Font}>??????????????????</TableCell>
                                <TableCell align="center" width="1%" className={classes.Font}>???????????????</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pats.map((pats: PatientInterface) => (

                                <TableRow
                                    key={pats.ID}

                                    style={{ backgroundColor: "#FFFFFF" }}
                                >
                                    <TableCell align="center">{pats.ID}</TableCell>
                                    <TableCell align="left">{pats.Firstname}</TableCell>
                                    <TableCell align="left">{pats.Lastname}</TableCell>
                                    <TableCell align="left">{pats.IDcard}</TableCell>
                                    <TableCell align="center">
                                        <PatientData
                                            ID={pats.ID}
                                            Firstname={pats.Firstname}
                                            Lastname={pats.Lastname}
                                            Birthday={pats.Birthday}
                                            IDcard={pats.IDcard}
                                            Tel={pats.Tel}
                                            Weight={pats.Weight}
                                            Height={pats.Height}
                                            Time={pats.Time}
                                            SexID={pats.SexID}
                                            JobID={pats.JobID}
                                            InsuranceID={pats.InsuranceID}
                                            NurseID={pats.NurseID}
                                            Sex={pats.Sex}
                                            Job={pats.Job}
                                            Insurance={pats.Insurance}
                                            Nurse={pats.Nurse}
                                            Appoints={[]}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton onClick={() => DeletePatient(pats.ID)} >
                                            <DeleteOutlineIcon sx={{ fontSize: 35, color: "#3366CC" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>

    );
}

export default WatchPatientList;