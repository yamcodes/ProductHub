import '../app/index.css';
import AppContent from '../components/AppContent';
import enhance from './providers';

function App() {
  return <AppContent />;
}

export default enhance(App);
