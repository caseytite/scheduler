
// gets the appointments for the day
export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = state.days.find((item) => {
    return item.name === day;
  });

  if (!appointmentsForDay) {
    return [];
  }
  
  return appointmentsForDay.appointments.map((day) => state.appointments[day]);
}

// gets a single interview 
export function getInterview(state, apt_interview) {

  if (!apt_interview) {return null}

  const interviewerId = apt_interview.interviewer;
  const interviewObj = state.interviewers[interviewerId];
  const interview = {
    student: apt_interview.student,
    interviewer: interviewObj,
  };

  return interview;
}

// gets the interviewers available for the selected day
export function getInterviewersForDay(state, day) {
  const interviewersArr = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      interviewersArr.push(...item.interviewers);
    }
  });

  if (!state.days) return [];

  return interviewersArr.map((int) => state.interviewers[int]);
}
