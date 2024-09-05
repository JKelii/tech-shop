import AccountCardContent from "./_components/AccountCardContent";

const page = () => {
  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <AccountCardContent />
    </div>
  );
};

export default page;
