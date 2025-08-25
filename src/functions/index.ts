import type { FieldProps } from "@/types/form";
import React from "react";

export const getChildId = (children: FieldProps["children"]) => {
  const child = React.Children.only(children) as React.ReactElement;
  if (child && "id" in (child?.props as Record<string, unknown>)) {
    return (child.props as Record<string, unknown>).id;
  }
};
