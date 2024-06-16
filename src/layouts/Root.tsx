import { Outlet } from "react-router-dom"
import { self } from "../http/api"
import { useAuthStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";



const getSelf = async () => {
  const {data} = await self();
  return data;
};
//runs of refresh or on project load - checks from cookie with self api if user to login or go to dashboard by setting setUser state
const Root = () => {

    const {setUser} = useAuthStore();

    const { data, isLoading } = useQuery({
      queryKey: ['self'],
      queryFn: getSelf,
      retry: (failureCount: number, error) => {
          if (error instanceof AxiosError && error.response?.status === 401) {
              return false;
          }
          return failureCount < 3;
      },
    });

    useEffect( () => {
      if(data) {
        setUser(data);
      }
    } , [data, setUser]);


    if(isLoading) {
      return <div>Loading....</div>
    }

  return <Outlet />
}

export default Root