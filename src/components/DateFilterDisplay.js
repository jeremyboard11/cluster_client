import React from 'react'
import moment from 'moment'

const DateFilterDisplay = (filterDates) => {
    return(
        <React.Fragment>
            <div className='date-filter-display'>
                {moment(filterDates.start).format('ddd MMM D, YYYY')} - {moment(filterDates.end).format('ddd MMM D, YYYY')}
            </div>
        </React.Fragment>
    )
}

export default DateFilterDisplay