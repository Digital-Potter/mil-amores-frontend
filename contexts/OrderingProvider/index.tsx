'use client';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

export interface MenuItemProps {
	name: string;
	option: string;
	price: number;
	quantity: number;
}

export interface OrderProps {
	items: MenuItemProps[];
	totalItems: number;
	setCurrentOrder: Dispatch<SetStateAction<MenuItemProps[]>>;
}

export const OrderingContext = createContext<OrderProps>({
	items: [],
	totalItems: 0,
	setCurrentOrder: () => {},
});

export const OrderingProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Always start empty so server and client initial render match (avoids hydration mismatch)
	const [currentOrder, setCurrentOrderInternal] = useState<MenuItemProps[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);

	// Restore from localStorage AFTER hydration
	useEffect(() => {
		const stored = localStorage.getItem('currentOrder');
		if (stored) {
			try {
				// eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration requires effect to avoid SSR mismatch
				setCurrentOrderInternal(JSON.parse(stored) as MenuItemProps[]);
			} catch {
				localStorage.removeItem('currentOrder');
			}
		}
		 
		setIsHydrated(true);
	}, []);

	// Wrapper that also persists to localStorage
	const setCurrentOrder: Dispatch<SetStateAction<MenuItemProps[]>> =
		useCallback((action) => {
			setCurrentOrderInternal((prev) => {
				const next = typeof action === 'function' ? action(prev) : action;
				if (next.length > 0) {
					localStorage.setItem('currentOrder', JSON.stringify(next));
				} else {
					localStorage.removeItem('currentOrder');
				}
				return next;
			});
		}, []);

	// Derive totalItems directly — no extra state needed
	const totalItems = useMemo(
		() => currentOrder.reduce((acc, item) => acc + item.quantity, 0),
		[currentOrder],
	);

	// Persist to localStorage after hydration when order changes externally
	useEffect(() => {
		if (!isHydrated) return;
		if (currentOrder.length > 0) {
			localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
		} else {
			localStorage.removeItem('currentOrder');
		}
	}, [currentOrder, isHydrated]);

	// Memoize context value to prevent unnecessary consumer re-renders
	const value = useMemo<OrderProps>(
		() => ({
			items: currentOrder,
			totalItems,
			setCurrentOrder,
		}),
		[currentOrder, totalItems, setCurrentOrder],
	);

	return (
		<OrderingContext.Provider value={value}>
			{children}
		</OrderingContext.Provider>
	);
};
