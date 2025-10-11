import { TeamProvider } from "./TeamContext";
import { PointsTableProvider } from "./PointsTableContext";
import { AuthProvider } from "./AuthContext";
import { GalleryProvider } from "./GalleryContext";

const Providers = ({ children }) => (
  <AuthProvider>
    <PointsTableProvider>
      <TeamProvider>
        <GalleryProvider>{children}</GalleryProvider>
      </TeamProvider>
    </PointsTableProvider>
  </AuthProvider>
);

export default Providers;
