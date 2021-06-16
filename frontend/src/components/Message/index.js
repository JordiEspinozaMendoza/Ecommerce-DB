import React from 'react'
import { Alert } from 'react-bootstrap'
export default function Message({variant, children}){
    const [open, setOpen] = React.useState(true);
    if (open){
        return (
            <Alert dismissable variant={variant} className="mt-2">
                {children}
            </Alert>
        )
    }else{
        return null;
    }
}