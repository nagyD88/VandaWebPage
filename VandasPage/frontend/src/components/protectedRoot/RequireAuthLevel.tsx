import React from "react";
import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const RequireAuthLevel = () => {
    const { auth } = useAuth();
    const location = useLocation();

    const { id } = useParams()
    
    
    console.log("auth: ", auth)

    return (
        auth.levels.some(x =>x.id.toString() ==id) // auth-bol jön ami a jvt-tokenböl ott nagybetü de miért vagy a többi miért nem?

            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuthLevel;