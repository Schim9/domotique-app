export class Action {
  elementId: number
  elementName: string
  action: string

  constructor(
    elementId: number,
    elementName: string,
    action: string
  ) {
    this.elementId = elementId;
    this.elementName = elementName;
    this.action = action;

  }
}
