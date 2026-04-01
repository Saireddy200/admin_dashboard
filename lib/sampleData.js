export const initialProducts = [
  { id: 1, name: 'Sony ZV-E10', category: 'Cameras & Lighting', subcategory: 'DSLR / Mirrorless', price: '₹52,499', discountMode: 'Full discount', maxDisc: '4%', stock: 8, status: 'Live', roles: ['Super Admin'] },
  { id: 2, name: 'Rode NT-USB Mini', category: 'Microphones & Audio', subcategory: 'USB Microphones', price: '₹9,999', discountMode: 'Full discount', maxDisc: '4%', stock: 14, status: 'Live', roles: ['Super Admin'] },
  { id: 3, name: 'Elgato Key Light', category: 'Cameras & Lighting', subcategory: 'LED Panels', price: '₹17,999', discountMode: 'Elite only', maxDisc: '2%', stock: 3, status: 'Live', roles: ['Super Admin'] },
  { id: 4, name: 'Joby GorillaPod 3K', category: 'Tripods & Mounts', subcategory: 'Gorillapods', price: '₹5,499', discountMode: 'No discount', maxDisc: '–', stock: 22, status: 'Live', roles: ['Super Admin'] },
  { id: 5, name: 'Elgato Stream Deck', category: 'Streaming Gear', subcategory: 'Stream Decks', price: 'Not set', discountMode: 'Full discount', maxDisc: '4%', stock: 0, status: 'Frozen', roles: ['Super Admin'] },
  { id: 6, name: 'Rode Wireless GO II', category: 'Microphones & Audio', subcategory: 'Wireless Mics', price: 'Not set', discountMode: 'Full discount', maxDisc: '4%', stock: 5, status: 'Frozen', roles: ['Super Admin'] },
  { id: 7, name: 'Samsung T7 SSD 1TB', category: 'Accessories', subcategory: 'Storage (SD / SSD)', price: '₹7,999', discountMode: 'Full discount', maxDisc: '4%', stock: 30, status: 'Live', roles: ['Super Admin'] },
  { id: 8, name: 'Elgato Cam Link 4K', category: 'Streaming Gear', subcategory: 'Capture Cards', price: '₹12,499', discountMode: 'Full discount', maxDisc: '4%', stock: 6, status: 'Live', roles: ['Super Admin'] },
  { id: 9, name: 'Shure SM7B', category: 'Microphones & Audio', subcategory: 'XLR Microphones', price: 'Not set', discountMode: 'Full discount', maxDisc: '4%', stock: 0, status: 'Pending review', roles: ['Super Admin'] },
  { id: 10, name: 'Logitech C920 HD Pro', category: 'Cameras & Lighting', subcategory: 'Webcams', price: 'Not set', discountMode: 'Full discount', maxDisc: '4%', stock: 0, status: 'Pending review', roles: ['Super Admin'] },
  { id: 11, name: 'Canon EOS 2000D', category: 'Cameras & Lighting', subcategory: 'DSLR / Mirrorless', price: '₹35,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 5, status: 'Live', roles: ['Retailer'] },
  { id: 12, name: 'Audio-Technica AT2020', category: 'Microphones & Audio', subcategory: 'XLR Microphones', price: '₹8,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 12, status: 'Live', roles: ['Retailer'] },
  { id: 13, name: 'Godox SL-60W', category: 'Cameras & Lighting', subcategory: 'LED Panels', price: '₹15,999', discountMode: 'No discount', maxDisc: '–', stock: 8, status: 'Live', roles: ['Vendor Manager'] },
  { id: 14, name: 'Zoom H6', category: 'Microphones & Audio', subcategory: 'Audio Recorders', price: '₹28,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 3, status: 'Live', roles: ['Vendor Manager'] },
  { id: 15, name: 'Manfrotto 504HD', category: 'Tripods & Mounts', subcategory: 'Tripods', price: '₹18,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 7, status: 'Live', roles: ['Product Ops'] },
  { id: 16, name: 'Western Digital 2TB', category: 'Accessories', subcategory: 'Storage (SD / SSD)', price: '₹9,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 15, status: 'Live', roles: ['Product Ops'] },
  { id: 17, name: 'Blue Yeti USB', category: 'Microphones & Audio', subcategory: 'USB Microphones', price: '₹12,999', discountMode: 'Limited discount', maxDisc: '2%', stock: 4, status: 'Live', roles: ['Support'] },
  { id: 18, name: 'Ring Light 18"', category: 'Cameras & Lighting', subcategory: 'Ring Lights', price: '₹4,999', discountMode: 'No discount', maxDisc: '–', stock: 20, status: 'Live', roles: ['Support'] },
];

export const initialOrders = [
  { id: '#FM-2044', creator: 'Arun K.', product: 'Rode NT-USB Mini', paid: '₹9,799', discount: '-2%', status: 'Pending pack', tracking: '–', date: 'Today', roles: ['Super Admin'] },
  { id: '#FM-2043', creator: 'Sneha R.', product: 'Sony ZV-E10', paid: '₹50,399', discount: '-4%', status: 'Packed', tracking: '–', date: 'Today', roles: ['Super Admin'] },
  { id: '#FM-2042', creator: 'Vishal M.', product: 'Joby GorillaPod', paid: '₹5,499', discount: '–', status: 'Dispatched', tracking: 'DL4892011234', date: 'Yesterday', roles: ['Super Admin'] },
  { id: '#FM-2041', creator: 'Priya D.', product: 'Elgato Key Light', paid: '₹17,999', discount: '–', status: 'Delivered', tracking: 'DL4891988123', date: 'Mar 29', roles: ['Super Admin'] },
  { id: '#FM-2040', creator: 'Kiran V.', product: 'Rode NT-USB Mini', paid: '₹9,799', discount: '-2%', status: 'Delivered', tracking: 'DL4891855011', date: 'Mar 28', roles: ['Super Admin'] },
  { id: '#FM-2039', creator: 'Divya S.', product: 'Samsung T7 SSD', paid: '₹7,679', discount: '-4%', status: 'Refund initiated', tracking: 'DL4891744001', date: 'Mar 27', roles: ['Super Admin'] },
  { id: '#FM-2038', creator: 'Ramesh N.', product: 'Sony ZV-E10', paid: '₹52,499', discount: '–', status: 'Cancelled', tracking: '–', date: 'Mar 26', roles: ['Super Admin'] },
  { id: '#FM-2051', creator: 'Anita P.', product: 'Canon EOS 2000D', paid: '₹35,999', discount: '2%', status: 'Packed', tracking: '–', date: 'Today', roles: ['Retailer'] },
  { id: '#FM-2052', creator: 'Karthik S.', product: 'Godox SL-60W', paid: '₹15,999', discount: '–', status: 'Pending pack', tracking: '–', date: 'Today', roles: ['Vendor Manager'] },
];

export const initialInvoices = [
  { id: 'INV-C-0044', type: 'To creator', party: 'Arun K.', amount: '₹9,799', ref: '#FM-2044', status: 'Sent', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-C-0043', type: 'To creator', party: 'Sneha R.', amount: '₹50,399', ref: '#FM-2043', status: 'Sent', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-C-0042', type: 'To creator', party: 'Vishal M.', amount: '₹5,499', ref: '#FM-2042', status: 'Sent', date: 'Yesterday', roles: ['Super Admin'] },
  { id: 'INV-R-0019', type: 'To Fameo', party: 'RetailCo', amount: '₹57,100', ref: 'Batch', status: 'Pending review', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-R-0018', type: 'To Fameo', party: 'RetailCo', amount: '₹35,600', ref: 'Batch', status: 'Cleared', date: 'Mar 28', roles: ['Super Admin'] },
  { id: 'INV-C-0045', type: 'To creator', party: 'Rohit T.', amount: '₹12,499', ref: '#FM-2045', status: 'Draft', date: 'Today', roles: ['Product Ops', 'Vendor Manager'] },
];
