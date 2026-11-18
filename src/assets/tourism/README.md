# Tourism and events photos

Photos shown on `/town/life` (Tourism and events).

```
src/assets/tourism/
  spots/<slug>.jpg    one photo per tourist spot
  events/<slug>.jpg   one photo per event or fiesta
```

## Adding a photo

1. Name the file after the record's `slug` in `src/features/town/shared/data/tourism.ts`, e.g.
   `spots/philippine-tarsier-sanctuary.jpg` or `events/town-fiesta-nuestra-senora-del-villar.jpg`.
2. Use a landscape JPG or WebP, about 1600 px wide and under 500 KB.
3. Only add photos you took or have written permission to use. Note the photographer for the credit.
4. Register it in `src/features/town/life-page/data/tourismPhotos.ts`:

   ```ts
   import tarsierSanctuary from '../../../../assets/tourism/spots/philippine-tarsier-sanctuary.jpg'

   export const spotPhotos: Record<string, TourismPhoto> = {
     'philippine-tarsier-sanctuary': { image: tarsierSanctuary, alt: 'A tarsier on a branch', credit: 'Photo: Juan dela Cruz' },
   }
   ```

`credit` (shown on the photo) and `position` (CSS object-position for the 16:9 crop, e.g. `'center 20%'`
to keep a face in frame) are optional. Large originals: resize first (about 1600 px wide); don't commit
multi-megabyte camera files.

Cards without a photo show an icon instead, so a record never needs a photo to appear.

Photos sent through the "Suggest a spot or event" form arrive in the Discord channel. Download the ones
you approve (and have permission for), resize them, and add them here the same way.
