import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';
import Container from '../components/Container';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalContext>
        <SocketContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SocketContext>
      </GlobalContext>
    </Provider>
  );
}

export default MyApp

