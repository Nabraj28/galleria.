import Header from '@/Components/Header'
import React from 'react'
import { Outlet } from 'react-router'

const AppLayout: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet />
        </React.Fragment>
    )
}

export default AppLayout