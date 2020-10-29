/**
 * ARCHIVO COMPLEMENTARIO AL SIDEBAR
 */


import React, { Fragment, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  List,
  ListItem,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../actions/authActions';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  array,
  ...rest
}) => {
  const classes = useStyles();

  return (
    !array ? (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <ButtonsItems href={href} Icon={Icon} title={title} />
      </ListItem>
    ) :
      <SubItems clase={className} Icon={Icon} title={title} array={array} />

  );
};

const ButtonsItems = ({ href, Icon, title }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const startLogout = () => {
    localStorage.clear();
    dispatch(Logout());
  }


  return (
    <Fragment >
      {
        href ?
          <Button activeClassName={classes.active} className={classes.button} component={RouterLink} to={href} >
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
              {title}
            </span>
          </Button> :
          <Button className={classes.button} onClick={startLogout} >
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
              {title}
            </span>
          </Button>
      }
    </Fragment>
  )

}

const SubItems = ({ clase, Icon, title, array }) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Fragment >
      <ListItem
        className={clsx(classes.item, clase)}
        disableGutters
      >
        <Button className={classes.button} onClick={() => setOpen(!open)} >
          {Icon && (
            <Icon
              className={classes.icon}
              size="20"
            />
          )}
          <span className={classes.title}>
            {title}
          </span>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            array.map((item) => (
              <ListItem disableGutters className={classes.nested} key={ item._id }>
                <Button className={classes.button} activeClassName={classes.active} component={ RouterLink } to={ `/home/dashboard/salones/${item._id}` } >
                  <SpellcheckIcon
                    className={classes.icon}
                    size="20"
                  />
                  <span className={classes.title}>
                    { item.nombreSalon }
                  </span>
                </Button>
              </ListItem>
            ))
          }
        </List>
      </Collapse>

    </Fragment>
  )

}


NavItem.propTypes = {
  className: PropTypes.string,
  // href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
