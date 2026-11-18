# Business logos and photos

Logos and photos for listings on `/town/business` (Local businesses and services).

1. Name the file after the listing's `slug` in `src/features/town/shared/data/businesses.ts`,
   e.g. `ashdroidcmd-developer-for-hire.png`.
2. Use a square logo (about 512 px) or a landscape photo (about 1600 px wide), under 500 KB.
   Resize large camera files first; don't commit multi-megabyte originals.
3. Only add images the business owner sent or allowed (e.g. through the "Register your business" form).
4. Register it in `src/features/town/business-page/data/businessPhotos.ts`:

   ```ts
   import devLogo from '../../../../assets/business/ashdroidcmd-developer-for-hire.png'

   export const businessPhotos: Record<string, BusinessPhoto> = {
     'ashdroidcmd-developer-for-hire': { image: devLogo, alt: 'ashdroidcmd logo' },
   }
   ```

Listings without an image show their category icon.
