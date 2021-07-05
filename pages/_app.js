import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';
import Container from '../components/Container';

function MyApp ({ Component, pageProps }) {
  return (
      <GlobalContext>
        <SocketContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SocketContext>
      </GlobalContext>
  );
}

export default MyApp

