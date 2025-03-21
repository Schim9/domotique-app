export class Action {
  elementId: string
  elementName: string
  action: string

  constructor(
    elementId: string,
    elementName: string,
    action: string
  ) {
    this.elementId = elementId;
    this.elementName = elementName;
    this.action = action;

  }
}
