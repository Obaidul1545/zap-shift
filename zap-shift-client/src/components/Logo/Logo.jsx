import { Link } from 'react-router';
import logoImg from '../../assets/logo.png';
const Logo = () => {
  return (
    <Link to={'/'} className="flex items-end">
      <img src={logoImg} alt="" className="pb-1.5" />
      <span className="font-bold text-3xl -ml-3">ZapShift</span>
    </Link>
  );
};

export default Logo;
