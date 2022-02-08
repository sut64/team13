import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import BuildIcon from '@mui/icons-material/Build';
import { grey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { PatientInterface } from "../models/IPat";
import { UserInterface } from "../models/IUser";
import { SexInterface } from "../models/ISex";
import { JobInterface } from "../models/IJob";
import { InsuranceInterface } from "../models/IIns";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 }
    }));

export default function UpdatePatient(Pats: PatientInterface) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDig = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const [errorTest, seterrorTest] = React.useState(false);
    const [detail, setDetail] = React.useState<String>();
    const [sexs, setSex] = React.useState<SexInterface[]>([]);
    const [jobs, setJob] = React.useState<JobInterface[]>([]);
    const [ins, setIns] = React.useState<InsuranceInterface[]>([]);
    const [Useronline, setUseronline] = React.useState<UserInterface>();
    const [pats, setPatient] = React.useState<Partial<PatientInterface>>({ ...Pats });
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [ErrorMessage, setErrorMessage] = React.useState<String>();
    const [loading, setLoading] = React.useState(false);
    const [Test, setTest] = React.useState<String>();

    const ClearInputChange = () => {
        window.location.href = "/Patientcreate";
    };

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
        setLoading(false)
    };



    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof PatientInterface;
        const { value } = event.target;
        console.log("ID", id, "Value", value)
        setPatient({ ...Pats, [id]: value });
    };

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        //console.log("Type value",typeof(event.target.value))
        if (event.target.name === "InsuranceID") {
            setDetail(ins.find(i => i.ID == event.target.value)?.Detail)
            if (event.target.value == "") {
                setDetail("")
            }
        }
        const name = event.target.name as keyof typeof pats
        console.log("Name", name)
        console.log("value", event.target.value)
        setPatient({
            ...pats,
            [name]: event.target.value,
        });
    };


    //ดึงข้อมูลเพศ

    function getSex() {
        const apiUrl = "http://localhost:8080/sexs";
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
                console.log("Combobox_sex", res)
                if (res.data) {
                    setSex(res.data);
                } else {
                    console.log("else");
                }
            });
    }

    //ดึงข้อมูลอาชีพ

    function getJob() {
        const apiUrl = "http://localhost:8080/jobs";
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
                console.log("Combobox_job", res)
                if (res.data) {
                    setJob(res.data);
                } else {
                    console.log("else");
                }
            });

    }

    //ดึงข้อมูลสิทธิในการรักษา

    function getIns() {
        const apiUrl = "http://localhost:8080/insrs";
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
                console.log("Combobox_Ins", res)
                if (res.data) {
                    setIns(res.data);
                } else {
                    console.log("else");
                }
            });
    }

    //real useronline

    function getUseronline() {
        const UserID = localStorage.getItem("uid")
        const apiUrl = `http://localhost:8080/users/${UserID}`;
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
                console.log("Combobox_Useronline", res)
                if (res.data) {
                    setUseronline(res.data);
                } else {
                    console.log("else");
                }
            });
    }

    function setLoadings() {
        setLoading(false)
    }

    //ดึงข้อมูล ใส่ combobox
    useEffect(() => {

        getUseronline();
        getSex();
        getJob();
        getIns();

    }, []);


    function submit() {
        setLoading(true)
        let data = {

            Firstname: pats.Firstname ?? "",

            Lastname: pats.Lastname ?? "",

            Birthday: selectedDate,

            IDcard: pats.IDcard ?? "",

            Tel: pats.Tel ?? "",

            Weight: typeof pats.Weight === "string" ? parseFloat(pats.Weight) : NaN,

            Height: typeof pats.Height === "string" ? parseFloat(pats.Height) : NaN,

            SexID: typeof pats.SexID === "string" ? parseInt(pats.SexID) : NaN,

            JobID: typeof pats.JobID === "string" ? parseInt(pats.JobID) : NaN,

            InsuranceID: typeof pats.InsuranceID === "string" ? parseInt(pats.InsuranceID) : NaN,

            NurseID: Number(localStorage.getItem("uid")),

        };
        console.log("Error Chack Sex", data.SexID, "\nError Chack Job", data.JobID, "\nError Chack Insurance", data.InsuranceID)
        console.log("Error User", data.NurseID)
        if (!/\S/.test(data.Firstname)) {
            setErrorMessage("กรุณากรอกชื่อ")
            setError(true)
        } else if (!/\S/.test(data.Lastname)) {
            setErrorMessage("กรุณากรอกนามสกุล")
            setError(true)
        } else if (isNaN(data.SexID)) {
            setErrorMessage("กรุณาเลือกเพศ")
            setError(true)
        } else if (!/^\d{13}$/.test(data.IDcard)) {
            setErrorMessage("เลขบัตรประชาชนไม่ถูกต้อง")
            setError(true)
        } else if (!/^\d{10}$/.test(data.Tel) && data.Tel != "") {
            setErrorMessage("เบอร์โทรไม่ถูกต้อง")
            setError(true)
        } else if (isNaN(data.JobID)) {
            setErrorMessage("กรุณาเลือกอาชีพ")
            setError(true)
        } else if (isNaN(data.InsuranceID)) {
            setErrorMessage("กรุณาเลือกสิทธิในการรักษา")
            setError(true)
        }
        else {

            console.log("Data", data)

            const apiUrl = "http://localhost:8080/patient";

            const requestOptions = {

                method: "POST",

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(data),

            };

            fetch(apiUrl, requestOptions)

                .then((response) => response.json())

                .then((res) => {
                    console.log("Res", res)
                    if (res.data) {

                        setSuccess(true);

                    } else {
                        if (res.error == "UNIQUE constraint failed: patients.idcard") {
                            setErrorMessage("เลขบัตรประจำตัวประชาชนซ้ำ")
                        } else if (res.error == "Only Nurses") {
                            setErrorMessage("Only Nurses")
                        } else {
                            setErrorMessage("บันทึกข้อมูลไม่สำเร็จ")
                        }
                        setError(true)
                    }

                });
        }

    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <BuildIcon sx={{ fontSize: 30, color: "#3366CC" }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleCloseDig}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"lg"}

            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={4} className={classes.root}>
                            <Grid item xs={3} >
                                <p>ชื่อ</p>
                                <TextField style={{ width: '90%' }}
                                    id="Firstname"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={pats.Firstname}
                                    type="string"
                                    size="medium"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={3} >
                                <p>นามสกุล</p>
                                <TextField style={{ width: '90%' }}

                                    id="Lastname"
                                    variant="outlined"
                                    value={pats.Lastname}
                                    type="string"
                                    size="medium"
                                    onChange={handleInputChange}

                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}
