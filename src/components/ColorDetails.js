import React,{useState} from 'react'

const ColorDetails = (props) => {
    // const budData
    return(
        <React.Fragment>
            <div className='section'>
                <div className='color-details-div'>
                    {
                        Object.values(props.categories).map((cat,i) => {
                            let category = cat
                            if(cat == "ignore"){category = "other"}

                            return(
                                <div key={i}>
                                    <div className='color-preview' style={{backgroundColor:"#"+props.categoryInfo[cat].color}}></div>
                                    <div className='color-label'>
                                        <div>{category}</div>
                                        <div>{new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(Object.values(props.budData).filter(x => x.category == cat)[0].amount)}</div>
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