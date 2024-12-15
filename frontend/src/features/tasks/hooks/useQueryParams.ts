// hooks/useQueryParams.ts
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

    const useQueryParams = () => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();

    function setQueryParam(key: string, value: string) {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(key, value);

        const newUrl = `${location.pathname}?${queryParams.toString()}`;
        navigate(newUrl);

        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }

    function deleteQueryParam(key: string) {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete(key);

        const newUrl = `${location.pathname}?${queryParams.toString()}`;
        navigate(newUrl);

        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }

    return { setQueryParam, deleteQueryParam };
}

export default useQueryParams;
