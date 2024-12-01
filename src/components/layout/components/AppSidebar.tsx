import React, { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "../context/layoutcontext";
import { MenuProvider } from "../context/menucontext";
import { useRouter } from "next/navigation";

const AppSidebar = (props: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const { layoutConfig, setLayoutState, layoutState } =
    useContext(LayoutContext);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = null;

  const anchor = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      anchored: !prevLayoutState.anchored,
    }));
  };
  const onMouseEnter = () => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };
  const onMouseLeave = () => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(() => {
          setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            sidebarActive: false,
          }));
        }, 300);
      }
    }
  };
  const navigateToDashboard = () => {
    router.push("/");
  };

  return (
    <React.Fragment>
      <div
        ref={props.sidebarRef}
        className="layout-sidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="sidebar-header flex justify-content-center">
          <a onClick={navigateToDashboard} className="app-logo cursor-pointer">
            <img
              className=""
              src="/layout/images/menu_logo.png"
              alt="Profile"
            />
          </a>
          {/* <button
            className="layout-sidebar-anchor p-link"
            type="button"
            onClick={anchor}
          ></button> */}
        </div>

        <div className="layout-menu-container">
          <MenuProvider>
            <AppMenu />
          </MenuProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
