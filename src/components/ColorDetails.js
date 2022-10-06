import React from 'react'

const ColorDetails = (props) => {
    return(
        <React.Fragment>
            <div className='section'>
                <div className='color-details-div'>
                    {
                        Object.keys(props.categoryInfo).map((cat,i) => {
                            let category = cat
                            if(cat == "ignore"){category = "other"}

                            return(
                                <div key={i}>
                                    <div className='color-preview' style={{backgroundColor:"#"+props.categoryInfo[cat].color}}></div>
                                    <div className='color-label'>
                                        <div>{category}</div>
                                        {/* <div>{new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(Object.values(props.budData).filter(x => x.category == cat)[0].amount)}</div> */}
                                        <div>amount</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default ColorDetails