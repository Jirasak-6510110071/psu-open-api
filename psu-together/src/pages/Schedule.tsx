import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthProvider';
import { DataContext } from '../context/DataContext';
import { Calendar, momentLocalizer, Event, EventPropGetter } from 'react-big-calendar'
import moment from 'moment'
import Tutor from '../models/TutorModel';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Events extends Event {
  isSelf? : string;
}

function mapBookingsToEvents(bookings: Tutor[]): Event[] {
  return bookings.map(booking => ({
    start: moment(`${booking.date} ${booking.time}`, 'YYYY-MM-DD HH:mm').toDate(),
    end: moment(moment(`${booking.date} ${booking.time}`, 'YYYY-MM-DD HH:mm')).add(booking.duration, 'hour').toDate(),
    title: booking.subject,
    location: booking.location,
    isSelf : booking.std_id
  }));
}

const EventComponent: React.FC<{ event: any }> = ({ event }) => (
  <div>
    <div>{event.title}</div>
    {event.location && <p>สถานที่: {event.location}</p>}
  </div>
);


function Schedule() {
  const { sidebarToggle, studentData } = useContext(AuthContext)
  const { booking } = useContext(DataContext)
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState<Event[]>([]);

  const eventPropGetter: EventPropGetter<Events> = (event) => {
    const style = {
      backgroundColor: event.isSelf === studentData?.studentId? '#6db26c' : '#63a1af',
    };
    return { style };
  };

  useEffect(() => {
    const filterBooking = booking.filter(item => item.status === "confirmed");
    const mappedEvents = mapBookingsToEvents(filterBooking);
    setEvents(mappedEvents);
  }, [booking]);
  return (
    <div className='flex'>
      <Sidebar />
      <div className={`${sidebarToggle ? "ml-72" : ""} w-full`}>
        <Navbar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          components={{
            event: EventComponent 
          }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </div>
  )
}

export default Schedule