import { Profile } from '@/features/profile';

const profilesData: Profile[] = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    name: "Ahmed Ali",
    age: 28,
    email: "ahmed.ali@dev.com",
    phone: "+1-555-0101",
    role: "admin",
    status: "active",
    interests: ["Frontend", "JavaScript", "React"]
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7",
    name: "Sarah Mohammed",
    age: 25,
    email: "sarah.dev@code.com",
    phone: "+1-555-0102",
    role: "editor",
    status: "active",
    interests: ["Backend", "Python", "Testing"]
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7r8",
    name: "Omar Hassan",
    age: 32,
    email: "omar@fullstack.com",
    phone: "+1-555-0103",
    role: "admin",
    status: "active",
    interests: ["Backend", "DevOps", "Full Stack"]
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-n4o5p6q7r8s9",
    name: "Lina Khalid",
    age: 24,
    email: "lina@design.com",
    phone: "+1-555-0104",
    role: "editor",
    status: "active",
    interests: ["Design", "Frontend", "UI/UX"]
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-3m4n-o5p6q7r8s9t0",
    name: "Kareem Sami",
    age: 30,
    email: "kareem@backend.com",
    phone: "+1-555-0105",
    role: "viewer",
    status: "active",
    interests: ["Backend", "Java", "Databases"]
  },
  {
    id: "6f7g8h9i-0j1k-2l3m-4n5o-p6q7r8s9t0u1",
    name: "Nour Ahmed",
    age: 26,
    email: "nour@mobile.com",
    phone: "+1-555-0106",
    role: "editor",
    status: "idle",
    interests: ["Mobile", "Frontend", "React Native"]
  },
  {
    id: "7g8h9i0j-1k2l-3m4n-5o6p-q7r8s9t0u1v2",
    name: "Yousef Ibrahim",
    age: 35,
    email: "yousef@ai.com",
    phone: "+1-555-0107",
    role: "admin",
    status: "active",
    interests: ["AI/ML", "Data Science", "Python"]
  },
  {
    id: "8h9i0j1k-2l3m-4n5o-6p7q-r8s9t0u1v2w3",
    name: "Mona Samir",
    age: 29,
    email: "mona@testing.com",
    phone: "+1-555-0108",
    role: "user",
    status: "active",
    interests: ["Testing", "QA", "Automation"]
  },
  {
    id: "9i0j1k2l-3m4n-5o6p-7q8r-s9t0u1v2w3x4",
    name: "Hassan Rashed",
    age: 27,
    email: "hassan@devops.com",
    phone: "+1-555-0109",
    role: "editor",
    status: "active",
    interests: ["DevOps", "Cloud", "Infrastructure"]
  },
  {
    id: "0j1k2l3m-4n5o-6p7q-8r9s-t0u1v2w3x4y5",
    name: "Fatima Omar",
    age: 31,
    email: "fatima@frontend.com",
    phone: "+1-555-0110",
    role: "viewer",
    status: "inactive",
    interests: ["Frontend", "Design", "Animation"]
  },
  {
    id: "1k2l3m4n-5o6p-7q8r-9s0t-u1v2w3x4y5z6",
    name: "Majid Salem",
    age: 33,
    email: "majid@database.com",
    phone: "+1-555-0111",
    role: "user",
    status: "active",
    interests: ["Databases", "Backend", "SQL"]
  },
  {
    id: "2l3m4n5o-6p7q-8r9s-0t1u-v2w3x4y5z6a7",
    name: "Reem Khalil",
    age: 23,
    email: "reem@web.com",
    phone: "+1-555-0112",
    role: "editor",
    status: "active",
    interests: ["Web Development", "Frontend", "JavaScript"]
  },
  {
    id: "3m4n5o6p-7q8r-9s0t-1u2v-w3x4y5z6a7b8",
    name: "Tariq Nasser",
    age: 36,
    email: "tariq@security.com",
    phone: "+1-555-0113",
    role: "admin",
    status: "idle",
    interests: ["Cyber Security", "Networking", "DevOps"]
  },
  {
    id: "4n5o6p7q-8r9s-0t1u-2v3w-x4y5z6a7b8c9",
    name: "Layla Faisal",
    age: 28,
    email: "layla@fullstack.com",
    phone: "+1-555-0114",
    role: "editor",
    status: "active",
    interests: ["Full Stack", "Frontend", "Backend"]
  },
  {
    id: "5o6p7q8r-9s0t-1u2v-3w4x-y5z6a7b8c9d0",
    name: "Zayed Mohammed",
    age: 26,
    email: "zayed@mobile.com",
    phone: "+1-555-0115",
    role: "user",
    status: "active",
    interests: ["Mobile", "iOS", "Android"]
  },
  {
    id: "6p7q8r9s-0t1u-2v3w-4x5y-z6a7b8c9d0e1",
    name: "Aisha Hamad",
    age: 30,
    email: "aisha@design.com",
    phone: "+1-555-0116",
    role: "editor",
    status: "active",
    interests: ["Design", "UI/UX", "Prototyping"]
  },
  {
    id: "7q8r9s0t-1u2v-3w4x-5y6z-a7b8c9d0e1f2",
    name: "Fahad Rashid",
    age: 34,
    email: "fahad@backend.com",
    phone: "+1-555-0117",
    role: "admin",
    status: "active",
    interests: ["Backend", ".NET", "Microservices"]
  },
  {
    id: "8r9s0t1u-2v3w-4x5y-6z7a-b8c9d0e1f2g3",
    name: "Nada Salem",
    age: 25,
    email: "nada@testing.com",
    phone: "+1-555-0118",
    role: "viewer",
    status: "inactive",
    interests: ["Testing", "QA", "Automation"]
  },
  {
    id: "9s0t1u2v-3w4x-5y6z-7a8b-c9d0e1f2g3h4",
    name: "Khalid Mansour",
    age: 32,
    email: "khalid@ai.com",
    phone: "+1-555-0119",
    role: "editor",
    status: "active",
    interests: ["AI/ML", "Deep Learning", "Python"]
  },
  {
    id: "0t1u2v3w-4x5y-6z7a-8b9c-d0e1f2g3h4i5",
    name: "Huda Ahmed",
    age: 27,
    email: "huda@web.com",
    phone: "+1-555-0120",
    role: "user",
    status: "active",
    interests: ["Web Development", "JavaScript", "APIs"]
  },
  {
    id: "1u2v3w4x-5y6z-7a8b-9c0d-e1f2g3h4i5j6",
    name: "Rashid Omar",
    age: 29,
    email: "rashid@cloud.com",
    phone: "+1-555-0121",
    role: "admin",
    status: "active",
    interests: ["Cloud", "DevOps", "Infrastructure"]
  },
  {
    id: "2v3w4x5y-6z7a-8b9c-0d1e-f2g3h4i5j6k7",
    name: "Salma Youssef",
    age: 26,
    email: "salma@frontend.com",
    phone: "+1-555-0122",
    role: "editor",
    status: "idle",
    interests: ["Frontend", "TypeScript", "React"]
  },
  {
    id: "3w4x5y6z-7a8b-9c0d-1e2f-g3h4i5j6k7l8",
    name: "Abdullah Nasser",
    age: 31,
    email: "abdullah@mobile.com",
    phone: "+1-555-0123",
    role: "user",
    status: "active",
    interests: ["Mobile", "Android", "Kotlin"]
  },
  {
    id: "4x5y6z7a-8b9c-0d1e-2f3g-h4i5j6k7l8m9",
    name: "Mariam Hassan",
    age: 28,
    email: "mariam@design.com",
    phone: "+1-555-0124",
    role: "viewer",
    status: "active",
    interests: ["Design", "UX Research", "User Testing"]
  },
  {
    id: "5y6z7a8b-9c0d-1e2f-3g4h-i5j6k7l8m9n0",
    name: "Saeed Khalaf",
    age: 35,
    email: "saeed@backend.com",
    phone: "+1-555-0125",
    role: "admin",
    status: "active",
    interests: ["Backend", "Microservices", "DevOps"]
  },
  {
    id: "6z7a8b9c-0d1e-2f3g-4h5i-j6k7l8m9n0o1",
    name: "Amira Tariq",
    age: 24,
    email: "amira@testing.com",
    phone: "+1-555-0126",
    role: "editor",
    status: "active",
    interests: ["Testing", "Quality Assurance", "Automation"]
  },
  {
    id: "7a8b9c0d-1e2f-3g4h-5i6j-k7l8m9n0o1p2",
    name: "Hamad Zayed",
    age: 30,
    email: "hamad@ai.com",
    phone: "+1-555-0127",
    role: "user",
    status: "inactive",
    interests: ["AI/ML", "Natural Language Processing", "Python"]
  },
  {
    id: "8b9c0d1e-2f3g-4h5i-6j7k-l8m9n0o1p2q3",
    name: "Noor Fahad",
    age: 27,
    email: "noor@web.com",
    phone: "+1-555-0128",
    role: "editor",
    status: "active",
    interests: ["Web Development", "Frontend", "Performance"]
  },
  {
    id: "9c0d1e2f-3g4h-5i6j-7k8l-m9n0o1p2q3r4",
    name: "Mohammed Rashid",
    age: 33,
    email: "mohammed@database.com",
    phone: "+1-555-0129",
    role: "admin",
    status: "active",
    interests: ["Databases", "Backend", "Optimization"]
  },
  {
    id: "0d1e2f3g-4h5i-6j7k-8l9m-n0o1p2q3r4s5",
    name: "Joud Ahmed",
    age: 26,
    email: "joud@fullstack.com",
    phone: "+1-555-0130",
    role: "user",
    status: "active",
    interests: ["Full Stack", "Web Development", "JavaScript"]
  }
];

export default profilesData;