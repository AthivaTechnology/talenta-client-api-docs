export const BASE_URL = "https://talenta.athivaone.com/api/v1"

export const API_SECTIONS = [
  // ─────────────────────────────────────────────────────────────
  // HEALTH
  // ─────────────────────────────────────────────────────────────
  {
    id: "health",
    title: "Health",
    icon: "Activity",
    endpoints: [
      {
        id: "get-health",
        method: "GET",
        path: "/health",
        title: "Health Check",
        description:
          "Returns the current status of the API and its database connection.",
        bullets: [
          "Always check the status field in the response, not just the HTTP status code. The API returns 200 even when the database is down.",
          "If status is 'unhealthy', the database field shows why (e.g. \"Connection timeout: could not connect to server\").",
        ],
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
            description: "Service degraded. Database unreachable.",
            body: {
              status: "unhealthy",
              database: "Connection timeout: could not connect to server",
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const res = await fetch(\`\${BASE}/health\`)
const { status, database } = await res.json()

if (status !== 'healthy') {
  console.error('DB unreachable:', database)
}`,
          },
          {
            title: "React (useEffect)",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const [health, setHealth] = useState(null)

useEffect(() => {
  axios.get(\`\${BASE}/health\`)
    .then(({ data }) => setHealth(data))
}, [])

// Response fields:
// health.status   → "healthy" | "unhealthy"
// health.database → "connected" | "Connection timeout: could not connect to server"

if (health?.status !== 'healthy') {
  console.error('DB unreachable:', health?.database)
}`,
          },
        ],
        errorCodes: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────
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
          "Returns all published events for your client domain. Use this to display your event listing page.",
        bullets: [
"When an event's end time passes, the backend automatically closes it. Closed events are not returned in this list.",
          "Default limit is 50 events, maximum is 100. Use the limit query parameter to control the page size.",
        ],
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
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

useEffect(() => {
  axios.get(\`\${BASE}/site/events\`)
    .then(({ data }) => {
      setClientName(data.client_name)
      setEvents(data.data)
    })
    .catch(() => setError('Failed to load events'))
    .finally(() => setLoading(false))
}, [])

// Response fields per event:
// event.id             → "ev_8187234"
// event.name           → "Desert Challenge 2026"
// event.start.date     → "2026-04-30"
// event.start.time     → "17:30"
// event.venue.name     → "Featherlite"
// event.total_remaining → 79
// event.ticket_types   → array of ticket type objects`,
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
          "Returns full details for a single event, including live ticket availability per ticket type.",
        tip: "Always call this endpoint before showing a checkout form to get live ticket availability.",
        bullets: [
          "Returns the full event details including name, date, venue, and **live ticket availability** for each ticket type.",
        ],
        keyFields: null,
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
            title: "JavaScript",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

// ── Fetch event detail ────────────────────────────────────────
const { data: event } = await axios.get(\`\${BASE}/site/events/\${eventId}\`)

const { name, start, venue, ticket_types, total_remaining } = event

// ── Read availability per ticket type ────────────────────────
ticket_types.forEach(tt => {
  console.log(\`\${tt.name}: \${tt.quantity_available} available\`)
})

// ── Polling every 60 seconds ──────────────────────────────────
function startPolling(eventId, onUpdate) {
  let timer

  async function poll() {
    const { data } = await axios.get(\`\${BASE}/site/events/\${eventId}\`)
    onUpdate(data)
    timer = setTimeout(poll, 60_000)
  }

  poll()
  return () => clearTimeout(timer)  // call to stop polling
}`,
          },
          {
            title: "React (useEffect)",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const [event, setEvent] = useState(null)

useEffect(() => {
  let timer

  async function fetchAndSchedule() {
    try {
      const { data } = await axios.get(\`\${BASE}/site/events/\${eventId}\`)
      setEvent(data)
      timer = setTimeout(fetchAndSchedule, 60_000)
    } catch {
      setError('Failed to load event')
    }
  }

  fetchAndSchedule()
  return () => clearTimeout(timer)
}, [eventId])

// Key fields per ticket type:
// tt.name               → "General Admission"
// tt.price              → 1000  (in cents, e.g. $10.00)
// tt.quantity_available → 50
// tt.status             → "on_sale" | "sold_out" | "unavailable"`,
          },
        ],
        errorCodes: [
          {
            status: 404,
            code: "EVENT_NOT_FOUND",
            description:
              "No event with this ID exists, or it is in a non-visible status (draft, close_sales) for this client domain, or the event has already ended.",
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
          "Retrieves all bookings for a given email address, scoped to the requesting client's domain. Use this to build an attendee self-service portal where users can view their purchased tickets.",
        bullets: [
          "The email query parameter is required. The request will fail with 422 if it is missing or malformed.",
          "Results are strictly scoped to the requesting client. Attendees from other clients are never returned.",
          "URL-encode the email value when passing it as a query parameter (e.g. user%40example.com).",
          "A 200 with an empty bookings array means no bookings exist for that email. This is not an error.",
          "total_amount_cents is in cents. Divide by 100 to display as dollars (10000 = $100.00).",
        ],
        keyFields: null,
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
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const { data } = await axios.get(\`\${BASE}/site/bookings\`, {
  params: { email: 'user@example.com' }
})

const { bookings, total_bookings } = data

bookings.forEach(b => {
  console.log(b.event_name, b.ticket_type_name, b.status)
  // "Desert Challenge 2026"  "Free"  "complete"
})`,
          },
          {
            title: "React (useEffect)",
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const [bookings, setBookings] = useState([])

useEffect(() => {
  if (!email) return
  axios.get(\`\${BASE}/site/bookings\`, { params: { email } })
    .then(({ data }) => setBookings(data.bookings))
}, [email])

// Response fields per booking:
// booking.event_name        → "Desert Challenge 2026"
// booking.ticket_type_name  → "General Admission"
// booking.quantity          → 1
// booking.total_amount_cents → 10000  ($100.00)
// booking.status            → "complete"
// booking.created_at        → "2026-04-30T17:47:46"`,
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
            description: "The provided email address is not a valid format.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHECKOUT
  // ─────────────────────────────────────────────────────────────
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
          "Use this to start the ticket purchase flow. For paid events, the response includes a Stripe Checkout URL where you redirect the user to complete payment. For free events, the booking is confirmed immediately.",
        bullets: null,
        scenarios: [
          {
            type: "free",
            label: "Free Event",
            detail: "The response comes back with status='complete' and a success URL. Redirect the user to that URL immediately.",
          },
          {
            type: "paid",
            label: "Paid Event",
            detail: "The response includes a Stripe Checkout URL. Before redirecting, save the session data to sessionStorage so the form can be pre-filled if the user returns via the browser Back button or the Stripe Cancel page.",
          },
        ],
        flow: null,
        auth: {
          required: false,
          note: "Client identified automatically via the Origin or Referer request header.",
        },
        queryParams: null,
        pathParams: null,
        requestBodyParams: [
          {
            name: "event_id",
            type: "string",
            required: true,
            default: null,
            description: "The event ID to purchase tickets for. Get this from the List Events or Get Event Detail response (e.g. ev_8187172).",
          },
          {
            name: "items",
            type: "array",
            required: true,
            default: null,
            description: "List of ticket types and quantities to purchase. Each item needs ticket_type_id (from the event's ticket_types) and quantity.",
          },
          {
            name: "customer_email",
            type: "string",
            required: true,
            default: null,
            description: "The buyer's email address. Used to send the booking confirmation and any refund emails.",
          },
          {
            name: "customer_name",
            type: "string",
            required: true,
            default: null,
            description: "The buyer's full name (first and last). Must contain a space, e.g. 'John Doe'.",
          },
          {
            name: "customer_phone",
            type: "string",
            required: true,
            default: null,
            description: "The buyer's phone number including country code, e.g. +911234567890.",
          },
          {
            name: "customer_timezone",
            type: "string",
            required: true,
            default: null,
            description: "The buyer's IANA timezone. Pass Intl.DateTimeFormat().resolvedOptions().timeZone from the browser. Used to format dates in refund emails.",
          },
        ],
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
            description: "Session created. Paid event. Redirect user to checkout_url.",
            body: {
              session_id: "cs_live_abc123xyz",
              client_id: "c8f3a2b1-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
              url: "https://checkout.stripe.com/c/pay/cs_live_abc123xyz",
              status: "pending",
            },
          },
          {
            status: 200,
            description: "Session created. Free event. Booking immediately confirmed.",
            body: {
              session_id: "550e8400-e29b-41d4-a716-446655440000",
              client_id: "c8f3a2b1-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
              url: "https://yoursite.com/checkout/success?session_id=550e8400-e29b-41d4-a716-446655440000",
              status: "complete",
            },
          },
        ],
        codeExamples: [
          {
            title: "JavaScript",
            note: null,
            noteBullets: [
              "After creating the session, save all data to `sessionStorage` before redirecting. Store `sessionId`, `expiresAt`, `stripeUrl`, `eventId`, `ticketsParam`, `name`, `email`, and `phone`. These are used to pre-fill the checkout form if the user returns via the browser Back button or the Stripe back button.",
              "The Stripe Checkout session URL is valid for `30 minutes`.",
              "**Frontend must do — On Back button:** When the user returns to the checkout form, read `sessionStorage`. Pre-fill `name`, `email`, `phone` from the stored data. Check `expiresAt` to see if the session is still valid, then clicking Pay again skips the Terms and Conditions and redirects straight to the existing Stripe URL. If expired.",
              "**Scenario** — User tries to pay after 30 minutes. The Stripe session itself has closed and Stripe shows an expiry error. The user must start a new checkout.",
            ],
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const { data } = await axios.post(\`\${BASE}/site/checkout/session\`, {
  event_id:          'ev_8187172',
  items:             [{ ticket_type_id: 'tt_6317546', quantity: 1 }],
  customer_email:    'john.doe@example.com',
  customer_name:     'John Doe',
  customer_phone:    '+911234567890',
  customer_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone  // e.g. "Asia/Kolkata" — used to format dates in refund emails in the customer's local time
})

if (data.status === 'complete') {
  // Free event — booking confirmed, redirect to success page
  window.location.href = data.url
  return
}

// Paid event — store all session data before redirecting to Stripe
sessionStorage.setItem('co_session', JSON.stringify({
  sessionId:    data.session_id,       // "cs_test_a1vskRuVsc86ycOZWodGBkj74XnkCpSQ..."
  expiresAt:    new Date(Date.now() + 30 * 60 * 1000).toISOString(),  // frontend-calculated, 30 min from now
  stripeUrl:    data.url,              // "https://checkout.stripe.com/c/pay/cs_test_..."
  eventId:      'ev_8187172',
  ticketsParam: '{"tt_6318202":1}',   // JSON string — used to rebuild checkout URL
  name:         'John Doe',
  email:        'john.doe@example.com',
  phone:        '+911234567890',
}))

// Redirect user to Stripe Checkout
window.location.href = data.url`,
          },
          {
            title: "React (useEffect + form)",
            note: null,
            noteBullets: [
              "After creating the session, save all data to `sessionStorage` before redirecting. Store `sessionId`, `expiresAt`, `stripeUrl`, `eventId`, `ticketsParam`, `name`, `email`, and `phone`. These are used to pre-fill the checkout form if the user returns via the browser Back button or the Stripe Cancel page.",
              "The Stripe Checkout session URL is valid for `30 minutes`.",
              "**Frontend must do — On Back button:** When the user returns to the checkout form, read `sessionStorage`. Pre-fill `name`, `email`, `phone` from the stored data. Check `expiresAt` to see if the session is still valid, then clicking Pay again skips the Terms and Conditions and redirects straight to the existing Stripe URL. If expired.",
              "**Scenario** — User tries to pay after 30 minutes. The Stripe session itself has closed and Stripe shows an expiry error. The user must start a new checkout.",
            ],
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const handleSubmit = async () => {
  const { data } = await axios.post(\`\${BASE}/site/checkout/session\`, {
    event_id: eventId,
    items: tickets.map(t => ({ ticket_type_id: t.id, quantity: t.qty })),
    customer_email: email,
    customer_name: name,
    customer_phone: phone,
    customer_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,  // e.g. "Asia/Kolkata" — formats refund email dates in customer's local time
  })

  // Paid event — store all session data before redirecting to Stripe
  sessionStorage.setItem('co_session', JSON.stringify({
    sessionId: data.session_id,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),  // frontend-calculated, 30 min from now
    stripeUrl: data.url,
    eventId, ticketsParam, name, email, phone,
  }))

  window.location.href = data.url
}`,
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
          "Returns the current status of a checkout session. Poll this on your success page after Stripe redirects the user back. The webhook usually arrives 1 to 5 seconds after the redirect.",
        bullets: [
          "After Stripe redirects the user to your success page, poll this endpoint every 3 seconds until status is 'complete', 'refunded', or 'failed'. If no confirmation arrives within 30 seconds, show a message like 'Payment is still verifying. Please check your email in 5 minutes.'.",
          "`status='complete'` means tickets are issued and a confirmation email has been sent. **Safe to show the success screen.**",
          "`status='refunded'` means the payment was charged but tickets could not be issued because they sold out at the exact moment another buyer paid. The charge is automatically refunded. **Show a refund notice, not a payment error.**",
          "`status='pending_recovery'` means a webhook was missed and the backend is auto-recovering. **Keep polling.**",
          "**Never** clear `sessionStorage` before confirming `status='complete'`. You may need it for resume logic.",
        ],
        flow: null,
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
            description: "Paid checkout. Awaiting Stripe webhook.",
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
            description: "Missed webhook detected. Recovery queued.",
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
            description: "Tickets sold out during payment. Charge auto-refunded.",
            body: {
              session_id: "cs_live_abc123xyz",
              status: "refunded",
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
            description: "Payment could not be verified. Show error to user.",
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
            title: "JavaScript",
            note: null,
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const { data } = await axios.get(\`\${BASE}/site/checkout/session/\${sessionId}\`)

// Response fields:
// data.session_id              → "cs_live_abc123xyz"
// data.status                  → "complete" | "pending" | "pending_recovery" | "refunded" | "failed" | "expired"
// data.payments[0].event_id    → "ev_8187172"
// data.payments[0].quantity    → 2
// data.payments[0].total_amount_cents → 10000  ($100.00)
// data.payments[0].status      → matches session status

if (data.status === 'complete') {
  console.log('Tickets issued for', data.payments[0].event_id)
}`,
          },
          {
            title: "React (useEffect)",
            note: null,
            code: `const BASE = 'https://talenta.athivaone.com/api/v1'

const [session, setSession] = useState(null)

useEffect(() => {
  axios.get(\`\${BASE}/site/checkout/session/\${sessionId}\`)
    .then(({ data }) => setSession(data))
}, [sessionId])

// session.status → "complete" | "pending" | "pending_recovery" | "refunded" | "failed"
// session.payments → array of payment objects`,
          },
          {
            title: "Success page polling",
            note: null,
            noteBullets: [
              "Stripe redirects the user to your success page **before** the webhook arrives at the backend. The webhook typically takes `1 to 5 seconds` after the redirect.",
              "Poll every `3 seconds`, up to `10 attempts` (`30 seconds` total). Stop as soon as status is `complete`, `refunded`, or `failed`.",
              "**status = complete** — tickets issued, confirmation email sent. Show the success screen.",
              "**status = refunded** — tickets sold out during payment, charge auto-refunded. Show a refund notice.",
              "**status = failed** — payment could not be verified. Show a payment error screen.",
              "If still `pending` after 10 attempts, show a message like 'Payment is still verifying. Please check your email in 5 minutes.'.",
            ],
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
    ],
  },


]
