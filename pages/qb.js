import React, { useState } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import PeopleIcon from '@material-ui/icons/People'

import styles from '../styles/Home.module.css'

const useStyles = makeStyles({
    root: {},
    button: {
        width: '150px',
        height: '150px',
        borderStyle: 'solid',
        '&:hover': {
            color: '#524491',
            cursor: 'pointer'
        }

    }
})

export default function Home() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                   Quick Bracket Generator
                </h1>
            </main>
        </Box>
    )
}
