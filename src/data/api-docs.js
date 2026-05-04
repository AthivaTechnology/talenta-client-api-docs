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
          "Initiates a checkout session by placing a 10-minute time-limited hold on the requested tickets to prevent overselling. For paid events, returns a Stripe Checkout URL to redirect the user to. For free events, immediately completes the booking, issues tickets, and sends a confirmation email — no redirect needed. Holds are automatically released after 10 minutes if payment is not completed. Pass customer_timezone (IANA format, e.g. 'Asia/Kolkata') so that refund confirmation emails show dates in the customer's local time rather than UTC.",
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
          customer_timezone: "Asia/Kolkata",
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
            note: "Always pass customer_timezone so refund emails show the correct local time. Store stripeUrl in sessionStorage alongside the hold data — this lets you detect a browser Back from Stripe and show 'Resume Payment' instead of creating a duplicate hold.",
            code: `const { data } = await axios.post('/site/checkout/session', {
  event_id: 'ev_8187172',
  items: [{ ticket_type_id: 'tt_6308858', quantity: 1 }],
  customer_email: 'user@example.com',
  customer_name: 'John Doe',
  customer_phone: '+911234567890',
  customer_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  // e.g. "Asia/Kolkata" — stored in DB, used for refund email dates
})

if (data.status === 'complete') {
  // Free ticket — booking already confirmed
  window.location.href = data.url  // → /checkout/success?session_id=...
  return
}

// Paid ticket — store hold + Stripe URL so Back button can resume
sessionStorage.setItem('tt_hold', JSON.stringify({
  sessionId: data.session_id,
  expiresAt: data.hold_expires_at,   // ISO 8601 — used for countdown
  stripeUrl:  data.url,              // saved so Back button can re-use same session
  eventId:    eventId,
}))

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
          "Retrieves the current status of a checkout session. Poll this endpoint on your success page (every 3 s, max 10 attempts) to confirm payment processing after Stripe redirects the user back. Possible statuses: complete (payment confirmed, tickets issued, email sent), pending (webhook not yet arrived — keep polling), pending_recovery (missed webhook detected, backend is auto-recovering — keep polling), failed (payment could not be verified), refunded (ticket hold expired while payment was processing — full refund has been auto-issued and a refund notification email was sent to the customer).",
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
          {
            status: 200,
            description: "Ticket hold expired mid-payment — refund auto-issued",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "refunded",
              tt_error: null,
              client: {
                id: "a566bf66-5651-45b1-9148-d6328491ef2b",
                name: "Shootah",
              },
              payments: [
                {
                  id: 304,
                  event_id: "ev_8187172",
                  ticket_type_name: "VIP",
                  quantity: 1,
                  total_amount_cents: 10000,
                  status: "refunded",
                },
              ],
            },
          },
          {
            status: 200,
            description: "Payment could not be verified — show error to user",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "failed",
              client: {
                id: "a566bf66-5651-45b1-9148-d6328491ef2b",
                name: "Shootah",
              },
              payments: [
                {
                  id: 305,
                  event_id: "ev_8187172",
                  ticket_type_name: "VIP",
                  quantity: 1,
                  total_amount_cents: 10000,
                  status: "failed",
                },
              ],
            },
          },
        ],
        codeExamples: [
          {
            title: "Success page polling",
            note: "Stripe redirects the user to your success page BEFORE the payment webhook arrives at the backend (usually 1–5 s later). Tickets are only issued after the backend processes that webhook — so at the moment the user lands on the success page, their tickets are not yet issued. Poll every 3 s up to 10 times (30 s total). Handle all 5 terminal statuses: complete (show success), refunded (hold expired mid-payment — full refund issued, show refund notice), failed (payment failed — show error). If after 10 attempts status is still pending/expired, check lastKnownStatus: pending_recovery means auto-recovery is running (show 'check your email shortly'); otherwise show hard failure. Never show a success screen without first confirming status === 'complete'.",
            code: `let attempts = 0
const MAX = 10
let cancelled = false
let lastStatus = 'pending'

async function pollSession(sessionId) {
  if (cancelled) return
  try {
    const { data } = await axios.get(\`/site/checkout/session/\${sessionId}\`)
    lastStatus = data.status

    if (data.status === 'complete') {
      showSuccess(data)          // tickets confirmed, email sent
    } else if (data.status === 'refunded') {
      showRefunded(data)         // hold expired mid-payment — refund auto-issued
    } else if (data.status === 'failed') {
      showFailed()               // payment could not be verified
    } else if (data.status === 'expired') {
      // Hold released by frontend timer — backend is processing refund
      // Keep polling until status flips to 'refunded'
      if (attempts < MAX) { attempts++; setTimeout(() => pollSession(sessionId), 3000) }
      else showPendingTimeout()
    } else if (attempts < MAX) {
      attempts++
      setTimeout(() => pollSession(sessionId), 3000)
    } else {
      // 10 attempts exhausted
      const recovering = ['pending_recovery', 'processing'].includes(lastStatus)
      recovering ? showPendingTimeout() : showFailed()
    }
  } catch {
    if (attempts < MAX) { attempts++; setTimeout(() => pollSession(sessionId), 3000) }
    else showError()
  }
}

const sessionId = new URLSearchParams(location.search).get('session_id')
pollSession(sessionId)
return () => { cancelled = true }`,
          },
          {
            title: "Status reference",
            code: `// All possible statuses returned by GET /site/checkout/session/:id

// ✅ complete — webhook received, tickets issued, confirmation email sent
if (data.status === 'complete') { showBookingConfirmed(data) }

// 💸 refunded — hold expired while payment was processing
//    Stripe has auto-refunded the charge. A refund email was sent to the customer.
//    Show a clear message: "Your reservation expired. A full refund has been issued."
if (data.status === 'refunded') { showRefundedScreen() }

// ❌ failed — payment could not be verified after all retries
if (data.status === 'failed') { showPaymentFailed() }

// ⏳ pending — webhook not yet received (normal for 1–5 s after Stripe redirect)
//    Keep polling
if (data.status === 'pending') { showSpinner() }

// 🔄 pending_recovery — missed webhook detected, backend auto-recovering via Stripe API
//    Keep polling; if 10 attempts exhausted show "check your email in a few minutes"
if (data.status === 'pending_recovery') { showRecoveringBanner() }

// ⌛ expired — frontend hold timer hit zero, backend processing the refund
//    Keep polling until status becomes 'refunded'
if (data.status === 'expired') { showProcessingRefund() }`,
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
  {
    id: "refunds",
    title: "Refunds",
    icon: "RefreshCcw",
    endpoints: [
      {
        id: "refund-lifecycle",
        method: "GUIDE",
        path: null,
        title: "Refund Lifecycle",
        description:
          "Talenta auto-refunds customers in three scenarios — no manual action needed. In every case: the Stripe charge is reversed via the API, all Payment rows are set to status='refunded', and a refund notification email is sent to the customer showing the amount, the original payment date/card, and (if customer_timezone was passed at checkout) all dates in the customer's local timezone. Refunds typically appear on the customer's statement in 3–10 business days.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Trigger 1 — Session expired (frontend hold timer hit zero)",
            body: {
              trigger: "Frontend countdown reached 0 → POST release-hold → webhook checkout.session.expired",
              stripe_action: "stripe.Refund.create({ payment_intent: pi_xxx })",
              session_status_before: "expired",
              session_status_after: "refunded",
              email_sent: true,
              note: "The frontend fires POST /release-hold when its 10-min countdown hits zero. Stripe sends a checkout.session.expired webhook. The backend detects a completed payment on that session, issues the refund, marks payments as refunded, and sends the email.",
            },
          },
          {
            status: 200,
            description: "Trigger 2 — TT hold expired server-side (orphaned pending payment)",
            body: {
              trigger: "TT hold expired before Stripe was completed — backend orphan cleanup",
              stripe_action: "stripe.Refund.create({ payment_intent: pi_xxx })",
              session_status_before: "pending",
              session_status_after: "refunded",
              email_sent: true,
              note: "If the user abandons Stripe without paying, the TT hold expires after 10 min. The backend orphan-cleanup job detects the Stripe session is expired but payment was taken (edge case), refunds via Stripe, and sends the email.",
            },
          },
          {
            status: 200,
            description: "Trigger 3 — Sold-out race condition (payment completed but tickets gone)",
            body: {
              trigger: "Stripe payment_intent.succeeded webhook — but TT tickets already sold by another buyer",
              stripe_action: "stripe.Refund.create({ payment_intent: pi_xxx })",
              session_status_before: "complete (Stripe) / pending (DB)",
              session_status_after: "refunded",
              email_sent: true,
              note: "Two buyers complete payment at nearly the same time. The second buyer's webhook arrives and finds no inventory left. The backend immediately refunds the charge and sends the refund email. This is the only refund path that cannot be prevented — it is a deliberate safety net.",
            },
          },
        ],
        codeExamples: [
          {
            title: "How the refund email is built",
            note: "The refund email always shows: amount refunded, original payment date (from Stripe charge timestamp — not DB created_at), card brand and last 4 digits (from Stripe PaymentIntent.payment_method), and all dates formatted in the customer's local timezone (from customer_timezone stored at checkout). If Stripe data is unavailable (e.g. network error), the email falls back to the DB payment record timestamp and omits card details. The 'Paid On' date uses the Stripe latest_charge.created Unix timestamp — this is the most accurate payment time.",
            code: `// What the backend does to build refund email dates:

// 1. Retrieve full PaymentIntent from Stripe
const pi = await stripe.PaymentIntent.retrieve(payment_intent_id, {
  expand: ['payment_method', 'latest_charge']
})

// 2. Card details
const card_brand = pi.payment_method?.card?.brand   // e.g. "visa"
const card_last4 = pi.payment_method?.card?.last4   // e.g. "4242"

// 3. Actual payment time (more accurate than DB created_at)
const paid_at = pi.latest_charge?.created           // Unix timestamp

// 4. Format in customer's timezone (stored when checkout was created)
// customer_timezone = "Asia/Kolkata" (from Intl.DateTimeFormat at checkout)
// All dates shown in the email are in the customer's local time — not UTC

// Email shows:
// Refunded:    $100.00
// Paid On:     May 3, 2026, 3:49 AM        ← Stripe charge time in IST
// Refunded To: •••• 4242  (Visa)`,
          },
          {
            title: "Detecting refund on success page",
            note: "If the customer's hold timer expired while they were on the Stripe payment page, Stripe still collects payment — but the backend detects the hold has expired and immediately refunds. The session status on GET /session/:id will be 'refunded'. Show a clear explanation: the reservation expired, a full refund has been issued, check your email. Do NOT show a generic error — the customer's money IS being returned.",
            code: `// On your /checkout/success page:
const { data } = await axios.get(\`/site/checkout/session/\${sessionId}\`)

switch (data.status) {
  case 'complete':
    // ✅ All good — tickets issued, email sent
    showBookingConfirmed()
    break

  case 'refunded':
    // 💸 Hold expired mid-payment — full refund in progress
    showRefundNotice({
      title: 'Payment Refunded',
      message:
        'Your ticket reservation expired while you were completing payment. ' +
        'A full refund has been issued and will appear on your card in 3–10 business days. ' +
        'Check your email for a refund confirmation.',
      cta: 'Back to Events'
    })
    break

  case 'failed':
    showPaymentFailed()
    break

  default:
    // pending / pending_recovery — keep polling (see Get Session Status)
    scheduleNextPoll()
}`,
          },
        ],
        errorCodes: null,
      },
    ],
  },
  {
    id: "back-button",
    title: "Back Button & Resume",
    icon: "RotateCcw",
    endpoints: [
      {
        id: "back-button-resume",
        method: "GUIDE",
        path: null,
        title: "Back Button & Session Resume",
        description:
          "When a user presses the browser Back button from Stripe's hosted checkout page, the browser may restore your page from the bfcache (Back/Forward Cache). The correct behaviour: detect the restore, pre-fill the form with the details already stored in sessionStorage (name, email, phone), and skip the Terms & Conditions modal when Pay is clicked again — the user goes straight back to their existing Stripe session. No new hold, no duplicate charge, no countdown banner. If the hold has expired by the time they click Pay, show a 'Session Expired' screen and redirect home. The Stripe cancel_url follows the same pattern: valid hold → redirect to pre-filled checkout form; expired → Session Expired screen.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Valid hold — form pre-fills, Pay skips T&C",
            body: {
              scenario: "User pressed Back from Stripe (or Stripe Cancel). Hold not yet expired.",
              sessionStorage_key: "tt_hold",
              sessionStorage_value: {
                sessionId: "cs_live_abc123xyz",
                expiresAt: "2026-05-03T04:05:00.000Z",
                stripeUrl: "https://checkout.stripe.com/c/pay/cs_live_abc123xyz",
                eventId: "ev_8187172",
                ticketsParam: "{\"tt_type_123\":2}",
                name: "Jane Doe",
                email: "jane@example.com",
                phone: "+44 7700 900000",
              },
              ui_action: "Form pre-fills with stored name/email/phone. Clicking Pay skips T&C and redirects straight to existing Stripe session — no new hold created.",
            },
          },
          {
            status: 200,
            description: "Expired or missing — Session Expired screen",
            body: {
              scenario: "User returned but hold has expired or sessionStorage is empty.",
              ui_action: "Show 'Session Expired' card → 3-second auto-redirect to home ('/').",
            },
          },
        ],
        codeExamples: [
          {
            title: "sessionStorage schema & pre-fill on return",
            note: "Store all customer details in sessionStorage when the checkout session is created. On return (bfcache restore or fresh page load), read them back to pre-fill the form. The pageshow event handles bfcache restores; the event-load effect handles fresh loads. Both reset processing state so the Pay button is usable again.",
            code: `// ── sessionStorage schema (written when POST /site/checkout/session succeeds) ──
// {
//   sessionId:    "cs_live_abc123xyz",           // internal session ID
//   expiresAt:    "2026-05-03T04:05:00.000Z",    // ISO — TT hold expires in 10 min
//   stripeUrl:    "https://checkout.stripe.com/c/pay/cs_...",
//   eventId:      "ev_8187172",
//   ticketsParam: '{"tt_type_123":2}',           // JSON — reconstructs checkout URL
//   name:         "Jane Doe",                    // pre-fill on return
//   email:        "jane@example.com",
//   phone:        "+44 7700 900000",
// }

// ── On event load — pre-fill form if returning from Stripe ────────────────────
// (run inside the event fetch .then() callback, after setTickets())
try {
  const raw = sessionStorage.getItem('tt_hold')
  if (raw) {
    const hold = JSON.parse(raw)
    const expiresAt = hold.expiresAt ? new Date(hold.expiresAt) : null
    if (hold.eventId === eventId && expiresAt && expiresAt > new Date()) {
      if (hold.name)  setName(hold.name)
      if (hold.email) setEmail(hold.email)
      if (hold.phone) setPhone(hold.phone)
    }
  }
} catch {}

// ── On bfcache restore (browser Back) — reset processing + pre-fill ───────────
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return
  // Reset — processing was true before the Stripe redirect
  setProcessing(false)
  submittingRef.current = false
  // Re-fill form fields from session (in case React state was stale)
  try {
    const raw = sessionStorage.getItem('tt_hold')
    if (raw) {
      const hold = JSON.parse(raw)
      const expiresAt = hold.expiresAt ? new Date(hold.expiresAt) : null
      if (hold.eventId === eventId && expiresAt && expiresAt > new Date()) {
        if (hold.name)  setName(hold.name)
        if (hold.email) setEmail(hold.email)
        if (hold.phone) setPhone(hold.phone)
      }
    }
  } catch {}
})`,
          },
          {
            title: "Pay button — skip T&C for existing sessions",
            note: "Check sessionStorage at the very top of the Pay button handler — before form validation and before showing the Terms & Conditions modal. If a valid Stripe URL exists in the current tab's sessionStorage the user already accepted T&C when they created the session, so send them straight back to Stripe. If expired, show the Session Expired screen. Only show T&C for brand-new sessions.",
            code: `// Pay button handler — sessionStorage check runs FIRST, before any validation
function handlePayClick(e) {
  e.preventDefault()
  if (submittingRef.current || processing) return

  // ── 1. Existing session check (highest priority) ──────────────────────────
  try {
    const raw = sessionStorage.getItem('tt_hold')
    if (raw) {
      const hold = JSON.parse(raw)
      const expiresAt = hold.expiresAt ? new Date(hold.expiresAt) : null
      if (hold.stripeUrl && expiresAt) {
        if (expiresAt > new Date()) {
          // Valid — redirect immediately, skip T&C and form validation entirely
          window.location.href = hold.stripeUrl
          return
        } else {
          // Expired — clear storage, show Session Expired screen → 3s → home
          sessionStorage.removeItem('tt_hold')
          setSessionExpired(true)
          return
        }
      }
    }
  } catch {}

  // ── 2. No existing session — validate form then show T&C ──────────────────
  if (!name.trim() || name.trim().split(/\\s+/).length < 2) {
    setNameError('Enter your full name — e.g. John Doe')
    return
  }
  if (!email) { setCheckoutError('Email required'); return }
  setShowTerms(true)   // T&C only shown for new sessions
}`,
          },
          {
            title: "Cancel page — same behaviour as Back button",
            note: "Configure cancel_url as /checkout/cancel?event_id={event_id}. When Stripe redirects here, check sessionStorage: if the hold is still valid redirect silently to the pre-filled checkout form (identical to the Back button experience); if expired or missing show a Session Expired card with a 3-second auto-redirect to home. Do NOT release the hold here — the user may have pressed cancel by accident and clicking Pay again on the pre-filled form goes straight back to Stripe.",
            code: `// ── /checkout/cancel page ────────────────────────────────────────────────────
// cancel_url: /checkout/cancel?event_id={event_id}
// Behaves identically to the browser Back button.

useEffect(() => {
  try {
    const raw = sessionStorage.getItem('tt_hold')
    if (raw) {
      const hold = JSON.parse(raw)
      const expiresAt = hold.expiresAt ? new Date(hold.expiresAt) : null
      if (expiresAt && expiresAt > new Date() && hold.eventId && hold.ticketsParam) {
        // Valid hold — redirect to pre-filled checkout form (no release, user may resume)
        navigate(
          \`/checkout?eventId=\${hold.eventId}&tickets=\${encodeURIComponent(hold.ticketsParam)}\`,
          { replace: true }
        )
        return
      }
    }
  } catch {}

  // No valid hold — show Session Expired → 3s redirect to home
  setExpired(true)
}, [])`,
          },
          {
            title: "UI Back button — always navigate to event page",
            note: "The back button inside the checkout form must navigate to /events/{eventId} directly — never use navigate(-1). After the user returns from Stripe via browser Back, history[-1] is the Stripe hosted page. Using navigate(-1) would send them back into Stripe. Always navigate to the event page explicitly. Also clear sessionStorage and release the hold (fire-and-forget) so inventory is freed immediately.",
            code: `// ← Back button inside /checkout page
<button onClick={() => {
  // Clear session and release hold before navigating away
  try {
    const raw = sessionStorage.getItem('tt_hold')
    if (raw) {
      const hold = JSON.parse(raw)
      sessionStorage.removeItem('tt_hold')
      if (hold.sessionId) {
        // Fire-and-forget — frees inventory immediately
        fetch(\`/site/checkout/session/\${hold.sessionId}/release-hold\`, {
          method: 'POST'
        }).catch(() => {})
      }
    }
  } catch {}
  // Always navigate to event page — NEVER use navigate(-1) here.
  // After Stripe Back, history[-1] is the Stripe page; navigate(-1) would go back into it.
  navigate(\`/events/\${eventId}\`)
}}>
  ← Back
</button>`,
          },
          {
            title: "Full state machine",
            note: "All states the checkout flow can be in and what to show the user at each stage.",
            code: `// ── Checkout page state machine ──────────────────────────────────────────────

// STATE 1: No active hold — show normal checkout form
//   sessionStorage('tt_hold') = null
//   → User fills name/email/phone, clicks Pay
//   → T&C modal shown → user accepts
//   → POST /site/checkout/session → creates TT hold + Stripe session
//   → Store { sessionId, expiresAt, stripeUrl, eventId, ticketsParam, name, email, phone }
//   → Redirect to stripeUrl

// STATE 2: User presses browser Back from Stripe
//   pageshow fires with e.persisted = true  (bfcache restore)
//   OR fresh page reload (no bfcache)
//   → form pre-fills from tt_hold (name, email, phone)
//   → Click Pay → sessionStorage has valid hold → skip T&C → redirect to Stripe
//   → No new hold, no duplicate charge

// STATE 3: User clicks Cancel on Stripe hosted page
//   Stripe redirects to /checkout/cancel?event_id={id}
//   → CheckoutCancelPage reads sessionStorage
//   → Valid hold → redirect to /checkout?eventId=...&tickets=... (same as Back button)
//   → Expired/missing → show "Session Expired" → 3s redirect to home

// STATE 4: Hold expired (> 10 min since creation)
//   User clicks Pay on pre-filled form OR arrives at cancel page after expiry
//   → sessionStorage.removeItem('tt_hold')
//   → Show "Session Expired" card → 3s auto-redirect to '/'

// STATE 5: User clicks UI Back button on /checkout
//   → Clear sessionStorage + POST release-hold (fire-and-forget)
//   → navigate('/events/' + eventId)   — never navigate(-1)

// STATE 6: User on /checkout/success
//   Poll GET /site/checkout/session/:id every 3s (max 10 attempts)
//   complete          → show booking confirmed
//   refunded          → show refund notice (hold expired mid-payment)
//   failed            → show payment failed
//   pending           → keep polling
//   pending_recovery  → keep polling, show "still confirming" at timeout`,
          },
        ],
        errorCodes: null,
      },
    ],
  },
]
