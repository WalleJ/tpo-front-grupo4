/**
 * CartItem
 * {
 *   id: string,
 *   title: string,
 *   description: string,
 *   image: string,
 *   quantity: number,
 *   unitPrice: number
 * }
 *
 * PaymentMethod
 * {
 *   label: string,
 *   detail: string
 * }
 *
 * PurchaseOrder
 * {
 *   id: string,
 *   date: string,
 *   status: string,
 *   orderItems: Array<{ name: string, quantity: number, unitPrice: number }>
 * }
 *
 * UserProfile
 * {
 *   key: string,
 *   displayName: string,
 *   location: string,
 *   roleLabel: string,
 *   avatarImage: string,
 *   profileData?: { username: string, email: string, password: string, firstName: string, lastName: string },
 *   loginSessions: Array<{ dateTime: string, detail: string }>,
 *   paymentMethods: PaymentMethod[],
 *   supportClaims: Array<{ dateTime: string, title: string, status: string }>,
 *   history: PurchaseOrder[]
 * }
 */
