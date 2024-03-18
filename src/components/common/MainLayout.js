import SidebarMenu from "./SidebarMenu";

const MainLayout = ({children}) => {

    return (
      <div className="flex flex-1 flex-row flex-grow w-full">
        <div className="w-44 flex flex-col max-w-44 min-h-screen">
          <SidebarMenu />
        </div>
        <div className="flex flex-col flex-grow h-full overflow-y-auto max-h-screen bg-gray-50">
          {children}
        </div>
      </div>
    );

}

export default MainLayout;