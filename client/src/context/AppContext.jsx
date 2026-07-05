import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false);

    const [userData, setUserData] = useState(null);

    // IMPORTANT
    axios.defaults.withCredentials = true;

    // CHECK AUTH STATE
    const getAuthState = async () => {

        try {

            const { data } = await axios.get(
                backendUrl + "/api/auth/is_auth"
            );

            if (data.success) {

                setIsLoggedin(true);

                getUserData();

            }

        } catch (error) {

            setIsLoggedin(false);

            console.log(error);

        }

    };

    // GET USER DATA
    const getUserData = async () => {

        try {

            const { data } = await axios.get(
                backendUrl + "/api/user/data"
            );

            if (data.success) {

                setUserData(data.userData);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || error.message
            );

        }

    };

    useEffect(() => {

        getAuthState();

    }, []);

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};