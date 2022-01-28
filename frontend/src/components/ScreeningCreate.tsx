import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { UserInterface } from "../models/IUser";
import { PatientInterface } from "../models/IPat";
import { MedicalProductInterface } from "../models/IMedicalProduct";
import { AppointInterface } from "../models/IAppoint";
import { ScreeningInterface } from "../models/IScreening";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import moment from "moment";
import React from "react";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function ScreeningCreate() {
  const classes = useStyles();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [medical_products, setMedicalProducts] = useState<MedicalProductInterface[]>([]);
  const [appointments, setAppointments] = useState<AppointInterface[]|undefined>([]);
  const [screening, setScreening] = useState<Partial<ScreeningInterface>>({});
  const [appointment, setAppointment] = useState<AppointInterface>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    if(event.target.name === "PatientID"){
      setAppointments(patients.find(p => p.ID == event.target.value)?.Appoints)

  }
    const name = event.target.name as keyof typeof screening;
    setScreening({...screening, [name]: event.target.value,});
  };

  const handleAppointChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAppointment(appointments?.find(a => a.ID == event.target.value ));
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof screening;
    const { value } = event.target;
    console.log("Value", value)
    console.log("ID", id)
    setScreening({ ...screening, [id]: value });

};
  const getUsers = async () => {
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPatient = async () => {
    fetch(`${apiUrl}/patientscr`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMedicalProduct = async () => {
    fetch(`${apiUrl}/medical_products`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMedicalProducts(res.data);
        } else {
          console.log("else");
        }
      });
  };
  
  useEffect(() => {
    getUsers();
    getPatient();
    getMedicalProduct();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  const [AddedTime, setAddedTime] = React.useState<Date | null>(new Date());
  const handleAddedTime = (date: Date | null) => {
    setAddedTime(date);
  }

  function submit() {
    let data = {
      MedicalProductID: convertType(screening.MedicalProductID),
      PatientID: convertType(screening.PatientID),
      DentistassID: Number(localStorage.getItem("uid")),
      Illnesses: screening.Illnesses,
      Scrdate: screening.Scrdate,
      Queue: convertType(screening.Queue),
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
       },
      body: JSON.stringify(data),
      
    };
    fetch(`${apiUrl}/screening`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("บันทึกได้")
        setSuccess(true);
      } else {
        console.log("บันทึกไม่ได้")
        setError(true);
      }
    });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการคัดกรองข้อมูลพื้นฐาน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/ScreeningList"
              variant="contained"
              color="primary"
            >
              รายการข้อมูลผู้ป่วยคัดกรอง
            </Button>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขประจำตัวผู้ป่วย</p>
              <Select
                native
                value={screening.PatientID}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขประจำตัวผู้ป่วย
                </option>
                {patients.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ยาที่ใช้ในปัจจุบัน</p>
              <Select
                native
                value={screening.MedicalProductID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicalProductID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกยาที่ใช้ในปัจจุบัน
                </option>
                {medical_products.map((item: MedicalProductInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ</p>
              <Select
                native
                value={screening.PatientID}
                disabled
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขประจำตัวผู้ป่วย
                </option>
                {patients.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Firstname}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>สกุล</p>
              <Select
                native
                value={screening.PatientID}
                disabled
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขประจำตัวผู้ป่วย
                </option>
                {patients.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Lastname}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>วันเดือนปีเกิด</p>
              <Select
                native
                value={screening.PatientID}
                disabled
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขประจำตัวผู้ป่วย
                </option>
                {patients.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Birthday}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขการนัดหมาย</p>
              <Select
                native
                value={appointment?.ID}
                onChange={handleAppointChange}
                //disabled
                inputProps={{
                  name: "ID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกหมายเลขการนัดหมาย
                </option>

                {appointments?.map((item: AppointInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))} 
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลานัดหมาย</p>
              <Select
                native
                value={appointment?.ID}
                disabled
              >
                <option aria-label="None" value="">
                  ไม่พบการนัดหมาย
                </option>

                {appointments?.map((item: AppointInterface) => (
                  <option value={item.ID}>
                    {moment(appointment?.AppointTime).format("YYYY-MM-DD HH:mm")}
                  </option>
                ))} 
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>  
           <FormControl fullWidth variant="outlined"> 
            <p>อาการที่พบ</p>
             <TextField 
               id="Illnesses" 
               variant="outlined" 
               type="string" 
               size="medium" 
               //value={user.Current_medication || ""} 
               onChange={handleInputChange} 
             /> 
           </FormControl> 
          </Grid> 

          <Grid item xs={6}>
        <FormControl style={{ float: "right", width: 400, marginRight: 27 }} variant="outlined">
          <p>วันและเวลาที่คัดกรอง</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              name="Scrdate"
              value={AddedTime}
              onChange={handleAddedTime}
              minDate={new Date("2018-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
            />
          </MuiPickersUtilsProvider>
         </FormControl>
        
        </Grid>
          
          
          <Grid item xs={6}>  
           <FormControl fullWidth variant="outlined"> 
            <p>หมายเลขคิว</p>
             <TextField 
               id="Queue" 
               variant="outlined" 
               type="number" 
               size="medium" 
               //value={user.Current_medication || ""} 
               onChange={handleInputChange} 
             /> 
           </FormControl> 
          </Grid> 
          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกข้อมูลผู้ป่วย
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              component={RouterLink}
              to="/"
              color="inherit"
            >
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ScreeningCreate;
