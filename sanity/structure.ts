import type {StructureResolver} from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet

//What you wanna show or don't wanna show
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('aurthor').title("Authors"),
      S.documentTypeListItem('startup').title("Startups"),
      S.documentTypeListItem('playlist').title("Playlists")
    ])
