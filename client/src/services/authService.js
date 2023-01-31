const isAuth = async (e) => {
    let res = await fetch("/api/profile/login", {
        method: "GET",
    });
    return (res.status === 200);
}

export default isAuth;