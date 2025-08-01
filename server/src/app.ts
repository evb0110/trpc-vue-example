import { router } from './context/trpc';
import { authRouter } from './routers/auth.router';
import { publicRouter } from './routers/public.router';
import { userRouter } from './routers/user.router';
import { adminRouter } from './routers/admin.router';

// Flat router for backward compatibility
export const appRouter = router({
    // Auth routes
    loginAsUser: authRouter.loginAsUser,
    loginAsAdmin: authRouter.loginAsAdmin,
    logout: authRouter.logout,
    whoami: authRouter.whoami,
    
    // Public routes
    hello: publicRouter.hello,
    getRequestInfo: publicRouter.getRequestInfo,
    generateReport: publicRouter.generateReport,
    
    // User routes
    createUser: userRouter.createUser,
    getProfile: userRouter.getProfile,
    updateProfile: userRouter.updateProfile,
    deleteAccount: userRouter.deleteAccount,
    
    // Admin routes
    getAllUsers: adminRouter.getAllUsers,
    getSystemStats: adminRouter.getSystemStats,
    deleteUser: adminRouter.deleteUser,
    getAnalytics: adminRouter.getAnalytics,
});

export type TAppRouter = typeof appRouter;