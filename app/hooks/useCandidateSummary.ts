import { useQuery } from 'react-query';
import fetchCandidateSummary from '../api/candidate';
import { CandidateSummary } from '../types/candidate';

export const useCandidateSummary = () => {
  return useQuery<CandidateSummary>('candidateSummary', fetchCandidateSummary);
};
