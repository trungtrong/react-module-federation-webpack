import RemoteAboutRoutingModule from '@apps/remote-about/remote-about.routing-module';
import { environment } from '../environments/environment';

export function App() {
  return (
    <div title="about">
        Remote - About App { environment.name}
      <RemoteAboutRoutingModule />
    </div>
  );
}

export default App;
