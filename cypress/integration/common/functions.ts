export const getNIndexChildrenSelector = (classParent: string, index: number) =>
  `${classParent} > :nth-child(${index})`;