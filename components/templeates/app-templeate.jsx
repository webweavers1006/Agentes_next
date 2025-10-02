import Panel from "../generic/panel";

const AppTempleate = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen w-full p-6 lg:py-10 lg:px-35 md:px-25">
      <div className="w-full">
        <Panel title={title} subtitle={subtitle} bgClass="bg-white" textClass="text-gray-800" subtitleClass="text-gray-500">
          
        </Panel>
        {children}
      </div>
    </div>
  );
};

export default AppTempleate;