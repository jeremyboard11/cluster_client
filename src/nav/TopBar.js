import React from 'react'

const TopBar = (props) => {
    const label = props.label;
    return(
        <React.Fragment>
            <div className="top-bar-outer">
                {/* Top Bar */}
                <div className="top-bar">
                        <div className="top-bar-title">{label}</div>
                </div>
            </div>
            <div className='top-bar-spacer'></div>
        </React.Fragment>
    )
}

export default TopBar