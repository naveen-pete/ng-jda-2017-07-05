import { StoreAppPage } from './app.po';

describe('store-app App', () => {
  let page: StoreAppPage;

  beforeEach(() => {
    page = new StoreAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
