import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
//import CreateIcon from '@mui/icons-material/Create';
import CreateIcon from '@mui/icons-material/CreateTwoTone';
import Paper from "@material-ui/core/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import React from "react";
import { CleaningServicesSharp } from "@mui/icons-material";
import MedicationIcon from '@mui/icons-material/Medication';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        //alignItems: "center", display: "flex",
        container: { marginTop: theme.spacing(3), backgroundColor: "#F4EEDC", fontFamily:'Itim',},
        buttonsize: { width: '280px', height: '200px', backgroundColor: '#FFFFFF', fontSize: "20px", color: "#0B3C83", margin: 10, },
        iconsize: { margin: 20, marginBottom: 100, color: "#EE1F12", size: "20px", fontSize: "large" },
        grids: { padding: theme.spacing(2), color: "#0B3C83" },
        menugrid: { '& button': {fontFamily:'Itim'} },
        paper: { marginTop: 80, },
    })
);

function Home() {
    const classes = useStyles();
    const [loadingPatient, setLoadingPatient] = React.useState(false);
    const [loadingScreening, setLoadingScreening] = React.useState(false);
    const [loadingTreatment, setLoadingTreatment] = React.useState(false);
    const [loadingappoint, setLoadingappoint] = React.useState(false);
    const [loadingMecRecord, setLoadingMecRecord] = React.useState(false);
    const [loadingpayment, setLoadingpayment] = React.useState(false);


    const PatientCreate = () => {
        window.location.href = "/Patientcreate";
        setLoadingPatient(true);
    };
    const ScreeningCreate = () => {
        window.location.href = "/ScreeningCreate";
        setLoadingScreening(true);
    };

    const TreatmentList = () => {
        window.location.href = "/TreatmentList";
        setLoadingTreatment(true);
    };

    const appointcreate = () => {
        window.location.href = "/appointcreate";
        setLoadingappoint(true);
    };

    const CreateMecRecord = () => {
        window.location.href = "/CreateMecRecord";
        setLoadingMecRecord(true);
    };

    const paymentcreate = () => {
        window.location.href = "/paymentcreate";
        setLoadingpayment(true);
    };

	var btnStyle = {
		width: '280px', height: '200px', backgroundColor: '#FFFFFF', fontSize: "20px", color: "#0B3C83", margin: 2, 
		fontFamily:'Itim'}
    return (

        <div>

            <Container className={classes.container} maxWidth="lg">
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <img style={{ width: "185px" }} src="./logohome.png" />
                </Grid>
                <h1 style={{ textAlign: "center", color: "#0B3C83" }}>คลินิกทันตกรรมฟันดี</h1>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">

                    <LoadingButton sx={btnStyle}
                        variant="text" 
                        onClick={PatientCreate}
                        loading={loadingPatient}>
                        <img style={{ width: "55px" }}
                            src="./patient.png" />
                        เวชระเบียน
                    </LoadingButton>

                    <LoadingButton sx={btnStyle}
                        variant="text"
                        onClick={ScreeningCreate}
                        loading={loadingScreening}>
                        <img style={{ width: "55px" }} src="./screening.png" />
                        คัดกรองข้อมูล
                    </LoadingButton>

                    <LoadingButton sx={btnStyle}
                        variant="text"
                        onClick={TreatmentList}
                        loading={loadingTreatment}>
                        <img style={{ width: "55px" }} src="./treatment.png" />
                        วินิจฉัย
                    </LoadingButton>

                    <LoadingButton sx={btnStyle}
                        variant="text"
                        onClick={appointcreate}
                        loading={loadingappoint}>
                        <img style={{ width: "55px" }} src="./appoint.png" />
                        การนัดหมาย
                    </LoadingButton>

                    <LoadingButton sx={btnStyle}
                        variant="text"
                        onClick={CreateMecRecord}
                        loading={loadingMecRecord} >
                        <img style={{ width: "55px" }}src="./medical.png" />
                        ยาและเวชภัณฑ์
                    </LoadingButton>

                    <LoadingButton sx={btnStyle}
                        variant="text"
                        onClick={paymentcreate} loading={loadingpayment} >
                        <img style={{ width: "55px" }} src="./payment.png" />
                        ชำระเงิน
                    </LoadingButton>

                </Grid>

                <Paper className={classes.paper} >
                    <Grid className={classes.grids}>
                        <h1 style={{ textAlign: "center", color: "#0B3C83"}}>ระบบทันตกรรม</h1>
                        <h3>เป้าหมายของการรีลิส</h3>
                        <h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            ระบบทันตกรรมเป็นระบบที่ใช้จัดการข้อมูลในการทำงานภายในคลินิกทันตกรรมให้เป็นระบบมากยิ่งขึ้น โดยจะมีระบบย่อยสำหรับการใช้งานในแผนกต่างๆ ซึ่งเป็นการจัดการโดยบุคลากรของคลินิกทันตกรรม
                            เมื่อผู้ป่วยเข้ารับการรักษาที่คลินิกทันตกรรม พยาบาลจะมีการใช้ระบบย่อยระบบเวชระเบียนในการเพิ่มข้อมูลและแสดงรายชื่อผู้ป่วยที่เข้ารับการรักษาในคลินิกทันตกรรม หากผู้ป่วยมีข้อมูลในระบบเวชระเบียนของคลินิกแล้ว ผู้ช่วยทันตแพทย์จะทำการคัดกรองข้อมูลพื้นฐานของผู้ป่วย จากนั้นบันทึกข้อมูลด้วยระบบย่อยระบบคัดกรองข้อมูลพื้นฐานผู้ป่วยทันตกรรมก่อนการรับบริการ
                            หลังจากคัดกรองข้อมูลพื้นฐานของผู้ป่วยเรียบร้อย ทันตแพทย์จะเป็นผู้ตรวจวินิจฉัยและใช้ระบบย่อยระบบบันทึกข้อมูลการรักษาทางทันตกรรมในการบันทึกข้อมูลการวินิจฉัยในครั้งนั้นๆ และยังสามารถใช้ระบบย่อยระบบจัดการการนัดหมายในการบันทึกข้อมูลการนัดหมายผู้ป่วยได้อีกด้วย
                            เมื่อเข้ารับการวินิจฉัยแล้ว หากผู้ป่วยจำเป็นต้องได้รับยาหรือเวชภัณฑ์ เภสัชกรจะเป็นผู้พิจารณา และ สั่งยาหรือเวชภัณฑ์โดยทำการบันทึกด้วยระบบย่อยระบบบันทึกการจ่ายยาและเวชภัณฑ์ให้ผู้ป่วย จากนั้นเจ้าหน้าที่การเงินจะทำการบันทึกรายละเอียดค่าใช้จ่ายในการรักษาโดยใช้ระบบย่อยระบบบันทึกการชำระเงิน
                            การจัดการข้อมูลของระบบทันตกรรมจะต้องมีการเข้าสู่ระบบเพื่อยืนยันตัวตนก่อนเข้าใช้งาน โดยแต่ละระบบย่อยจะมีการอนุญาตให้บุคลากรสามารถจัดการข้อมูลในระบบย่อยที่เกี่ยวข้องกับหน้าที่ของตนเองเท่านั้น เช่น พยาบาลจะไม่สามารถบันทึกข้อมูลในระบบย่อยระบบบันทึกข้อมูลการรักษาทางทันตกรรมได้ เนื่องจากเป็นระบบที่อนุญาติให้ทันตแพทย์เป็นผู้บันทึกข้อมูลเพียงบทบาทเดียวในระบบย่อยนี้
                        </h4>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
export default Home;