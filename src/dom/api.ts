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

const appendChild = (element: Document) => (parent: Element, child: Node) => {
  const appendChildWithAPI = appendChild(element);
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChildWithAPI(parent, nestedChild));
  else {
    parent.appendChild(
      child.nodeType
        ? child
        : typeof child === 'string' && element.createTextNode(child)
    );
  }
};

const getElement =
  (element: Document) =>
  (selector: string): HTMLElement => {
    return element.querySelector(selector);
  };

const getElementAll =
  (element: Document) =>
  (selector: string): NodeListOf<HTMLElement> => {
    return element.querySelectorAll(selector);
  };

export const createAPI = (element: Document) => ({
  create: createElement,
  append: appendChild(element),
  get: getElement(element),
  getAll: getElementAll(element),
});
