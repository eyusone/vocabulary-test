import { DOMApi } from '../../../const';
import { onTickHandler } from '../handlers/on-tick-handler';

export const listen = ({
  elementClass,
  container,
}: {
  elementClass: string;
  container: HTMLElement;
}) => {
  const elements = DOMApi.getAll(elementClass);

  elements.forEach((element) =>
    element.addEventListener('click', () =>
      onTickHandler({
        value: element.innerText,
        element,
        elementClass,
        container,
      })
    )
  );
};
