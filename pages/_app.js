import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';
import Container from '../components/Container';
import ChatContext from '../context/ChatContext';

function MyApp ({ Component, pageProps }) {
  return (
    <GlobalContext>
      <ChatContext>
        <SocketContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SocketContext>
      </ChatContext>
    </GlobalContext>
  );
}

export default MyApp

