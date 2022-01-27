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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {marginTop: theme.spacing(2),},
        buttonsize : {width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 10,} ,
        iconsize : {margin: 20, marginBottom:100, color : "#EE1F12" , size:"20px", fontSize:"large"},
        grids : {padding: theme.spacing(2), color: theme.palette.text.secondary},
        paper : {marginTop:80,},
        
    })
);




function Home() {
    const classes = useStyles();
    const [loadingPatient, setLoadingPatient] = React.useState(false);
    const [loadingTreatment, setLoadingTreatment] = React.useState(false);
    /*const [loading, setLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);*/


    const PatientCreate = () => {
        window.location.href = "/Patientcreate";
        setLoadingPatient(true);
    };

    const TreatmentList = () => {
        window.location.href = "/TreatmentList";
        setLoadingTreatment(true);
    };
    
    return (
        <div>
            <Container className={classes.container} maxWidth="md">

                <h1 style={{ textAlign: "center" }}>คลินิกทันตกรรมฟันดี</h1>

                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={PatientCreate} loading={loadingPatient}>เวชระเบียน</LoadingButton>
                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={()=>{window.location.href = "/"}} >คัดกรองข้อมูล</LoadingButton>
                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={TreatmentList} loading={loadingTreatment}>วินิจฉัย</LoadingButton>
                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={()=>{window.location.href = "/appointcreate"}} >การนัดหมาย</LoadingButton>
                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={()=>{window.location.href = "/"}} >ยาและเวชภัณฑ์</LoadingButton>
                <LoadingButton sx={{width: '280px', height:'200px', backgroundColor: '#FFFFFF', fontSize:"20px", color : "#1536CC", margin: 1,}} variant="contained" onClick={()=>{window.location.href = "/paymentcreate"}} >ชำระเงิน</LoadingButton>

                
                <Paper className={classes.paper}>
                <h1 style={{ textAlign: "center" }}>ระบบทันตกรรม</h1>
                <Grid className={classes.grids}> 
                <h3>เป้าหมายของการรีลิส</h3>
                <h4>
                &nbsp;
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