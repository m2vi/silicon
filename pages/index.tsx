import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import detect from '../utils/detect';
import Silicon from '../public/silicon.svg';
import Head from 'next/head';

const Home: NextPage = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const result = detect.exec();
    if (result.error) console.error(result.error);
    setPercentage(result);
  }, []);

  return (
    <div className='full'>
      <Head>
        <title>Apple Silicon Detect</title>
      </Head>
      {typeof percentage === 'number' && percentage ? (
        <div style={{ position: 'relative' }}>
          <div className='gray' style={{ '--percentage': `${percentage}%` } as any}></div>
          <Silicon />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
