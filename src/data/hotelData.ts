export type RoomCategory = "Luks" | "Presidential" | "Basseynli Villa" | "Bilyardli VIP Suite";

export type Hotel = {
  id: string;
  title: Record<"en" | "ru" | "uz", string>;
  location: Record<"en" | "ru" | "uz", string>;
  description: Record<"en" | "ru" | "uz", string>;
  category: RoomCategory;
  price: number;
  rating: number;
  stars: number;
  guestCapacity: number;
  badge: string;
  image: string;
  gallery: string[];
  facilities: Array<"pool" | "spa" | "gym" | "dining" | "billiards" | "wifi">;
  amenities: string[];
};

export type MenuItem = {
  id: string;
  name: Record<"en" | "ru" | "uz", string>;
  description: Record<"en" | "ru" | "uz", string>;
  price: number;
  image: string;
};

export type AmenityItem = {
  id: string;
  title: Record<"en" | "ru" | "uz", string>;
  description: Record<"en" | "ru" | "uz", string>;
  highlight: Record<"en" | "ru" | "uz", string>;
};

export const hotelCatalog: Hotel[] = [
  {
    id: "presidential-suite",
    title: {
      en: "Presidential Suite",
      ru: "Президентский люкс",
      uz: "Prezident suiti",
    },
    category: "Presidential",
    location: {
      en: "Dubai Marina, UAE",
      ru: "Дубай Марина, ОАЭ",
      uz: "Dubay Marina, OAE",
    },
    description: {
      en: "A serene sky-suite with panoramic skyline views, a private terrace, and discreet concierge services for executives and VIP guests.",
      ru: "Спокойный люкс с панорамным видом на небоскребы, личной террасой и персональным консьержем для руководителей и VIP-гостей.",
      uz: "Panoramali dubay manzarasi, xususiy teras va ishlatuvchilar uchun maxfiy konsyerj xizmatlari bilan bezatilgan tinch suita.",
    },
    price: 820,
    rating: 4.9,
    stars: 5,
    guestCapacity: 4,
    badge: "Signature Stay",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: ["pool", "spa", "dining", "gym"],
    amenities: ["privateButler", "skyLounge", "sunsetDeck", "jacuzzi"],
  },
  {
    id: "deluxe-ocean-view",
    title: {
      en: "Deluxe Ocean View",
      ru: "Делюкс с видом на океан",
      uz: "Deluxe okean ko‘rinishi",
    },
    category: "Luks",
    location: {
      en: "Bali, Indonesia",
      ru: "Бали, Индонезия",
      uz: "Bali, Indoneziya",
    },
    description: {
      en: "A tranquil, airy suite floating above the ocean with sunrise terraces, curated wellness rituals, and warm hospitality.",
      ru: "Спокойный и светлый номер над океаном с террасой для рассвета, wellness-процедурами и душевным сервисом.",
      uz: "Okean ustidagi xotirjam, yorug‘ va shinam xona quyosh chiqishi terasasi, wellness marosimlari va iliq mehmondo‘stlik bilan.",
    },
    price: 560,
    rating: 4.8,
    stars: 5,
    guestCapacity: 3,
    badge: "Oceanfront",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb866b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: ["pool", "spa", "dining"],
    amenities: ["oceanView", "inRoomDining", "rainShower", "sunriseTea"],
  },
  {
    id: "family-villa",
    title: {
      en: "Family Villa",
      ru: "Семейная вилла",
      uz: "Oilaviy villa",
    },
    category: "Basseynli Villa",
    location: {
      en: "Amalfi Coast, Italy",
      ru: "Амальфи, Италия",
      uz: "Amalfi qirg‘og‘i, Italiya",
    },
    description: {
      en: "A spacious villa retreat with layered living zones, a private pool, and thoughtfully planned family amenities for multigenerational comfort.",
      ru: "Просторная вилла с отдельными зонами отдыха, частным бассейном и удобствами для семейного проживания.",
      uz: "Keng villa ko‘p avlodli oilalar uchun maxsus hovuz, yashash zonalari va qulayliklar bilan jihozlangan.",
    },
    price: 690,
    rating: 4.7,
    stars: 5,
    guestCapacity: 6,
    badge: "Family Favorite",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: ["pool", "billiards", "dining", "gym"],
    amenities: ["familySuite", "privatePool", "gardenDining", "kidsClub"],
  },
  {
    id: "spa-pool-suite",
    title: {
      en: "Spa & Pool Suite",
      ru: "Спа и бассейн",
      uz: "Spa & hovuz suiti",
    },
    category: "Bilyardli VIP Suite",
    location: {
      en: "Santorini, Greece",
      ru: "Санторини, Греция",
      uz: "Santorini, Gretsiya",
    },
    description: {
      en: "A warm-toned hideaway crafted for restorative escapes, complete with a soaking tub, rooftop pool access, and spa rituals.",
      ru: "Теплый и уютный номер для восстановления сил с ванной, доступом к крытому бассейну и спа-процедурами.",
      uz: "Sog‘lomlashtirish uchun mo‘ljallangan va chuqur vanna, tom hovuzi va spa marosimlari bilan jihozlangan xona.",
    },
    price: 470,
    rating: 4.6,
    stars: 4,
    guestCapacity: 2,
    badge: "Wellness Pick",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: ["pool", "spa", "gym"],
    amenities: ["spaAccess", "jacuzzi", "rooftopPool", "steamRoom"],
  },
];

export const amenityCollection: AmenityItem[] = [
  {
    id: "swimming",
    title: {
      en: "Swimming Pools",
      ru: "Бассейны",
      uz: "Hovuzlar",
    },
    description: {
      en: "Heated indoor pools, rooftop infinity pools, and poolside service for relaxed luxury.",
      ru: "Отдельные бассейны с подогревом, открытый бассейн на крыше и бар у воды.",
      uz: "Isitiladigan yopiq hovuzlar, tom usti chegarasiz hovuz va hovuz yonidagi servis.",
    },
    highlight: {
      en: "Indoor heated pool • Rooftop infinity • Poolside bar",
      ru: "Подогреваемый бассейн • Бассейн на крыше • Бар у бассейна",
      uz: "Isitiladigan yopiq hovuz • Tom usti infinits hovuzi • Hovuz yonidagi bar",
    },
  },
  {
    id: "billiards",
    title: {
      en: "Billiards & Lounge",
      ru: "Бильярд и лаунж",
      uz: "Bilyard va lounge",
    },
    description: {
      en: "A private lounge with premium tables, immersive gaming corners, and late-night entertainment.",
      ru: "VIP-бильярд, игровые зоны и музыка до поздней ночи для отдыха в кругу друзей.",
      uz: "VIP bilyard, o‘yin maydonchalari va kechki dam olish uchun shinam lounge.",
    },
    highlight: {
      en: "VIP tables • PS5 lounge • DJ nights",
      ru: "VIP-столы • PS5 лаунж • DJ-вечеринки",
      uz: "VIP stollar • PS5 lounge • DJ kechalari",
    },
  },
  {
    id: "spa",
    title: {
      en: "Spa & Wellness",
      ru: "Спа и wellness",
      uz: "Spa va wellness",
    },
    description: {
      en: "Restore your rhythm with saunas, hydrotherapy, massages, and soothing wellness rituals.",
      ru: "Спа-процедуры, баня, гидромассаж и расслабляющие ритуалы для восстановления сил.",
      uz: "Sauna, hidromassaj, massaj va dam olish rituallari bilan tanangizni asrab oling.",
    },
    highlight: {
      en: "Sauna • Jacuzzi • Massage therapy",
      ru: "Сауна • Джакузи • Массаж",
      uz: "Sauna • Jacuzzi • Massaj terapiyasi",
    },
  },
  {
    id: "dining",
    title: {
      en: "Dining & Bars",
      ru: "Рестораны и бары",
      uz: "Ovqatlanish va barlar",
    },
    description: {
      en: "Chef-led dining rooms and signature bars serving seasonal tasting menus and crafted cocktails.",
      ru: "Авторская кухня, сезонные меню и коктейли в атмосфере роскошного ужина.",
      uz: "Shashlik, mavsumiy menyu va mahsulotli kokteyllar bilan bezatilgan shinam restoranlar.",
    },
    highlight: {
      en: "Michelin-inspired dining • Sunset bar • Sommelier pairing",
      ru: "Гастрономия • Закатный бар • Подбор вин",
      uz: "Michelin uslubidagi ovqat • Quyosh botishi bar • Sommelier moslamasi",
    },
  },
];

export const foodCategories = [
  { id: "breakfast", label: { en: "Breakfast", ru: "Завтрак", uz: "Nonushta" } },
  { id: "gourmet", label: { en: "Gourmet Dinners", ru: "Гурманские ужины", uz: "Gourmet kechki ovqatlar" } },
  { id: "cocktails", label: { en: "Cocktails & Beverages", ru: "Коктейли и напитки", uz: "Kokteyllar va ichimliklar" } },
  { id: "snacks", label: { en: "Snacks & Desserts", ru: "Закуски и десерты", uz: "Fast food va shirinliklar" } },
  { id: "late-night", label: { en: "Late Night Bites", ru: "Ночные перекусы", uz: "Tungi ovqatlar" } },
];

export const menuItems: Record<string, MenuItem[]> = {
  breakfast: [
    {
      id: "caviar-toast",
      name: { en: "Caviar Toast", ru: "Тост с икрой", uz: "Kaviar tost" },
      description: { en: "Sourdough crisp with crème fraîche and caviar.", ru: "Тост с икрой и крем-фреш.", uz: "Kremsiz maydalangan tuxum bilan bajarilgan tost." },
      price: 22,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "royal-bowl",
      name: { en: "Royal Breakfast Bowl", ru: "Королевская тарелка", uz: "Royal nonushta kosasi" },
      description: { en: "Poached eggs, avocado, herbs, and saffron grains.", ru: "Яйца пашот, авокадо, зелень и шафран.", uz: "Poached tuxum, avokado, o‘simliklar va zafaron." },
      price: 28,
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  gourmet: [
    {
      id: "truffle-ravioli",
      name: { en: "Truffle Ravioli", ru: "Равиоли с трюфелем", uz: "Truffle ravioli" },
      description: { en: "Handmade pasta with black truffle sauce.", ru: "Домашняя паста с трюфельным соусом.", uz: "Qora truffle sousli qo‘l mehnati pasta." },
      price: 46,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "wagyu-steak",
      name: { en: "Wagyu Steak", ru: "Стейк вагью", uz: "Wagyu biftek" },
      description: { en: "Charcoal-seared wagyu with smoked butter and herbs.", ru: "Стейк вагью с травами и сливочным маслом.", uz: "Yong‘oq kuydirilgan wagyu va tutli sous bilan." },
      price: 58,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  cocktails: [
    {
      id: "golden-sunset",
      name: { en: "Golden Sunset", ru: "Золотой закат", uz: "Oltin quyosh botishi" },
      description: { en: "Citrus gin, saffron syrup, and lemon peel.", ru: "Цитрусовый джин, шафрановый сироп и лимонная цедра.", uz: "Sitron gin, zafaron siropi va limon qobig‘i." },
      price: 18,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "midnight-mint",
      name: { en: "Midnight Mint", ru: "Полуночная мята", uz: "Midnight mint" },
      description: { en: "Vodka, fresh mint, lime, and sparkling tonic.", ru: "Водка, мята, лайм и тонизирующий тоник.", uz: "Vodka, yalpiz, laym va gazli tonik." },
      price: 16,
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  snacks: [
    {
      id: "choco-berry",
      name: { en: "Choco Berry Tart", ru: "Шоколадно-ягодный тарт", uz: "Shokolad-liq meva tart" },
      description: { en: "Dark chocolate shell with berry compote.", ru: "Шоколадная корочка и ягодный соус.", uz: "Qora shokolad va mevali sous bilan tayyorlangan tart." },
      price: 14,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cheese-platter",
      name: { en: "Signature Cheese Plate", ru: "Сырная тарелка", uz: "Imzo pishloq taxtasi" },
      description: { en: "Aged cheeses, fig jam, and crisp crackers.", ru: "Выдержанные сыры, инжирное варенье и крекеры.", uz: "Qadimgi pishloq, anjir murabbo va krakerlar." },
      price: 19,
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  "late-night": [
    {
      id: "supreme-burger",
      name: { en: "Supreme Burger", ru: "Королевский бургер", uz: "Supreme burger" },
      description: { en: "Beef patty, caramelized onion, and aged cheddar.", ru: "Говяжья котлета, карамелизированный лук и выдержанный чеддер.", uz: "Mol go‘shti, karamellangan piyoz va qariyotgan cheddar." },
      price: 24,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "loaded-nachos",
      name: { en: "Loaded Nachos", ru: "Начос с начинкой", uz: "Loaded nachos" },
      description: { en: "Crisp tortilla chips with guacamole and queso.", ru: "Чипсы с гуакамоле и сырным соусом.", uz: "Quruq tortilya chiplari, guakamole va sous bilan." },
      price: 21,
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=1000&q=80",
    },
  ],
};
