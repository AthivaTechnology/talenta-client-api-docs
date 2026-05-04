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
        title: "Back Button & Resume Payment",
        description:
          "When a user presses the browser Back button from Stripe's hosted checkout page, the browser restores your page from the bfcache (Back/Forward Cache) — a frozen snapshot of the page as it was before the redirect. Without handling this, the user sees a stale form and pressing 'Pay' creates a duplicate hold in TicketTailor and a new Stripe session, leaving the original hold dangling until it auto-expires in 10 minutes. The correct behaviour: detect the bfcache restore, check sessionStorage for an existing valid hold, and show a 'Resume Payment' banner so the user returns to their existing Stripe session — no new hold, no duplicate charge.",
        auth: { required: false, note: null },
        queryParams: null,
        pathParams: null,
        requestBody: null,
        responses: [
          {
            status: 200,
            description: "Resume session — existing hold still valid",
            body: {
              scenario: "User pressed Back from Stripe. Hold not yet expired.",
              sessionStorage_key: "tt_hold",
              sessionStorage_value: {
                sessionId: "cs_live_abc123xyz",
                expiresAt: "2026-05-03T04:05:00.000Z",
                stripeUrl: "https://checkout.stripe.com/c/pay/cs_live_abc123xyz",
                eventId: "ev_8187172",
              },
              ui_action: "Show 'Resume Payment' banner with live countdown. Do NOT create a new hold.",
            },
          },
          {
            status: 200,
            description: "Start over — hold expired or no sessionStorage entry",
            body: {
              scenario: "User pressed Back but hold has expired (countdown <= 0) or sessionStorage is empty.",
              ui_action: "Clear sessionStorage, show normal ticket selection form. Creating a new hold is safe.",
            },
          },
        ],
        codeExamples: [
          {
            title: "Detect Back button (bfcache)",
            note: "The pageshow event fires on every page load AND on bfcache restores. When e.persisted is true the page was restored from the bfcache — this is the Back button scenario. Use this to re-check sessionStorage for an existing valid hold. Also check on initial mount (not just pageshow) in case the user refreshes rather than going Back.",
            code: `// ── 1. On page mount — check for existing valid hold ────────────────────────
function checkExistingHold(eventId) {
  try {
    const raw = sessionStorage.getItem('tt_hold')
    if (!raw) return null
    const hold = JSON.parse(raw)
    // Only valid if it belongs to THIS event and hasn't expired
    if (hold.eventId !== eventId) return null
    const secsLeft = Math.floor((new Date(hold.expiresAt) - Date.now()) / 1000)
    if (secsLeft <= 0) {
      sessionStorage.removeItem('tt_hold')
      return null
    }
    return { ...hold, secsLeft }
  } catch {
    return null
  }
}

// ── 2. pageshow fires on Back button (e.persisted = bfcache restore) ─────────
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    // Page restored from bfcache after user pressed Back from Stripe
    const hold = checkExistingHold(eventId)
    if (hold) {
      setResumeSession(hold)   // show Resume Payment banner
    }
  }
})

// ── 3. On initial mount ───────────────────────────────────────────────────────
useEffect(() => {
  const hold = checkExistingHold(eventId)
  if (hold) setResumeSession(hold)
}, [eventId])`,
          },
          {
            title: "Resume Payment banner",
            note: "Show a banner with a live countdown so the user knows their hold is still active. Provide two actions: 'Resume Payment' (send them back to the same Stripe URL — no new hold, no new session) and 'Start over' (release the old hold and let them select tickets fresh). The countdown ticks every second. When it reaches zero, auto-clear the banner and show the normal form — the hold has expired and the user can create a new one.",
            code: `// ── Resume Payment banner with live countdown ────────────────────────────────
function ResumePaymentBanner({ resumeSession, onStartOver }) {
  const [secsLeft, setSecsLeft] = useState(resumeSession.secsLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      const s = Math.max(0, Math.floor((new Date(resumeSession.expiresAt) - Date.now()) / 1000))
      setSecsLeft(s)
      if (s === 0) {
        clearInterval(timer)
        sessionStorage.removeItem('tt_hold')
        onStartOver()   // hold expired — show normal form
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [resumeSession])

  const mins = String(Math.floor(secsLeft / 60)).padStart(2, '0')
  const secs = String(secsLeft % 60).padStart(2, '0')

  return (
    <div className="resume-banner">
      <p>Your tickets are still reserved — {mins}:{secs} remaining</p>

      {/* Resume: send user back to SAME Stripe session — no new hold created */}
      <a href={resumeSession.stripeUrl} className="btn-primary">
        Resume Payment →
      </a>

      {/* Start over: release the old hold, then let user re-select tickets */}
      <button onClick={async () => {
        // Release hold fire-and-forget — frees inventory immediately
        fetch(\`/site/checkout/session/\${resumeSession.sessionId}/release-hold\`, {
          method: 'POST'
        }).catch(() => {})
        sessionStorage.removeItem('tt_hold')
        onStartOver()
      }}>
        Start over
      </button>
    </div>
  )
}`,
          },
          {
            title: "Cancel from Stripe checkout page",
            note: "When the user clicks Cancel on Stripe's hosted page, Stripe redirects them to your cancel_url. On that page immediately release the hold (fire-and-forget) so inventory is freed for other buyers without waiting for the 10-min timeout. Then clear sessionStorage and redirect the user back to the event page.",
            code: `// ── /checkout/cancel page ────────────────────────────────────────────────────
useEffect(() => {
  const raw = sessionStorage.getItem('tt_hold')
  if (!raw) return

  const { sessionId, eventId } = JSON.parse(raw)

  // Release hold immediately — fire-and-forget, never block navigation
  fetch(\`/site/checkout/session/\${sessionId}/release-hold\`, { method: 'POST' })
    .catch(() => {})

  // Clear so a refresh doesn't double-release
  sessionStorage.removeItem('tt_hold')

  // Redirect back to event so user can try again
  navigate(\`/events/\${eventId}\`)
}, [])`,
          },
          {
            title: "Full state machine",
            note: "Summary of all states the checkout flow can be in and what to show the user at each stage.",
            code: `// ── Checkout page state machine ──────────────────────────────────────────────

// STATE 1: No active hold — show normal ticket selection
//   sessionStorage('tt_hold') = null OR expired
//   → User selects tickets, enters details, clicks Pay
//   → POST /site/checkout/session → creates TT hold + Stripe session
//   → Store { sessionId, expiresAt, stripeUrl, eventId } in sessionStorage
//   → Redirect to stripeUrl

// STATE 2: Active hold, user is on Stripe checkout page
//   sessionStorage('tt_hold') = { sessionId, expiresAt, stripeUrl, eventId }
//   → Countdown running (10 min from hold creation)
//   → If user completes payment → Stripe redirects to /checkout/success?session_id=...
//   → If user clicks Cancel → redirected to /checkout/cancel → release hold + clear storage
//   → If countdown hits 0 → POST release-hold → backend refunds if payment was taken

// STATE 3: User pressed Back from Stripe (bfcache restore)
//   pageshow event fires with e.persisted = true
//   sessionStorage still has hold data (it persists across navigation)
//   secsLeft > 0 → Show "Resume Payment" banner
//   → Resume: window.location.href = resumeSession.stripeUrl (same Stripe session)
//   → Start over: POST release-hold → clear storage → show form

// STATE 4: User on /checkout/success
//   Poll GET /site/checkout/session/:id every 3s (max 10 attempts)
//   complete   → show booking confirmed
//   refunded   → show refund notice (hold expired mid-payment)
//   failed     → show payment failed
//   pending    → keep polling
//   pending_recovery → keep polling, show "still confirming" at timeout`,
          },
        ],
        errorCodes: null,
      },
    ],
  },
]
