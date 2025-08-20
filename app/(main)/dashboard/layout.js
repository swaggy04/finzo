import React, { Suspense } from 'react'
import Dashboard from './page'

const Dashboardlayout = () => {
    return (
        <div className=' py-10 flex flex-col items-center'>
           



            <Suspense fallback>
                <Dashboard />
            </Suspense>
        </div>
    )
}

export default Dashboardlayout