const createElement = (
  tag: keyof HTMLElementTagNameMap,
  props: unknown,
  children?: HTMLElement[]
): HTMLElement => {
  const element = document.createElement(tag);

  Object.entries(props).forEach(([name, value]) => {
    element.setAttribute(name, value.toString());
  });

  children.forEach((child) => {
    element.appendChild(
      !child.nodeType ? document.createTextNode(child.toString()) : child
    );
  });

  return element;
};

const appendChild = (parent: HTMLElement, child: Node) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  else {
    parent.appendChild(
      child.nodeType
        ? child
        : typeof child === 'string' && document.createTextNode(child)
    );
  }
};

const getElement =
  (element: HTMLElement | Document) =>
  (selector: string): HTMLElement => {
    return element.querySelector(selector);
  };

const getElementAll =
  (element: HTMLElement | Document) =>
  (selector: string): NodeListOf<HTMLElement> => {
    return element.querySelectorAll(selector);
  };

export const createAPI = (element: HTMLElement | Document) => ({
  create: createElement,
  append: appendChild,
  get: getElement(element as HTMLElement),
  getAll: getElementAll(element as HTMLElement),
});
