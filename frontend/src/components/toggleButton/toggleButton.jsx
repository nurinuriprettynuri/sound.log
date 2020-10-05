import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, styled } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { connect } from "react-redux";
import { signoutCurrentUser } from "../../redux/actions/authAction";

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signoutCurrentUser()),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  button: {
    width: "40px",
    height: "100%",
    minWidth: "50px",
  },
  paper: {
    paddingTop: 0,

    paddingButtom: 0,
    borderRadius: 0,
    color: "#999",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    fontSize: "14px",
  },
}));

const MoreHorizIconed = styled(MoreHorizIcon)({
  color: "#ccc",
  "&:hover": {
    color: "#fff",
  },
});

const CustomMenuItem = styled(MenuItem)({
  fontSize: "12px",
});

const ToggleMenu = function MenuListComposition({ signout }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSignout = (event) => {
    handleClose(event);
    signout();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.button}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreHorizIconed />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement={"bottom-end"}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: "top",
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    className={classes.menuList}
                  >
                    <CustomMenuItem onClick={handleClose}>About</CustomMenuItem>
                    <CustomMenuItem onClick={handleSignout}>
                      Logout
                    </CustomMenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ToggleMenu);
