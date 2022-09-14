import React, {useState,useEffect} from 'react'
import moment from 'moment';
import Loading from './Loading'

const Entries = (props) => {
    const type = props.type;

    const [entryData, setEntryData] = useState([{}])

    useEffect(() => {
        fetch('/api/entry')
        .then(data => data.json())
        .then(data => {
            setEntryData(data)
        })
    }, [])

    return(
        <React.Fragment>
            <div className='flex-section log-entries'>
                <div className='flex-section-header'>
                    {type}
                </div>
                {(typeof entryData[1] === 'undefined') ? (<Loading />) : (
                    React.Children.toArray(
                        entryData.map((e,i) => {
                            return(
                                <div className='log-entry'>
                                    <div>
                                        {e.name}
                                    </div>
                                    <div>
                                        {e.amount} {e.unit}
                                    </div>
                                    <div>
                                        {moment(e.timestamp).format('dddd, MMM D')}
                                    </div>
                                </div>
                            )
                        })
                    )
                )}
             </div>
        </React.Fragment>
    )
}

export default Entries