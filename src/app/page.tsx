'use client';

import Portfolio from '@/components/Portfolio';
import data from '@/app/data.json';

export default function Page() {
  return <Portfolio data={data} />;
}