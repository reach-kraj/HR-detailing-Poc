import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import './filter.css';
import questionsData from '../data/template';

const HRDInt = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try {
      const validatedData = questionsData.map((item, index) => {
        if (!item.clNo || !item.q || !item.date || !item.status || !item.HRD_Detailer_Initials) {
          console.error(`Missing required fields in question at index ${index}:`, item);
          return null;
        }
        return {
          clNo: item.clNo.trim(),
          q: item.q.trim(),
          date: item.date.trim(),
          status: item.status.toLowerCase().trim(),
          HRD_Detailer_Initials: item.HRD_Detailer_Initials.trim()
        };
      }).filter(item => item !== null);

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
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setQuestions(prevQuestions => {
      try {
        const sorted = [...prevQuestions].sort((a, b) => {
          return sortOrder === 'asc' 
            ? a.HRD_Detailer_Initials.localeCompare(b.HRD_Detailer_Initials) 
            : b.HRD_Detailer_Initials.localeCompare(a.HRD_Detailer_Initials);
        });
        return sorted;
      } catch (error) {
        console.error('Error sorting questions:', error);
        return prevQuestions;
      }
    });
  };

  const getFilteredQuestions = () => {
    try {
      if (!searchQuery.trim()) return questions;
      const query = searchQuery.toLowerCase().trim();
      return questions.filter(question => 
        question.HRD_Detailer_Initials.toLowerCase().includes(query)
      );
    } catch (error) {
      console.error('Error filtering questions:', error);
      return questions;
    }
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
          <h2>Search by HRD Detailer Initials ({filteredQuestions.length})</h2>
          <div className="header-controls">
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
                  <div className="stage-badge highlight">{question.HRD_Detailer_Initials}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No questions available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRDInt;