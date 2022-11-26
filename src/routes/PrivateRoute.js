import { useLoggedIn } from '../hooks';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const navigate = useNavigate();
    const { isLoading, error, data } = useLoggedIn();
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    if(data === true) {
        return props.children;
    }
    else {
        navigate("/logn");
    }
}
export default PrivateRoute;
