import { MapasPage } from './app.po';

describe('mapas App', function() {
  let page: MapasPage;

  beforeEach(() => {
    page = new MapasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
