import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { grey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { PatientInterface } from '../models/IPat';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { color } from '@mui/system';
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 },
        //dig: {backgroundImage: "url(https://i.imgur.com/HeGEEbu.jpg)"},
        HeadDig : {color : "#6699FF" ,backgroundColor: "#F5FFFA"},

    }));

export default function DataPatient(pats: PatientInterface ) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [Age, setAge] = React.useState<number>();
    const [BMI, setBMI] = React.useState<number>(0);

    function getAge() {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        console.log("Date",currentDate,currentYear,parseInt(moment(pats.Birthday).format("YYYY")))
        setAge(currentYear - parseInt(moment(pats.Birthday).format("YYYY")));
    }

    function getBMI() {
        setBMI( pats.Weight/((pats.Height*pats.Height)/10000) ) ;
    }

    useEffect(() => {
        getAge();
        getBMI();
      }, []);
      
    return (
        <div>

            <IconButton onClick={handleClickOpen}>
                <ContentPasteSearchIcon  sx={{ fontSize: 30, color: blue[600] }}/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {backgroundColor: "#F5FFFA"},
                    sx:{width: '500px', height:'550px'},
                 }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2 }} className = {classes.HeadDig}>
                    <h4>เวชระเบียนผู้ป่วย ID {pats.ID}</h4>
                </DialogTitle>
                <DialogContent sx={{ m: 1, p: 0 }} >

                    <div>ชื่อ : {pats.Firstname} &emsp; นามสกุล : {pats.Lastname} &emsp; อายุ : {Age} &emsp; เพศ : {pats.Sex?.Name}</div><br/>
                    <div>น้ำหนัก : {pats.Weight.toFixed(1)} กก.&emsp;  ส่วนสูง : {pats.Height.toFixed(1)} ซม. &emsp; BMI : {BMI.toFixed(2)} </div><br/>
                    <div>วันเกิด : {moment(pats.Birthday).format("YYYY-MM-DD")}</div><br/>
                    <div>เบอร์โทร : {pats.Tel}</div><br/>
                    <div>รหัสบัตรประชาชน : {pats.IDcard}</div><br/>
                    <div>อาชีพ : {pats.Job?.Name}</div><br/>
                    <div>สิทธิในการรักษา : {pats.Insurance?.Name}</div><br/>
                    <div>ผู้บันทึก : {pats.Nurse?.Firstname} {pats.Nurse?.Lastname} </div>< br/>     
                    <div>บันทึกวันที่ : {moment(pats.Time).format("YYYY-MM-DD HH:mm:ss")}</div>
                
                </DialogContent >

                <DialogActions >
                    <Button onClick={handleClose}>ปิด</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
