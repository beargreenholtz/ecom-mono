import type { TSidebarLinks } from '@/types/dashboard-layout';

export const links: TSidebarLinks[] = [
	{ name: 'Users', to: '/dashboard/users' },
	{ name: 'Items', to: '/dashboard/items' },
	{ name: 'Orders', to: '/items' },
	{ name: 'Mail', to: '/items/mail' },
	{ name: 'Reports', to: '/items/reports' },
];
