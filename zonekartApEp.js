import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Search,
    User,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    Plus,
    Minus,
    Loader2,
    CheckCircle,
    AlertTriangle,
    CreditCard,
    MapPin,
    LogIn,
    LogOut,
    Heart,
    Percent,
    Gift,
    ShieldCheck,
    Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetClose
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// Mock data for products, categories, and user
const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home & Kitchen' },
    { id: '4', name: 'Books' },
    { id: '5', name: 'Sports' },
];

const products = [
    {
        id: '1',
        name: 'Laptop',
        description: 'Powerful laptop for work and play.',
        price: 1200,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Electronics',
        rating: 4.5,
        stock: 10,
        discount: 10, // 10% discount
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Latest smartphone with amazing features.',
        price: 800,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Electronics',
        rating: 4.8,
        stock: 5,
        discount: 0,
    },
    {
        id: '3',
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt.',
        price: 25,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Clothing',
        rating: 4.2,
        stock: 20,
        discount: 15, // 15% discount
    },
    {
        id: '4',
        name: 'Jeans',
        description: 'Stylish jeans for all occasions.',
        price: 50,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Clothing',
        rating: 4.6,
        stock: 15,
        discount: 0,
    },
    {
        id: '5',
        name: 'Coffee Maker',
        description: 'Makes delicious coffee every morning.',
        price: 100,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Home & Kitchen',
        rating: 4.4,
        stock: 8,
        discount: 5, // 5% discount
    },
    {
        id: '6',
        name: 'Cookware Set',
        description: 'Complete cookware set for your kitchen.',
        price: 200,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Home & Kitchen',
        rating: 4.7,
        stock: 12,
        discount: 0,
    },
    {
        id: '7',
        name: 'The Great Novel',
        description: 'A classic novel for avid readers.',
        price: 15,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Books',
        rating: 4.9,
        stock: 30,
        discount: 20, // 20% discount
    },
    {
        id: '8',
        name: 'Mystery Thriller',
        description: 'A thrilling mystery novel.',
        price: 18,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Books',
        rating: 4.5,
        stock: 25,
        discount: 0,
    },
    {
        id: '9',
        name: 'Running Shoes',
        description: 'High-performance running shoes.',
        price: 90,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Sports',
        rating: 4.3,
        stock: 18,
        discount: 10, // 10% discount
    },
    {
        id: '10',
        name: 'Yoga Mat',
        description: 'Comfortable yoga mat for your practice.',
        price: 30,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Sports',
        rating: 4.0,
        stock: 22,
        discount: 0,
    },
];

const mockUser = {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
};

// Animation variants
const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const cartItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// Helper function to calculate discount
const calculateDiscount = (price: number, discount: number) => {
    if (discount > 0) {
        const discountAmount = (price * discount) / 100;
        return {
            discountedPrice: (price - discountAmount).toFixed(2),
            discountAmount: discountAmount.toFixed(2),
        };
    }
    return { discountedPrice: price.toFixed(2), discountAmount: '0' };
};

// Sub-Components

// Product Card Component
const ProductCard = ({ product, onAddToCart, onProductClick }: { product: typeof products[0], onAddToCart: (product: typeof products[0]) => void, onProductClick: (product: typeof products[0]) => void }) => {
    const { discountedPrice, discountAmount } = calculateDiscount(product.price, product.discount);

    return (
        <motion.div
            variants={productVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            onClick={() => onProductClick(product)} // Handle click on product card
            style={{ cursor: 'pointer' }}
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                {product.discount > 0 && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                        -{product.discount}%
                    </Badge>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="mt-2 flex items-center gap-2">
                    {product.discount > 0 ? (
                        <>
                            <p className="text-red-500 line-through">${product.price.toFixed(2)}</p>
                            <p className="text-green-600 font-bold">${discountedPrice}</p>
                        </>
                    ) : (
                        <p className="text-gray-900 font-bold">${discountedPrice}</p>
                    )}
                </div>
                <div className="mt-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' :
                                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
                </div>
                <Button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when adding to cart
                        onAddToCart(product);
                    }}
                    className="mt-4 w-full"
                >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </div>
        </motion.div>
    );
};

// Cart Item Component
const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveFromCart }: { item: { product: typeof products[0]; quantity: number; }; onIncreaseQuantity: (productId: string) => void; onDecreaseQuantity: (productId: string) => void; onRemoveFromCart: (productId: string) => void; }) => {
    const { discountedPrice } = calculateDiscount(item.product.price, item.product.discount);

    return (
        <motion.div
            variants={cartItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-none"
        >
            <div className="flex items-center gap-4">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                    <h3 className="text-md font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">
                        {item.product.discount > 0 ? (
                            <>
                                <span className="line-through text-red-500">${item.product.price.toFixed(2)}</span>
                                <span className="text-green-600 font-bold">
                                    ${(parseFloat(discountedPrice) * item.quantity).toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span>${(parseFloat(discountedPrice) * item.quantity).toFixed(2)}</span>
                        )}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDecreaseQuantity(item.product.id)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-gray-700 font-semibold">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onIncreaseQuantity(item.product.id)}
                        disabled={item.quantity >= item.product.stock}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFromCart(item.product.id)}
                    className="text-gray-500 hover:text-red-500"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
};

const CheckoutSummary = ({ cart, total, discount, shippingCost }: { cart: { product: typeof products[0]; quantity: number; }[], total: number, discount: number, shippingCost: number }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Checkout Summary</h2>
            <div className="space-y-2">
                {cart.map(item => {
                    const { discountedPrice } = calculateDiscount(item.product.price, item.product.discount);
                    return (
                        <div key={item.product.id} className="flex justify-between items-center">
                            <span className="text-gray-700">{item.product.name} x{item.quantity}</span>
                            <span className="font-semibold">
                                ${(parseFloat(discountedPrice) * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    );
                })}
                <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Discount</span>
                    <span className="text-green-600">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Shipping</span>
                    <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-xl font-bold text-red-600">${(total - discount + shippingCost).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

// Main App Component
const EzonekartApp = () => {
    const [cart, setCart] = useState<{ product: typeof products[0]; quantity: number; }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string; address: string; } | null>(mockUser); // Use mock user
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); // State for account menu
    const [viewedProduct, setViewedProduct] = useState<typeof products[0] | null>(null);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart');
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | null>(null);
    const [orderConfirmation, setOrderConfirmation] = useState<{ orderId: string; total: number; } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // --- Cart Functions ---
    const addToCart = (product: typeof products[0]) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                if (existingItem.quantity + 1 > product.stock) {
                    alert('Maximum quantity reached for this product.'); // Replace with a better UI notification
                    return prevCart;
                }
                return prevCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
        setIsCartOpen(true); // Open the cart sheet after adding
    };

    const increaseQuantity = (productId: string) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) } // Check against stock
                    : item
            )
        );
    };

    const decreaseQuantity = (productId: string) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        setIsCartOpen(false);
    };

    // --- Search & Filter Functions ---
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || product.category === selectedCategory)
    );

    // --- Utility Functions ---
    const calculateCartTotal = () => {
        return cart.reduce((total, item) => {
            const { discountedPrice } = calculateDiscount(item.product.price, item.product.discount);
            return total + (parseFloat(discountedPrice) * item.quantity);
        }, 0);
    };

    const calculateTotalDiscount = () => {
        return cart.reduce((total, item) => {
            const discountAmount = (item.product.discount / 100) * item.product.price * item.quantity;
            return total + discountAmount;
        }, 0);
    };

    // --- Event Handlers ---
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
        setIsMobileMenuOpen(false); // Close menu after selection
    };

    const handleProductClick = (product: typeof products[0]) => {
        setViewedProduct(product);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!"); // Replace with a better UI notification
            return;
        }
        setCheckoutStep('address');
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select an address."); // Replace with a better UI notification
            return;
        }
        if (!paymentMethod) {
            alert("Please select a payment method.");  // Replace with a better UI notification.
            return;
        }

        setLoading(true);
        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);

        // Generate a mock order confirmation
        const orderId = `ORDER-${Math.random().toString(36).substring(7).toUpperCase()}`;
        const total = calculateCartTotal() - calculateTotalDiscount() + 10; // Add shipping cost
        setOrderConfirmation({ orderId, total });

        // Clear the cart and go to confirmation step
        clearCart();
        setCheckoutStep('confirmation');
    };

    const handleLogout = () => {
        setUser(null); // Clear user data
        setIsAccountMenuOpen(false); // Close the account menu
    };

    // --- Effects ---
    // Update document title
    useEffect(() => {
        document.title = 'Ezonekart - Your Online Store';
    }, []);

    // Scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const shippingCost = cart.length > 0 ? 10 : 0;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold text-red-600">
                        Ezonekart
                    </a>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4 relative">
                        <Input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={cn(
                                "pr-10 transition-all duration-300",
                                isSearchFocused ? "w-full" : "w-64"
                            )}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        <Search className={cn(
                            "absolute right-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300",
                            isSearchFocused && "text-gray-600"
                        )} />
                    </div>

                    {/* Account and Cart */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu open={isAccountMenuOpen} onOpenChange={setIsAccountMenuOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative">
                                        <User className="h-6 w-6" />
                                        <span className="sr-only">Account</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Heart className="mr-2 h-4 w-4" />
                                        <span>Wishlist</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Truck className="mr-2 h-4 w-4" />
                                        <span>Orders</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" className="relative">
                                <User className="h-6 w-6" />
                                <span className="sr-only">Account</span>
                            </Button>
                        )}

                        <Button variant="ghost" className="relative" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCart className="h-6 w-6" />
                            <span className="sr-only">Cart</span>
                            {cart.length > 0 && (
                                <Badge variant="secondary" className="absolute -top-1 -right-1 rounded-full px-1 text-xs">
                                    {cart.length}
                                </Badge>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:w-64 bg-white">
                                <SheetHeader>
                                    <SheetTitle>Categories</SheetTitle>
                                    <SheetDescription>
                                        Select a category to view products.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-4 space-y-2">
                                    <Button
                                        variant={selectedCategory === null ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => handleCategorySelect(null)}
                                    >
                                        All Categories
                                    </Button>
                                    {categories.map(category => (
                                        <Button
                                            key={category.id}
                                            variant={selectedCategory === category.name ? "default" : "ghost"}
                                            className="w-full justify-start"
                                            onClick={() => handleCategorySelect(category.name)}
                                        >
                                            {category.name}
                                        </Button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Navigation (Categories) */}
            <nav className="bg-gray-800 text-white hidden md:block">
                <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-6 overflow-x-auto">
                    <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        className="text-white hover:bg-gray-700"
                        onClick={() => handleCategorySelect(null)}
                    >
                        All Categories
                    </Button>
                    {categories.map(category => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.name ? "default" : "ghost"}
                            className="text-white hover:bg-gray-700 whitespace-nowrap"
                            onClick={() => handleCategorySelect(category.name)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {checkoutStep === 'cart' && (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {searchTerm ? `Search Results for "${searchTerm}"` :
                                selectedCategory ? `Products in ${selectedCategory}` :
                                    'Featured Products'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAddToCart={addToCart}
                                            onProductClick={handleProductClick}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">No products found.</div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}

                {/* Product Details Modal */}
                <Dialog open={!!viewedProduct} onOpenChange={() => setViewedProduct(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        {viewedProduct && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>{viewedProduct.name}</DialogTitle>
                                    <DialogDescription>
                                        {viewedProduct.description}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-2 pb-4">
                                    <img src={viewedProduct.imageUrl} alt={viewedProduct.name} className="w-full h-64 object-cover rounded-md" />
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(viewedProduct.rating) ? 'text-yellow-400' :
                                                    i < viewedProduct.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>
                                        ))}
                                        <span className="text-xs text-gray-500 ml-1">({viewedProduct.rating.toFixed(1)})</span>
                                    </div>
                                    <p className="text-gray-700">{viewedProduct.description}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        {viewedProduct.discount > 0 ? (
                                            <>
                                                <p className="text-red-500 line-through">${viewedProduct.price.toFixed(2)}</p>
                                                <p className="text-green-600 font-bold">
                                                    ${calculateDiscount(viewedProduct.price, viewedProduct.discount).discountedPrice}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-gray-900 font-bold">${viewedProduct.price.toFixed(2)}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button onClick={() => addToCart(viewedProduct)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                        </Button>
                                        <Button variant="outline">
                                            <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Checkout Flow */}
                {checkoutStep !== 'cart' && (
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h2>
                            <div className="flex items-center justify-between text-sm">
                                <span className={cn(
                                    "px-4 py-2 rounded-full",
                                    checkoutStep === 'address' ? "bg-red-500 text-white font-semibold" : "bg-gray-200 text-gray-600"
                                )}>
                                    1. Address
                                </span>
                                <span className="w-1/3 h-1 bg-gray-200"></span>
                                <span className={cn(
                                    "px-4 py-2 rounded-full",
                                    checkoutStep === 'payment' ? "bg-red-500 text-white font-semibold" : "bg-gray-200 text-gray-600"
                                )}>
                                    2. Payment
                                </span>
                                <span className="w-1/3 h-1 bg-gray-200"></span>
                                <span className={cn(
                                    "px-4 py-2 rounded-full",
                                    checkoutStep === 'confirmation' ? "bg-red-500 text-white font-semibold" : "bg-gray-200 text-gray-600"
                                )}>
                                    3. Confirmation
                                </span>
                            </div>
                        </div>
                        {checkoutStep === 'address' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Delivery Address</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-4">
                                        <input
                                            type="radio"
                                            name="address"
                                            value={user?.address}
                                            checked={selectedAddress === user?.address}
                                            onChange={() => setSelectedAddress(user?.address || '')}
                                            className="h-5 w-5 text-red-600"
                                        />
                                        <span>{user?.address} (Default)</span>
                                    </label>
                                    {/* Add more address options or a form to add a new address */}
                                    <Button onClick={() => setCheckoutStep('payment')} className="mt-4">
                                        Continue to Payment
                                    </Button>
                                </div>
                            </div>
                        )}

                        {checkoutStep === 'payment' && (
                            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>
                                <label className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={paymentMethod === 'creditCard'}
                                        onChange={() => setPaymentMethod('creditCard')}
                                        className="h-5 w-5 text-red-600"
                                    />
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        <span>Credit Card</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                        className="h-5 w-5 text-red-600"
                                    />
                                    <span>PayPal</span>
                                </label>
                                <Button
                                    onClick={handlePlaceOrder}
                                    className="mt-4 w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </Button>
                                <Button variant="outline" onClick={() => setCheckoutStep('cart')}>
                                    Back to Cart
                                </Button>
                            </div>
                        )}

                        {checkoutStep === 'confirmation' && orderConfirmation && (
                            <div className="bg-white rounded-lg shadow-md p-6 text-center space-y-4">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                                <h3 className="text-2xl font-semibold text-gray-800">Order Confirmed!</h3>
                                <p className="text-gray-600">Thank you for your purchase.</p>
                                <p className="text-gray-700">Your order ID is: <span className="font-semibold">{orderConfirmation.orderId}</span></p>
                                <p className="text-gray-700">Total: <span className="font-bold text-red-600">${orderConfirmation.total.toFixed(2)}</span></p>
                                <Button onClick={() => setCheckoutStep('cart')}>
                                    Continue Shopping
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Cart Sheet */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="w-full sm:w-96 bg-white">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            Review your items and proceed to checkout
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-4 flex flex-col h-[calc(100vh-200px)] overflow-y-auto">
                        {cart.length > 0 ? (
                            <>
                                {cart.map(item => (
                                    <CartItem
                                        key={item.product.id}
                                        item={item}
                                        onIncreaseQuantity={increaseQuantity}
                                        onDecreaseQuantity={decreaseQuantity}
                                        onRemoveFromCart={removeFromCart}
                                    />
                                ))}
                                <div className="mt-auto">
                                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                        <span className="text-gray-700 font-medium">Total:</span>
                                        <span className="text-xl font-bold text-red-600">${calculateCartTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            className="w-full"
                                            onClick={handleCheckout} // Go to checkout
                                        >
                                            Checkout
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500 my-auto">
                                Your cart is empty.
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-4">About Ezonekart</h4>
                        <p className="text-gray-300">
                            Ezonekart is your one-stop online shop for a wide range of products.
                            We offer quality products at competitive prices with fast shipping and
                            excellent customer service.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
                            <li><a href="#" className="hover:text-red-500">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-red-500">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-red-500">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Company</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li><a href="#" className="hover:text-red-500">About Us</a></li>
                            <li><a href="#" className="hover:text-red-500">Careers</a></li>
                            <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-red-500">Facebook</a>
                            <a href="#" className="hover:text-red-500">Twitter</a>
                            <a href="#" className="hover:text-red-500">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Ezonekart. All rights reserved.
                </div>
            </footer>
            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 z-50"
                        title="Back to Top"
                    >
                        <ChevronUp className="h-6 w-6" />
                        <span className="sr-only">Back to Top</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EzonekartApp;
