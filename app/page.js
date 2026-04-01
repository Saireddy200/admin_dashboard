'use client';

import { useRole } from '@/context/RoleContext';
import { usePage } from '@/context/PageContext';
import Overview from '@/components/Overview';
import ProductsPage from '@/components/pages/ProductsPage';
import PricingDiscountsPage from '@/components/pages/PricingDiscountsPage';
import OrdersPage from '@/components/pages/OrdersPage';
import InventoryPage from '@/components/pages/InventoryPage';
import InvoicesPage from '@/components/pages/InvoicesPage';
import VendorsPage from '@/components/pages/VendorsPage';
import SupportPage from '@/components/pages/SupportPage';
import UsersRolesPage from '@/components/pages/UsersRolesPage';
import SettingsPage from '@/components/pages/SettingsPage';

export default function Home() {
  const { activeRole } = useRole();
  const { activePage } = usePage();

  const renderPage = () => {
    switch (activePage) {
      case 'Overview':
        return <Overview activeRole={activeRole} />;
      case 'Products':
        return <ProductsPage activeRole={activeRole} />;
      case 'Pricing & Discounts':
        return <PricingDiscountsPage activeRole={activeRole} />;
      case 'Orders':
        return <OrdersPage activeRole={activeRole} />;
      case 'Inventory':
        return <InventoryPage activeRole={activeRole} />;
      case 'Invoices':
        return <InvoicesPage activeRole={activeRole} />;
      case 'Vendors':
        return <VendorsPage activeRole={activeRole} />;
      case 'Support':
        return <SupportPage activeRole={activeRole} />;
      case 'Users & Roles':
        return <UsersRolesPage activeRole={activeRole} />;
      case 'Settings':
        return <SettingsPage activeRole={activeRole} />;
      default:
        return <Overview activeRole={activeRole} />;
    }
  };

  return renderPage();
}
