import React, { ReactNode } from 'react';

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): boolean => {
  const types = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null;
    return item.type;
  });

  return (types || []).includes(child);
};

export const pick = <Obj extends { [key: string]: any }, Key extends keyof Obj>(
  props: Key[],
  obj: Obj
): Pick<Obj, Key> =>
  props.reduce((acc, prop) => {
    acc[prop] = obj[prop];
    return acc;
  }, {} as Pick<Obj, Key>);

export const pickChild = (
  children: ReactNode | undefined,
  targetChild: React.ElementType
): [ReactNode | undefined, ReactNode | undefined] => {
  let target: ReactNode[] = [];
  const withoutTargetChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item);
      return null;
    }
    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};

export const isChildElement = (
  parent: Element | null | undefined,
  child: Element | null | undefined
): boolean => {
  if (!parent || !child) return false;
  // eslint-disable-next-line no-undef
  let node: (Node & ParentNode) | null = child;
  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
};

export const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );
};

export const isMac = (): boolean => {
  if (!isBrowser()) return false;
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};
