import '../public/styles/global.css';
import SocketContext from '../context/SocketContext'
import GlobalContext from '../context/GlobalContext';
import Container from '../components/Container';
import ChatContext from '../context/ChatContext';

function MyApp ({ Component, pageProps }) {
  return (
    <GlobalContext>
      <SocketContext>
        <ChatContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ChatContext>
      </SocketContext>
    </GlobalContext>
  );
}

export default MyApp

