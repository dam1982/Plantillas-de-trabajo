import { DesplieguePage } from './app.po';

describe('despliegue App', function() {
  let page: DesplieguePage;

  beforeEach(() => {
    page = new DesplieguePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
