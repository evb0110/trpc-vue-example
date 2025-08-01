// Re-export types for backward compatibility
export type { TAppRouter } from './src/app';

// Start the server
import { startServer } from './src/server';
startServer();