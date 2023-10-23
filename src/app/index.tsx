import './index.css';
import AppContent from '../pages/AppContent';
import enhance from './providers';

function App() {
  return <AppContent />;
}

export default enhance(App);
