import { ReactNode } from "react";
import { TUserPath } from "../type";

type TRoute = {
    name: string;
    path?: string;
    element?: ReactNode;
};



export const routeGenerator = (items: TUserPath[]) => {
    const extractChildRoutes: TRoute[] = [];
    items.forEach((item) => {
        if (item.name && item.children) {
            extractChildRoutes.push(...item.children);
        } else {
            extractChildRoutes.push(item as TRoute);
        }
    });

    const routes = extractChildRoutes.map((item) => ({
        path: item.path,
        element: item.element,
    }));
    return routes
}