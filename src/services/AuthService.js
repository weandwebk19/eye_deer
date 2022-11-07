export const isLoggedIn = async (id, navigate, accessToken, axiosJWT) => {
    try {
    const res = await axiosJWT.post(
        "auth",
        id,
        {
            headers: { token: `Bearer ${accessToken}` },
        });
        if(res.status !== 200) {
            navigate('/login');
        };
        return res;
    } catch (err) {
        navigate('/login');
        return err;
    }
}