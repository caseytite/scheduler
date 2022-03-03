import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';
import PropTypes from 'prop-types'

// builds the list of interviewers for the day

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props;

  const interviewersArray = interviewers.map((int) => {
    return (
      <InterviewerListItem
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === value}
        setInterviewer={() => onChange(int.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;
