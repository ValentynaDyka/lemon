'use client';

import React from 'react';
import { useCandidateSummary } from './hooks/useCandidateSummary';
import styles from './page.module.css';
import CandidateSummaryBlock from './componenets/CandidateSummaryBlock';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Home() {
  const { data, isLoading, error } = useCandidateSummary();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          Error Loading Candidate Data
        </Typography>
      </Box>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {data && <CandidateSummaryBlock data={data} />}
      </main>
    </div>
  );
}
