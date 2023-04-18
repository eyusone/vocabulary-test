import { DOMApi } from '../../const';

export const successTickUI = ({
  container,
  element,
}: {
  container: HTMLElement;
  element: HTMLElement;
}) => {
  element.classList.replace('bg-primary', 'bg-success');
  element.remove();
  DOMApi.append(container, element.cloneNode(true));
};

export const rejectTickUI = ({ element }: { element: HTMLElement }) => {
  element.classList.replace('bg-primary', 'bg-danger');
  setTimeout(() => {
    element.classList.replace('bg-danger', 'bg-primary');
  }, 500);
};
