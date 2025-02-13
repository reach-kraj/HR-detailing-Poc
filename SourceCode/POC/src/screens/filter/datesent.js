import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './filter.css';
import questionsData from '../data/template';

const DateSent = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    try {
      const validatedData = questionsData
        .filter(item => item.DateSent && item.DateSent.trim() !== '') // Ensure DateSent is not empty
        .map(item => ({
          clNo: item.clNo.trim(),
          q: item.q.trim(),
          date: item.date.trim(),
          status: item.status.toLowerCase().trim(),
          dateSent: item.DateSent.trim(),
        }));

      setQuestions(validatedData);
    } catch (error) {
      console.error('Error processing questions data:', error);
      setQuestions([]);
    }
  }, []);

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    setQuestions(prevQuestions => {
      return [...prevQuestions].sort((a, b) => {
        const numA = parseInt(a.clNo.replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(b.clNo.replace(/[^0-9]/g, ''), 10) || 0;
        return newSortOrder === 'asc' ? numA - numB : numB - numA;
      });
    });
  };

  const getFilteredQuestions = () => {
    let filtered = questions;

    if (startDate && endDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);

      filtered = filtered.filter(question => {
        const questionDate = new Date(question.dateSent).getTime();
        return questionDate >= start && questionDate <= end;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(question => 
        question.clNo.toLowerCase().includes(query) ||
        question.q.toLowerCase().includes(query) ||
        question.dateSent.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate('/')}>Log Out</button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="home-content-box">
        <div className="questions-header">
          <h2>Date Sent ({filteredQuestions.length})</h2>
          <div className="header-controls">
            <DatePicker className="date-picker"
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker className="date-picker"
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={startDate ? new Date(new Date(startDate).getTime() + (30 * 24 * 60 * 60 * 1000)) : null}
              placeholderText="End Date"
            />
            <button className="filter-button" onClick={handleSort}>
              <span>Sort {sortOrder === 'asc'}</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <div
                key={`${question.clNo}-${index}`}
                className="question-card"
                onClick={() => handleQuestionClick(question.clNo)}
              >
                <div className="question-date">{question.date}</div>
                <div className="question-content">
                  <p>{question.q}</p>
                </div>
                <div className="question-meta">
                  <div className="cl-number">{question.clNo}</div>
                  <div className={`status-badge ${question.status}`}>{question.status}</div>
                  <div className="date-sent-badge highlight">{question.dateSent}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No records available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSent;
