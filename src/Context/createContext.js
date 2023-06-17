import { createContext } from "react";

let initState = { email: "", auth: false };
const UserContext = createContext(initState)

export { UserContext }