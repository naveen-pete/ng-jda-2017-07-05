import { MiscAppPage } from './app.po';

describe('misc-app App', () => {
  let page: MiscAppPage;

  beforeEach(() => {
    page = new MiscAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
