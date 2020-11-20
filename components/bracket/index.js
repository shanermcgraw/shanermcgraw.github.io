import React, { useState } from 'react'

import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {}
})

export default function Bracket(participants) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>

        </Box>
    )
}
