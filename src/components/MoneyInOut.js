import React,{useState} from 'react'

const MoneyInOut = (props) => {
    return(
        <React.Fragment>
            <div className='money-in-out'>
                <div>
                    Income: {new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(props.money.in)}
                </div>
                <div>
                    Spent: {new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(props.money.out * -1)}
                </div>
                <div>
                    Saved: {new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(props.money.saved)}
                </div>
            </div>
        </React.Fragment>
    )
}

export default MoneyInOut