
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { CartItem, MenuItem, MenuCategory } from './types';
import { MENU_DATA } from './constants/menuData';

const SUGAR_LEVELS = ["正常甜", "少糖", "半糖", "微糖", "無糖"];
const ICE_LEVELS = ["正常冰", "少冰", "微冰", "去冰"];

// --- Helper Components ---

const Header: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-20">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold text-red-700 tracking-wider">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  </header>
);

const MenuList: React.FC<{ categories: MenuCategory[]; onSelectItem: (item: MenuItem) => void; }> = ({ categories, onSelectItem }) => (
  <div className="p-4 md:px-6 md:pb-6 space-y-8">
    {categories.length > 0 ? (
      categories.map((category) => (
        <div key={category.name} id={category.name}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-red-600">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.items.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-lg shadow-lg p-3 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-300 text-left"
                aria-label={`Order ${item.name}`}
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.englishName}</p>
                </div>
                <div className="flex items-center justify-end space-x-2 text-xs font-semibold">
                    {item.price.M && item.price.M > 0 && <span className="bg-gray-200 text-gray-800 py-0.5 px-2 rounded-md">M: ${item.price.M}</span>}
                    <span className="bg-red-100 text-red-800 py-0.5 px-2 rounded-md">L: ${item.price.L}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">找不到符合的品項。</p>
      </div>
    )}
  </div>
);

const Cart: React.FC<{ items: CartItem[]; onUpdateQuantity: (itemId: string, newQuantity: number) => void; onClear: () => void; total: number; }> = ({ items, onUpdateQuantity, onClear, total }) => {
    const groupedItems = useMemo(() => {
        return items.reduce((acc, item) => {
            const { menuItemId, name } = item;
            if (!acc[menuItemId]) {
                acc[menuItemId] = {
                    name: name,
                    items: [],
                    totalQuantity: 0,
                };
            }
            acc[menuItemId].items.push(item);
            acc[menuItemId].totalQuantity += item.quantity;
            return acc;
        }, {} as Record<number, { name: string; items: CartItem[]; totalQuantity: number }>);
    }, [items]);

    return (
        <aside className="w-full lg:w-1/5 bg-white shadow-xl flex flex-col">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">您的訂單</h2>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-gray-500 text-center mt-8">您的購物車是空的。 <br /> 請從菜單中新增商品。</p>
                ) : (
                    <ul className="space-y-4">
                        {Object.values(groupedItems).map(group => (
                            <li key={group.name} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-gray-800">{group.name}</p>
                                    <span className="text-sm font-bold bg-red-100 text-red-800 py-0.5 px-2 rounded-md" aria-label={`Total quantity for ${group.name}`}>{group.totalQuantity}</span>
                                </div>
                                <ul className="space-y-3 pt-2 pl-2 border-l-2 border-gray-200">
                                    {group.items.map(item => (
                                        <li key={item.id} className="flex items-start justify-between">
                                            <div className="flex-grow">
                                                <p className="text-sm text-gray-700">{item.size}, {item.sugarLevel}, {item.iceLevel}</p>
                                                <p className="text-xs text-gray-500 mt-1">${item.unitPrice.toFixed(2)} &times; {item.quantity} = ${(item.unitPrice * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-300 flex items-center justify-center" aria-label={`Decrease quantity of ${item.name} (${item.size}, ${item.sugarLevel})`}>-</button>
                                                <span className="w-6 text-center font-medium text-sm" aria-label={`Current quantity ${item.quantity}`}>{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-red-600 rounded-full font-bold text-white hover:bg-red-700 flex items-center justify-center" aria-label={`Increase quantity of ${item.name} (${item.size}, ${item.sugarLevel})`}>+</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {items.length > 0 && (
                <div className="p-6 bg-gray-50 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-800">總計</span>
                        <span className="text-2xl font-bold text-red-700">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={onClear} className="w-1/2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold">
                            清空訂單
                        </button>
                        <button className="w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                            結帳
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
};

const ItemCustomizationModal: React.FC<{ item: MenuItem | null; onClose: () => void; onAddToCart: (item: MenuItem, size: 'M' | 'L', sugar: string, ice: string, quantity: number) => void; }> = ({ item, onClose, onAddToCart }) => {
    const [size, setSize] = useState<'M' | 'L'>('L');
    const [sugar, setSugar] = useState<string>('正常甜');
    const [ice, setIce] = useState<string>('正常冰');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (item) {
            // Default to L, but if L is not available or M is, default to M.
            const defaultSize = (item.price.L > 0) ? 'L' : 'M';
            setSize(defaultSize);
            setSugar('正常甜');
            setIce('正常冰');
            setQuantity(1);
        }
    }, [item]);

    if (!item) return null;

    const handleAddToCartClick = () => {
        onAddToCart(item, size, sugar, ice, quantity);
        onClose();
    };

    const currentPrice = size === 'M' ? item.price.M : item.price.L;
    const totalPrice = (currentPrice ?? 0) * quantity;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-800">{item.name}</h2>
                        <p className="text-sm text-gray-500">{item.englishName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl" aria-label="關閉對話框">&times;</button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">尺寸</h3>
                        <div className="flex space-x-2">
                            {item.price.M && item.price.M > 0 && (
                                <button onClick={() => setSize('M')} className={`w-full py-2 rounded-md border-2 transition-colors ${size === 'M' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`} aria-pressed={size === 'M'}>
                                    M (${item.price.M})
                                </button>
                            )}
                            <button onClick={() => setSize('L')} className={`w-full py-2 rounded-md border-2 transition-colors ${size === 'L' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`} aria-pressed={size === 'L'}>
                                L (${item.price.L})
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">甜度</h3>
                        <div className="flex flex-wrap gap-2">
                            {SUGAR_LEVELS.map(level => (
                                <button 
                                    key={level} 
                                    onClick={() => setSugar(level)} 
                                    className={`flex-grow px-3 py-2 rounded-md border text-sm transition-all duration-200 ${
                                        sugar === level 
                                        ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                                    }`}
                                    aria-pressed={sugar === level}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">冰塊</h3>
                        <div className="flex flex-wrap gap-2">
                            {ICE_LEVELS.map(level => (
                                <button 
                                    key={level} 
                                    onClick={() => setIce(level)} 
                                    className={`flex-grow px-3 py-2 rounded-md border text-sm transition-all duration-200 ${
                                        ice === level 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                                    }`}
                                    aria-pressed={ice === level}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <h3 className="text-md font-semibold text-gray-700">數量</h3>
                         <div className="flex items-center space-x-4">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 bg-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-300" aria-label="減少數量">-</button>
                            <span className="text-lg font-medium" aria-label={`Current quantity ${quantity}`}>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 bg-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-300" aria-label="增加數量">+</button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button onClick={handleAddToCartClick} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg">
                        加入購物車 - ${totalPrice.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenuData = useMemo(() => {
    if (!searchQuery.trim()) {
        return MENU_DATA;
    }

    const lowercasedQuery = searchQuery.toLowerCase();

    return MENU_DATA
        .map(category => {
            const filteredItems = category.items.filter(item =>
                item.name.toLowerCase().includes(lowercasedQuery) ||
                item.englishName.toLowerCase().includes(lowercasedQuery)
            );
            return { ...category, items: filteredItems };
        })
        .filter(category => category.items.length > 0);
  }, [searchQuery]);


  const handleAddToCart = useCallback((item: MenuItem, size: 'M' | 'L', sugarLevel: string, iceLevel: string, quantity: number) => {
    const price = size === 'M' ? item.price.M : item.price.L;
    if (price === undefined || price < 0) return;

    const cartItemId = `${item.id}-${size}-${sugarLevel}-${iceLevel}`;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === cartItemId);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            menuItemId: item.id,
            name: item.name,
            size: size,
            sugarLevel: sugarLevel,
            iceLevel: iceLevel,
            quantity: quantity,
            unitPrice: price,
          },
        ];
      }
    });
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(i => i.id !== itemId);
      }
      return prevItems.map(i =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );
    });
  }, []);
  
  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  const handleSelectItem = (item: MenuItem) => {
      setSelectedItem(item);
  };

  const handleCloseModal = () => {
      setSelectedItem(null);
  }

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header title="MACU" subtitle="果粒茶創始品牌" />
      <main className="flex flex-col lg:flex-row lg:h-[calc(100vh-80px)]">
        <div className="w-full lg:w-1/2 overflow-y-auto">
            <div className="p-4 md:p-6 sticky top-0 bg-gray-100 z-10 border-b border-gray-200">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="搜尋品項..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Search for menu items"
                    />
                </div>
            </div>
            <MenuList categories={filteredMenuData} onSelectItem={handleSelectItem} />
        </div>
        <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onClear={handleClearCart} total={total} />
      </main>
      <ItemCustomizationModal item={selectedItem} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
    </div>
  );
}
