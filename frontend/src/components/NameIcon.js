/*
    This component takes in the user's first name initial as a parameter and displays it
*/
import React from 'react'

const NameIcon = ({ children }) => (
    <div className="app-header">
        <div>{children}</div>
    </div>
)

export default NameIcon