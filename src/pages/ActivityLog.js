import React from 'react'
import Entries from '../components/Entries'

const ActivityLog = () => {
    
    return(
        <React.Fragment>
             <Entries type="Data"/>

             <div className='flex-section'>
                <div className='flex-section-header'>
                    Money
                </div>
             </div>
        </React.Fragment>
    )
}

export default ActivityLog