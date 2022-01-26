import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
	Paper, Divider, Typography, Container, FormControl, InputLabel, 
	Select, MenuItem, Grid, TextField, Button
} from "@mui/material/"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab/'
import { TreatmentInteface, ScreeningInterface, RemedyInterface, UserInterface } from "../models";
import { SelectChangeEvent } from '@mui/material/Select';

interface treatmentFields {
	rawPrescription	: string;
	prescriptionInfo: string;
	toothNumber		: number;
	toothFilling	: string;
}

export default function TreatmentList() {
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
		console.log(data)
	} 

	// current user
	const [_user,_setUser] = React.useState<UserInterface>({
		ID: 0,
		Firstname: "",
		Lastname: "",
		Username: "",
		Password: "",
		RoleID : 0,
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
		setScreening(event.target.value as string);
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
	
	useEffect( () => {
		getTreatments()
		getRemedyTypes()
		getScreening()
		getUser()
	}, []);

	return (
		<React.Fragment>
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
			<FormControl variant="standard" sx={{ width: '100%' }}>
			<InputLabel id="demo-simple-select-filled-label">ทันตแพทย์</InputLabel>
			<Select
			labelId="demo-simple-select-filled-label"
			id="demo-simple-select-filled"
			value={_user.ID}
			disabled
			>
			<MenuItem value={_user.ID}>{_user.Firstname +" "+_user.Lastname}</MenuItem>
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<FormControl variant="standard" sx={{width: '100%'}}>
			<InputLabel id="demo-simple-select-filled-label">ใบคัดกรอง</InputLabel>
			<Select
			labelId="demo-simple-select-filled-label"
			id="demo-simple-select-filled"
			value={selectedRemedy}
			onChange={handleRemedyTypeChange}
			>
			<MenuItem value=""> <em>None</em> </MenuItem>
			<MenuItem value={10}>Ten</MenuItem>
			<MenuItem value={20}>Twenty</MenuItem>
			<MenuItem value={30}>Thirty</MenuItem>
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
			<FormControl variant="standard" sx={{width: '100%'}}>
			<InputLabel id="demo-simple-select-filled-label">ประเภทการรักษา</InputLabel>
			<Select
			labelId="demo-simple-select-filled-label"
			id="demo-simple-select-filled"
			value={selectedRemedy}
			onChange={handleRemedyTypeChange}
			>
			<MenuItem value=""> <em>None</em> </MenuItem>
			<MenuItem value={10}>Ten</MenuItem>
			<MenuItem value={20}>Twenty</MenuItem>
			<MenuItem value={30}>Thirty</MenuItem>
			</Select>
			</FormControl>
			</Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="standard-basic" label="ฟันที่รักษา" variant="standard" sx={{width: '100%'}}
				value={data.toothNumber} onChange={handleDataChange("toothNumber")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="standard-basic" label="วัสดุที่ใช้รักษา" variant="standard" sx={{width: '100%'}}
				value={data.toothFilling} onChange={handleDataChange("toothFilling")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="standard-basic" label="ใบสั่งยา" variant="standard" sx={{width: '100%'}} multiline maxRows={4}
				value={data.rawPrescription} onChange={handleDataChange("rawPrescription")}
				/> </Grid>
			<Grid item xs={12} sx={{padding:'5px'}}>
				<TextField id="standard-basic" label="หมายเหตุใบสั่งยา" variant="standard" sx={{width: '100%'}} multiline maxRows={4}
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
				<Button variant="contained" sx={{width:'25%', float:'right'}}>Save</Button>
			</Grid>
		</Grid>
		</Paper>
		</Container>
		</React.Fragment>
	)
}