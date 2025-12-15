export const isAdmin = (user) => {
    return user?.role === "Admin";
};

export const isUser = (user) =>{
    return user?.role === "user";
};