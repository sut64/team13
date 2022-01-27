
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Fade, Menu, MenuItem } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuOpenOutlined';
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import CreateIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }),
);

const signout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const Home = () => {
  window.location.href = "/";
};

const PatientList = () => {
  window.location.href = "/Patientlist";
};

const PatientCreate = () => {
  window.location.href = "/Patientcreate";
};

const AppointList = () => {
  window.location.href = "/appointlist";
};

const AppointCreate = () => {
  window.location.href = "/appointcreate";
};

const Paid = () => {
  window.location.href = "/paid";
};

const PaymentCreate = () => {
  window.location.href = "/paymentcreate";
};

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            id="fade-button"
            aria-controls="fade-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={Home}><HomeIcon/>หน้าหลัก</MenuItem>
            <MenuItem onClick={PatientList}><ListIcon/>รายชื่อผู้ป่วย</MenuItem>
            <MenuItem onClick={PatientCreate}><CreateIcon/>บันทึกผู้ป่วยใหม่</MenuItem>
            <MenuItem onClick={AppointList}><ListIcon/>ประวัติการนัดหมาย</MenuItem>
            <MenuItem onClick={AppointCreate}><CreateIcon/>บันทึกการนัดหมาย</MenuItem>
            <MenuItem onClick={()=>{window.location.href = "/TreatmentList"}}>
				    <ListIcon/>ประวัติใบวินิจฉัย</MenuItem>
            <MenuItem onClick={Paid}><ListIcon/>ประวัติการชำระเงิน</MenuItem>
            <MenuItem onClick={PaymentCreate}><CreateIcon/>บันทึกการชำระเงิน</MenuItem>
          </Menu>

         <Grid item xs={12}>
            <Button style={{ float: "left" }}
              onClick={Home}
              variant="text"
              color="inherit">
              <Typography variant="h5" className={classes.title}>
                G13 คลินิกทันตกรรมฟันดี
              </Typography>
            </Button>
        </Grid>

          <Button style={{ float: "right" }}
            endIcon={<LogoutIcon />}
            onClick={signout}
            variant="outlined"
            color="inherit">
            Signout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
