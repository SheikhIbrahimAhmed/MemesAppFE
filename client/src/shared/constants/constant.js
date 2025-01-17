export const backendUrl = "http://localhost:5000";
export const getToken = () => localStorage.getItem("token");
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const getUserId = () => {
    const user = getUser();
    return user ? user._id : null;
};