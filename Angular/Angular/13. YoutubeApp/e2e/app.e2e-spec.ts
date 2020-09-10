import { YoutubeappPage } from './app.po';

describe('youtubeapp App', function() {
  let page: YoutubeappPage;

  beforeEach(() => {
    page = new YoutubeappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
