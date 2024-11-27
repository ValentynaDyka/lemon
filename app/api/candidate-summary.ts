// File: /api/candidate-summary.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://test-task-mock-api.onrender.com/api/candidate/summary';
const API_KEY = 'Aq2ckj2sHpsawVEjpZac7PXF8beiKvREPC-2O5EL_DY';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error fetching candidate summary:', error.message);
      res.status(error.response?.status || 500).json({ message: 'Failed to fetch candidate summary' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
