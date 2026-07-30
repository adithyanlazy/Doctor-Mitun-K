// `doctor` and `doctorSquare` are the real photograph of Dr. Mithun K.
// Everything else is generated imagery — clinic, treatment and aligner are
// objects/rooms only, never a stand-in person. Do not generate portraits:
// a text-to-image model produces a different face, which on a real
// clinician's site is misrepresentation.
import doctor from '../assets/mithun-portrait.jpg'
import doctorSquare from '../assets/mithun-square.jpg'
import clinic from '../assets/clinic.jpg'
import treatment from '../assets/treatment.jpg'
import aligner from '../assets/aligner.jpg'
import case1Before from '../assets/case1-before.jpg'
import case1After from '../assets/case1-after.jpg'
import case2Before from '../assets/case2-before.jpg'
import case2After from '../assets/case2-after.jpg'
import case3Before from '../assets/case3-before.jpg'
import case3After from '../assets/case3-after.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'

export const img = { doctor, doctorSquare, clinic, treatment, aligner }

// The doctor IS the brand: an internationally qualified, academic orthodontist.
// Positioning is clinician + educator + researcher — not "aligner provider".
// No aligner brand names anywhere: generic "clear aligner" language only.
export const brand = {
  doctor: 'Dr. Mithun K',
  short: 'Dr. Mithun',
  initials: 'MK',
  role: 'Orthodontist',
  credential: 'BDS · MDS · M.Orth RCPS (Glasg) · M.Orth RCSEd',
  title: 'Internationally Qualified Orthodontist · Digital Orthodontics',
  academicPost: 'Reader — Dept. of Orthodontics & Dentofacial Orthopaedics, Yenepoya Dental College',
  tagline: 'Engineering confident smiles with precision.',
  region: 'Dakshina Kannada',
  city: 'Mangalore',
  // TODO(client): real contact details not yet supplied — placeholders below.
  phone: '+91 98450 21000',
  phoneHref: '+919845021000',
  whatsapp: '919845021000',
  email: 'care@drmithunk.in',
}

// Partner clinics where he consults.
//
// Names and areas were resolved from the Google Maps / share links the client
// supplied — the short links carry the place name in their redirect target.
// Three of the nineteen supplied links were dropped rather than published:
//   · Prasad Netralaya, Lalbagh — an eye hospital, not a dental clinic
//   · Dr. THAJ Laser Skin & Hair Clinic, Thalassery (Kerala) — skin and hair,
//     and it appeared twice in the list
// One more pair was a duplicate: two separate entries both resolved to Kiran
// Dental Clinic. That leaves fifteen distinct dental locations.
//
// TODO(client): confirm this list, and supply the fields marked null below.
// Nothing here is guessed — a field the client has not supplied stays null and
// the clinic page simply omits that line rather than inventing one.
//
// Field notes:
//   slug     — the deep-link target: /clinics#<slug>, linked from the home list
//   city     — the town the map link resolves to. Drives the city filter in the
//              booking panel; only Mangalore and Kasaragod occur.
//   area     — a real locality only. Where the client's line described the
//              resident dentist rather than a place it was moved to `note`.
//   address  — full postal address, for the clinic page. Not yet supplied.
//   phone    — the clinic's own reception line. Not yet supplied; until it is,
//              every booking routes through the doctor's WhatsApp desk.
//   days     — his consulting days there, as prose. Never supplied for any clinic.
//   consultingDays — the same fact, machine-readable: the weekdays he sits at
//              that clinic, as day numbers (0 = Sunday … 6 = Saturday), e.g.
//              [1, 4] for "Mondays & Thursdays". The booking form checks the
//              date the visitor picks against this. NOT supplied for any clinic
//              yet, and deliberately not guessed — while it is null the form
//              accepts any date and says plainly that the desk will confirm the
//              day. Fill it in and the check, the warning and the "next
//              available" suggestions all start working for that clinic.
//   mapQuery — what the embedded map searches for. Kept separate from `mapUrl`
//              because the short share links do not render inside an iframe.
export const locations = [
  {
    slug: 't32-smile-lounge',
    name: 'T32 Smile Lounge',
    city: 'Mangalore',
    area: 'City Square, MG Road, Ballalbagh',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://maps.app.goo.gl/csHQP6nt7faSDoSS8',
    mapQuery: 'T32 Smile Lounge, City Square, MG Road, Ballalbagh, Mangalore',
  },
  {
    slug: 't32-dental-care-kavoor',
    name: 'T32 Dental Care Clinic & Implant Centre',
    city: 'Mangalore',
    area: 'Kavoor',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://maps.app.goo.gl/A9ppWEyMNJ9L9fse6',
    mapQuery: 'T32 Dental Care Clinic & Implant Centre, Kavoor, Mangalore',
  },
  {
    slug: 'chatras-dental-speciality',
    name: "Chatra's Dental Speciality Clinic",
    city: 'Mangalore',
    area: 'Athena Hospital Complex, Falnir Road',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/q3SHkyE6YJRRM8Ipo',
    mapQuery: "Chatra's Dental Speciality Clinic, Falnir Road, Mangalore",
  },
  {
    slug: 'ashwinis-care-32',
    name: "Ashwini's Care 32 Multispeciality Dental Clinic",
    city: 'Mangalore',
    area: 'Ujjodi, Pumpwell',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/8dPqZb4fqWYV9kPhs',
    mapQuery: "Ashwini's Care 32 Multispeciality Dental Clinic, Ujjodi, Pumpwell, Mangalore",
  },
  {
    slug: 'dr-rubeenas-dental-line',
    name: "Dr. Rubeena's Dental Line",
    city: 'Mangalore',
    area: null, // TODO(client)
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl:
      "https://www.google.com/search?kgmid=%2Fg%2F11m5trd75x&hl=en-IN&q=Dr%20Rubeena's%20Dental%20Line",
    mapQuery: "Dr. Rubeena's Dental Line, Mangalore",
  },
  {
    slug: 'cardiac-care-and-dental-care',
    name: 'Cardiac Care and Dental Care',
    city: 'Mangalore',
    area: 'Collectors Gate, Mallikatte, Kadri',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://maps.app.goo.gl/h2oPQmHroRvLHG689',
    mapQuery: 'Cardiac Care and Dental Care, Mallikatte, Kadri, Mangalore',
  },
  {
    slug: 'dental-chamber-prashanth-shenoy',
    name: 'Dental Chamber — Dr. Prashanth Shenoy',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: 'A specialty dental clinic',
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/lqWujSxVP8Pz9cZwX',
    mapQuery: 'Dental Chamber Dr. Prashanth Shenoy, Mangalore',
  },
  {
    slug: 'kiran-dental-clinic',
    name: 'Kiran Dental Clinic',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/ZMAJLGzQEShvkByIZ',
    mapQuery: 'Kiran Dental Clinic, Mangalore',
  },
  {
    slug: 'roots-dental',
    name: 'Roots Dental',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: 'Dr. Sharath Pare, MDS — Endodontist',
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/egZMJVpYbtEPTlAKc',
    mapQuery: 'Roots Dental, Mangalore',
  },
  {
    slug: 'dental-speciality-clinic',
    name: 'Dental Speciality Clinic',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: 'Dr. Rajesh K S & Dr. Roopashri R K',
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/h0qhE4NRewbNhUUtW',
    mapQuery: 'Dental Speciality Clinic Dr. Rajesh K S, Mangalore',
  },
  {
    slug: 'smile-care-yedapadavu',
    name: 'Smile Care Dental Speciality Clinic',
    city: 'Mangalore',
    area: 'Yedapadavu',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://maps.app.goo.gl/YvXuUDjyACiypAXZA',
    mapQuery: 'Smile Care Dental Speciality Clinic, Yedapadavu, Mangalore',
  },
  {
    slug: 'amba-dental-practice',
    name: 'Amba Dental Practice',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/s0WEGt1OlwY3lHXU7',
    mapQuery: 'Amba Dental Practice, Mangalore',
  },
  {
    slug: 'aryashree-dental-clinic',
    name: 'Aryashree Dental Clinic',
    city: 'Mangalore',
    area: null, // TODO(client)
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/VMSLBJHJZbbrWRDh3',
    mapQuery: 'Aryashree Dental Clinic, Mangalore',
  },
  {
    slug: 'classic-dental-care-periya',
    name: 'Classic Dental Care & Orthodontic Centre',
    city: 'Kasaragod',
    area: 'Periya, Kasaragod',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/3rMmO3aeLsCTtQKeM',
    mapQuery: 'Classic Dental Care & Orthodontic Centre, Periya, Kasaragod',
  },
  {
    slug: 'joyce-mathias-face-dental',
    name: 'Dr. Joyce Mathias — Face & Dental Speciality Clinic',
    city: 'Mangalore',
    area: 'Lower Bendoor, Kankanady',
    note: null,
    address: null, // TODO(client)
    phone: null, // TODO(client)
    days: null, // TODO(client)
    consultingDays: null, // TODO(client)
    mapUrl: 'https://share.google/iA97d5KFHeYGKI6cS',
    mapQuery: 'Dr. Joyce Mathias Face & Dental Speciality Clinic, Bendoor, Mangalore',
  },
]

export const locationsCount = locations.length

export const locationBySlug = (slug) => locations.find((l) => l.slug === slug) || null

/** Towns to filter by, in the order they first appear above. */
export const bookingCities = [...new Set(locations.map((l) => l.city))]

/**
 * Localities inside one town, alphabetical. Clinics whose locality the client
 * has not supplied yet simply do not appear in this list — they are still
 * reachable through search and through the "any area" default.
 */
export const areasIn = (city) =>
  [
    ...new Set(
      locations.filter((l) => (city ? l.city === city : true) && l.area).map((l) => l.area),
    ),
  ].sort((a, b) => a.localeCompare(b))

/**
 * Booking form options, shared by the clinic page and the contact form.
 * Times are ranges rather than exact slots: his consulting days per clinic are
 * not published yet, so the desk confirms the actual slot on WhatsApp.
 */
export const bookingConcerns = [
  'Orthodontic consultation',
  'Clear aligners',
  'Braces (metal or ceramic)',
  'Early treatment for a child',
  'Adult orthodontics',
  'Complex or surgical case',
  'Second opinion',
]

export const bookingTimes = [
  'Any time — you suggest',
  'Weekday morning',
  'Weekday evening',
  'Saturday',
  'Sunday',
]

export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Clinics', to: '/clinics' },
  { label: 'Process', to: '/process' },
  { label: 'Results', to: '/results' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// Verifiable credentials in place of counters. Every line here is a documented
// fact — no case counts, no years-in-practice, nothing invented.
export const credentialTiles = [
  { value: 'M.Orth ×2', label: 'Royal College memberships' },
  { value: 'Reader', label: 'Yenepoya Dental College' },
  { value: 'Famdent', label: 'Highly Commendable Orthodontist' },
  { value: 'Advisor', label: 'International — RCPS Glasgow' },
]

// Hero chips. Deliberately NOT the degrees — the mono line above them already
// carries `brand.credential`. These add the appointment and the award, and are
// kept to two so they stay on one row and the hero fits a short laptop screen.
export const heroCredentials = ['Reader — Yenepoya Dental College', 'Famdent Awarded']

export const credentials = [
  'BDS — Bachelor of Dental Surgery',
  'MDS — Orthodontics & Dentofacial Orthopaedics',
  'M.Orth RCPS — Royal College of Physicians & Surgeons of Glasgow',
  'M.Orth RCSEd — Royal College of Surgeons of Edinburgh',
  'Reader — Dept. of Orthodontics, Yenepoya Dental College',
  'International Advisor — RCPS Glasgow',
]

export const honors = [
  {
    title: 'Dual Royal College Membership',
    note: 'M.Orth from both Glasgow and Edinburgh — held by few orthodontists in India',
    icon: 'college',
  },
  {
    title: 'Highly Commendable Orthodontist of the Year',
    note: 'Famdent Awards',
    icon: 'trophy',
  },
  {
    title: 'International Advisor',
    note: 'Royal College of Physicians & Surgeons of Glasgow',
    icon: 'advisor',
  },
  {
    title: 'Published Researcher & Scientific Reviewer',
    note: 'Peer-reviewed orthodontic literature',
    icon: 'research',
  },
]

// Institutions and bodies behind the credentials — marquee.
export const recognition = [
  'Royal College of Physicians & Surgeons of Glasgow',
  'Royal College of Surgeons of Edinburgh',
  'Yenepoya Dental College',
  'Famdent Awards',
  'Continuing Dental Education',
  'Peer-Reviewed Research',
]

// Academic and speaking record. No fabricated years, venues or counts — only
// what the client has confirmed. Add dated entries as they are supplied.
export const academics = [
  {
    title: 'Reader — Orthodontics & Dentofacial Orthopaedics',
    venue: 'Yenepoya Dental College, Mangalore',
    detail: 'Teaches and mentors postgraduate orthodontic residents.',
  },
  {
    title: 'International Advisor',
    venue: 'Royal College of Physicians & Surgeons of Glasgow',
    detail: 'Advisory role supporting the College’s international programmes.',
  },
  {
    title: 'National & international speaker',
    venue: 'Scientific conferences in orthodontics',
    detail: 'Invited to lecture on digital workflows and clear aligner therapy.',
  },
  {
    title: 'Continuing Dental Education',
    venue: 'Programmes organised & convened',
    detail: 'Hands-on courses for practising dentists and orthodontists.',
  },
  {
    title: 'Scientific reviewer',
    venue: 'Peer-reviewed journals',
    detail: 'Reviews submitted orthodontic research prior to publication.',
  },
  {
    title: 'Clinical research',
    venue: 'Published work in orthodontics',
    detail: 'Ongoing research into digital planning and appliance design.',
  },
]

export const researchAreas = [
  'Clinical research in orthodontics',
  'Digital orthodontic workflows',
  'In-house clear aligner systems',
  'Artificial intelligence in orthodontics',
  'Postgraduate orthodontic education',
  'Continuing Dental Education programmes',
]

// The digital diagnostic sequence every case begins with.
export const digitalWorkflow = [
  { t: 'Intraoral digital scanning', d: 'A high-definition 3D scan of your teeth — no trays, no impression material.' },
  { t: '3D smile simulation', d: 'See your projected result on screen before treatment begins.' },
  { t: 'Digital treatment planning', d: 'Every tooth movement is planned and sequenced digitally.' },
  { t: 'Clear aligner workflow', d: 'Aligner staging designed and checked case by case.' },
  { t: 'Precision appliance design', d: 'Appliances designed to your anatomy, not to a template.' },
]

export const advantages = [
  'Intraoral digital scanning',
  '3D smile simulation',
  'Digital treatment planning',
  'Precision appliance design',
  'Facial-aesthetic case analysis',
  'Evidence-based, academically grounded',
]

export const eligibility = ['Children', 'Adolescents', 'Adults', 'Professionals', 'Complex cases']

// Reasons patients choose him — straight from the positioning brief.
export const whyChoose = [
  'Internationally qualified orthodontist',
  'Dual Royal College memberships',
  'Academician & researcher',
  'Digital orthodontics expert',
  'Advanced clear aligner treatment',
  'Evidence-based clinical care',
  'Care for children & adults alike',
  'Personalised treatment planning',
  'Modern digital smile design',
  'Long-term retention & stability',
]

export const journey = [
  { t: 'Consultation & facial analysis', d: 'Dr. Mithun assesses your bite, facial aesthetics and dental health, and listens to what you want changed.' },
  { t: 'Intraoral digital scan', d: 'A 3D scan captures your teeth in high definition — no messy impressions.' },
  { t: 'Records & diagnosis', d: 'Radiographs and clinical records are read together to reach a precise diagnosis.' },
  { t: '3D smile simulation', d: 'You see a simulation of your projected result before committing to treatment.' },
  { t: 'Digital treatment plan', d: 'Every movement is planned and staged digitally, then reviewed with you on screen.' },
  { t: 'Appliance design & fitting', d: 'Aligners or fixed appliances are designed to your anatomy and fitted with care.' },
  { t: 'Active treatment', d: 'Planned reviews keep tooth movement on schedule, with clear guidance at every stage.' },
  { t: 'Finishing & refinement', d: 'Fine detailing at the finish — the difference between straight and properly finished.' },
  { t: 'Retention & stability', d: 'Custom retainers and a long-term retention plan hold the result in place.' },
]

// TODO(client) — IMPORTANT BEFORE LAUNCH:
// These intraoral photographs are borrowed from the White Teeth Dental build.
// They are real cases, but they are NOT Dr. Mithun's, and the site presents
// them as his work. They must be replaced with his own documented cases,
// with written patient consent, before this goes anywhere public.
// Treatment durations are deliberately absent — they are not known for these
// cases and will not be invented.
export const cases = [
  {
    id: 'crowding',
    label: 'Crowding',
    note: 'Severe crowding with a blocked-out lower tooth, resolved into an even, well-aligned arch.',
    before: case1Before,
    after: case1After,
  },
  {
    id: 'spacing',
    label: 'Spacing',
    note: 'Generalised spacing and a midline gap closed, with the bite settled into contact.',
    before: case2Before,
    after: case2After,
  },
  {
    id: 'smile',
    label: 'Smile aesthetics',
    note: 'Front teeth evened out for a balanced, symmetrical smile line.',
    before: case3Before,
    after: case3After,
  },
]

// Placeholder testimonials — replace with real, consented patient feedback
// (the brief also calls for video testimonials) before launch.
export const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'Orthodontic patient · Mangalore',
    avatar: p1,
    quote:
      'Dr. Mithun explained the whole plan on screen before we started, so I knew exactly what my teeth would do and when. Nothing about it felt rushed.',
  },
  {
    name: 'Karthik Nayak',
    role: 'Software engineer · Surathkal',
    avatar: p2,
    quote:
      'I wanted a discreet option that would still fix a real bite problem. He gave me an honest assessment rather than selling me the easy answer.',
  },
  {
    name: 'Deepa Shenoy',
    role: 'Mother of a teen patient',
    avatar: p3,
    quote:
      'My daughter started treatment at thirteen. He was patient with her questions and precise with her appointments — we always knew where things stood.',
  },
]

export const faqs = [
  {
    q: 'What makes Dr. Mithun’s qualifications different?',
    a: 'Beyond BDS and MDS in Orthodontics & Dentofacial Orthopaedics, he holds Membership in Orthodontics from both the Royal College of Physicians and Surgeons of Glasgow and the Royal College of Surgeons of Edinburgh — a dual international qualification held by few orthodontists in India. He is also a Reader at Yenepoya Dental College, where he teaches postgraduates and conducts research.',
  },
  {
    q: 'Do you treat children, or only adults?',
    a: 'Both. Early interceptive treatment guides jaw growth in children and can prevent more complex problems later. Adolescents, adults and working professionals are treated with the option best suited to their case — from discreet clear aligners to modern fixed appliances.',
  },
  {
    q: 'Are clear aligners the only option?',
    a: 'No. Clear aligners are one option among several — metal and ceramic braces, early growth modification, surgical orthodontics and interdisciplinary care for impacted teeth all have their place. The right appliance follows the diagnosis, not the other way around.',
  },
  {
    q: 'What does “digital orthodontics” actually mean here?',
    a: 'Every case begins with an intraoral digital scan. From that scan come a 3D smile simulation, a digitally planned and staged treatment, and appliances designed to your anatomy. You see your projected result on screen before treatment starts.',
  },
  {
    q: 'How long will my treatment take?',
    a: 'It depends on the diagnosis. Minor spacing can resolve in well under a year; comprehensive crowding, bite correction or surgical cases take longer. You will be given a specific estimate after your scan and records — not a number picked before anyone has looked at your teeth.',
  },
  {
    q: 'Is orthodontic treatment painful?',
    a: 'Modern orthodontics is far gentler than its reputation. Expect mild pressure for a day or two after an adjustment; it settles quickly and means the teeth are moving.',
  },
  {
    q: 'Can complex cases be treated here?',
    a: 'Yes. Impacted canines, severe skeletal discrepancies requiring surgical orthodontics in collaboration with oral and maxillofacial surgeons, and interdisciplinary cases needing several specialists are all managed with a planned, staged approach.',
  },
  {
    q: 'Where does Dr. Mithun consult?',
    a: `He consults at ${locations.length} partner clinics across Mangalore in addition to his academic post at Yenepoya Dental College. Get in touch and you will be placed at the location most convenient for you.`,
  },
  {
    q: 'What happens after my braces or aligners come off?',
    a: 'Retention. A result that is not retained will drift, so every plan includes custom retainers and a long-term stability plan from the outset — it is part of the treatment, not an afterthought.',
  },
]

export const treatmentTypes = [
  {
    name: 'Clear aligners',
    for: 'Discreet correction',
    desc: 'Personalised clear aligner treatment using advanced digital planning — for mild, moderate and complex cases.',
  },
  {
    name: 'Metal & ceramic braces',
    for: 'Fixed appliances',
    desc: 'Modern fixed appliance therapy designed for predictable, efficient and aesthetic tooth movement.',
  },
  {
    name: 'Early orthodontic treatment',
    for: 'Children',
    desc: 'Growth modification and interceptive orthodontics to guide jaw development and prevent later problems.',
  },
  {
    name: 'Adult orthodontics',
    for: 'Adults & professionals',
    desc: 'Discreet treatment options designed around working life for adults seeking smile enhancement.',
  },
  {
    name: 'Surgical orthodontics',
    for: 'Skeletal cases',
    desc: 'Comprehensive management of severe skeletal discrepancies, in collaboration with oral and maxillofacial surgeons.',
  },
  {
    name: 'Impacted teeth & complex cases',
    for: 'Interdisciplinary',
    desc: 'Advanced planning for impacted canines and multidisciplinary orthodontic care.',
  },
]

export const blogPosts = [
  {
    title: 'Braces or clear aligners? An orthodontist’s honest comparison',
    excerpt: 'Visibility, comfort, control and the cases where one genuinely outperforms the other — without the marketing.',
    category: 'Guides',
    date: 'Jul 12, 2026',
    read: '6 min',
    image: case1After,
  },
  {
    title: 'What happens at your first orthodontic visit',
    excerpt: 'From the intraoral scan to seeing your 3D smile simulation on screen — the whole first appointment, step by step.',
    category: 'Process',
    date: 'Jun 28, 2026',
    read: '4 min',
    image: treatment,
  },
  {
    title: 'When should a child first see an orthodontist?',
    excerpt: 'Why interceptive treatment is about timing, and what growth modification can prevent if it is started early enough.',
    category: 'Children',
    date: 'Jun 15, 2026',
    read: '5 min',
    image: clinic,
  },
  {
    title: 'Retention: why the last phase decides the result',
    excerpt: 'Teeth drift. Here is what long-term stability actually requires once the appliances come off.',
    category: 'Clinical',
    date: 'May 30, 2026',
    read: '3 min',
    image: case2After,
  },
  {
    title: 'Adult orthodontics: it is not too late',
    excerpt: 'Why more professionals in their thirties, forties and beyond are starting treatment — and what changes for adult cases.',
    category: 'Guides',
    date: 'May 18, 2026',
    read: '5 min',
    image: aligner,
  },
  {
    title: 'Artificial intelligence in orthodontics: where it helps',
    excerpt: 'Notes from ongoing research on what AI genuinely improves in diagnosis and planning — and what it does not.',
    category: 'Research',
    date: 'Apr 26, 2026',
    read: '6 min',
    image: doctorSquare,
  },
]
