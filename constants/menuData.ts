
import type { MenuCategory } from '../types';

export const MENU_DATA: MenuCategory[] = [
  {
    name: "飲中甜品 / DRINKING DESSERT",
    items: [
      { id: 1, name: "酷聖石甘露", englishName: "Mango & Avocado Smoothie", price: { L: 85 } },
      { id: 2, name: "楊枝甘露2.0", englishName: "Mango Grapefruit w/ Tea Jelly & Agar", price: { L: 85 } },
      { id: 3, name: "芝芝芒果果粒", englishName: "Mango w/ Mango Cheese Smoothie", price: { L: 90 } },
      { id: 4, name: "芒果果粒波波", englishName: "Mango Smoothie w/ Tea Jelly & Agar", price: { L: 85 } },
      { id: 5, name: "芝芝草莓果粒", englishName: "Strawberry Cheese Smoothie", price: { L: 90 } },
      { id: 6, name: "草莓果粒波波", englishName: "Strawberry Smoothie w/ Tea Jelly & Agar", price: { L: 90 } },
      { id: 7, name: "芝芝葡萄果粒", englishName: "Grape Cheese Smoothie", price: { L: 85 } },
      { id: 8, name: "葡萄果粒波波", englishName: "Grape Smoothie w/ Tea Jelly & Agar", price: { L: 85 } },
      { id: 9, name: "芋圓芋泥鮮奶", englishName: "Taro Ball & Taro Paste w/ Fresh Milk", price: { L: 85 } },
      { id: 10, name: "蕃茄梅蜜", englishName: "Tomato Honey Plum Smoothie", price: { M: 70, L: 100 } },
      { id: 11, name: "蕃茄梅蜜波波", englishName: "Tomato Honey Plum Smoothie w/ Tea Jelly & Agar", price: { M: 80, L: 110 } },
    ],
  },
  {
    name: "果粒茶系列 / FRESH FRUIT BEVERAGES",
    items: [
      { id: 12, name: "香橙果粒茶", englishName: "Orange & Passion Fruit Green Tea", price: { M: 75, L: 105 } },
      { id: 13, name: "柳橙果粒茶", englishName: "Orange Green Tea", price: { M: 70, L: 100 } },
      { id: 14, name: "葡萄柚果粒茶", englishName: "Grapefruit Green Tea", price: { M: 65, L: 95 } },
      { id: 15, name: "葡萄柚果粒蜜茶", englishName: "Grapefruit Honey Tea", price: { M: 65, L: 95 } },
      { id: 16, name: "柳橙芒果果粒茶", englishName: "Orange & Mango Green Tea", price: { L: 75 } },
    ],
  },
  {
    name: "濃醇系列 / MILK TEA COLLECTION",
    items: [
      { id: 17, name: "翡翠奶茶", englishName: "Jasmine Green Milk Tea", price: { M: 60, L: 85 } },
      { id: 18, name: "錫蘭奶茶", englishName: "Ceylon Milk Tea", price: { M: 50, L: 75 } },
      { id: 19, name: "觀音奶茶", englishName: "Tie Guan Yin Milk Tea", price: { M: 50, L: 75 } },
      { id: 20, name: "波霸奶茶", englishName: "Bubble Milk Tea", price: { M: 50, L: 75 } },
      { id: 21, name: "仙草凍奶茶", englishName: "Grass Jelly Milk Tea", price: { M: 50, L: 75 } },
      { id: 22, name: "玫瑰奶茶", englishName: "Rose Milk Tea", price: { M: 60, L: 85 } },
      { id: 23, name: "阿華田", englishName: "Ovaltine", price: { M: 60, L: 85 } },
    ],
  },
  {
    name: "原味茶 / ORIGINAL TEA",
    items: [
      { id: 24, name: "高山金萱茶", englishName: "Alpine JinXuan Tea", price: { M: 30, L: 45 } },
      { id: 25, name: "翡翠綠茶", englishName: "Jasmine Green Tea", price: { M: 30, L: 45 } },
      { id: 26, name: "錫蘭紅茶", englishName: "Ceylon Black Tea", price: { M: 30, L: 45 } },
      { id: 27, name: "文山青茶", englishName: "Wenshan Oolong Tea", price: { M: 30, L: 45 } },
      { id: 28, name: "古早味紅茶", englishName: "Old Fashioned Black Tea", price: { M: 30, L: 45 } },
      { id: 29, name: "蜜桃紅茶", englishName: "Peach Black Tea", price: { M: 40, L: 55 } },
      { id: 30, name: "金萱雙Q", englishName: "JinXuan Tea w/ Bubble & Coconut Jelly", price: { M: 40, L: 55 } },
    ],
  },
  {
    name: "經典特調 / CLASSIC SIGNATURE",
    items: [
      { id: 31, name: "梅子冰茶", englishName: "Plum Iced Tea", price: { M: 35, L: 50 } },
      { id: 32, name: "梅子綠茶", englishName: "Plum Green Tea", price: { M: 45, L: -1 } }, // Assuming M is the only size based on layout
      { id: 33, name: "多多綠茶", englishName: "Yakult Green Tea", price: { M: 50, L: 80 } },
    ],
  },
  {
    name: "鮮果茶飲 / FRESH JUICE BEVERAGES",
    items: [
      { id: 34, name: "百香雙Q果", englishName: "Passion Fruit w/ Bubble & Coconut Jelly", price: { M: 60, L: 80 } },
      { id: 35, name: "百香綠茶", englishName: "Passion Fruit Green Tea", price: { M: 55, L: 75 } },
      { id: 36, name: "百香多多", englishName: "Passion Fruit Yakult", price: { L: 60 } },
      { id: 37, name: "翡翠柳橙", englishName: "Orange Jasmine Green Tea", price: { M: 60, L: 90 } },
      { id: 38, name: "冰萃檸檬", englishName: "Lemonade", price: { L: 50 } },
      { id: 39, name: "蜂蜜檸檬", englishName: "Honey Lemonade", price: { L: 60 } },
      { id: 40, name: "柚香翡翠", englishName: "Grapefruit Jasmine Green Tea", price: { M: 55, L: 85 } },
    ],
  },
  {
    name: "寶石系列 (無咖啡因) / GEM SERIES (NON-CAFFEINATED)",
    items: [
      { id: 41, name: "翡翠綠寶石", englishName: "Emerald Buckwheat Tea", price: { M: 40, L: 55 } },
    ],
  },
  {
    name: "鮮奶系列 / FRESH MILK TEA",
    items: [
      { id: 42, name: "紅茶拿鐵", englishName: "Black Tea Latte", price: { M: 65, L: 95 } },
      { id: 43, name: "翡翠觀音拿鐵", englishName: "Jasmine Tie Guan Yin Latte", price: { M: 65, L: 95 } },
      { id: 44, name: "波霸紅茶拿鐵", englishName: "Bubble Black Tea Latte", price: { M: 65, L: 95 } },
      { id: 45, name: "仙草凍紅茶拿鐵", englishName: "Grass Jelly Black Tea Latte", price: { M: 65, L: 95 } },
      { id: 46, name: "阿華田拿鐵", englishName: "Ovaltine Latte", price: { M: 65, L: 95 } },
      { id: 47, name: "玫瑰紅茶拿鐵", englishName: "Rose Black Tea Latte", price: { M: 70, L: 100 } },
    ],
  },
  {
    name: "芝芝系列 / CHEESE TEA COLLECTION",
    items: [
      { id: 48, name: "芝芝金萱/錫蘭紅茶", englishName: "JinXuan/Ceylon Black Cheese Tea", price: { L: 50 } },
      { id: 49, name: "芝芝金萱雙Q", englishName: "JinXuan Cheese Tea w/ Bubble & Coconut Jelly", price: { L: 60 } },
      { id: 50, name: "芝芝蜜桃紅茶", englishName: "Peach Black Cheese Tea", price: { L: 60 } },
      { id: 51, name: "芝芝翡翠綠茶", englishName: "Jasmine Green Cheese Tea", price: { L: 50 } },
      { id: 52, name: "芝芝錫蘭奶茶", englishName: "Ceylon Milk Cheese Tea", price: { L: 65 } },
      { id: 53, name: "芝芝阿華田", englishName: "Cheese Ovaltine", price: { L: 80 } },
    ],
  },
];
