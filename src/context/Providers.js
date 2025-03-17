import { TeamProvider } from './TeamContext';
import { PointsTableProvider } from './PointsTableContext';
import { AuthProvider } from './AuthContext';

const Providers = ({ children }) => (
<AuthProvider>

  <PointsTableProvider>
    <TeamProvider>
        {children}

    </TeamProvider>
  </PointsTableProvider>
</AuthProvider>
);

export default Providers;
