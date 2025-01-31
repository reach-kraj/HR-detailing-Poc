
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import questionsData from '../data/template';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const HeadHomepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filters array remains unchanged
  const filters = [
    { name: 'CL No', route: '/filter/clno' },
    { name: 'Open', route: '/filter/open' },
    { name: 'Close', route: '/filter/close' },
    { name: 'Stage', route: '/filter/stage' },
    { name: 'Sketch', route: '/filter/sketch' },
    { name: 'HRD Detailer Initials', route: '/filter/hrd-initials' },
    { name: 'Seq/Zone/Area', route: '/filter/sequence' },
    { name: 'RFI No', route: '/filter/rfi-no' },
    { name: 'Design Reference', route: '/filter/design-ref' },
    { name: 'Work Done By', route: '/filter/workdoneby' },
    { name: 'Date sent', route: '/filter/datesent' },
    { name: 'Response', route: '/filter/Response' },
    { name: 'Response Date', route: '/filter/Resdate' }
  ];

  // Function to highlight matched text
  const highlightMatch = useCallback((text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <span key={index} className="highlight">{part}</span>;
      }
      return part;
    });
  }, []);

  // Filter buttons based on search query
  const filteredButtons = filters.filter(filter =>
    filter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate counts for open and closed questions
  const openCount = questionsData.filter(q => q.status === "open").length;
  const closedCount = questionsData.filter(q => q.status === "closed").length;

  // Data for the first pie chart (Open vs Closed)
  const pieChartData = {
    labels: ['Open', 'Closed'],
    datasets: [
      {
        data: [openCount, closedCount],
        backgroundColor: ['#FF6384', '#36A2EB'], // Red for Open, Blue for Closed
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Calculate counts for stages: Approval, Review, Fabrication
  const approvalCount = questionsData.filter(q => q.Stage === "Approval").length;
  const reviewCount = questionsData.filter(q => q.Stage === "Review").length;
  const fabricationCount = questionsData.filter(q => q.Stage === "Fabrication").length;

  // Data for the second pie chart (Stages)
  const stageChartData = {
    labels: ['Approval', 'Review', 'Fabrication'],
    datasets: [
      {
        data: [approvalCount, reviewCount, fabricationCount],
        backgroundColor: ['#FFCD56', '#4BC0C0', '#9966FF'], // Yellow, Green, Purple
        hoverBackgroundColor: ['#FFCD56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Chart options to reduce size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      legend: {
        position: 'bottom', // Move legend below the chart
      },
    },
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate('/')}>
          Log Out
        </button>
      </div>

      {/* Content Section */}
      <div className="home-content-box">
        {/* Action Buttons */}
        <div className="button-container">
          <button className="action-button" onClick={() => navigate('/hqselect-question')}>
            <span className="button-icon">+</span>
            Add Response
          </button>
          <button className="action-button" onClick={() => navigate('/brview-all')}>
            View All
          </button>
        </div>

        {/* Filters Section */}
        <div className="content-box">
          <div className="filter-header">
            <h2 className="filter-heading">Filters</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search filters..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="filter-grid">
            {filteredButtons.map((filter, index) => (
              <button
                key={index}
                className={`filter-button ${searchQuery && filter.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'matched' : ''}`}
                onClick={() => navigate(filter.route)}
              >
                {highlightMatch(filter.name, searchQuery)}
              </button>
            ))}
            {filteredButtons.length === 0 && (
              <div className="no-results">No matching filters found</div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          {/* First Chart: Open vs Closed */}
          <div className="chart-section">
            <h3 className="chart-title">Clarity List Overview</h3>
            <div className="chart-box" style={{ width: '300px', height: '300px' }}>
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          {/* Second Chart: Stages */}
          <div className="chart-section">
            <h3 className="chart-title">Stage Distribution</h3>
            <div className="chart-box" style={{ width: '300px', height: '300px' }}>
              <Pie data={stageChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadHomepage;