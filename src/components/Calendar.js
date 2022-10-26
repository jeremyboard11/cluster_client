import React,{useState,useEffect} from 'react'
import moment from 'moment'


const Calendar = (props) => {
    
    const [calendar,setCalendar] = useState({})
    const [viewMonth,setViewMonth] = useState(moment(props.filterDates.start).startOf('month').format())
    const [calendarStart,setCalendarStart] = useState( moment(viewMonth).subtract(moment(viewMonth).format('d'),'days') )

    const renderMonth = (M) => {
        setCalendarStart( moment(M).subtract(moment(M).format('d'),'days') )
        setViewMonth( M )
        console.log( moment(M).subtract(moment(M).format('d'),'days').format('MMM D') )
        // console.log(calendarStart)
    }

    useEffect(() => {
        // push dates to be rendered here
        let tempCalendar = []
        for(let i = 0; i < 42; i++){
            let d = moment(calendarStart).add(i,'days')
            let label = moment(d).format('D')
            let date = moment(d).format()
            let between = moment(d).isBetween(props.filterDates.start,props.filterDates.end)
            if(moment(d).isSame(props.filterDates.start)){between = true}
            tempCalendar.push({
                label:label,
                date:date,
                between:between
            })
        }
        setCalendar(tempCalendar)
    },[calendarStart])

    return(
        <>
            <div className='section'>
                <div className='calendar'>
                    
                    {/* Calendar buttons */}
                    <div className='month-selector'>
                        <div onClick={ () => renderMonth(moment(viewMonth).subtract(1,'months')) }>
                            {moment(viewMonth).subtract(1,'months').format('MMM')}
                        </div>
                        <div className='month'>
                            {moment(viewMonth).format('MMM')}
                        </div>
                        <div onClick={ () => renderMonth(moment(viewMonth).add(1,'months')) }>
                            {moment(viewMonth).add(1,'months').format('MMM')}
                        </div>
                    </div>

                    <div className='calendar-dow'>Sun</div>
                    <div className='calendar-dow'>Mon</div>
                    <div className='calendar-dow'>Tue</div>
                    <div className='calendar-dow'>Wed</div>
                    <div className='calendar-dow'>Thu</div>
                    <div className='calendar-dow'>Fri</div>
                    <div className='calendar-dow'>Sat</div>

                    {/* Calendar days */}
                    {

                        Object.values(calendar).map((d,i) => {
                            let currentMonth = ""
                            let betweenIn = ""
                            let betweenOut = ""
                            let startEnd = ""
                            // if day is in current viewed month
                            if(moment(d.date).isSame(viewMonth,'month')){
                                currentMonth = "current-month"
                            }
                            // if between selected dates and in viewed month
                            if(d.between && moment(d.date).isSame(viewMonth,'months')){
                                betweenIn = "between-in"
                            }
                            // if between selected dates and NOT in viewed month
                            if(d.between && !moment(d.date).isSame(viewMonth,'months')){
                                betweenIn = "between-out"
                            }
                            // if day is start or end date
                            if(moment(d.date).isSame(props.filterDates.start)){
                                startEnd = "start"
                            }
                            if(moment(d.date).isSame(props.filterDates.end)){
                                startEnd = startEnd + " end"
                            }
                            return(
                                <React.Fragment key={'day'+d.date}>
                                    {i % 7 == 0 && (<div className='break'></div>)}
                                    <div className={`calendar-day ${currentMonth} ${betweenIn} ${startEnd}`} key={i}>{d.label}</div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar