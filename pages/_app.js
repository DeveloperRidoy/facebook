import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {

  return (
      <GlobalContext>
        <SocketContext>
          <Component {...pageProps} />
        </SocketContext>
      </GlobalContext>
  );
}

export default MyApp