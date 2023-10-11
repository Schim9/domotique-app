import { DomoticzItem } from './domoticz-item.model';

describe('DomoticzItem', () => {
  it('should create an instance', () => {
    expect(new DomoticzItem(
      0,
      "Title",
      "",
      "0",
      "",
      "",
      0
    )).toBeTruthy();
  });
});
