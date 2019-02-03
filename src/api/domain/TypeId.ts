export default class TypeId<T> {

  value: string;

  constructor({ value }: { value: string }) {
    this.value = value;
  }
}
