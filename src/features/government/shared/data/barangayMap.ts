export interface BarangayMapFeature {
  slug: string
  name: string
  areaSqKm: number
  labelX: number
  labelY: number
  path: string
}

export interface BarangayMapProjection {
  originX: number
  originY: number
  scaleX: number
  scaleY: number
  padding: number
}

export interface BarangayMapTile {
  tileZ: number
  tileX: number
  tileY: number
  x: number
  y: number
  width: number
  height: number
}

export const barangayMap = {
  viewBox: '0 0 1000 700',
  cityOutline: 'M24,24 L976,24 L976,676 L24,676 Z',
  projection: {
    originX: 13811650.0,
    originY: -1118320.0,
    scaleX: 0.05,
    scaleY: 0.05,
    padding: 24.0,
  },
  tiles: [] as BarangayMapTile[],
  features: [
  {
    "slug": "anonang",
    "name": "Anonang",
    "areaSqKm": 3,
    "labelX": 815.1,
    "labelY": 375.6,
    "path": "M889.5,394.8 L830.4,357.8 L807.1,325.9 L800.5,337.2 L784.1,343.2 L774,351 L776.3,395.4 L801.6,419.7 L798.4,436.4 L889.5,394.8 Z"
  },
  {
    "slug": "bahan",
    "name": "Bahan",
    "areaSqKm": 3,
    "labelX": 610.8,
    "labelY": 589.6,
    "path": "M636.2,557.4 L575.6,556.8 L548.4,600 L630.8,634.5 L637.3,631.7 L636.2,557.4 Z"
  },
  {
    "slug": "badiang",
    "name": "Badiang",
    "areaSqKm": 3,
    "labelX": 472.4,
    "labelY": 425.8,
    "path": "M552.3,404.7 L512.8,402.4 L493,416 L464.8,412.9 L438.6,420.2 L409.3,424.5 L350.6,422.8 L337.2,459.7 L445.7,451.1 L466.2,438.3 L519.7,444.8 L537.9,437.5 L533.4,421.7 L552.3,404.7 Z"
  },
  {
    "slug": "baguhan",
    "name": "Baguhan",
    "areaSqKm": 3,
    "labelX": 750,
    "labelY": 498.8,
    "path": "M752.8,466.2 L668.7,464.8 L662,481.6 L722,510.3 L769.8,520.6 L798,535 L803.5,529.5 L820.2,514.9 L752.8,466.2 Z"
  },
  {
    "slug": "banahao",
    "name": "Banahao",
    "areaSqKm": 1,
    "labelX": 600,
    "labelY": 537.8,
    "path": "M579.4,521.2 L579.7,543 L571.2,547.6 L575.6,556.8 L636.2,557.4 L678.1,522.6 L600.8,532.4 L579.4,521.2 Z"
  },
  {
    "slug": "baogo",
    "name": "Baogo",
    "areaSqKm": 2,
    "labelX": 720.8,
    "labelY": 321,
    "path": "M713.2,289.7 L667.5,276.9 L659.6,313.4 L676.5,325 L717.7,331 L734.2,349.8 L774,351 L784.1,343.2 L768.1,340.7 L713.2,289.7 Z"
  },
  {
    "slug": "bugang",
    "name": "Bugang",
    "areaSqKm": 4,
    "labelX": 507.3,
    "labelY": 237.4,
    "path": "M559.3,232.8 L546.3,217.7 L549.2,184.9 L528.2,157.7 L508.2,177.8 L485.5,189.5 L465.6,222.4 L491.2,239.8 L447.2,262.5 L468.6,276 L466.4,302.9 L513.2,303.9 L518.1,290.5 L502.9,269.6 L559.3,232.8 Z"
  },
  {
    "slug": "cagawasan",
    "name": "Cagawasan",
    "areaSqKm": 1,
    "labelX": 405.9,
    "labelY": 407.8,
    "path": "M438.6,420.2 L453,401.5 L419,386.1 L370.9,378.5 L367.5,408.2 L350.6,422.8 L409.3,424.5 L438.6,420.2 Z"
  },
  {
    "slug": "cagayan",
    "name": "Cagayan",
    "areaSqKm": 1,
    "labelX": 533.6,
    "labelY": 334.2,
    "path": "M546.1,352.1 L546.8,329.2 L559.5,303.8 L508.2,317.2 L500.3,336.9 L527.9,347.8 L546.1,352.1 Z"
  },
  {
    "slug": "cambitoon",
    "name": "Cambitoon",
    "areaSqKm": 2,
    "labelX": 806.2,
    "labelY": 571.8,
    "path": "M847.7,606.9 L835.4,555.5 L818.5,530.2 L803.5,529.5 L798,535 L788.4,543.4 L766.4,560.8 L743.3,598.1 L772.8,588.8 L811.2,593.9 L841.1,612 L847.7,606.9 Z"
  },
  {
    "slug": "canlinte",
    "name": "Canlinte",
    "areaSqKm": 2,
    "labelX": 646.5,
    "labelY": 503.7,
    "path": "M662,481.6 L621.2,476 L579.4,521.2 L600.8,532.4 L678.1,522.6 L722,510.3 L662,481.6 Z"
  },
  {
    "slug": "cawayan",
    "name": "Cawayan",
    "areaSqKm": 3,
    "labelX": 560.6,
    "labelY": 487,
    "path": "M621.2,476 L579.2,471.9 L581.8,449.5 L535.5,449.8 L544.4,477.8 L533.6,483.9 L489.5,476.4 L525.8,494.7 L536.4,524 L579.7,543 L579.4,521.2 L621.2,476 Z"
  },
  {
    "slug": "cogon",
    "name": "Cogon",
    "areaSqKm": 1,
    "labelX": 449.8,
    "labelY": 349.3,
    "path": "M482.3,339.2 L476.7,334.2 L385.9,353.8 L387,362.2 L484.3,367 L482.3,339.2 Z"
  },
  {
    "slug": "cuaming",
    "name": "Cuaming",
    "areaSqKm": 0.11,
    "labelX": 38.6,
    "labelY": 27,
    "path": "M41.5,24 L24,28.1 L47.3,31.8 L41.5,24 Z"
  },
  {
    "slug": "dagnawan",
    "name": "Dagnawan",
    "areaSqKm": 2,
    "labelX": 677.4,
    "labelY": 584.6,
    "path": "M688.9,573.4 L669.7,573.4 L636.2,557.4 L637.3,631.7 L743.3,598.1 L688.9,573.4 Z"
  },
  {
    "slug": "dagohoy",
    "name": "Dagohoy",
    "areaSqKm": 1,
    "labelX": 507.1,
    "labelY": 457.9,
    "path": "M535.5,449.8 L537.9,437.5 L519.7,444.8 L466.2,438.3 L445.7,451.1 L463.3,469.8 L489.5,476.4 L533.6,483.9 L544.4,477.8 L535.5,449.8 Z"
  },
  {
    "slug": "dait-sur",
    "name": "Dait Sur",
    "areaSqKm": 1,
    "labelX": 627.2,
    "labelY": 289.5,
    "path": "M667.5,276.9 L650.5,267.4 L573.5,289.2 L559.5,303.8 L612.2,299.1 L659.6,313.4 L667.5,276.9 Z"
  },
  {
    "slug": "datag",
    "name": "Datag",
    "areaSqKm": 5,
    "labelX": 745.2,
    "labelY": 424.3,
    "path": "M798.4,436.4 L801.6,419.7 L776.3,395.4 L774,351 L715.6,416.5 L621.4,432.6 L668.7,464.8 L752.8,466.2 L798.4,436.4 Z"
  },
  {
    "slug": "fatima",
    "name": "Fatima",
    "areaSqKm": 1,
    "labelX": 611.4,
    "labelY": 258.3,
    "path": "M650.5,267.4 L630.2,239.3 L587.8,237 L576,249.7 L573.5,289.2 L650.5,267.4 Z"
  },
  {
    "slug": "hambongan",
    "name": "Hambongan",
    "areaSqKm": 0.07,
    "labelX": 226.2,
    "labelY": 177.6,
    "path": "M222,173.9 L220,180.3 L236,183.5 L230.8,176.3 L222,173.9 Z"
  },
  {
    "slug": "ilaud",
    "name": "Ilaud",
    "areaSqKm": 0.18,
    "labelX": 458.2,
    "labelY": 314.1,
    "path": "M469.9,318.7 L466.4,302.9 L439.4,307.5 L445.5,322.6 L469.9,318.7 Z"
  },
  {
    "slug": "ilaya",
    "name": "Ilaya",
    "areaSqKm": 3,
    "labelX": 819.4,
    "labelY": 468.7,
    "path": "M827.9,500 L889.5,394.8 L798.4,436.4 L752.8,466.2 L820.2,514.9 L827.9,500 Z"
  },
  {
    "slug": "ilihan",
    "name": "Ilihan",
    "areaSqKm": 2,
    "labelX": 521.6,
    "labelY": 550.6,
    "path": "M571.2,547.6 L547.4,546.1 L459.4,512.6 L432.7,533.3 L473.1,544.3 L515.1,567.4 L548.4,600 L575.6,556.8 L571.2,547.6 Z"
  },
  {
    "slug": "lapacan-norte",
    "name": "Lapacan Norte",
    "areaSqKm": 1,
    "labelX": 804.4,
    "labelY": 318.7,
    "path": "M807.1,325.9 L849.9,319.1 L811.6,298 L772.6,300 L781.8,324.9 L800.5,337.2 L807.1,325.9 Z"
  },
  {
    "slug": "lapacan-sur",
    "name": "Lapacan Sur",
    "areaSqKm": 1,
    "labelX": 765.2,
    "labelY": 315,
    "path": "M772.6,300 L728.9,284.1 L713.2,289.7 L768.1,340.7 L784.1,343.2 L800.5,337.2 L781.8,324.9 L772.6,300 Z"
  },
  {
    "slug": "lawis",
    "name": "Lawis",
    "areaSqKm": 1,
    "labelX": 459.5,
    "labelY": 198.3,
    "path": "M483.5,175.3 L436.2,189.7 L429.8,234.6 L459,220.4 L465,194.7 L483.5,175.3 Z"
  },
  {
    "slug": "liloan-norte",
    "name": "Liloan Norte",
    "areaSqKm": 4,
    "labelX": 716.4,
    "labelY": 354.8,
    "path": "M774,351 L734.2,349.8 L717.7,331 L676.5,325 L622.6,359.2 L715.6,416.5 L774,351 Z"
  },
  {
    "slug": "liloan-sur",
    "name": "Liloan Sur",
    "areaSqKm": 3,
    "labelX": 621.7,
    "labelY": 396.8,
    "path": "M622.6,359.2 L582.6,368.2 L591,390.6 L609.4,412.9 L608.5,434.8 L621.4,432.6 L715.6,416.5 L622.6,359.2 Z"
  },
  {
    "slug": "lomboy",
    "name": "Lomboy",
    "areaSqKm": 1,
    "labelX": 689.3,
    "labelY": 547.6,
    "path": "M715.1,548.2 L722,510.3 L678.1,522.6 L636.2,557.4 L669.7,573.4 L688.9,573.4 L715.1,548.2 Z"
  },
  {
    "slug": "lonoy-cainsican",
    "name": "Lonoy Cainsican",
    "areaSqKm": 1,
    "labelX": 573.1,
    "labelY": 426.3,
    "path": "M608.5,434.8 L609.4,412.9 L591,390.6 L552.3,404.7 L533.4,421.7 L537.9,437.5 L535.5,449.8 L581.8,449.5 L608.5,434.8 Z"
  },
  {
    "slug": "lonoy-roma",
    "name": "Lonoy Roma",
    "areaSqKm": 2,
    "labelX": 545.3,
    "labelY": 373.3,
    "path": "M546.1,352.1 L527.9,347.8 L503.6,368.6 L512.8,402.4 L552.3,404.7 L591,390.6 L582.6,368.2 L546.1,352.1 Z"
  },
  {
    "slug": "lutao",
    "name": "Lutao",
    "areaSqKm": 3,
    "labelX": 455.6,
    "labelY": 389.3,
    "path": "M484.3,367 L387,362.2 L370.9,378.5 L419,386.1 L453,401.5 L438.6,420.2 L464.8,412.9 L493,416 L512.8,402.4 L503.6,368.6 L484.3,367 Z"
  },
  {
    "slug": "luyo",
    "name": "Luyo",
    "areaSqKm": 0.78,
    "labelX": 491.3,
    "labelY": 319.6,
    "path": "M513.2,303.9 L466.4,302.9 L469.9,318.7 L476.7,334.2 L482.3,339.2 L500.3,336.9 L508.2,317.2 L513.2,303.9 Z"
  },
  {
    "slug": "mabuhay",
    "name": "Mabuhay",
    "areaSqKm": 2,
    "labelX": 529.8,
    "labelY": 519.3,
    "path": "M579.7,543 L536.4,524 L525.8,494.7 L489.5,476.4 L479.1,486.5 L459.4,512.6 L547.4,546.1 L571.2,547.6 L579.7,543 Z"
  },
  {
    "slug": "maria-rosario",
    "name": "Maria Rosario",
    "areaSqKm": 1,
    "labelX": 740.9,
    "labelY": 570.3,
    "path": "M743.3,598.1 L766.4,560.8 L788.4,543.4 L715.1,548.2 L688.9,573.4 L743.3,598.1 Z"
  },
  {
    "slug": "nabuad",
    "name": "Nabuad",
    "areaSqKm": 3,
    "labelX": 607.3,
    "labelY": 329.3,
    "path": "M659.6,313.4 L612.2,299.1 L559.5,303.8 L546.8,329.2 L546.1,352.1 L582.6,368.2 L622.6,359.2 L676.5,325 L659.6,313.4 Z"
  },
  {
    "slug": "napo",
    "name": "Napo",
    "areaSqKm": 1,
    "labelX": 626.4,
    "labelY": 459.5,
    "path": "M668.7,464.8 L621.4,432.6 L608.5,434.8 L581.8,449.5 L579.2,471.9 L621.2,476 L662,481.6 L668.7,464.8 Z"
  },
  {
    "slug": "ondol",
    "name": "Ondol",
    "areaSqKm": 1,
    "labelX": 452.2,
    "labelY": 247.9,
    "path": "M465.6,222.4 L459,220.4 L429.8,234.6 L413.9,276.9 L428.9,276.5 L468.6,276 L447.2,262.5 L491.2,239.8 L465.6,222.4 Z"
  },
  {
    "slug": "poblacion",
    "name": "Poblacion",
    "areaSqKm": 1,
    "labelX": 443.1,
    "labelY": 330.9,
    "path": "M476.7,334.2 L469.9,318.7 L445.5,322.6 L403.8,321.8 L385.9,353.8 L476.7,334.2 Z"
  },
  {
    "slug": "riverside",
    "name": "Riverside",
    "areaSqKm": 1,
    "labelX": 765.2,
    "labelY": 532.1,
    "path": "M798,535 L769.8,520.6 L722,510.3 L715.1,548.2 L788.4,543.4 L798,535 Z"
  },
  {
    "slug": "saa",
    "name": "Saa",
    "areaSqKm": 0.67,
    "labelX": 453.9,
    "labelY": 293.2,
    "path": "M466.4,302.9 L468.6,276 L428.9,276.5 L439.4,307.5 L466.4,302.9 Z"
  },
  {
    "slug": "san-isidro",
    "name": "San Isidro",
    "areaSqKm": 2,
    "labelX": 548.6,
    "labelY": 273.1,
    "path": "M587.8,237 L559.3,232.8 L502.9,269.6 L518.1,290.5 L513.2,303.9 L508.2,317.2 L559.5,303.8 L573.5,289.2 L576,249.7 L587.8,237 Z"
  },
  {
    "slug": "san-jose",
    "name": "San Jose",
    "areaSqKm": 4,
    "labelX": 885.5,
    "labelY": 620.9,
    "path": "M841.1,612 L839.6,627.5 L868.1,635.1 L938.5,676 L976,615.3 L932.2,582.7 L847.7,606.9 L841.1,612 Z"
  },
  {
    "slug": "santo-ni-o",
    "name": "Santo Niño",
    "areaSqKm": 0.51,
    "labelX": 482.1,
    "labelY": 194,
    "path": "M508.2,177.8 L483.5,175.3 L465,194.7 L459,220.4 L465.6,222.4 L485.5,189.5 L508.2,177.8 Z"
  },
  {
    "slug": "santo-rosario",
    "name": "Santo Rosario",
    "areaSqKm": 1,
    "labelX": 431.3,
    "labelY": 467.7,
    "path": "M445.7,451.1 L337.2,459.7 L347.6,474.7 L442.3,472 L479.1,486.5 L489.5,476.4 L463.3,469.8 L445.7,451.1 Z"
  },
  {
    "slug": "sua",
    "name": "Sua",
    "areaSqKm": 3,
    "labelX": 853.6,
    "labelY": 548.3,
    "path": "M932.2,582.7 L864.4,532 L827.9,500 L820.2,514.9 L803.5,529.5 L818.5,530.2 L835.4,555.5 L847.7,606.9 L932.2,582.7 Z"
  },
  {
    "slug": "tambook",
    "name": "Tambook",
    "areaSqKm": 0.61,
    "labelX": 499.8,
    "labelY": 349.4,
    "path": "M500.3,336.9 L482.3,339.2 L484.3,367 L503.6,368.6 L527.9,347.8 L500.3,336.9 Z"
  },
  {
    "slug": "tungod",
    "name": "Tungod",
    "areaSqKm": 0.81,
    "labelX": 425.7,
    "labelY": 297.7,
    "path": "M428.9,276.5 L413.9,276.9 L419.6,302.4 L403.8,321.8 L445.5,322.6 L439.4,307.5 L428.9,276.5 Z"
  },
  {
    "slug": "u-og",
    "name": "U-og",
    "areaSqKm": 1,
    "labelX": 424.5,
    "labelY": 488.2,
    "path": "M479.1,486.5 L442.3,472 L347.6,474.7 L351.3,489.7 L413,495.4 L459.4,512.6 L479.1,486.5 Z"
  },
  {
    "slug": "ubujan",
    "name": "Ubujan",
    "areaSqKm": 1,
    "labelX": 423.2,
    "labelY": 508.7,
    "path": "M459.4,512.6 L413,495.4 L351.3,489.7 L432.7,533.3 L459.4,512.6 Z"
  }
]
};
