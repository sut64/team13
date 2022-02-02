import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
	Paper, Divider, Typography, Container, FormControl, InputLabel, 
	Select, MenuItem, Grid, TextField, Button, Snackbar
} from "@mui/material/"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab/'
import { TreatmentInteface, ScreeningInterface, RemedyInterface, UserInterface } from "../models";
import { SelectChangeEvent } from '@mui/material/Select';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
  ) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

interface treatmentFields {
	rawPrescription	: string;
	prescriptionInfo: string;
	toothNumber		: number;
	toothFilling	: string;
}

interface AlertInfo {
	message : string;
	level	: AlertColor;
}


export default function TreatmentList() {
	const [notify, setNotify] = React.useState(false);
	const notifyClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setNotify(false);
	};
	const [message, setMessage] = React.useState<AlertInfo>({message:'',level: 'warning'});
	
	const [treatments, setTreatments] = React.useState<TreatmentInteface[]>([]);
	const [time, setTime] = React.useState<Date | null>(new Date());
	
	const [data,setData] = React.useState<treatmentFields>({
		rawPrescription: "",
		prescriptionInfo: "",
		toothNumber: 0,
		toothFilling: "",
	})

	const handleDataChange = (prop: keyof treatmentFields ) => (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		setData( { ...data, [prop]:event.target.value} )
	} 

	// current user
	const [_user,_setUser] = React.useState<UserInterface>({
		ID: 0,
		Firstname: "",
		Lastname: "",
		Username: "",
		Password: "",
		RoleID : 0,
		Role : {
			ID: 0,
			Name: "",
		}
	})

	const getUser = async () => {
		const apiUrl = `http://localhost:8080/users/${localStorage.getItem("uid")}`;
		const requestOption = {
			method : "GET",
			headers : {
				Authorization: `Bearer ${localStorage.getItem("token")}`, 
				"Content-Type" : "application/json" 
			}
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) _setUser(res.data);
		});
	}

	// screenings list handler
	const [screenings, setScreenings ] = React.useState<ScreeningInterface[]>([])
	const [selectedScreening, setScreening] = React.useState("");
	const handleScreeningChange = ( event: SelectChangeEvent ) =>{
		setScreening(event.target.value);
	};

	const getScreening = async () => {
		const apiUrl = "http://localhost:8080/screenings";
		const requestOption = {
			method : "GET",
			headers : {
				Authorization: `Bearer ${localStorage.getItem("token")}`, 
				"Content-Type" : "application/json" 
			}
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setScreenings(res.data);
		});
	}

	// remedy-types list handler
	const [remedyTypes, setRemedyTypes] = React.useState<RemedyInterface[]>([]);
	const [selectedRemedy, setRemedy] = React.useState("");
	const handleRemedyTypeChange = ( event: SelectChangeEvent ) =>{
		setRemedy(event.target.value as string);
	};

	const getRemedyTypes = async () => {
		const apiUrl = "http://localhost:8080/remedy_types";
		const requestOption = {
			method : "GET",
			headers : {
				Authorization: `Bearer ${localStorage.getItem("token")}`, 
				"Content-Type" : "application/json" 
			}
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setRemedyTypes(res.data);
		});
	}

	const getTreatments = async () => {
		const apiUrl = "http://localhost:8080/treatments";
		const requestOption = {
			method : "GET",
			headers : {
				Authorization: `Bearer ${localStorage.getItem("token")}`, 
				"Content-Type" : "application/json" 
			}
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setTreatments(res.data);
		});
	}
	
	function submit() {

		if ( _user.Role.Name !== "Dentist" ) {
			setNotify(true);
			setMessage( { message:'You have no authorize to make this action', level:'error'} );
			return;
		}

		let payload = {
			PrescriptionRaw		: data.rawPrescription, 
			PrescriptionNote	: data.prescriptionInfo,
			ToothNumber			: +data.toothNumber,
			ToothFilling		: data.toothFilling,
			Date				: time,
			ScreeningID			: selectedScreening,
			DentistID			: _user.RoleID,
			RemedyTypeID		: selectedRemedy
		};

		console.log(payload)

		if ( payload.ScreeningID === "" ) {
			setNotify(true);
			setMessage( { message:'Screening cannot be blank', level:'error'} );
			return;
		}

		if ( payload.RemedyTypeID === "" ) {
			setNotify(true);
			setMessage( { message:'Remedy Type cannot be blank', level:'error'} );
			return;
		}

		const apiUrl = "http://localhost:8080/treatment";
		const requestOption = {
			method : "POST",
			headers : {
				Authorization: `Bearer ${localStorage.getItem("token")}`, 
				"Content-Type" : "application/json" 
			},
			body : JSON.stringify(payload)
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			setNotify(true)
			if (res.data) {
				setMessage( { message:'Succesfully saved', level:'success' } );
				getTreatments()
			} else {
				setMessage( { message:`Failed to save\n${res.error}`, level:'error' } );
				console.log(res.error)
			}
		});
	}

	useEffect( () => {
		getTreatments()
		getRemedyTypes()
		getScreening()
		getUser()
	}, []);

	return (
		<React.Fragment>
		<Snackbar open={notify} autoHideDuration={6000} onClose={notifyClose}>
			<Alert onClose={notifyClose} severity={message.level} sx={{ width: '100%' }}>
			{message.message}
			</Alert>
		</Snackbar>
		<Container sx={{ display:'flex', marginTop:'2vh' }}>
		<Paper sx={{margin:'0px 10px'}}>
			<Typography component="h2" sx={{padding:'10px 5px 5px 15px', 
				backgroundColor:'#3f51b5', fontWeight:'medium', color:'white'}}> TREATMENT LIST </Typography>
			<Divider></Divider>
			<TableContainer sx={{ width: 650, mx:'auto' }}>
			<Table aria-label="Treatment-List-Table" >
			<TableHead>
			<TableRow>
				<TableCell>Treatment ID</TableCell>
				<TableCell align="left">Patient name</TableCell>
				<TableCell align="right">Treatment</TableCell>
				<TableCell align="right">Date</TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{treatments.map((treatment) => (
				<TableRow
					key={treatment.ID}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				<TableCell >
					{treatment.ID}
				</TableCell>
				<TableCell align="left">{treatment.Screening.Patient.Firstname+" "+treatment.Screening.Patient.Lastname}</TableCell>
				<TableCell align="right">{treatment.RemedyType.Name}</TableCell>
				<TableCell align="right">{new Date( treatment.Date ).toLocaleString("th-TH")}</TableCell>
				</TableRow>
			))}
			</TableBody>
			</Table>
		</TableContainer >
		</Paper>
		<Paper sx={{margin:'0px 10px'}}>
		<Typography component="h2" sx={{padding:'10px 5px 5px 15px', 
				backgroundColor:'#3f51b5', fontWeight:'medium', color:'white'}}> TREATMENT ADD </Typography>
			<Divider></Divider>
		<Grid container padding={'0px 10px 10px'}>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<FormControl variant="standard" sx={{ width: '100%' }}
			error={ _user.Role.Name !== "Dentist"}>
			<InputLabel id="treatment-dentist">ทันตแพทย์</InputLabel>
			<Select
			labelId="treatment-dentist"
			id="treatment-dentist"
			value={_user.ID}
			disabled
			>
			<MenuItem value={_user.ID}>{_user.Firstname +" "+_user.Lastname}</MenuItem>
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<FormControl variant="standard" sx={{width: '100%'}}>
			<InputLabel id="treatment-screening">ใบคัดกรอง</InputLabel>
			<Select
			labelId="treatment-screening"
			id="treatment-screening"
			value={selectedScreening}
			onChange={handleScreeningChange}
			>
			{screenings.map((scr:ScreeningInterface)=>(
				<MenuItem value={scr.ID}> 
				{scr.Queue+" "+scr.Patient.Firstname+" "+scr.Patient.Lastname} </MenuItem>
			))}
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<FormControl variant="standard" sx={{width: '100%'}}>
			<InputLabel id="treatment-remedy">ประเภทการรักษา</InputLabel>
			<Select
			labelId="treatment-remedy"
			id="treatment-remedy"
			value={selectedRemedy}
			onChange={handleRemedyTypeChange}
			>
			{remedyTypes.map((rmd:RemedyInterface)=>(
				<MenuItem value={rmd.ID}> {rmd.Name} </MenuItem>
			))}
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="treatment-tooth" label="ฟันที่รักษา" variant="standard" sx={{width: '100%'}}
				value={data.toothNumber} onChange={handleDataChange("toothNumber")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="treatment-filling" label="วัสดุที่ใช้รักษา" variant="standard" sx={{width: '100%'}}
				value={data.toothFilling} onChange={handleDataChange("toothFilling")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="treatment-pscr" label="ใบสั่งยา" variant="standard" sx={{width: '100%'}} multiline maxRows={4}
				value={data.rawPrescription} onChange={handleDataChange("rawPrescription")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="treatment-pscr-note" label="หมายเหตุใบสั่งยา" variant="standard" sx={{width: '100%'}} multiline maxRows={4}
				value={data.prescriptionInfo} onChange={handleDataChange("prescriptionInfo")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<LocalizationProvider dateAdapter={AdapterDateFns} >
			<DateTimePicker 
				renderInput={(props) => <TextField {...props} />}
				label="วัน เวลา"
				value={time}
				onChange={(t)=>{setTime(t)}}
			/>
			</LocalizationProvider> </Grid>
			<Grid item xs={12}>
				<Button variant="contained" sx={{width:'25%', float:'right'}}
				onClick={submit}
				>Save</Button>
			</Grid>
		</Grid>
		</Paper>
		</Container>
		</React.Fragment>
	)
}