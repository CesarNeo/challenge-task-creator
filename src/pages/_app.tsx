import type { AppProps } from 'next/app'

import '../../styles/global.scss';
import { StatusContextProvider } from '../contexts/statusContext';
import { TaskContextProvider } from '../contexts/taskContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskContextProvider>
      <StatusContextProvider>
        <Component {...pageProps} />
      </StatusContextProvider>
    </TaskContextProvider>
  );
}
export default MyApp
