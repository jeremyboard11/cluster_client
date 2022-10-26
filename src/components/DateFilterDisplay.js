import React,{useState,useEffect} from 'react'
import moment from 'moment'
import Calendar from '../components/Calendar'

const DateFilterDisplay = (props) => {

    const [showCalendar, setShowCalendar] = useState(false)

    const toggleCalendar = (e) => {
        if(showCalendar){
            e.currentTarget.classList.remove('on')
            setShowCalendar(false)
        }else{
            e.currentTarget.classList.add('on')
            setShowCalendar(true)
        }
    }

    return(
        <React.Fragment>
            <div className='date-filter-display'>
                <div id='dates'>
                    {moment(props.filterDates.start).format('MMM D, YYYY')} - {moment(props.filterDates.end).format('MMM D, YYYY')}
                </div>
                <div onClick={(e) => toggleCalendar(e)} id='calendar-btn'>
                    Calendar
                </div>
            </div>
            {
                showCalendar && (<Calendar {...props} />)
            }
        </React.Fragment>
    )
}

export default DateFilterDisplay