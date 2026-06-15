export const demoProfile = {
  key: 'user',
  displayName: 'User Demo',
  location: 'Buenos Aires, Argentina',
  roleLabel: 'HOME USER',
  avatarImage: '/images/avatars/avatar1.png',
  profileData: {
    username: 'user',
    email: 'user@aiohome.local',
    password: 'user',
    firstName: 'User',
    lastName: 'Demo'
  },
  loginSessions: [
    { dateTime: '2026-05-29 08:20', detail: 'Web - Chrome / Android' },
    { dateTime: '2026-05-28 22:09', detail: 'Web - Safari / iOS' },
    { dateTime: '2026-05-26 19:44', detail: 'Web - Edge / Windows' }
  ],
  paymentMethods: [
    { label: 'Visa ending in 4432', detail: 'Expires 11/28' },
    { label: 'Mastercard ending in 9011', detail: 'Expires 06/27' }
  ],
  supportClaims: [
    { dateTime: '2026-05-22 13:52', title: 'Delivery date change requested', status: 'Resolved' },
    { dateTime: '2026-05-16 09:18', title: 'Product setup help', status: 'Closed' },
    { dateTime: '2026-05-10 20:10', title: 'Warranty inquiry', status: 'In progress' }
  ],
  history: [
    {
      id: 'ORD-2026-101',
      date: '2026-05-27 19:02',
      status: 'DELIVERED',
      orderItems: [{ name: 'Amazon Echo Show 8 (3rd Gen)', quantity: 1, unitPrice: 149.99 }]
    },
    {
      id: 'ORD-2026-102',
      date: '2026-05-08 12:34',
      status: 'PROCESSING',
      orderItems: [
        { name: 'Google Nest Audio', quantity: 1, unitPrice: 99.99 },
        { name: 'Apple HomePod mini', quantity: 1, unitPrice: 99 }
      ]
    }
  ]
};
