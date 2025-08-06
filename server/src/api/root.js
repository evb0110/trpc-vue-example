import { router } from './trpc';
import { authRouter } from './routers/auth';
import { publicRouter } from './routers/public';
import { userRouter } from './routers/user';
import { adminRouter } from './routers/admin';
export const appRouter = router({
    auth: authRouter,
    public: publicRouter,
    user: userRouter,
    admin: adminRouter,
});
