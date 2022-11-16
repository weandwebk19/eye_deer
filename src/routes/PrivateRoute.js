import { useLoadPage } from '../hooks';

const PrivateRoute = () => {
    const { isLoading, error, data } = useLoadPage();
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return data;
}

export default PrivateRoute;