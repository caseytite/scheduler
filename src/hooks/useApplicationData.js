import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
 
  const spotsRemaining = (state, day, appointmentsObj) => {
    
    const appointmentIdForDay = state.days.findIndex((item) => {
      return item.name === day;
    });
   
    const daysAppointments = state.days[appointmentIdForDay].appointments
    const availableAppointments = daysAppointments.filter(apt => !appointmentsObj[apt].interview)
    const spots = availableAppointments.length
    
    const newDayObj = {
      ...state.days[appointmentIdForDay],
      spots
    }

    const newDaysArr = [ ...state.days ]

     newDaysArr[appointmentIdForDay] = newDayObj
       
    return newDaysArr
  };
  
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

 
  useEffect(() => {
    const GET_DAYS = axios.get('api/days');
    const GET_APPOINTMENTS = axios.get('/api/appointments');
    const GET_INTERVIEWERS = axios.get('/api/interviewers');

    Promise.all([GET_DAYS, GET_APPOINTMENTS, GET_INTERVIEWERS]).then(
      (response) => {
        const [days, appointments, interviewers] = response;

        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      }
      );
    }, []);
    
    const setDay = (day) => setState((prev) => ({ ...prev, day }));
    
    const bookInterview = (id, interview) => {

    
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const days =  spotsRemaining(state, state.day, appointments)  
    
    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() => {
      
      setState({
        ...state,
        appointments,
        days
      });
    })
      
  };

  const cancelInterview = (id) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
     const days = spotsRemaining(state, state.day,appointments) 

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {

        setState({
          ...state,
          appointments,
          days
        });
        
      })
   
  };


  return{state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;