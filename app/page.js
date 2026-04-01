'use client';

import { useContext, useMemo, useState } from 'react';
import { RoleContext } from '@/context/RoleContext';

const allProducts = [
  // Super Admin products
  {
    id: 1,
    name: 'Sony ZV-E10',
    category: 'Cameras & Lighting',
    subcategory: 'DSLR / Mirrorless',
    price: '₹52,499',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 8,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 2,
    name: 'Rode NT-USB Mini',
    category: 'Microphones & Audio',
    subcategory: 'USB Microphones',
    price: '₹9,999',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 14,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 3,
    name: 'Elgato Key Light',
    category: 'Cameras & Lighting',
    subcategory: 'LED Panels',
    price: '₹17,999',
    discountMode: 'Elite only',
    maxDisc: '2%',
    stock: 3,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 4,
    name: 'Joby GorillaPod 3K',
    category: 'Tripods & Mounts',
    subcategory: 'Gorillapods',
    price: '₹5,499',
    discountMode: 'No discount',
    maxDisc: '–',
    stock: 22,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 5,
    name: 'Elgato Stream Deck',
    category: 'Streaming Gear',
    subcategory: 'Stream Decks',
    price: 'Not set',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 0,
    status: 'Frozen',
    roles: ['Super Admin'],
  },
  {
    id: 6,
    name: 'Rode Wireless GO II',
    category: 'Microphones & Audio',
    subcategory: 'Wireless Mics',
    price: 'Not set',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 5,
    status: 'Frozen',
    roles: ['Super Admin'],
  },
  {
    id: 7,
    name: 'Samsung T7 SSD 1TB',
    category: 'Accessories',
    subcategory: 'Storage (SD / SSD)',
    price: '₹7,999',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 30,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 8,
    name: 'Elgato Cam Link 4K',
    category: 'Streaming Gear',
    subcategory: 'Capture Cards',
    price: '₹12,499',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 6,
    status: 'Live',
    roles: ['Super Admin'],
  },
  {
    id: 9,
    name: 'Shure SM7B',
    category: 'Microphones & Audio',
    subcategory: 'XLR Microphones',
    price: 'Not set',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 0,
    status: 'Pending review',
    roles: ['Super Admin'],
  },
  {
    id: 10,
    name: 'Logitech C920 HD Pro',
    category: 'Cameras & Lighting',
    subcategory: 'Webcams',
    price: 'Not set',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 0,
    status: 'Pending review',
    roles: ['Super Admin'],
  },
  // Retailer products
  {
    id: 11,
    name: 'Canon EOS 2000D',
    category: 'Cameras & Lighting',
    subcategory: 'DSLR / Mirrorless',
    price: '₹35,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 5,
    status: 'Live',
    roles: ['Retailer'],
  },
  {
    id: 12,
    name: 'Audio-Technica AT2020',
    category: 'Microphones & Audio',
    subcategory: 'XLR Microphones',
    price: '₹8,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 12,
    status: 'Live',
    roles: ['Retailer'],
  },
  // Vendor Manager products
  {
    id: 13,
    name: 'Godox SL-60W',
    category: 'Cameras & Lighting',
    subcategory: 'LED Panels',
    price: '₹15,999',
    discountMode: 'No discount',
    maxDisc: '–',
    stock: 8,
    status: 'Live',
    roles: ['Vendor Manager'],
  },
  {
    id: 14,
    name: 'Zoom H6',
    category: 'Microphones & Audio',
    subcategory: 'Audio Recorders',
    price: '₹28,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 3,
    status: 'Live',
    roles: ['Vendor Manager'],
  },
  // Product Ops products
  {
    id: 15,
    name: 'Manfrotto 504HD',
    category: 'Tripods & Mounts',
    subcategory: 'Tripods',
    price: '₹18,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 7,
    status: 'Live',
    roles: ['Product Ops'],
  },
  {
    id: 16,
    name: 'Western Digital 2TB',
    category: 'Accessories',
    subcategory: 'Storage (SD / SSD)',
    price: '₹9,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 15,
    status: 'Live',
    roles: ['Product Ops'],
  },
  // Support products
  {
    id: 17,
    name: 'Blue Yeti USB',
    category: 'Microphones & Audio',
    subcategory: 'USB Microphones',
    price: '₹12,999',
    discountMode: 'Limited discount',
    maxDisc: '2%',
    stock: 4,
    status: 'Live',
    roles: ['Support'],
  },
  {
    id: 18,
    name: 'Ring Light 18"',
    category: 'Cameras & Lighting',
    subcategory: 'Ring Lights',
    price: '₹4,999',
    discountMode: 'No discount',
    maxDisc: '–',
    stock: 20,
    status: 'Live',
    roles: ['Support'],
  },
];

const statusColors = {
  'Live': 'bg-emerald-100 text-emerald-700',
  'Frozen': 'bg-amber-100 text-amber-700',
  'Pending review': 'bg-sky-100 text-sky-700',
};

const tabs = [
  { id: 'catalog', label: 'Catalog' },
  { id: 'pending', label: 'Pending review' },
  { id: 'frozen', label: 'Frozen' },
];

export default function Home() {
  const { activeRole } = useContext(RoleContext);
  const [activeTab, setActiveTab] = useState('catalog');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    discountMode: 'Full discount',
    maxDisc: '4%',
    stock: 0,
  });

  const products = useMemo(() => {
    return allProducts.filter(product => product.roles.includes(activeRole));
  }, [activeRole]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;

      const tabMatch =
        activeTab === 'catalog'
          ? product.status === 'Live' || product.status === 'Frozen' || product.status === 'Pending review'
          : activeTab === 'pending'
          ? product.status === 'Pending review'
          : activeTab === 'frozen'
          ? product.status === 'Frozen'
          : true;

      return matchesSearch && matchesCategory && matchesStatus && tabMatch;
    });
  }, [activeTab, search, categoryFilter, statusFilter, products]);

  const categoryMap = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + (p.status === 'Live' ? 1 : 0);
    });
    return map;
  }, [products]);

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.category) return;

    const product = {
      id: Date.now(),
      ...newProduct,
      status: 'Pending review',
      roles: [activeRole],
    };

    // In a real app, this would be an API call
    console.log('Creating product:', product);
    setShowCreateForm(false);
    setNewProduct({
      name: '',
      category: '',
      subcategory: '',
      price: '',
      discountMode: 'Full discount',
      maxDisc: '4%',
      stock: 0,
    });
  };

  const getRoleAccessLevel = () => {
    switch (activeRole) {
      case 'Super Admin':
        return 'Full access';
      case 'Product Ops':
        return 'Full access';
      case 'Vendor Manager':
        return 'Limited access';
      case 'Retailer':
        return 'Limited access';
      case 'Support':
        return 'Limited access';
      default:
        return 'No access';
    }
  };

  const canCreateProducts = ['Super Admin', 'Product Ops'].includes(activeRole);
  const canEditProducts = ['Super Admin', 'Product Ops', 'Vendor Manager'].includes(activeRole);
  const canDeleteProducts = ['Super Admin'].includes(activeRole);
  const canApproveProducts = ['Super Admin', 'Product Ops'].includes(activeRole);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      discountMode: product.discountMode,
      maxDisc: product.maxDisc,
      stock: product.stock,
    });
    setShowEditForm(true);
  };

  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.category) return;

    const updatedProduct = {
      ...editingProduct,
      ...newProduct,
    };

    // In a real app, this would be an API call
    console.log('Updating product:', updatedProduct);
    setShowEditForm(false);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: '',
      subcategory: '',
      price: '',
      discountMode: 'Full discount',
      maxDisc: '4%',
      stock: 0,
    });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would be an API call
      console.log('Deleting product:', productId);
    }
  };

  const handleApproveProduct = (productId) => {
    // In a real app, this would be an API call
    console.log('Approving product:', productId);
  };

  const handleRejectProduct = (productId) => {
    // In a real app, this would be an API call
    console.log('Rejecting product:', productId);
  };

  const handleBulkAction = (action) => {
    if (selectedProducts.length === 0) return;

    console.log(`${action} products:`, selectedProducts);
    setSelectedProducts([]);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filtered.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filtered.map(p => p.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Full catalog mgmt; approve new product requests; approve repricing</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">{getRoleAccessLevel()}</span>
          {canCreateProducts && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Create Product
            </button>
          )}
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Product</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Cameras & Lighting">Cameras & Lighting</option>
                    <option value="Microphones & Audio">Microphones & Audio</option>
                    <option value="Streaming Gear">Streaming Gear</option>
                    <option value="Tripods & Mounts">Tripods & Mounts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                  <input
                    type="text"
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter subcategory"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="₹0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Product</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Cameras & Lighting">Cameras & Lighting</option>
                    <option value="Microphones & Audio">Microphones & Audio</option>
                    <option value="Streaming Gear">Streaming Gear</option>
                    <option value="Tripods & Mounts">Tripods & Mounts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                  <input
                    type="text"
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter subcategory"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="₹0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      category: '',
                      subcategory: '',
                      price: '',
                      discountMode: 'Full discount',
                      maxDisc: '4%',
                      stock: 0,
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
          {activeRole === 'Super Admin' ? '2 retailer submissions waiting for your review — set price, discount mode, then approve.' :
           activeRole === 'Product Ops' ? '1 pending product approval waiting for your review.' :
           'View products available for your role.'}
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          {activeRole === 'Super Admin' ? '2 listings frozen — cost price updated by retailer. Reprice and unfreeze.' :
           activeRole === 'Vendor Manager' ? '1 listing frozen — update pricing to unfreeze.' :
           'Frozen products require admin attention.'}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4">
          {tabs.map((tab) => {
            const count =
              tab.id === 'catalog'
                ? products.filter((p) => p.status !== 'Pending review').length
                : tab.id === 'pending'
                ? products.filter((p) => p.status === 'Pending review').length
                : products.filter((p) => p.status === 'Frozen').length;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  active ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label} <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-3 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {['All', ...new Set(products.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {['All', 'Live', 'Frozen', 'Pending review'].map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <span className="text-sm text-blue-700 font-medium">
              {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              {canApproveProducts && (
                <>
                  <button
                    onClick={() => handleBulkAction('approve')}
                    className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Approve Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Reject Selected
                  </button>
                </>
              )}
              {canDeleteProducts && (
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-xs font-medium text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Delete Selected
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left text-xs uppercase tracking-wider">
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filtered.length && filtered.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Subcategory</th>
                <th className="px-3 py-2">Listed price</th>
                <th className="px-3 py-2">Discount mode</th>
                <th className="px-3 py-2">Max disc.</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-3 py-6 text-center text-gray-500">
                    No products found against applied filters.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 font-medium text-gray-900">{product.name}</td>
                    <td className="px-3 py-2 text-gray-600">{product.category}</td>
                    <td className="px-3 py-2 text-gray-500">{product.subcategory}</td>
                    <td className="px-3 py-2">{product.price}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{product.discountMode}</span>
                    </td>
                    <td className="px-3 py-2">{product.maxDisc}</td>
                    <td className={`px-3 py-2 ${product.stock === 0 ? 'text-rose-600' : 'text-slate-800'}`}>{product.stock}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[product.status]}`}>{product.status}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        {canEditProducts && (
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            title="Edit product"
                          >
                            ✏️
                          </button>
                        )}
                        {canApproveProducts && product.status === 'Pending review' && (
                          <>
                            <button
                              onClick={() => handleApproveProduct(product.id)}
                              className="text-green-600 hover:text-green-800 text-sm"
                              title="Approve product"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleRejectProduct(product.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                              title="Reject product"
                            >
                              ✗
                            </button>
                          </>
                        )}
                        {canDeleteProducts && (
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-gray-600 hover:text-gray-800 text-sm"
                            title="Delete product"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold text-slate-700">Browse by category ({activeRole} products)</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryMap).map(([cat, count]) => (
              <div key={cat} className="rounded-md border border-gray-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                {cat} ({count})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

