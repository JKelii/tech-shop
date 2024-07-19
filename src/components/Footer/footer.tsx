const Footer = () => {
  return (
    <div className="h-16 shadow-slate-700 shadow-sm w-full rounded-t-lg flex justify-center items-center ">
      <p className="font-bold">@TechShop {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
