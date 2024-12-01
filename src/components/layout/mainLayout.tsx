"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  useEventListener,
  useResizeListener,
  useUnmountEffect,
} from "primereact/hooks";
import { DomHandler, classNames } from "primereact/utils";
// import AppRightMenu from "./components/AppRightMenu";
import AppTopbar from "./components/AppTopbar";
import { LayoutContext } from "./context/layoutcontext";
import type { AppTopbarRef, ChildContainerProps } from "@/types";
import React, { useCallback, useContext, useEffect, useRef } from "react";

const Layout = (props: ChildContainerProps) => {
  const {
    layoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    isSidebarActive,
  } = useContext(LayoutContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlim, isSlimPlus, isHorizontal, isDesktop]);

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  };

  useEffect(() => {
    if (isSidebarActive()) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isSlimPlus() || isHorizontal()) &&
        bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    layoutState.overlaySubmenuActive,
  ]);

  useEffect(() => {
    const onRouteChange = () => {
      hideMenu();
    };
    onRouteChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClassName = classNames({
    "layout-light": layoutConfig.colorScheme === "light",
    "layout-dark": layoutConfig.colorScheme === "dark",
    "layout-light-menu": layoutConfig.menuTheme === "light",
    "layout-dark-menu": layoutConfig.menuTheme === "dark",
    "layout-light-topbar": layoutConfig.topbarTheme === "light",
    "layout-dark-topbar": layoutConfig.topbarTheme === "dark",
    "layout-transparent-topbar": layoutConfig.topbarTheme === "transparent",
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-slim": layoutConfig.menuMode === "slim",
    "layout-slim-plus": layoutConfig.menuMode === "slim-plus",
    "layout-horizontal": layoutConfig.menuMode === "horizontal",
    "layout-reveal": layoutConfig.menuMode === "reveal",
    "layout-drawer": layoutConfig.menuMode === "drawer",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
    "p-input-filled": layoutConfig.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig.ripple,
    "layout-sidebar-active": layoutState.sidebarActive,
    "layout-sidebar-anchored": layoutState.anchored,
  });

  return (
    <React.Fragment>
      <div className={classNames("layout-container", containerClassName)}>
        <AppTopbar ref={topbarRef} sidebarRef={sidebarRef} />

        <div className="layout-content-wrapper">
          <div className="layout-content">{props.children}</div>
        </div>

        <div className="layout-mask"></div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
