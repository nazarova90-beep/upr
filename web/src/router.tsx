import { createBrowserRouter } from 'react-router';

import Chat from './routes/Chat';
import Workout from './routes/Workout';

export const router = createBrowserRouter([
  { path: '/', element: <Workout /> },
  { path: '/chat/:exerciseId', element: <Chat /> },
]);
