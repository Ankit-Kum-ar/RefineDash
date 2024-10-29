import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources : IResourceItem[] = [
    // Dashboard resource
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: <DashboardOutlined/>,
        }
    },
    // Companies resource
    {
        name: "companies",
        list: "/companies", // List page for companies
        show: "/companies/:id", // Show page for a single company
        create: "/companies/new", // Create page for a company
        edit: "/companies/edit/:id", // Edit page for a company
        meta: {
            label: "Companies",
            icon: <ShopOutlined/>,
        }
    },

    // Tasks resource
    {
        name: "tasks",
        list: "/tasks", // List page for tasks
        show: "/tasks/:id", // Show page for a single task
        create: "/tasks/new", // Create page for a task
        edit: "/tasks/edit/:id", // Edit page for a task
        meta: {
            label: "Tasks",
            icon: <ProjectOutlined/>,
        }
    }

]