import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import fetcher from '../../fetchers';

export default function Answer({
  answer: {
    id,
    body,
    date,
    answerer_name: name,
    helpfulness,
    photos,
  },
  updateQuestions,
}) {
  const [helpfulStatus, setHelpfulStatus] = useState(true);
  const [reportStatus, setReportStatus] = useState(true);

  const markHelpfulAnswer = (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && helpfulStatus) {
      fetcher
        .markHelpfulAnswer(id)
        .then(updateQuestions)
        .then(() => setHelpfulStatus(false))
        .catch((err) => console.error('markHelpfulAnswer: ', err));
    }
  };

  const reportAnswer = (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && reportStatus) {
      fetcher
        .reportAnswer(id)
        .then(() => setReportStatus(false))
        .catch((err) => console.error('reportAnswer: ', err));
    }
  };

  return (
    <div className="qa answer">
      <div className="qa answer-body">
        <div className="qa answer-text">
          {body}
        </div>
        {/* TODO: expand photo on click */}
        {photos.length > 0
          ? photos.map((photo, index) => (
            <img
              className="qa photo-sml"
              src={photo}
              key={photo}
              alt={`Customer's image ${index + 1}`}
            />
          ))
          : null}
      </div>
      <div className="qa answer-info">
        {`by ${name}, ${format(parseISO(date), 'MMMM d, yyyy')} | Helpful? `}
        {helpfulStatus ? (
          <span
            className="qa link"
            role="link"
            tabIndex={0}
            onKeyUp={markHelpfulAnswer}
            onClick={markHelpfulAnswer}
          >
            Yes
          </span>
        ) : <span>Marked!</span>}
        {` (${helpfulness}) | `}
        {reportStatus ? (
          <span
            className="qa link"
            role="link"
            tabIndex={0}
            onKeyUp={reportAnswer}
            onClick={reportAnswer}
          >
            Report
          </span>
        ) : <span>Reported</span>}
      </div >
    </div >
  );
}
