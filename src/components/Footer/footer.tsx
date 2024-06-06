const Footer = () => {
  return (
    <div className="h-16 bg-mainBg w-full rounded-t-lg flex justify-center items-center">
      <p className="font-bold">@TechShop {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
