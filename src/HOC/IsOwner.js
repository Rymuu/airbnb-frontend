import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";


const IsOwner = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const { user } = useContext(UserContext);
        const [isOwner, setIsOwner] = useState(false);

        useEffect(() => {
            if (!!user && user.type === "OWNER"){
                setIsOwner(true)
              }
            else {
                setIsOwner(false);
                router.push("/");
            }

        }, []);
        if (isOwner) {
            return <WrappedComponent/>;
        }
        else {
            return false;
        }
    }
}



export default IsOwner;