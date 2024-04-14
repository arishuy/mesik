const path = {
  home: '/',
  forgotPassword: '/forgotPassword',
  dashboard: '/dashboard',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/changepassword',
  historyTransaction: '/user/transaction-history',
  jobRequest: '/user/job-request',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  expertDetail: '/expertDetail/:nameId',
  validateEmail: '/validate-email/:token',
  promoteToExpert: '/promote-to-expert',
  paymentResponse: '/payment-response',

  //Expert
  expert: '/expert',
  expertProfile: '/expert/profile',
  expertChangePassword: '/expert/changepassword',
  expertTransactionHistory: '/expert/transaction-history',
  expertAnalytics: '/expert/analytics',
  expertBookings: '/expert/bookings',
  expertShowListPost: '/expert/list-post',
  expertDashboard: '/expert/dashboard',
  expertWithdraw: '/expert/withdraw',

  //Admin
  admin: '/admin',
  adminProfile: '/admin/profile',
  adminListUser: '/admin/users-management',
  adminListMajor: '/admin/major-management',
  adminVerifyExpert: '/admin/verify-expert',
  adminListDocument: '/admin/document-management',
  adminListTransaction: '/admin/transaction-management',
  adminListReport: '/admin/report-management',
  adminDashBoard: '/admin/dashboard',
  adminWithdraw: '/admin/withdraw-management'
}

export default path
