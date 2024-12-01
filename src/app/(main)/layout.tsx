"use client";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout/mainLayout";
import { AuthWrapper } from "components";
import { useEffect } from "react";
import { getUser } from "@/store/auth";
import { AppDispatch } from "@/core/rootStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthWrapper>
      <Layout>{children}</Layout>;
    </AuthWrapper>
  );
}
