import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { PatientInterface } from "../models/IPat";
import { UserInterface } from "../models/IUser";
import { SexInterface } from "../models/ISex";
import { JobInterface } from "../models/IJob";
import { InsuranceInterface } from "../models/IIns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";

import ListIcon from "@material-ui/icons/ListAltOutlined";
import SaveIcon from "@material-ui/icons/SaveAltOutlined";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LoadingButton from '@mui/lab/LoadingButton';

function Alert(props: AlertProps): JSX.Element {

  return <MuiAlert elevation={6} variant="filled" {...props} />;

}

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    root: { flexGrow: 1 },
    container: { marginTop: theme.spacing(2) },
    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
    table: { minWidth: 20 }
  }));

export default function PatientCreate(this: any) {

  const classes = useStyles();
  const [errorTest, seterrorTest] = React.useState(false);
  const [detail, setDetail] = React.useState<String>();
  const [sexs, setSex] = React.useState<SexInterface[]>([]);
  const [jobs, setJob] = React.useState<JobInterface[]>([]);
  const [ins, setIns] = React.useState<InsuranceInterface[]>([]);
  const [Useronline, setUseronline] = React.useState<UserInterface>();
  const [pats, setPatient] = React.useState<Partial<PatientInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState<String>();
  const [loading, setLoading] = React.useState(false);


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
    const id = event.target.id as keyof typeof PatientCreate;
    const { value } = event.target;
    console.log("ID", id, "Value", value)
    setPatient({ ...pats, [id]: value });
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

  function setLoadings(){
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
    console.log("Error User",data.NurseID)
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
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {ErrorMessage}
        </Alert>
      </Snackbar>

      <Paper className={classes.paper}>
        <Box display="flex"> <Box flexGrow={1}>
          <Typography
            component="h2"

            variant="h5"

            color="primary"

            gutterBottom
          >
            บันทึกเวชระเบียน

            <Button style={{ float: "right" }}
              component={RouterLink}
              to="/Patientlist"
              variant="contained"
              color="primary">
              <ListIcon />รายชื่อผู้ป่วย
            </Button>



          </Typography>
        </Box> </Box>
        <Divider />
        <Grid container spacing={4} className={classes.root}>


          <Grid item xs={4} >
            <p>ชื่อ</p>
            <TextField style={{ width: '105%' }}

              id="Firstname"
              label="กรอกชื่อ"
              variant="outlined"
              type="string"
              size="medium"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={4} >
            <p>นามสกุล</p>
            <TextField style={{ width: '105%' }}

              id="Lastname"
              label="กรอกนามสกุล"
              variant="outlined"
              type="string"
              size="medium"
              onChange={handleInputChange}

            />
          </Grid>

          <Grid item xs={4}>

            <FormControl fullWidth variant="outlined" style={{ width: '70%' }}>
              <p>เพศ</p>
              <Select

                native
                value={pats.SexID}
                onChange={handleChange}
                inputProps={{
                  name: "SexID",
                }}
              >
                <option aria-label="None" value="" >
                  เลือกเพศ
                </option>
                {sexs.map((item: SexInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>รหัสบัตรประจำตัวประชาชน</p>
            <TextField
              error={errorTest}
              type="text"
              style={{ width: '105%' }}
              id="IDcard"
              label="กรอกรหัสบัตรประจำตัวประชาชน"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={4}>
            <p>เบอร์โทร</p>
            <TextField
              type="tel"
              style={{ width: '105%' }}
              id="Tel"
              label="กรอกเบอร์โทร"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" style={{ width: '70%' }}>
              <p>อาชีพ</p>
              <Select
                native
                value={pats.JobID}
                onChange={handleChange}
                inputProps={{
                  name: "JobID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกอาชีพ
                </option>
                {jobs.map((item: JobInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <p>น้ำหนัก (กก.)</p>
            <TextField
              type="number"
              style={{ width: '110%' }}
              id="Weight"
              label="กรอกน้ำหนัก"
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 999 } }}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={2}>
            <p>ส่วนสูง (ซม.)</p>
            <TextField
              type="number"
              style={{ width: '110%' }}
              id="Height"
              label="กรอกส่วนสูง"
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 999 } }}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันเกิด</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ width: '105%' }}
                  margin="normal"
                  id="Birthday"
                  format="yyyy-MM-dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>


          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" style={{ width: '108%' }}>
              <p>สิทธิในการรักษา</p>

              <Select
                native
                value={pats.InsuranceID}
                onChange={handleChange}
                inputProps={{
                  name: "InsuranceID",
                }}
              >
                <option aria-label="None" value="" >
                  เลือกสิทธิในการรักษา
                </option>
                {ins.map((item: InsuranceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={5} className={classes.root}>
            <p>ข้อมูลสิทธิ</p>
            <TextField

              multiline
              defaultValue={detail}
              rows={3}
              disabled
              type="text"
              style={{ width: '128%' }}
              id="Detail"
              variant="outlined"

            />

          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" style={{ width: '108%' }}>
              <p>ผู้บันทึก</p>
              <Select
                disabled
                native
              >
                <option>
                  {Useronline?.Firstname} {Useronline?.Lastname}
                </option>

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>

            <Button style={{ float: "right" }}
              variant="contained"
              color="primary"
              onClick={submit} 
              >
              <SaveIcon />บันทึก
            </Button>
            <LoadingButton style={{ float: "right" , marginTop:12}}
              loading={loading}
              >
            </LoadingButton>
            <Button style={{ float: "left" }}
              variant="contained"
              color="primary"
              onClick={ClearInputChange} >
              <CleaningServicesIcon />เคลีย
            </Button>


          </Grid>

        </Grid>
      </Paper>
    </Container>
  )
}


