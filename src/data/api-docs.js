export const BASE_URL = "https://talenta.athivaone.com/api/v1"

export const API_SECTIONS = [
  {
    id: "health",
    title: "Health",
    icon: "Activity",
    endpoints: [
      {
        id: "get-root",
        method: "GET",
        path: "/",
        title: "Service Status",
        description:
          "Returns a simple liveness check confirming the API server is running. Use this as a lightweight ping before making more expensive calls.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Service is running",
            body: {
              status: "ok",
              service: "Talenta API",
              env: "production",
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            code: `const res = await fetch('https://talenta.athivaone.com/api/v1/')
const { status, service } = await res.json()
console.log(status) // "ok"`,
          },
        ],
        errorCodes: null,
      },
      {
        id: "get-health",
        method: "GET",
        path: "/health",
        title: "Health Check with DB Status",
        description:
          "Returns detailed health status including database connectivity. Use this endpoint to verify full-stack availability before processing user-facing requests.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "All systems healthy",
            body: {
              status: "healthy",
              database: "connected",
            },
          },
          {
            status: 503,
            description: "Service degraded — database unreachable",
            body: {
              status: "unhealthy",
              database: "Connection timeout: could not connect to server",
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            code: `const res = await fetch('https://talenta.athivaone.com/api/v1/health')
const { status, database } = await res.json()

if (status !== 'healthy') {
  console.error('DB unreachable:', database)
}`,
          },
        ],
        errorCodes: null,
      },
    ],
  },
  {
    id: "events",
    title: "Events",
    icon: "Globe",
    endpoints: [
      {
        id: "list-events",
        method: "GET",
        path: "/site/events",
        title: "List Events",
        description:
          "Returns a list of published events associated with the requesting client's domain. The client is automatically identified via the Origin or Referer header — no API key required in the request. Events are auto-closed in the background when their end time passes.",
        originNote: {
          text: "All /site/* endpoints identify your client automatically using the Origin (or Referer) header. In a browser this header is sent automatically when your page makes a fetch/axios request. When testing with curl or Postman you must add it manually — the backend looks up your registered domain from this header and rejects unknown origins with 403 DOMAIN_NOT_REGISTERED.",
        },
        auth: {
          required: false,
          note: "Client identified automatically via the Origin or Referer request header matching registered client domains. No API key needed.",
        },
        queryParams: [
          {
            name: "limit",
            type: "integer",
            required: false,
            default: "50",
            description: "Maximum number of events to return. Maximum allowed value is 100.",
          },
        ],
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "List of events",
            body: {
              client_name: "Legacyoffroad",
              data: [
                {
                  object: "event",
                  id: "ev_8187234",
                  access_code: null,
                  available_status: null,
                  bundles: [],
                  call_to_action: "Select tickets",
                  checkout_url: "https://www.tickettailor.com/checkout/view-event/id/8187234/chk/1053/",
                  chk: "1053",
                  created_at: 1777548489,
                  currency: "usd",
                  description: "Annual off-road racing event",
                  end: {
                    date: "2026-05-05",
                    formatted: "Tue May 5, 2026 6:30 PM",
                    iso: "2026-05-05T18:30:00+05:30",
                    time: "18:30",
                    timezone: "+05:30",
                    unix: 1777986000,
                  },
                  event_series_id: "es_2192671",
                  hidden: "false",
                  images: {
                    header: "https://uploads.tickettailorassets.com/c_fill,g_center,h_373,q_85,w_1172/v1/production/userfiles/global/abstract-1.jpg",
                    thumbnail: "https://uploads.tickettailorassets.com/c_fill,h_250,q_85,w_250/v1/production/userfiles/global/abstract-1.jpg",
                  },
                  max_tickets_sold_per_occurrence: null,
                  name: "Desert Challenge 2026",
                  online_event: "false",
                  online_link: null,
                  override_id: null,
                  payment_methods: [],
                  private: "false",
                  revenue: 0,
                  sales_tax_label: "VAT",
                  sales_tax_percentage: null,
                  sales_tax_treatment: "exclusive",
                  show_map: "true",
                  start: {
                    date: "2026-04-30",
                    formatted: "Thu Apr 30, 2026 5:30 PM",
                    iso: "2026-04-30T17:30:00+05:30",
                    time: "17:30",
                    timezone: "+05:30",
                    unix: 1777550400,
                  },
                  status: "published",
                  ticket_groups: [],
                  ticket_types: [
                    {
                      object: "ticket_type",
                      id: "tt_6308858",
                      access_code: null,
                      booking_fee: 0,
                      description: null,
                      discounts: [],
                      group_id: null,
                      has_overrides: "false",
                      hide_after: null,
                      hide_until: null,
                      hide_when_sold_out: "false",
                      max_per_order: 2,
                      min_per_order: 1,
                      name: "Free",
                      override_id: null,
                      price: 0,
                      quantity: 100,
                      quantity_held: 0,
                      quantity_in_baskets: 0,
                      quantity_issued: 21,
                      quantity_total: 100,
                      show_quantity_remaining: "false",
                      show_quantity_remaining_less_than: null,
                      sort_order: 10000,
                      status: "on_sale",
                      type: "GA",
                      quantity_available: 79,
                      quantity_sold: 21,
                    },
                  ],
                  tickets_available: "true",
                  tickets_available_at: null,
                  tickets_available_at_message: "Tickets are available in {countdown}",
                  tickets_unavailable_at: null,
                  tickets_unavailable_at_message: "Tickets are no longer available",
                  timezone: "Asia/Kolkata",
                  total_holds: 0,
                  total_issued_tickets: 21,
                  total_orders: 0,
                  transaction_fee_fixed_amount: null,
                  transaction_fee_percentage: null,
                  unavailable: "false",
                  unavailable_status: null,
                  url: "https://www.tickettailor.com/events/legacyoffroad/2192671",
                  venue: {
                    country: "IN",
                    name: "Featherlite",
                    postal_code: "600100",
                  },
                  voucher_ids: [],
                  waitlist_active: "false",
                  waitlist_call_to_action: "Join waiting list",
                  waitlist_confirmation_message: "Done! You are on the waiting list.",
                  waitlist_event_page_text: "Join our waiting list to be notified when tickets become available.",
                  total_sold: 21,
                  total_capacity: 100,
                  total_remaining: 79,
                  total_held: 0,
                },
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const { data } = await axios.get(\`\${BASE}/site/events\`)
const { client_name, data: events } = data

events.forEach(event => {
  const { name, total_remaining, start, ticket_types } = event
  console.log(\`\${name} — \${total_remaining} tickets left\`)
})`,
          },
          {
            title: "React (useEffect)",
            code: `useEffect(() => {
  axios.get(\`\${BASE}/site/events\`)
    .then(({ data }) => {
      setClientName(data.client_name)
      setEvents(data.data)
    })
    .catch(err => setError('Failed to load events'))
    .finally(() => setLoading(false))
}, [])`,
          },
        ],
        errorCodes: [
          {
            status: 403,
            code: "DOMAIN_NOT_REGISTERED",
            description: "The requesting domain is not registered as a client.",
          },
          {
            status: 429,
            code: "RATE_LIMIT_EXCEEDED",
            description: "Too many requests. Back off and retry with exponential backoff.",
          },
        ],
      },
      {
        id: "get-event",
        method: "GET",
        path: "/site/events/{event_id}",
        title: "Get Event Detail",
        description:
          "Returns full event details including all ticket types with real-time availability counts. Held tickets (active 10-minute holds) are deducted from the available quantity. This is the primary endpoint for rendering an event page with a ticket purchase flow. Expired holds are released automatically in the background on each call.",
        auth: {
          required: false,
          note: "Client identified automatically via the Origin or Referer request header.",
        },
        queryParams: null,
        pathParams: [
          {
            name: "event_id",
            type: "string",
            required: true,
            default: null,
            description: "Unique event identifier returned from the List Events endpoint.",
          },
        ],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Event with full details and live ticket availability",
            body: {
              object: "event",
              id: "ev_8187234",
              access_code: null,
              available_status: null,
              bundles: [],
              call_to_action: "Select tickets",
              checkout_url: "https://www.tickettailor.com/checkout/view-event/id/8187234/chk/1053/",
              chk: "1053",
              created_at: 1777548489,
              currency: "usd",
              description: "test10",
              end: {
                date: "2026-05-05",
                formatted: "Tue May 5, 2026 6:30 PM",
                iso: "2026-05-05T18:30:00+05:30",
                time: "18:30",
                timezone: "+05:30",
                unix: 1777986000,
              },
              event_series_id: "es_2192671",
              hidden: "false",
              images: {
                header: "https://uploads.tickettailorassets.com/c_fill,g_center,h_373,q_85,w_1172/v1/production/userfiles/global/abstract-1.jpg?_a=BAAE6HDQ",
                thumbnail: "https://uploads.tickettailorassets.com/c_fill,h_250,q_85,w_250/v1/production/userfiles/global/abstract-1.jpg?_a=BAAE6HDQ",
              },
              max_tickets_sold_per_occurrence: null,
              name: "test",
              online_event: "false",
              online_link: null,
              override_id: null,
              payment_methods: [],
              private: "false",
              revenue: 0,
              sales_tax_label: "VAT",
              sales_tax_percentage: null,
              sales_tax_treatment: "exclusive",
              show_map: "true",
              start: {
                date: "2026-04-30",
                formatted: "Thu Apr 30, 2026 5:30 PM",
                iso: "2026-04-30T17:30:00+05:30",
                time: "17:30",
                timezone: "+05:30",
                unix: 1777550400,
              },
              status: "published",
              ticket_groups: [],
              ticket_types: [
                {
                  object: "ticket_type",
                  id: "tt_6308858",
                  access_code: null,
                  booking_fee: 0,
                  description: null,
                  discounts: [],
                  group_id: null,
                  has_overrides: "false",
                  hide_after: null,
                  hide_until: null,
                  hide_when_sold_out: "false",
                  max_per_order: 2,
                  min_per_order: 1,
                  name: "Free",
                  override_id: null,
                  price: 0,
                  quantity: 100,
                  quantity_held: 0,
                  quantity_in_baskets: 0,
                  quantity_issued: 21,
                  quantity_total: 100,
                  show_quantity_remaining: "false",
                  show_quantity_remaining_less_than: null,
                  sort_order: 10000,
                  status: "on_sale",
                  type: "GA",
                  quantity_available: 79,
                  quantity_sold: 21,
                  held_count: 0,
                },
              ],
              tickets_available: "true",
              tickets_available_at: null,
              tickets_available_at_message: "Tickets are available in {countdown}",
              tickets_unavailable_at: null,
              tickets_unavailable_at_message: "Tickets are no longer available",
              timezone: "Asia/Kolkata",
              total_holds: 0,
              total_issued_tickets: 21,
              total_orders: 0,
              transaction_fee_fixed_amount: null,
              transaction_fee_percentage: null,
              unavailable: "false",
              unavailable_status: null,
              url: "https://www.tickettailor.com/events/athivatech1/2192671",
              venue: {
                country: "IN",
                name: "Featherlite",
                postal_code: "600100",
              },
              voucher_ids: [],
              waitlist_active: "false",
              waitlist_call_to_action: "Join waiting list",
              waitlist_confirmation_message: "Done! You are on the waiting list.",
              waitlist_event_page_text: "Join our waiting list to be notified when tickets become available.",
              total_sold: 21,
              total_capacity: 100,
              total_remaining: 79,
              total_held: 0,
            },
          },
        ],
        codeExamples: [
          {
            title: "Adaptive polling",
            note: "Three-speed strategy based on the actual Athiva frontend implementation: (1) First check after initial load → always 30 s (isFirstPoll=true catches a hold created just before the page opened). (2) holds active (any ticket_type.held_count > 0) → poll every 30 s, time-sensitive — tracks when the 10-min hold expires and inventory becomes available again. (3) No holds → poll every 60 s — saves requests when nothing is time-sensitive, but still keeps data fresh. Skip the fetch entirely when document.visibilityState is 'hidden' — the tab is not visible so there is no user to update; resume immediately on visibilitychange to 'visible'. Also re-fetch on pageshow with e.persisted — this handles the browser Back button restoring a frozen bfcache snapshot after the user returns from Stripe checkout (without this, the page shows stale Sold Out / held counts). Best practice: when a ticket is isHeldOut (available ≤ 0 and held_count > 0) show the message 'May become available — page updates automatically' so the user knows not to manually refresh.",
            code: `// 30s when holds are active, 60s when idle — saves requests while staying responsive
const POLL_FAST = 30_000
const POLL_SLOW = 60_000
let timer = null

const schedulePoll = (hasHolds, isFirstPoll = false) => {
  clearTimeout(timer)
  timer = setTimeout(fetchAndReschedule, hasHolds || isFirstPoll ? POLL_FAST : POLL_SLOW)
}

const fetchAndReschedule = async () => {
  if (document.visibilityState === 'hidden') return // skip when tab is inactive
  const { data } = await axios.get(\`/site/events/\${eventId}\`)
  setEvent(data)
  const hasHolds = data.ticket_types.some(t => t.held_count > 0)
  schedulePoll(hasHolds)
}

// Initial load
const { data } = await axios.get(\`/site/events/\${eventId}\`)
setEvent(data)
schedulePoll(data.ticket_types.some(t => t.held_count > 0), true)

// Resume immediately when user switches back to this tab
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') fetchAndReschedule()
})

// Re-fetch after bfcache restore (browser Back button from Stripe)
window.addEventListener('pageshow', e => {
  if (e.persisted) fetchAndReschedule()
})`,
          },
          {
            title: "Availability display",
            note: "isHeldOut is the most important state to handle: available = 0 but held_count > 0 means every remaining ticket is currently inside an active 10-minute checkout hold. Do NOT show 'Sold Out' — these tickets may return to inventory if the hold expires or is cancelled. Show '⏳ N being processed' and add a sub-text like 'May become available — page updates automatically' to let the user know the page is polling in the background (every 30 s when holds are active) so they do not need to refresh manually.",
            code: `// Map ticket type fields to UI state
event.ticket_types.forEach(tt => {
  const available = tt.quantity_available     // remaining after holds
  const held      = tt.held_count             // active 10-min holds
  const capacity  = tt.quantity              // total capacity
  const sold      = tt.quantity_sold         // issued tickets

  const isSoldOut  = available <= 0 && held === 0 && capacity > 0
  const isHeldOut  = available <= 0 && held > 0   // "being processed"
  const isLow      = available > 0 && available <= 10

  // Show correct badge
  if (isSoldOut)  return 'Sold Out'
  if (isHeldOut)  return \`⏳ \${held} being processed\`
  if (isLow)      return \`Last \${available} tickets\`
})`,
          },
        ],
        errorCodes: [
          {
            status: 404,
            code: "EVENT_NOT_FOUND",
            description:
              "No event with this ID exists, or it is in a non-visible status (draft, cancelled, close_sales) for this client domain, or the event has already ended.",
          },
          {
            status: 403,
            code: "DOMAIN_NOT_REGISTERED",
            description: "The requesting domain is not registered as a client.",
          },
        ],
      },
      {
        id: "get-bookings",
        method: "GET",
        path: "/site/bookings",
        title: "Get Bookings by Email",
        description:
          "Retrieves all bookings associated with an email address for events belonging to the client's domain. Useful for building an attendee self-service portal where users can view their purchased tickets. Results are strictly scoped to the requesting client — attendees from other clients are never returned.",
        auth: {
          required: false,
          note: "Client identified automatically via the Origin or Referer request header. Email must be provided as a query parameter.",
        },
        queryParams: [
          {
            name: "email",
            type: "string",
            required: true,
            default: null,
            description: "Attendee email address to look up bookings for. URL-encode the value.",
          },
        ],
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Bookings for the given email",
            body: {
              bookings: [
                {
                  id: 297,
                  event_id: "ev_8187234",
                  event_name: "Desert Challenge 2026",
                  ticket_type_name: "Free",
                  quantity: 1,
                  tt_ticket_id: "it_122943062",
                  total_amount_cents: 0,
                  created_at: "2026-04-30T17:47:46",
                  status: "complete",
                },
                {
                  id: 267,
                  event_id: "ev_8081361",
                  event_name: "Temple Festival",
                  ticket_type_name: "General Admission",
                  quantity: 1,
                  tt_ticket_id: "it_122821789",
                  total_amount_cents: 10000,
                  created_at: "2026-04-29T15:05:41",
                  status: "complete",
                },
              ],
              customer_email: "attendee@example.com",
              total_bookings: 2,
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            code: `const email = 'user@example.com'
const { data } = await axios.get('/site/bookings', {
  params: { email }   // axios URL-encodes automatically
})

const { bookings, customer_email, total_bookings } = data

bookings.forEach(b => {
  console.log(b.event_name, b.ticket_type_name, b.status)
  // "Desert Challenge 2026"  "Free"  "complete"
})`,
          },
        ],
        errorCodes: [
          {
            status: 422,
            code: "MISSING_EMAIL",
            description: "The email query parameter is required.",
          },
          {
            status: 422,
            code: "INVALID_EMAIL",
            description: "The provided email address is not a valid format. FastAPI validates via Pydantic EmailStr.",
          },
        ],
      },
    ],
  },
  {
    id: "checkout",
    title: "Checkout",
    icon: "ShoppingCart",
    endpoints: [
      {
        id: "create-checkout-session",
        method: "POST",
        path: "/site/checkout/session",
        title: "Create Checkout Session",
        description:
          "Initiates a checkout session by placing a 10-minute time-limited hold on the requested tickets to prevent overselling. For paid events, returns a Stripe Checkout URL to redirect the user to. For free events, immediately completes the booking, issues tickets, and sends a confirmation email — no redirect needed. Holds are automatically released after 10 minutes if payment is not completed.",
        auth: {
          required: false,
          note: "Client identified automatically via the Origin or Referer request header.",
        },
        queryParams: null,
        pathParams: null,
        requestBody: {
          event_id: "ev_8187172",
          items: [
            {
              ticket_type_id: "tt_6308700",
              quantity: 1,
            },
          ],
          customer_email: "user@example.com",
          customer_name: "John Doe",
          customer_phone: "+911234567890",
        },
        responses: [
          {
            status: 200,
            description: "Session created — paid event (redirect user to checkout_url)",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "pending",
              url: "https://checkout.stripe.com/c/pay/cs_live_abc123xyz",
              client_id: "c8f3a2b1-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
              hold_expires_at: "2024-01-20T15:00:00.000Z",
              held_quantity: 2,
            },
          },
          {
            status: 200,
            description: "Session created — free event (booking immediately confirmed)",
            body: {
              session_id: "550e8400-e29b-41d4-a716-446655440000",
              status: "complete",
              url: "https://yoursite.com/checkout/success?session_id=550e8400-e29b-41d4-a716-446655440000",
              client_id: "c8f3a2b1-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
            },
          },
        ],
        codeExamples: [
          {
            title: "Full checkout flow",
            code: `const { data } = await axios.post('/site/checkout/session', {
  event_id: 'ev_8187172',
  items: [{ ticket_type_id: 'tt_6308858', quantity: 1 }],
  customer_email: 'user@example.com',
  customer_name: 'John Doe',
  customer_phone: '+911234567890'
})

if (data.status === 'complete') {
  // Free ticket — booking already confirmed
  window.location.href = data.url  // → /checkout/success?session_id=...
  return
}

// Paid ticket — store hold expiry for countdown timer
if (data.hold_expires_at) {
  sessionStorage.setItem('tt_hold', JSON.stringify({
    sessionId: data.session_id,
    expiresAt: data.hold_expires_at   // ISO 8601 string
  }))
}

// Redirect to Stripe Checkout — user has 10 min to complete payment
window.location.href = data.url`,
          },
          {
            title: "Cross-tab lock",
            code: `// Prevent two tabs from creating duplicate holds simultaneously
const LOCK_KEY = 'athiva_checkout_lock'
const LOCK_TTL = 35_000 // ms

const tryAcquireLock = () => {
  const raw = localStorage.getItem(LOCK_KEY)
  if (raw && Date.now() - Number(raw) < LOCK_TTL) return false
  localStorage.setItem(LOCK_KEY, String(Date.now()))
  return true
}
const releaseLock = () => localStorage.removeItem(LOCK_KEY)

// Before calling POST /site/checkout/session:
if (!tryAcquireLock()) {
  // Another tab is mid-checkout — wait for it to finish
  await new Promise(resolve => {
    window.addEventListener('storage', function handler(e) {
      if (e.key === LOCK_KEY && !e.newValue) {
        window.removeEventListener('storage', handler)
        resolve()
      }
    })
  })
}

// ... call API ...
releaseLock()`,
          },
        ],
        errorCodes: [
          {
            status: 409,
            code: "INSUFFICIENT_INVENTORY",
            description: "Requested ticket quantity exceeds available stock. Check quantity_available before creating a session.",
          },
          {
            status: 404,
            code: "EVENT_NOT_FOUND",
            description: "The specified event_id does not exist or is not accessible to this client.",
          },
          {
            status: 422,
            code: "INVALID_CUSTOMER_NAME",
            description: "Customer name must contain both first and last name separated by a space.",
          },
          {
            status: 422,
            code: "TICKET_ISSUANCE_FAILED",
            description: "Free ticket issuance failed due to a downstream error. Retry the request.",
          },
          {
            status: 403,
            code: "DOMAIN_NOT_REGISTERED",
            description: "The requesting domain is not a registered client.",
          },
        ],
      },
      {
        id: "get-checkout-session",
        method: "GET",
        path: "/site/checkout/session/{session_id}",
        title: "Get Session Status",
        description:
          "Retrieves the current status of a checkout session. Poll this endpoint on your success page (with exponential backoff, max 10 attempts) to confirm payment processing after Stripe redirects the user back. If the session shows pending_recovery, a missed webhook has been detected and active recovery is in progress — continue polling.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: [
          {
            name: "session_id",
            type: "string",
            required: true,
            default: null,
            description: "The session ID returned from Create Checkout Session.",
          },
        ],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Free checkout — session already complete",
            body: {
              session_id: "bb1e409f-aa50-42d4-a716-446655440000",
              status: "complete",
              client: {
                id: "a566bf66-5651-45b1-9148-d6328491ef2b",
                name: "Shootah",
              },
              payments: [
                {
                  id: 302,
                  event_id: "ev_8187172",
                  ticket_type_name: "General Admission",
                  quantity: 1,
                  total_amount_cents: 0,
                  status: "complete",
                },
              ],
            },
          },
          {
            status: 200,
            description: "Paid checkout — awaiting Stripe webhook",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "pending",
              client: {
                id: "a566bf66-5651-45b1-9148-d6328491ef2b",
                name: "Shootah",
              },
              payments: [
                {
                  id: 303,
                  event_id: "ev_8187172",
                  ticket_type_name: "VIP",
                  quantity: 2,
                  total_amount_cents: 10000,
                  status: "pending",
                },
              ],
            },
          },
          {
            status: 200,
            description: "Missed webhook detected — recovery queued",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "pending_recovery",
              client: {
                id: "a566bf66-5651-45b1-9148-d6328491ef2b",
                name: "Shootah",
              },
              payments: [
                {
                  id: 303,
                  event_id: "ev_8187172",
                  ticket_type_name: "VIP",
                  quantity: 2,
                  total_amount_cents: 10000,
                  status: "pending_recovery",
                },
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Success page polling",
            note: "Stripe redirects the user to your success page BEFORE the payment webhook arrives at the backend (usually 1–5 s later). Tickets are only issued after the backend processes that webhook — so at the moment the user lands on the success page, their tickets are not yet issued. Poll every 3 s up to 10 times (30 s total): status 'complete' means the webhook was received, TicketTailor tickets are issued, and the confirmation email was sent — show the booking confirmed screen. status 'failed' means payment failed — show an error. If after 10 attempts the status is still pending, check lastKnownStatus: 'pending_recovery' means the backend's active-recovery processor already detected the missed webhook and is fixing it (show 'check your email shortly'); plain 'pending' means something went wrong — show an error. Never show a success screen without first confirming status is 'complete'.",
            code: `// Poll every 3s, max 10 attempts — covers Stripe webhook delay
let attempts = 0
const MAX = 10
let cancelled = false
let lastStatus = 'pending'

async function pollSession(sessionId) {
  if (cancelled) return
  try {
    const { data } = await axios.get(\`/site/checkout/session/\${sessionId}\`)
    lastStatus = data.status

    if (data.status === 'complete') {
      showSuccess(data)     // tickets confirmed, email sent
    } else if (data.status === 'failed') {
      showFailed()
    } else if (attempts < MAX) {
      attempts++
      setTimeout(() => pollSession(sessionId), 3000)
    } else {
      // 10 attempts exhausted — distinguish "recovering" from hard failure
      lastStatus === 'pending_recovery' ? showPendingTimeout() : showFailed()
    }
  } catch {
    if (attempts < MAX) { attempts++; setTimeout(() => pollSession(sessionId), 3000) }
    else showError()
  }
}

const sessionId = new URLSearchParams(location.search).get('session_id')
pollSession(sessionId)`,
          },
          {
            title: "Status reference",
            code: `// Three possible statuses after Stripe redirects back:

// ✅ complete — webhook received, tickets issued, email sent
if (data.status === 'complete') { /* show confirmation */ }

// ⏳ pending — webhook not yet received (normal for ~1-3s)
// → keep polling (up to 10 × 3s = 30s)
if (data.status === 'pending') { /* show spinner */ }

// 🔄 pending_recovery — webhook missed, backend actively recovering via Stripe API
// → keep polling; show "still confirming" if 10 attempts exhausted
if (data.status === 'pending_recovery') { /* "check email shortly" */ }`,
          },
        ],
        errorCodes: [
          {
            status: 404,
            code: "SESSION_NOT_FOUND",
            description: "No session exists with this ID.",
          },
        ],
      },
      {
        id: "release-hold",
        method: "POST",
        path: "/site/checkout/session/{session_id}/release-hold",
        title: "Release Ticket Hold",
        description:
          "Explicitly releases a ticket hold before the 10-minute automatic expiry. Call this when a user clicks Cancel or navigates away from your checkout page to immediately free up inventory for other buyers rather than waiting for the timeout. This endpoint is best-effort — it always returns 200 even if the hold was already released or expired.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: [
          {
            name: "session_id",
            type: "string",
            required: true,
            default: null,
            description: "The session ID of the hold to release.",
          },
        ],
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Hold released (best-effort — always returns 200)",
            body: {
              released: true,
            },
          },
        ],
        codeExamples: [
          {
            title: "Countdown timer",
            note: "When POST /site/checkout/session succeeds, the response includes hold_expires_at (ISO timestamp, 10 minutes from now). Store it in sessionStorage. This timer ticks every second from 600 → 0. At exactly 0 seconds the 'released' flag fires POST release-hold once (fire-and-forget, .catch(() => {}) so it never blocks the UI). The backend immediately calls DELETE /holds/{id} on TicketTailor, freeing those reserved tickets for other buyers — no need to wait for the 10-minute auto-expiry. The backend also deletes the pending Payment row from the database.",
            code: `// Fire-and-forget release when the 10-min countdown hits zero
const holdData = JSON.parse(sessionStorage.getItem('tt_hold') || 'null')
if (!holdData) return

let released = false
const tick = () => {
  const secsLeft = Math.max(0, Math.floor((new Date(holdData.expiresAt) - Date.now()) / 1000))
  setTimeLeft(secsLeft)
  if (secsLeft === 0 && !released) {
    released = true
    // Best-effort — always returns 200, frees inventory for other buyers immediately
    axios.post(\`/site/checkout/session/\${holdData.sessionId}/release-hold\`).catch(() => {})
  }
}
tick()
const timer = setInterval(tick, 1000)
return () => clearInterval(timer)`,
          },
          {
            title: "On cancel",
            note: "When the user clicks Cancel (or Back) on the Stripe Checkout page, Stripe redirects them to your cancel_url. On that cancel page, immediately read sessionStorage for the tt_hold data that was saved when the checkout session was created, then fire POST release-hold with no await and .catch(() => {}) so navigation is never blocked. The backend deletes the TicketTailor hold immediately, freeing those tickets for other buyers without waiting for the 10-minute timeout. Always clear sessionStorage after calling release so a page refresh does not fire a duplicate release.",
            code: `// Call when user clicks Cancel or navigates away from checkout
const releaseHold = (sessionId) => {
  // Fire-and-forget — don't await, don't block navigation
  fetch(\`/site/checkout/session/\${sessionId}/release-hold\`, { method: 'POST' })
    .catch(() => {}) // always returns 200, ignore errors
}

// Example: release on Back button click
backButton.addEventListener('click', () => {
  releaseHold(sessionId)
  navigate(-1)
})`,
          },
        ],
        errorCodes: null,
      },
    ],
  },
]
