import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../hooks/api";
import { useEffect, useState } from "react";


const RequireAuthLevel = () => {
    const { auth } = useAuth();
    const location = useLocation();
    

  
    const {id} = useParams()
    console.log("userId: ", auth.id)
    console.log ("levels: ", auth.levels)
    console.log ("id: ", id)

    return (
        auth.levels.some(x =>x.Id ==id)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuthLevel;