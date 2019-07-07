import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized; // eslint-disable-line

getAuthority().then((result) => {
  if (!result) return;
  Authorized = RenderAuthorized(result.roles);
});

// Reload the rights component
const reloadAuthorized = () => {
  getAuthority().then((result) => {
    if (!result) return;
    Authorized = RenderAuthorized(result.roles);
  });
};

export { reloadAuthorized };
export default Authorized;
