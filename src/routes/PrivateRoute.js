import { useLoadPage } from '../hooks';

const PrivateRoute = (props) => {
    const { isLoading, error, data } = useLoadPage(props);
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return data;
}
export default PrivateRoute;
