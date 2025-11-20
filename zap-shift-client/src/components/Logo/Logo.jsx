import logoImg from '../../assets/logo.png';
const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logoImg} alt="" className="pb-1.5" />
      <span className="font-bold text-3xl -ml-3">ZapShift</span>
    </div>
  );
};

export default Logo;
