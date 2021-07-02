import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';
import Container from '../components/Container';
import AuthContext from '../context/AuthContext';

function MyApp ({ Component, pageProps }) {
  return (
    <AuthContext>
      <GlobalContext>
        <SocketContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SocketContext>
      </GlobalContext>
    </AuthContext>
  );
}

export default MyApp

