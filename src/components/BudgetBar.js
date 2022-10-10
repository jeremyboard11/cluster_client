import React from 'react'

const BudgetBar = (props) => {
    return(
        <React.Fragment>
            <div className='section'>
                <div className='bud-bar'>
                    {
                        props.budData && (
                            Object.keys(props.budData).map((d,i)=>{
                                // only render bar section for negative amounts
                                if(props.budData[d].category !== 'ignore' && props.budData[d].amount < 0 || props.budData[d].category == 'ignore' && props.budData[d].amount < 0){
                                    let percent = props.budData[d].amount/props.income * -1
                                    return(
                                        <div key={i} className={`bud-${props.budData[d].category}`} style={{backgroundColor:"#"+props.categoryInfo[props.budData[d].category].color,flex:percent}}></div>
                                    )
                                }
                            })
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default BudgetBar