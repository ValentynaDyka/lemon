This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


**Документація проєкту для інтеграції зовнішнього API у React додаток**

### Мета
Проєкт мав на меті інтеграцію зовнішнього API у **React додаток**, щоб відобразити інформацію про кандидата. У процесі виникали проблеми з доступом до API через політику **CORS** та самопідписані сертифікати, які потребували вирішення для успішного підключення. Нижче надано повний опис виконаних кроків для досягнення успіху.

### Основні Етапи

#### 1. Створення Серверного Проксі на Express.js

Для того щоб уникнути проблем із **CORS** та **SSL** сертифікатами при підключенні до стороннього API, було створено серверний проксі за допомогою **Express.js**. Це дозволило відправляти запити до стороннього API з нашого локального сервера, замість клієнтської частини.

- **Файл: server.js**
  ```javascript
  const express = require('express');
  const axios = require('axios');
  const cors = require('cors');

  const app = express();
  const port = 5000;

  app.use(cors()); // Додає підтримку CORS для всіх запитів

  // Створення маршруту для отримання даних з зовнішнього API
  app.get('/api/candidate-summary', async (req, res) => {
    try {
      const response = await axios.get('https://test-task-mock-api.onrender.com/api/candidate/summary', {
        headers: {
          'x-api-key': 'Aq2ckj2sHpsawVEjpZac7PXF8beiKvREPC-2O5EL_DY',
          'Content-Type': 'application/json',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching candidate summary:', error.message);
      res.status(500).json({ message: 'Failed to fetch candidate summary' });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  ```
  **Ключові моменти:**
  - Сервер працює на порті `5000`.
  - Створено маршрут `/api/candidate-summary`, який виконує запит до зовнішнього API і повертає відповідь клієнту.

#### 2. Оновлення Функції для Отримання Даних на Фронтенді

На клієнтській стороні функцію `fetchCandidateSummary` було змінено, щоб вона здійснювала запити до локального проксі-сервера замість безпосереднього звертання до зовнішнього API.

- **Файл: candidate.ts**
  ```typescript
  import axios from 'axios';
  import { CandidateSummary } from '../types/candidate';

  export const fetchCandidateSummary = async (): Promise<CandidateSummary> => {
    try {
      const response = await axios.get('http://localhost:5000/api/candidate-summary');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching candidate summary:', error.message);
      throw new Error('Failed to fetch candidate summary');
    }
  };

  export default fetchCandidateSummary;
  ```
  **Ключові моменти:**
  - Функція здійснює запит до локального API на `http://localhost:5000/api/candidate-summary`.

#### 3. Реалізація Компонента для Відображення Даних

Компонент **CandidateSummaryBlock** використовувався для відображення даних про кандидата після їх отримання.

- **Файл: CandidateSummaryBlock.tsx**
  ```tsx
  import { Box, Typography, Chip } from '@mui/material';
  import { CandidateSummary } from '../types/candidate';

  interface Props {
    data: CandidateSummary;
  }

  const CandidateSummaryBlock: React.FC<Props> = ({ data }) => {
    return (
      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h3">Summary</Typography>
        <Typography variant="subtitle1">Relevant Skills are highlighted</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {data.summary}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Main Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.mainSkills.map((skill, index) => (
            <Chip key={index} label={`${skill.name} (${skill.years || 'N/A'})`} color={skill.relevant ? 'primary' : 'default'} />
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Additional Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.additionalSkills.map((skill, index) => (
            <Chip key={index} label={skill.name} color={skill.relevant ? 'primary' : 'default'} />
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Achievements</Typography>
        <Box>
          {data.achievements.map((achievement, index) => (
            <Typography key={index} variant="body2">
              - {achievement}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  export default CandidateSummaryBlock;
  ```

#### 4. Використання React Query для Управління Даними

Було використано **React Query** для спрощення процесу отримання даних і управління станом завантаження.

- **Файл: useCandidateSummary.ts**
  ```typescript
  import { useQuery } from 'react-query';
  import fetchCandidateSummary from '../api/candidate';
  import { CandidateSummary } from '../types/candidate';

  export const useCandidateSummary = () => {
    return useQuery<CandidateSummary>('candidateSummary', fetchCandidateSummary);
  };
  ```

#### 5. Створення Головного Компонента з Підключенням до Дата-Сервісу

Компонент **Home** був використаний для підключення хуку **useCandidateSummary** і відображення компоненту **CandidateSummaryBlock**.

- **Файл: Home.tsx**
  ```tsx
  'use client';

  import React from 'react';
  import { useCandidateSummary } from './hooks/useCandidateSummary';
  import styles from './page.module.css';
  import CandidateSummaryBlock from './components/CandidateSummaryBlock';
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
  ```

### Підсумок
1. **Створено проксі-сервер** на **Express.js**, щоб обійти обмеження **CORS** і виконувати запити до стороннього API.
2. **Оновлено клієнтський запит**, щоб здійснювати запити через локальний проксі.
3. **Використано React Query** для управління станом даних і запитами до API.
4. **Реалізовано компонент для відображення даних** кандидата, з підтримкою відображення навантаження і обробки помилок.

Ця документація дозволить вам пояснити весь процес інтеграції, включаючи створення серверного проксі, оновлення запитів у React додатку і відображення даних за допомогою відповідних компонентів.

