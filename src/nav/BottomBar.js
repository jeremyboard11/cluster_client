import React from 'react'

const BottomBar = ({tabClick}) => {

    const handleClick = (e) => {
        // select tab
        document.querySelectorAll(".btm-bar-tab").forEach(el => {el.classList.remove('selected')})
        document.querySelector("#"+e.currentTarget.id).classList.add("selected");
    }

    return(
        <div className="btm-bar-outer">
            <div className="btm-bar">
                    <div id="tab-new-entry" className="btm-bar-tab selected" onClick={e => {tabClick('newEntry');handleClick(e)}} >
                            <i className="fa-solid fa-pencil"></i>
                            <div>New Entry</div>
                    </div>
                    <div id="tab-money" className="btm-bar-tab" onClick={e => {tabClick('money');handleClick(e)}} >
                            <i className="fa-solid fa-money-check-dollar"></i>
                            <div>Budget</div>
                    </div>
                    <div id="tab-analysis" className="btm-bar-tab" onClick={e => {tabClick('analysis');handleClick(e)}}>
                            <i className="fa-solid fa-chart-simple"></i>
                            <div>Analysis</div>
                    </div>
                    <div id="tab-log" className="btm-bar-tab" onClick={e => {tabClick('log');handleClick(e)}} >
                            <i className="fa-solid fa-receipt"></i>
                            <div>Log</div>
                    </div>
            </div>
            <div className="btm-bar-nav"></div>
        </div>
    )
}

export default BottomBar