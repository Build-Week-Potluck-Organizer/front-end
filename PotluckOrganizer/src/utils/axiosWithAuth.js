import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return (
        axios
            .create({
                baseURL: `https://build-week-potluck-organizer.herokuapp.com`,
                headers: {Authorization: token}
            })
            )
};