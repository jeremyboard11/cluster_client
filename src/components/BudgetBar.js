import React from 'react'

const BudgetBar = (props) => {
    return(
        <React.Fragment>
            <div className='section'>
                <div className='bud-bar'>
                    {
                        props.budData && (
                            Object.keys(props.budData).map((d,i)=>{
                                return(
                                    <div key={i} className={`bud-${props.budData[d].category}`} style={{backgroundColor:"#"+props.categoryInfo[props.budData[d].category].color,flex:props.budData[d].amount/props.income}}></div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default BudgetBar