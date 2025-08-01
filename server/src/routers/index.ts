import { router } from '../context/trpc';
import { authRouter } from './auth.router';
import { publicRouter } from './public.router';
import { userRouter } from './user.router';
import { adminRouter } from './admin.router';

export const appRouter = router({
    auth: authRouter,
    public: publicRouter,
    user: userRouter,
    admin: adminRouter,
});

export type TAppRouter = typeof appRouter;