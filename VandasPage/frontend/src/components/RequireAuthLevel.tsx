import React from "react";
import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";



const RequireAuthLevel = () => {
    const { auth } = useAuth();
    const location = useLocation();
    

  
    const {idString} = useParams()
    const id = parseInt(idString!)
    console.log("userId: ", auth.id)
    console.log ("levels: ", auth.levels)
    console.log ("id: ", id)

    return (
        auth.levels.some(x =>x.id ==id)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuthLevel;