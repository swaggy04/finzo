import React, { Suspense } from 'react'
import Dashboard from './page'

const Dashboardlayout = () => {
    return (
        <div className=' py-10 flex flex-col items-center'>
            <h1
                className="
                            text-5xl font-bold
                            bg-gradient-to-r
                            from-green-400
                            via-emerald-400
                            to-teal-400
                            bg-clip-text
                            text-transparent
                            drop-shadow-md
                        "
            >
                Dashboard
            </h1>



            <Suspense fallback>
                <Dashboard />
            </Suspense>
        </div>
    )
}

export default Dashboardlayout