import React, { useEffect } from "react";
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
import { PaymentInterface } from "../models/IPayment";
import moment from 'moment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: { marginTop: theme.spacing(2) },
        table: { minWidth: 650 },
        tableSpace: { marginTop: 20 },
    })
);
function WatchPaidList() {
    const classes = useStyles();
    const [pats, setWatchPayment] = React.useState<PaymentInterface[]>([]);
    const getWatchPayment = async () => {
        const apiUrl = "http://localhost:8080/payments";
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
                    setWatchPayment(res.data);
                } else {
                    console.log("else");
                }
            });
    };
    useEffect(() => {
        getWatchPayment();
    }, []);
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
                            ประวัติการชำระเงิน
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/paymentcreate"
                            variant="contained"
                            color="primary"
                        >
                            บันทึกการชำระเงิน <PointOfSaleIcon/>
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="center" width="5%">
                                    ลำดับ
                                </TableCell>
                                <TableCell align="center" width="12%">
                                    ผู้ป่วย
                                </TableCell>
                                <TableCell align="left" width="12%">
                                    ผู้รับเงิน
                                </TableCell>
                                <TableCell align="left" width="12%">
                                    ราคา
                                </TableCell>
                                <TableCell align="left" width="21%">
                                    ราคา(ตัวอักษร)
                                </TableCell>
                                <TableCell align="left" width="12%">
                                    วันที่จ่าย
                                </TableCell>
                                <TableCell align="left" width="12%">
                                    อาการ
                                </TableCell>
                                <TableCell align="left" width="12%">
                                    หมายเหตุ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pats.map((pats: PaymentInterface) => (
                                <TableRow key={pats.ID}>
                                    <TableCell align="left">{pats.ID}</TableCell>
                                    <TableCell align="left">{pats.Patient.Firstname}{pats.Patient.Lastname}</TableCell>
                                    <TableCell align="left">{pats.Financial.Firstname}</TableCell>
                                    <TableCell align="left">{pats.Price.toFixed(2)}</TableCell>
                                    <TableCell align="left">{pats.Pricetext}</TableCell>
                                    <TableCell align="left">{moment(pats.Paytime).format("dd MMMM yyyy hh:mm a")}</TableCell>
                                    <TableCell align="left">{pats.RemedyType.Name}</TableCell>
                                    <TableCell align="left">{pats.Note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
export default WatchPaidList;