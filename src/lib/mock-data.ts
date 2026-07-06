export interface UserData {
  id: string
  name: string
  username: string
  email: string
  phone: string
  country: string
  timezone: string
  role: "Buyer" | "Seller" | "Both" | "Admin"
  trustScore: number
  verified: boolean
  publicProfile: boolean
  walletBalance: number
  heldFunds: number
  releasedFunds: number
  withdrawn: number
  openDeals: number
  completedDeals: number
  disputedDeals: number
  memberSince: string
  lastActive: string
  status: "Active" | "Deleted"
  buyerRating: number
  sellerRating: number
  avatar?: string
}

export const mockUsers: UserData[] = [
  {
    id: "USR-8X9Y2",
    name: "Eleanor Pena",
    username: "@eleanor_p",
    email: "eleanor.pena@example.com",
    phone: "+1 (555) 019-2834",
    country: "United States",
    timezone: "America/New_York (EST)",
    role: "Both",
    trustScore: 94,
    verified: true,
    publicProfile: true,
    walletBalance: 45200.00,
    heldFunds: 12500.00,
    releasedFunds: 32700.00,
    withdrawn: 150000.00,
    openDeals: 3,
    completedDeals: 142,
    disputedDeals: 1,
    memberSince: "Mar 12, 2024",
    lastActive: "Just now",
    status: "Active",
    buyerRating: 4.9,
    sellerRating: 4.8,
  },
  {
    id: "USR-4K2M9",
    name: "Robert Fox",
    username: "@rfox_deals",
    email: "robert.fox@example.com",
    phone: "+44 20 7123 4567",
    country: "United Kingdom",
    timezone: "Europe/London (GMT)",
    role: "Seller",
    trustScore: 88,
    verified: true,
    publicProfile: true,
    walletBalance: 12450.50,
    heldFunds: 450.00,
    releasedFunds: 12000.50,
    withdrawn: 89000.00,
    openDeals: 1,
    completedDeals: 89,
    disputedDeals: 0,
    memberSince: "Jan 05, 2025",
    lastActive: "2 hours ago",
    status: "Active",
    buyerRating: 0,
    sellerRating: 4.7,
  },
  {
    id: "USR-1L5P3",
    name: "Jacob Jones",
    username: "@jjones22",
    email: "jacob.j@example.com",
    phone: "+1 (555) 928-1123",
    country: "Canada",
    timezone: "America/Toronto (EST)",
    role: "Buyer",
    trustScore: 45,
    verified: false,
    publicProfile: false,
    walletBalance: 0.00,
    heldFunds: 0.00,
    releasedFunds: 0.00,
    withdrawn: 0.00,
    openDeals: 0,
    completedDeals: 2,
    disputedDeals: 1,
    memberSince: "Oct 18, 2025",
    lastActive: "1 day ago",
    status: "Deleted",
    buyerRating: 3.2,
    sellerRating: 0,
  },
  {
    id: "USR-9N3Q1",
    name: "Cody Fisher",
    username: "@codyfish",
    email: "cody.fisher@example.com",
    phone: "+61 2 1234 5678",
    country: "Australia",
    timezone: "Australia/Sydney (AEST)",
    role: "Both",
    trustScore: 72,
    verified: true,
    publicProfile: true,
    walletBalance: 3400.00,
    heldFunds: 3400.00,
    releasedFunds: 0.00,
    withdrawn: 12000.00,
    openDeals: 2,
    completedDeals: 15,
    disputedDeals: 0,
    memberSince: "Aug 22, 2025",
    lastActive: "5 mins ago",
    status: "Active",
    buyerRating: 4.5,
    sellerRating: 4.2,
  },
  {
    id: "USR-2X8Z4",
    name: "Esther Howard",
    username: "@esther_h",
    email: "esther.howard@example.com",
    phone: "+1 (555) 443-9982",
    country: "United States",
    timezone: "America/Los_Angeles (PST)",
    role: "Seller",
    trustScore: 98,
    verified: true,
    publicProfile: true,
    walletBalance: 128500.00,
    heldFunds: 28500.00,
    releasedFunds: 100000.00,
    withdrawn: 550000.00,
    openDeals: 8,
    completedDeals: 312,
    disputedDeals: 2,
    memberSince: "Nov 01, 2023",
    lastActive: "Online",
    status: "Active",
    buyerRating: 0,
    sellerRating: 4.9,
  },
  {
    id: "USR-7C4V2",
    name: "Cameron Williamson",
    username: "@cam_will",
    email: "cameron.w@example.com",
    phone: "+1 (555) 776-3321",
    country: "United States",
    timezone: "America/Chicago (CST)",
    role: "Buyer",
    trustScore: 65,
    verified: true,
    publicProfile: false,
    walletBalance: 150.00,
    heldFunds: 0.00,
    releasedFunds: 150.00,
    withdrawn: 400.00,
    openDeals: 0,
    completedDeals: 8,
    disputedDeals: 0,
    memberSince: "Feb 14, 2026",
    lastActive: "3 days ago",
    status: "Deleted",
    buyerRating: 4.1,
    sellerRating: 0,
  }
]

export interface TransactionData {
  id: string
  dealId: string
  buyer: string
  seller: string
  product: string
  amount: number
  platformFee: number
  type: "Buy" | "Sell"
  paymentType: string
  status: "Completed" | "Pending" | "Failed" | "Refunded"
  protectedStatus: "Protected" | "Released" | "Refunded" | "Failed" | "Disputed" | "Pending"
  date: string
  reference: string
}

export const mockTransactions: TransactionData[] = [
  { 
    id: "TRX-1035", 
    dealId: "DL-9081", 
    buyer: "Eleanor Pena",
    seller: "Esther Howard",
    product: "Rolex Daytona 116500LN",
    amount: 32500.00, 
    platformFee: 650.00,
    paymentType: "Wire Transfer", 
    status: "Completed",
    type: "Buy",
    protectedStatus: "Protected",
    date: "Oct 24, 2026", 
    reference: "WIR-882910" 
  },
  { 
    id: "TRX-1034", 
    dealId: "DL-9082", 
    buyer: "Jacob Jones",
    seller: "Robert Fox",
    product: "Vintage Fender Stratocaster",
    amount: 8400.00, 
    platformFee: 168.00,
    paymentType: "ACH", 
    status: "Pending", 
    type: "Sell",
    protectedStatus: "Disputed",
    date: "Oct 24, 2026", 
    reference: "ACH-441928" 
  },
  { 
    id: "TRX-1033", 
    dealId: "DL-9080", 
    buyer: "Cody Fisher",
    seller: "Eleanor Pena",
    product: "Porsche 911 Allocation",
    amount: 150000.00, 
    platformFee: 3000.00,
    paymentType: "Wire Transfer", 
    status: "Failed", 
    type: "Buy",
    protectedStatus: "Failed",
    date: "Oct 23, 2026", 
    reference: "WIR-882909" 
  },
  { 
    id: "TRX-1032", 
    dealId: "DL-9079", 
    buyer: "Cody Fisher",
    seller: "Eleanor Pena",
    product: "Porsche 911 Allocation",
    amount: 150000.00, 
    platformFee: 3000.00,
    paymentType: "ACH", 
    status: "Completed", 
    type: "Buy",
    protectedStatus: "Released",
    date: "Oct 22, 2026", 
    reference: "ACH-441927" 
  },
  { 
    id: "TRX-1031", 
    dealId: "DL-9078", 
    buyer: "Cameron Williamson",
    seller: "Esther Howard",
    product: "Hermes Birkin 30",
    amount: 24000.00, 
    platformFee: 480.00,
    paymentType: "Credit Card", 
    status: "Refunded", 
    type: "Sell",
    protectedStatus: "Refunded",
    date: "Oct 21, 2026", 
    reference: "CC-110293" 
  },
]

export interface DealData {
  id: string
  productThumbnail?: string
  product: string
  buyer: string
  seller: string
  category: string
  type?: "Buy" | "Sell"
  amount: number
  platformFee: number
  status: "Draft" | "Open" | "Funded" | "Shipped" | "Delivered" | "Completed" | "Disputed" | "Cancelled"
  created: string
  updated: string
  trustScore?: number
}

export const mockDeals: DealData[] = [
  { 
    id: "DL-9081", 
    product: "Rolex Daytona 116500LN", 
    category: "Watches",
    type: "Buy",
    buyer: "Eleanor Pena", 
    seller: "Esther Howard", 
    amount: 32500.00, 
    platformFee: 650.00,
    status: "Funded", 
    created: "Oct 23, 2026", 
    updated: "Oct 24, 2026",
    trustScore: 94
  },
  { 
    id: "DL-9082", 
    product: "Vintage Fender Stratocaster", 
    category: "Instruments",
    type: "Sell",
    buyer: "Jacob Jones", 
    seller: "Robert Fox", 
    amount: 8400.00, 
    platformFee: 168.00,
    status: "Disputed", 
    created: "Oct 20, 2026", 
    updated: "Oct 22, 2026",
    trustScore: 45
  },
  { 
    id: "DL-9079", 
    product: "Porsche 911 Allocation", 
    category: "Vehicles",
    type: "Buy",
    buyer: "Cody Fisher", 
    seller: "Eleanor Pena", 
    amount: 150000.00, 
    platformFee: 3000.00,
    status: "Completed", 
    created: "Oct 15, 2026", 
    updated: "Oct 20, 2026",
    trustScore: 72
  },
  { 
    id: "DL-9078", 
    product: "Hermes Birkin 30", 
    category: "Luxury",
    type: "Sell",
    buyer: "Cameron Williamson", 
    seller: "Esther Howard", 
    amount: 24000.00, 
    platformFee: 480.00,
    status: "Cancelled", 
    created: "Oct 10, 2026", 
    updated: "Oct 11, 2026",
    trustScore: 65
  },
  { 
    id: "DL-9077", 
    product: "Patek Philippe Nautilus", 
    category: "Watches",
    type: "Buy",
    buyer: "Eleanor Pena", 
    seller: "Robert Fox", 
    amount: 85000.00, 
    platformFee: 1700.00,
    status: "Shipped", 
    created: "Oct 24, 2026", 
    updated: "Just now",
    trustScore: 88
  },
  { 
    id: "DL-9076", 
    product: "Domain Name portfolio.com", 
    category: "Digital Assets",
    type: "Buy",
    buyer: "Robert Fox", 
    seller: "Cody Fisher", 
    amount: 45000.00, 
    platformFee: 900.00,
    status: "Draft", 
    created: "Oct 25, 2026", 
    updated: "Just now",
    trustScore: 88
  },
  { 
    id: "DL-9075", 
    product: "Bored Ape Yacht Club #1234", 
    category: "NFTs",
    type: "Sell",
    buyer: "Cody Fisher", 
    seller: "Eleanor Pena", 
    amount: 120000.00, 
    platformFee: 2400.00,
    status: "Delivered", 
    created: "Oct 18, 2026", 
    updated: "Oct 20, 2026",
    trustScore: 94
  },
  { 
    id: "DL-9074", 
    product: "Freelance Development App", 
    category: "Services",
    type: "Buy",
    buyer: "Cameron Williamson", 
    seller: "Jacob Jones", 
    amount: 15000.00, 
    platformFee: 300.00,
    status: "Open", 
    created: "Oct 22, 2026", 
    updated: "Oct 23, 2026",
    trustScore: 65
  }
]

export const mockReviews = [
  { id: 1, reviewer: "Esther Howard", role: "Seller", rating: 5, comment: "Excellent buyer, fast payment and great communication. Highly recommended!", deal: "DL-9079", date: "Oct 20, 2026" },
  { id: 2, reviewer: "Robert Fox", role: "Seller", rating: 4, comment: "Smooth transaction overall. Minor delay in payment release but no major issues.", deal: "DL-9055", date: "Sep 15, 2026" },
  { id: 3, reviewer: "Jacob Jones", role: "Buyer", rating: 1, comment: "Item arrived damaged. Seller refused to acknowledge. Had to open a dispute.", deal: "DL-9082", date: "Oct 22, 2026" },
]

export const mockActivity = [
  { id: 1, title: "Deal Completed", description: "DL-9079 funds released to seller wallet.", date: "Oct 20, 2026, 2:30 PM", type: "success" },
  { id: 2, title: "Admin Updated Profile", description: "Super Admin updated user trust score.", date: "Oct 19, 2026, 10:15 AM", type: "info" },
  { id: 3, title: "Wallet Updated", description: "Withdrew $50,000 to ending in x4092.", date: "Oct 18, 2026, 9:00 AM", type: "warning" },
  { id: 4, title: "Dispute Opened", description: "Buyer initiated dispute for DL-9082.", date: "Oct 22, 2026, 4:45 PM", type: "error" },
  { id: 5, title: "Account Created", description: "User registered via email.", date: "Mar 12, 2024, 11:20 AM", type: "default" },
]

export interface DisputeData {
  id: string
  dealId: string
  buyer: string
  seller: string
  product: string
  productThumbnail?: string
  reason: string
  amount: number
  status: "Open" | "Waiting for Seller" | "Seller Responded" | "Escalated to Admin" | "Under Review" | "Resolved" | "Refunded" | "Rejected"
  priority: "High" | "Medium" | "Low"
  created: string
  buyerTrustScore: number
  sellerTrustScore: number
}

export const mockDisputes: DisputeData[] = [
  {
    id: "DSP-3042",
    dealId: "DL-9082",
    buyer: "Jacob Jones",
    seller: "Robert Fox",
    product: "Vintage Fender Stratocaster",
    reason: "Item arrived damaged",
    amount: 8400.00,
    status: "Escalated to Admin",
    priority: "High",
    created: "Oct 22, 2026",
    buyerTrustScore: 82,
    sellerTrustScore: 45
  },
  {
    id: "DSP-3041",
    dealId: "DL-9040",
    buyer: "Eleanor Pena",
    seller: "Cody Fisher",
    product: "Web App Source Code",
    reason: "Not as described",
    amount: 12500.00,
    status: "Seller Responded",
    priority: "Medium",
    created: "Oct 21, 2026",
    buyerTrustScore: 94,
    sellerTrustScore: 72
  },
  {
    id: "DSP-3040",
    dealId: "DL-9031",
    buyer: "Cameron Williamson",
    seller: "Esther Howard",
    product: "Hermes Birkin 30",
    reason: "Suspected Counterfeit",
    amount: 24000.00,
    status: "Under Review",
    priority: "High",
    created: "Oct 19, 2026",
    buyerTrustScore: 65,
    sellerTrustScore: 92
  },
  {
    id: "DSP-3039",
    dealId: "DL-9011",
    buyer: "Robert Fox",
    seller: "Jacob Jones",
    product: "Rolex Submariner",
    reason: "Missing Box & Papers",
    amount: 14200.00,
    status: "Waiting for Seller",
    priority: "Low",
    created: "Oct 24, 2026",
    buyerTrustScore: 88,
    sellerTrustScore: 82
  },
  {
    id: "DSP-3038",
    dealId: "DL-8999",
    buyer: "Esther Howard",
    seller: "Cameron Williamson",
    product: "Custom Shopify Theme",
    reason: "Late Delivery",
    amount: 4500.00,
    status: "Open",
    priority: "Medium",
    created: "Oct 25, 2026",
    buyerTrustScore: 92,
    sellerTrustScore: 65
  },
  {
    id: "DSP-3037",
    dealId: "DL-8990",
    buyer: "Cody Fisher",
    seller: "Robert Fox",
    product: "Used Macbook Pro M3 Max",
    reason: "Battery does not hold charge",
    amount: 3200.00,
    status: "Resolved",
    priority: "Medium",
    created: "Oct 15, 2026",
    buyerTrustScore: 72,
    sellerTrustScore: 88
  }
]
