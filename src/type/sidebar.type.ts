import { ReactNode } from "react";

export type TUserPath = {
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[]
}

export type TSidebar = {
    key: string;
    label: ReactNode;
    children?: TSidebar[];
} | undefined;