import { useQuery, useQueryClient } from "@tanstack/react-query";
const BASE_URL = "../../api_connection.js"; 

export default function useGetProfiles(token) {
 
    const queryclient = useQueryClient();
    return useQuery({
        queryKey: ["profiles"],
        queryFn: useGetProfileData(token),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryclient.invalidateQueries(["profiles"]);
        },
    });
    async function useGetProfileData(token) {
        try {
            const response = await fetch(`${BASE_URL}/api/profiles/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();

            console.log("Profile data fetched successfully:", res);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to fetch profile: ${error.message}`);
        }
    }
}
