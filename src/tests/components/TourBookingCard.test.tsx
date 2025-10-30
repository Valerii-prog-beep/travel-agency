import { render, screen, fireEvent } from '@testing-library/react';
import { TourBookingCard } from '../../components/features/tour_detail/TourBookingCard';
import { useCartStore } from '../../stores/useCartStore';
import { toursData } from '../../data/toursData';

// Мок только для хранилища
jest.mock('../../stores/useCartStore');

const mockTour = toursData[0]; // Используем реальный тур из данных

// Моковые функции хранилища
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockUpdateCartItem = jest.fn();

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>;

describe('TourBookingCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCartStore.mockReturnValue({
      items: [],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      updateCartItem: mockUpdateCartItem,
      clearCart: jest.fn(),
    });
  });

  // 1. Тест базового рендеринга
  test('рендерит компонент корректно', () => {
    render(<TourBookingCard tour={mockTour} />);
    
    // Проверяем что все основные данные отображаются
    expect(screen.getByText(`$${mockTour.price}`)).toBeInTheDocument();
    expect(screen.getByText('per person')).toBeInTheDocument();
    expect(screen.getByText(`${mockTour.duration} days`)).toBeInTheDocument();
    expect(screen.getByText(mockTour.groupSize)).toBeInTheDocument();
    expect(screen.getByText(mockTour.difficulty)).toBeInTheDocument();
    
    // Проверяем наличие основных элементов интерфейса
    expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of travelers/i)).toBeInTheDocument();
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    expect(screen.getByText(/book now/i)).toBeInTheDocument();
  });

  // 2. Тест добавления в корзину с валидными данными
  test('добавляет тур в корзину при валидных данных', () => {
    render(<TourBookingCard tour={mockTour} />);
    
    // Выбираем дату из доступных дат тура
    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: mockTour.availableDates[0] } });
    
    // Нажимаем кнопку добавления
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Проверяем что функция добавления вызвана с правильными данными
    expect(mockAddToCart).toHaveBeenCalledWith({
      tourId: mockTour.id,
      title: mockTour.title,
      price: mockTour.price,
      date: mockTour.availableDates[0],
      travelers: 1,
      image: mockTour.image,
      destination: mockTour.destination
    });
  });

  // 3. Тест валидации - попытка добавить без даты
  test('показывает alert при попытке добавить без даты', () => {
    // Мокаем глобальный alert
    global.alert = jest.fn();
    
    render(<TourBookingCard tour={mockTour} />);
    
    // Нажимаем кнопку без выбора даты
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Проверяем что показан alert и функция не вызвана
    expect(global.alert).toHaveBeenCalledWith('Please select a date');
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  // 4. Тест изменения количества путешественников
  test('обновляет количество путешественников и пересчитывает цену', () => {
    render(<TourBookingCard tour={mockTour} />);
    
    // Меняем количество путешественников
    const select = screen.getByLabelText(/number of travelers/i);
    fireEvent.change(select, { target: { value: '3' } });
    
    // Проверяем что цена пересчиталась
    const totalPrice = mockTour.price * 3;
    expect(screen.getByText(`Add to Cart - $${totalPrice}`)).toBeInTheDocument();
    expect(screen.getByText(`Book Now - $${totalPrice}`)).toBeInTheDocument();
  });

  // 5. Тест отображения когда тур уже в корзине
  test('показывает кнопки обновления и удаления когда тур в корзине', () => {
    // Мокаем что тур уже в корзине
    mockUseCartStore.mockReturnValue({
      items: [{
        tourId: mockTour.id,
        title: mockTour.title,
        price: mockTour.price,
        date: mockTour.availableDates[0],
        travelers: 2,
        image: mockTour.image,
        destination: mockTour.destination
      }],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      updateCartItem: mockUpdateCartItem,
      clearCart: jest.fn(),
    });

    render(<TourBookingCard tour={mockTour} />);
    
    // Проверяем что отображаются правильные кнопки
    const totalPrice = mockTour.price * 2;
    expect(screen.getByText(`Update Cart - $${totalPrice}`)).toBeInTheDocument();
    expect(screen.getByText('Remove from Cart')).toBeInTheDocument();
    expect(screen.getByText(/book now - \$/i)).toBeInTheDocument();
    
    // Проверяем уведомление о наличии в корзине
    expect(screen.getByText('✓ This tour is in your cart')).toBeInTheDocument();
  });

  // 6. Тест обновления тура в корзине
  test('обновляет тур в корзине при изменении данных', () => {
    // Мокаем что тур уже в корзине
    mockUseCartStore.mockReturnValue({
      items: [{
        tourId: mockTour.id,
        title: mockTour.title,
        price: mockTour.price,
        date: mockTour.availableDates[0],
        travelers: 2,
        image: mockTour.image,
        destination: mockTour.destination
      }],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      updateCartItem: mockUpdateCartItem,
      clearCart: jest.fn(),
    });

    render(<TourBookingCard tour={mockTour} />);
    
    // Меняем дату
    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: mockTour.availableDates[1] } });
    
    // Меняем количество путешественников
    const select = screen.getByLabelText(/number of travelers/i);
    fireEvent.change(select, { target: { value: '4' } });
    
    // Нажимаем кнопку обновления
    const updateButton = screen.getByText(/update cart/i);
    fireEvent.click(updateButton);
    
    // Проверяем что функция обновления вызвана с правильными данными
    expect(mockUpdateCartItem).toHaveBeenCalledWith(mockTour.id, {
      date: mockTour.availableDates[1],
      travelers: 4
    });
  });

  // 7. Тест удаления тура из корзины
  test('удаляет тур из корзины', () => {
    // Мокаем что тур в корзине
    mockUseCartStore.mockReturnValue({
      items: [{
        tourId: mockTour.id,
        title: mockTour.title,
        price: mockTour.price,
        date: mockTour.availableDates[0],
        travelers: 2,
        image: mockTour.image,
        destination: mockTour.destination
      }],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      updateCartItem: mockUpdateCartItem,
      clearCart: jest.fn(),
    });

    render(<TourBookingCard tour={mockTour} />);
    
    // Нажимаем кнопку удаления
    const removeButton = screen.getByText('Remove from Cart');
    fireEvent.click(removeButton);
    
    // Проверяем что функция удаления вызвана с правильным ID
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockTour.id);
  });

  // 8. Тест кнопки Book Now
  test('обрабатывает клик по Book Now при валидных данных', () => {
    // Мокаем console.log для проверки вызова
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<TourBookingCard tour={mockTour} />);
    
    // Выбираем дату
    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: mockTour.availableDates[0] } });
    
    // Нажимаем Book Now
    const bookNowButton = screen.getByText(/book now/i);
    fireEvent.click(bookNowButton);
    
    // Проверяем что console.log вызван с правильными данными
    expect(consoleSpy).toHaveBeenCalledWith('Booking tour:', {
      tour: mockTour,
      selectedDate: mockTour.availableDates[0],
      travelersCount: 1
    });
    
    // Восстанавливаем оригинальный console.log
    consoleSpy.mockRestore();
  });

  // 9. Тест Book Now без даты
  test('показывает alert при попытке Book Now без даты', () => {
    global.alert = jest.fn();
    
    render(<TourBookingCard tour={mockTour} />);
    
    // Нажимаем Book Now без выбора даты
    const bookNowButton = screen.getByText(/book now/i);
    fireEvent.click(bookNowButton);
    
    expect(global.alert).toHaveBeenCalledWith('Please select a date');
  });

  // 10. Тест минимальной даты
  test('блокирует выбор прошедших дат', () => {
    render(<TourBookingCard tour={mockTour} />);
    
    const dateInput = screen.getByLabelText(/select date/i) as HTMLInputElement;
    
    // Проверяем что установлен атрибут min с сегодняшней датой
    const today = new Date().toISOString().split('T')[0];
    expect(dateInput.min).toBe(today);
  });
});