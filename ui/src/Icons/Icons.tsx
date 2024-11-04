import React from 'react'
import get from "lodash/get"
import * as list from "./Shapes"
import { IconsProp } from '../interfaces';

const Icons = ({type, name}: IconsProp) => {
    const Component = get(list, `[${type}][${name}]`) as React.ComponentType | undefined;

  if (!Component) return null;
  return <Component/>;
};

export default Icons