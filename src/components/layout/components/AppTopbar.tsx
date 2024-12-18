import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import { logout } from "source/AuthSource";
import { appSelector } from "@/store";
import { LayoutContext } from "../context/layoutcontext";
import AppSidebar from "./AppSidebar";

const AppTopbar = forwardRef(
  (props: { sidebarRef: React.RefObject<HTMLDivElement> }, ref) => {
    const { onMenuToggle, showRightSidebar, showConfigSidebar, isHorizontal } =
      useContext(LayoutContext);
    const router = useRouter();
    const {
      auth: { user },
    } = useSelector(appSelector);

    const menubuttonRef = useRef(null);
    const buttonref = useRef(null);
    const btnRef1 = useRef(null);
    const imgRef = useRef(null);
    const privacyRef = useRef(null);
    const settingsRef = useRef(null);
    const logoutRef = useRef(null);

    const onMenuButtonClick = () => {
      onMenuToggle();
    };

    const onConfigButtonClick = () => {
      showConfigSidebar();
    };

    useImperativeHandle(ref, () => ({
      menubutton: menubuttonRef.current,
    }));

    const handleLogout = async () => {
      const res = await logout();
      if (!res) {
        router.push("/login");
      }
    };

    return (
      <>
        <div className="layout-topbar">
          <div className="topbar-start">
            <button
              ref={buttonref}
              type="button"
              className="topbar-menubutton p-link p-trigger transition-duration-300"
              onClick={onMenuButtonClick}
            >
              <i className="pi pi-bars"></i>
            </button>
          </div>
          <div className="layout-topbar-menu-section">
            <AppSidebar sidebarRef={props.sidebarRef} />
          </div>
          <div className="topbar-end">
            <ul className="topbar-menu">
              <li
                className={classNames({
                  "block topbar-item ": isHorizontal(),
                  "block sm:hidden topbar-item": !isHorizontal(),
                })}
              ></li>
              <li className="topbar-item mr-1 font-semibold">
                {`${user?.first_name} ${user?.last_name}`}{" "}
              </li>
              <li className="topbar-item mr-3">
                <StyleClass
                  nodeRef={imgRef}
                  selector="@next"
                  enterClassName="hidden"
                  enterActiveClassName="px-scalein"
                  leaveToClassName="hidden"
                  leaveActiveClassName="px-fadeout"
                  hideOnOutsideClick
                >
                  <a ref={imgRef} className="p-ripple cursor-pointer">
                    <img
                      className="border-round-xl"
                      src="/layout/images/avatar/square/avatar-m-1.jpg"
                      alt="Profile"
                    />
                    <Ripple />
                  </a>
                </StyleClass>
                <ul className="topbar-menu active-topbar-menu p-4 w-15rem z-5 hidden">
                  <li role="menuitem" className="m-0 mb-3">
                    <StyleClass
                      nodeRef={privacyRef}
                      selector="@grandparent"
                      enterClassName="hidden"
                      enterActiveClassName="px-scalein"
                      leaveToClassName="hidden"
                      leaveActiveClassName="px-fadeout"
                      hideOnOutsideClick
                    >
                      <a
                        ref={privacyRef}
                        className="flex align-items-center hover:text-primary-500 transition-duration-200"
                      >
                        <i className="pi pi-fw pi-lock mr-2"></i>
                        <span>Privacy</span>
                      </a>
                    </StyleClass>
                  </li>
                  <li role="menuitem" className="m-0 mb-3">
                    <StyleClass
                      nodeRef={settingsRef}
                      selector="@grandparent"
                      enterClassName="hidden"
                      enterActiveClassName="px-scalein"
                      leaveToClassName="hidden"
                      leaveActiveClassName="px-fadeout"
                      hideOnOutsideClick
                    >
                      <a
                        ref={settingsRef}
                        className="flex align-items-center hover:text-primary-500 transition-duration-200"
                      >
                        <i className="pi pi-fw pi-cog mr-2"></i>
                        <span>Settings</span>
                      </a>
                    </StyleClass>
                  </li>
                  <li role="menuitem" className="m-0">
                    <StyleClass
                      nodeRef={logoutRef}
                      selector="@grandparent"
                      enterClassName="hidden"
                      enterActiveClassName="px-scalein"
                      leaveToClassName="hidden"
                      leaveActiveClassName="px-fadeout"
                      hideOnOutsideClick
                    >
                      <a
                        ref={logoutRef}
                        onClick={handleLogout}
                        className="flex align-items-center hover:text-primary-500 transition-duration-200 cursor-pointer"
                      >
                        <i className="pi pi-fw pi-sign-out mr-2"></i>
                        <span>Logout</span>
                      </a>
                    </StyleClass>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
);

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
