// tests/components/TestCart.tsx
'use client';

import { useState } from 'react';
import { TourBookingCard } from '../../components/features/tour_detail/TourBookingCard';
import { useCartStore } from '../../stores/useCartStore';
import { toursData } from '../../data/toursData'; // Импортируем реальные данные

export const TestCart: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const [selectedTour, setSelectedTour] = useState(toursData[0]);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.travelers), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и управление */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🧪 Тестирование корзины</h1>
            <p className="text-gray-600 mt-2">Проверьте функциональность добавления туров в корзину</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Кнопки для выбора разных туров */}
            {toursData.slice(0, 4).map((tour) => (
              <button 
                key={tour.id}
                onClick={() => setSelectedTour(tour)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  selectedTour.id === tour.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {tour.title.split(' ')[0]}
              </button>
            ))}
            <button 
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🗑️ Очистить корзину
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - компонент бронирования */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Текущий тур: {selectedTour.title}</h2>
              <p className="text-gray-600 mb-4">Цена: ${selectedTour.price} | Сложность: {selectedTour.difficulty}</p>
              <TourBookingCard tour={selectedTour} />
            </div>
            
            {/* Инструкции по тестированию */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Инструкция по тестированию</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li><strong>Выберите дату</strong> в календаре</li>
                <li><strong>Выберите количество</strong> путешественников</li>
                <li><strong>Нажмите "Add to Cart"</strong> для добавления</li>
                <li><strong>Проверьте обновление</strong> состояния в правой панели</li>
                <li><strong>Измените данные</strong> и нажмите "Update Cart"</li>
                <li><strong>Проверьте удаление</strong> через "Remove from Cart"</li>
                <li><strong>Попробуйте Book Now</strong> для проверки бронирования</li>
              </ol>
            </div>
          </div>

          {/* Правая колонка - отладочная информация */}
          <div className="space-y-6">
            {/* Статистика корзины */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">📊 Статистика корзины</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-blue-600 font-medium">Элементов в корзине</div>
                  <div className="text-2xl font-bold text-blue-700">{items.length}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-600 font-medium">Общая стоимость</div>
                  <div className="text-2xl font-bold text-green-700">${totalPrice}</div>
                </div>
              </div>
            </div>

            {/* Детали корзины */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">🛒 Содержимое корзины</h3>
              {items.length === 0 ? (
                <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  🎒 Корзина пуста
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                          ${item.price} × {item.travelers}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>📅 Дата: {item.date}</div>
                        <div>📍 Направление: {item.destination}</div>
                        <div>💰 Итого: <strong>${item.price * item.travelers}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Raw данные корзины */}
            <div className="bg-gray-100 rounded-2xl border border-gray-300 p-6">
              <h3 className="text-lg font-semibold mb-4">🐛 Raw данные корзины (для отладки)</h3>
              <pre className="text-xs bg-white p-4 rounded-lg overflow-auto max-h-80">
                {JSON.stringify(items, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};