import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { PatientInterface } from '../models/IPat';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 },
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

    const [Age, setAge] = React.useState<number>(NaN);
    const [BMI, setBMI] = React.useState<number>(NaN);

    function getAge() {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        console.log("Date",currentDate,currentYear,parseInt(moment(pats.Birthday).format("YYYY")))
        setAge(currentYear - parseInt(moment(pats.Birthday).format("YYYY")));
        console.log("Age",Age)
    }

    function getBMI() {
        setBMI( pats.Weight/((pats.Height*pats.Height)/10000) ) ;
        console.log("BMI",BMI)
    }

    useEffect(() => {
        getAge();
        getBMI();
      }, []);

    return (
        <div>

            <IconButton onClick={handleClickOpen}>
                <ContentPasteSearchIcon  sx={{ fontSize: 30, color: "#3366CC" }}/>
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
                    <h4>??????????????????????????????????????????????????? ID {pats.ID}</h4>
                </DialogTitle>
                <DialogContent sx={{ m: 1, p: 0 }} >

                    <div>???????????? : {pats.Firstname} &emsp; ????????????????????? : {pats.Lastname} &emsp; ???????????? : {Age} &emsp; ????????? : {pats.Sex?.Name}</div><br/>
                    <div>????????????????????? : {pats.Weight.toFixed(1)} ??????.&emsp;  ????????????????????? : {pats.Height.toFixed(1)} ??????. &emsp; BMI : {BMI.toFixed(2)} </div><br/>
                    <div>????????????????????? : {moment(pats.Birthday).format("YYYY-MM-DD")}</div><br/>
                    <div>???????????????????????? : {pats.Tel}</div><br/>
                    <div>????????????????????????????????????????????? : {pats.IDcard}</div><br/>
                    <div>??????????????? : {pats.Job?.Name}</div><br/>
                    <div>????????????????????????????????????????????? : {pats.Insurance?.Name}</div><br/>
                    <div>??????????????????????????? : {pats.Nurse?.Firstname} {pats.Nurse?.Lastname} </div>< br/>     
                    <div>???????????????????????????????????? : {moment(pats.Time).format("YYYY-MM-DD HH:mm:ss")}</div>
                
                </DialogContent >

                <DialogActions >
                    <Button onClick={handleClose}>?????????</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
