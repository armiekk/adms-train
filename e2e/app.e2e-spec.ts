import { AdmsNewDevPage } from './app.po';

describe('adms-new-dev App', function() {
  let page: AdmsNewDevPage;

  beforeEach(() => {
    page = new AdmsNewDevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
