import user from './routes/user/user';

const router = (app) => {
    app.use('/user', user);
};

export default router;
