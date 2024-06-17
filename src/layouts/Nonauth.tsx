import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store";

const Nonauth = () => {

  const {user} = useAuthStore();

  if(user !== null) {
    return <Navigate replace={true} to="/" />
  }

  return (
    <div>
            <Outlet/>
    </div>
  )
}

export default Nonauth