import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slice/authSlice"
// import { resetCart } from "../../slice/cartSlice"
import { apiConnector } from "../ApiConnector"
import { endpoints } from "../Apis"
import { setUser } from "../../slice/profileSlice"
import { resetCart } from "../../slice/cartSlice"

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        // console.log(endpoints.RESETPASSTOKEN_API)
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, { email, })
            console.log("RESET PASSWORD TOKEN RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Email Sent");
            setEmailSent(true);

        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, { password, confirmPassword, token });
            if (!response) {
                throw new Error(response.data.message);
            }
            console.log("RESPONSE OF RESET PASSWORD--> ", response);
            toast.success("Password Successfully Reset");


        } catch (error) {
            console.log("RESET PASSWORD ERROR----- ", error)
            toast.error(error.response.data.message);

        }
        dispatch(setLoading(false));

    }
}

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email });
            if (!response) {
                throw new Error(response.data.message);
            }
            console.log("RESPONSE OF Send otp--> ", response);
            toast.success("OTP Successfully Send");
            navigate("/verify-email")

        } catch (error) {
            console.log("SEND OTP ERROR----- ", error)
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)

    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")

        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
            })

            if (!response) {
                throw new Error(response.data.message);
            }
            console.log("RESPONSE OF SignUp--> ", response);
            toast.success("SignUp Successfully");
            navigate("/login")

        } catch (error) {
            console.log("SIGNUP ERROR----- ", error)
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)

    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        setLoading(true);
        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password });
            if (!response) {
                throw new Error(response.data.message);
            }

            console.log("RESPONSE OF LOGIN--> ", response);

            toast.success("Login Successfully");

            dispatch(setToken(response.data.token));
            console.log("token from api set-->", response.data.token);

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }));

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")


        } catch (error) {
            console.log("LOGIN ERROR----- ", error)
            toast.error(error.response.data.message);
        }
        setLoading(false);
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}
