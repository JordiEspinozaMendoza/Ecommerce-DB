import React from 'react'
import { Alert } from 'react-bootstrap'
export default function Message({variant, children}){
    const [open, setOpen] = React.useState(true);
    if (open){
        return (
            <Alert  variant={variant} onClose={()=>setOpen(!open)}>
                {children}
            </Alert>
        )
    }else{
        return null;
    }
}