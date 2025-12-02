// src/pages/TestFetch.jsx
import React, { useEffect } from 'react';

export default function TestFetch() {
  useEffect(() => {
    (async () => {
      const url = 'https://plansyncbackend.onrender.com/api/events/';
      console.log('TESTFETCH: fetching', url);
      try {
        const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        console.log('TESTFETCH: status', res.status);
        const text = await res.text();
        console.log('TESTFETCH: body text (first 500 chars):', text.slice(0, 500));
      } catch (err) {
        console.error('TESTFETCH: fetch error', err.message);
      }
    })();
  }, []);

  return <div>TestFetch: open console</div>;
}
