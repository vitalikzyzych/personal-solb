import { GuestWrapper } from "components";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <GuestWrapper>{children}</GuestWrapper>;
}
