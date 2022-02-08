
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Fade, Menu} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuOpenOutlined';
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import CreateIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import Grid from "@material-ui/core/Grid";
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { UserInterface } from "../models/IUser";
import { useEffect } from "react";

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
    Signouticons:{
      width: '180px', height:'50px'
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
const ScreeningCreate = () => {
  window.location.href = "/ScreeningCreate";
};
const ScreeningList = () => {
  window.location.href = "/ScreeningList";
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



const CreateMecRecord = () => {
  window.location.href = "/CreateMecRecord";
};




export default function ButtonAppBar() {
  const classes = useStyles();
  const [Useronline, setUseronline] = React.useState<UserInterface>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



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
        console.log("Combobox_Useronline_navber", res)
        if (res.data) {
          setUseronline(res.data);
        } else {
          console.log("else");
        }
      });
  }
  
  useEffect(() => {
    getUseronline();
  }, []);

  //---------------
  const [open_signout, setOpen_signout] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen_signout((prevOpen_signout) => !prevOpen_signout);
  };

  const handleClose_signout = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen_signout(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen_signout(false);
    } else if (event.key === 'Escape') {
      setOpen_signout(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen_signout = React.useRef(open_signout);
  React.useEffect(() => {
    if (prevOpen_signout.current === true && open === false) {
      anchorRef.current!.focus();
    }
    
    prevOpen_signout.current = open_signout;
  }, [open_signout]);

  //---------------

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
            ------------------------------------------------------------
            <MenuItem onClick={PatientList}><ListIcon/>รายชื่อผู้ป่วย</MenuItem>
            <MenuItem onClick={PatientCreate}><CreateIcon/>บันทึกผู้ป่วยใหม่</MenuItem>
            ------------------------------------------------------------
            <MenuItem onClick={ScreeningList}><FactCheckOutlinedIcon/>รายการข้อมูลผู้ป่วยคัดกรอง</MenuItem>
            <MenuItem onClick={ScreeningCreate}><CreateIcon/>บันทึกข้อมูลการคัดกรองใหม่</MenuItem>
            ------------------------------------------------------------
            <MenuItem onClick={()=>{window.location.href = "/TreatmentList"}}><ContentPasteSearchOutlinedIcon/>ประวัติใบวินิจฉัย</MenuItem>
            ------------------------------------------------------------
            <MenuItem onClick={AppointList}><AccessTimeIcon/>ประวัติการนัดหมาย</MenuItem>
            <MenuItem onClick={AppointCreate}><BookmarkAddOutlinedIcon/>บันทึกการนัดหมาย</MenuItem>
            ------------------------------------------------------------
            <MenuItem onClick={CreateMecRecord}><MedicationIcon/>บันทึกการจ่ายยา</MenuItem>
            ------------------------------------------------------------
            <MenuItem onClick={Paid}><PaidIcon/>ประวัติการชำระเงิน</MenuItem>
            <MenuItem onClick={PaymentCreate}><PointOfSaleIcon/>บันทึกการชำระเงิน</MenuItem>
            

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

        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open_signout ? 'composition-menu' : undefined}
          aria-expanded={open_signout ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{color : "#F4EEDC",width : "320px", fontSize: 17}}
        >
          <AssignmentIndIcon/>&nbsp;&nbsp;{Useronline?.Firstname} {Useronline?.Lastname}&nbsp;<ArrowDropDownIcon />
        </Button>
        <Popper
          open={open_signout}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose_signout}>
                  <MenuList
                    autoFocusItem={open_signout}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  
                  >     
                    <MenuItem onClick={signout} sx={{width:"220px"}}><LogoutIcon/>ออกจากระบบ </MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
