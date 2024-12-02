import AppSubMenu from "./AppSubMenu";
import type { MenuModel } from "@/types";

const AppMenu = () => {
  const model: MenuModel[] = [
    {
      items: [
        {
          label: "Overview",
          icon: "pi pi-fw pi-calendar",
          to: "/",
        },
        {
          label: "Analysis",
          icon: "pi pi-fw pi-comment",
          items: [
            {
              label: "Stakeholder field",
              to: "/analysis/stakeholder-field",
            },
            {
              label: "Project",
              to: "/analysis/project",
              disabled: true,
            },
          ],
        },
        {
          label: "Data review",
          icon: "pi pi-fw pi-comment",
          items: [
            {
              label: "Stakeholders",
              icon: "pi pi-fw pi-image",
              to: "/data-review/stakeholders",
            },
            {
              label: "Values",
              icon: "pi pi-fw pi-list",
              to: "/data-review/values",
            },
            {
              label: "Gap analysis",
              icon: "pi pi-fw pi-pencil",
              to: "/data-review/gap-analytics",
            },
            {
              label: "Chart sandbox",
              icon: "pi pi-fw pi-chart-bar",
              to: "/data-review/chart-sandbox",
            },
          ],
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
};

export default AppMenu;
