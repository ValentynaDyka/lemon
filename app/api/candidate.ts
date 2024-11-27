import axios from 'axios';
import { CandidateSummary } from '../types/candidate';

export const fetchCandidateSummary = async (): Promise<CandidateSummary> => {
  try {
    // Замість зовнішнього API використовуємо наш локальний серверний проксі
    const response = await axios.get('http://localhost:5000/api/candidate-summary');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching candidate summary:', error.message);
    throw new Error('Failed to fetch candidate summary');
  }
};

export default fetchCandidateSummary;
