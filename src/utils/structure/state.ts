export interface IState<T> {
  state: T;
  setState: (data: T) => void;
}

export class State<T> implements IState<T> {
  state: T = null;

  constructor(data: T) {
    this.state = data;
  }

  setState = (data: T) => {
    this.state = {
      ...this.state,
      ...data,
    };
  };
}
