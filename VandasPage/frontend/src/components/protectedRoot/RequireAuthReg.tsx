import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import api from "../../hooks/api";

const RequireAuthReg = () => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const email = queryParams.get("email")
    const [isMatching, setIsMatching] = useState(true)
    const queryClient = useQueryClient()

    const postIsMatching = async () => 
      await api.post<boolean>("/user/ismatching", {
        id: id,
        email:email
      });

  const postIsMatchingMutation = useMutation(postIsMatching, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('ismatching')
    }
})

    postIsMatching().then((data)=>setIsMatching(data.data));

    return (
        isMatching
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuthReg;