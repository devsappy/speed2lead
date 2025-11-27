import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './CollectionPage.css';

const watches = [
  {
    id: 1,
    name: 'Datejust 36',
    category: 'Classic',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m126234-0051.png?impolicy=v7-main-configurator&imwidth=440',
  },
  {
    id: 2,
    name: 'Submariner Date',
    category: 'Professional',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m126610ln-0001.png?impolicy=v7-main-configurator&imwidth=440',
  },
  {
    id: 3,
    name: 'Day-Date 40',
    category: 'Classic',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m228238-0042.png?impolicy=v7-main-configurator&imwidth=440',
  },
  {
    id: 4,
    name: 'GMT-Master II',
    category: 'Professional',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m126710blro-0001.png?impolicy=v7-main-configurator&imwidth=440',
  },
  {
    id: 5,
    name: 'Oyster Perpetual',
    category: 'Classic',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m126000-0009.png?impolicy=v7-main-configurator&imwidth=440',
  },
  {
    id: 6,
    name: 'Cosmograph Daytona',
    category: 'Professional',
    image: 'https://content.rolex.com/v7/dam/2024/upright-bba-with-shadow/m126500ln-0001.png?impolicy=v7-main-configurator&imwidth=440',
  },
];

const CollectionPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Classic', 'Professional', 'Watches by theme'];

  const filteredWatches = activeFilter === 'All'
    ? watches
    : watches.filter(watch => watch.category === activeFilter);

  return (
    <div className="collection-page">
      <Navbar />

      <section className="collection-hero">
        <div className="hero-left">
          <h1>Explore the Rolex collection</h1>
        </div>
        <div className="hero-right">
          <p>
            The Rolex collection offers a wide range of prestigious, high-precision
            timepieces, from Professional to Classic models to suit any wrist.
          </p>
          <a href="#watches" className="find-rolex-link">
            Find your Rolex
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
        </div>
      </section>

      <section className="filter-section" id="watches">
        <div className="filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {activeFilter === filter && <span className="active-dot"></span>}
              {filter}
            </button>
          ))}
        </div>
        <button className="configure-btn">Configure</button>
      </section>

      <section className="watches-grid">
        {filteredWatches.map((watch) => (
          <div key={watch.id} className="watch-card">
            <div className="watch-image-container">
              <img src={watch.image} alt={watch.name} className="watch-image" />
            </div>
            <div className="watch-info">
              <h3>{watch.name}</h3>
              <span className="watch-category">{watch.category}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CollectionPage;
