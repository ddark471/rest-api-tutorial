const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        return res.sendStatus(403);
    }
    ;
    return next();
};
export default requireUser;
