import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
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
    <Box className={styles.container}>
      <Head>
        <title>League Tourney</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.link}>brakkit.gg</span>
        </h1>
        <Box>
            <a href="/qb">
             <Box display="flex" flexDirection="column" alignItems="center"  justifyContent="center" className={classes.button}>
                <Typography>
                    Generate Bracket
                </Typography>
                <PeopleIcon />
             </Box>
            </a>
        </Box>
      </main>
    </Box>
  )
}
