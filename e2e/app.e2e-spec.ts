import { TestFrontZupPage } from './app.po';

describe('test-front-zup App', () => {
  let page: TestFrontZupPage;

  beforeEach(() => {
    page = new TestFrontZupPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
