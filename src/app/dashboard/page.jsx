'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function DashboardLayout({ children }) {
  const token = useSelector(({ token }) => token);
  useEffect(_ => {
    (async _ => {
      const { data } = await axios
        .create({ headers: { Authorization: token } })
        .get('login');
      console.log(data);
    })();
  }, []);
  return <> </>;
}
