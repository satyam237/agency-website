import React from 'react';
import ScrollCardServices from './ui/ScrollCard';
import { AIBentoGrid } from './ui/ai-bento-grid';

const Services = () => {
  return (
    <section id="services">
      <ScrollCardServices />
      <AIBentoGrid />
    </section>
  );
};

export default Services;