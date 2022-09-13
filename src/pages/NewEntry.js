import React,{useState,useEffect} from 'react'
import Loading from '../components/Loading'

const NewEntry = () => {
    function categoryKeypress(e) {
        console.log(e.key)
    }
    
    return(
        <React.Fragment>
            {/* Category */}
            <div className="section">
                <div className="input-div">
                    <div className="icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input onKeyUp={(e) => categoryKeypress(e)} id="input-category" className="input-box" placeholder="Input category" />
                    <div className="input-clear">Clear</div>
                </div>

                <div className="tabs" style={{display:'flex !important'}} id="category-tabs">
                    {/* <div className="tab category"></div> */}
                </div>
            </div>

            {/* Name */}
            <div className="section">
                <div className="input-div">
                    <div className="icon">
                        <i className="fa-solid fa-font"></i>
                    </div>
                    <input id="input-name" className="input-box" placeholder="Name of entry ex. 'headache'" autoComplete="off" />
                    <div className="input-clear">Clear</div>
                </div>

                <div className="tabs" id="name-tabs">
                    {/* <div className="tab name"></div> */}
                </div>
            </div>

            {/* Level */}
            <div className="section">
                <div className="input-div">
                    <div className="icon">
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <input id="input-amount" className="input-box" placeholder="Amount" autoComplete="off" type="tel" />
                    <div className="input-clear">Clear</div>
                </div>
            </div>

            {/* Unit of measurement */}
            <div className="section">
                <div className="input-div">
                    <div className="icon">
                        <i className="fa-solid fa-ruler-combined"></i>
                    </div>
                    <input id="input-unit" className="input-box" placeholder="Unit of measurement" autoComplete="off" />
                    <div className="input-clear">Clear</div>
                </div>

                <div className="tabs" id="unit-tabs">
                    {/* Units of measurement */}
                </div>
            </div>

            {/* Notes */}
            <div className="section">
                <textarea id="notes" placeholder="Notes"></textarea>
            </div>

            {/* Time */}
            <div className="section">
                <div className="section-header">Time</div>
                <div className="tabs" id="time-tabs" style={{display:'flex'}}>
                    <div className="tab timestamp">Now</div>
                    <div className="tab timestamp">10m</div>
                    <div className="tab timestamp">30m</div>
                    <div className="tab timestamp">1h</div>
                    <div className="tab timestamp">2h</div>
                    <div className="tab timestamp">5h</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="section">
                <div className="action-buttons">
                    <button id="save-entry" className="action-button blue">Save</button>
                    <button id="clear-entry" className="action-button grey">Clear</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewEntry