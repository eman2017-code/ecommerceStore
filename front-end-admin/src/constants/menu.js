import {
  Home,
  Box,
  Tag,
  UserPlus,
  BarChart,
  Archive,
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/products/physical/product-list",
        title: "Product List",
        type: "link"
      },
      {
        path: "/products/physical/add-product",
        title: "Add Product",
        type: "link"
      }
    ]
  },
  {
    title: "Coupons",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      { path: "/coupons/list-coupons", title: "List Coupons", type: "link" },
      { path: "/coupons/create-coupons", title: "Create Coupons", type: "link" }
    ]
  },
  {
    title: "Customers",
    icon: UserPlus,
    type: "link",
    active: false,
    path: "/users/list-customers"
  },
  {
    title: "Reports",
    path: "/reports/report",
    icon: BarChart,
    type: "link",
    active: false
  },
  {
    title: "Orders",
    path: "/all-my-orders",
    icon: Archive,
    type: "link",
    active: false
  }
];
