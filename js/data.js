// ==========================================================================
// CENTRAL DATA STORE & LOGIC (Indian Healthcare Context & INR Currency ₹)
// ==========================================================================

const SPECIALTIES = [
  { id: 'all', name: 'All Specialties', icon: 'stethoscope', count: 8 },
  { id: 'cardiology', name: 'Cardiology', icon: 'heart-pulse', count: 2, color: 'text-rose-600 bg-rose-50' },
  { id: 'dermatology', name: 'Dermatology', icon: 'sparkles', count: 2, color: 'text-amber-600 bg-amber-50' },
  { id: 'neurology', name: 'Neurology', icon: 'brain', count: 1, color: 'text-purple-600 bg-purple-50' },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'baby', count: 1, color: 'text-blue-600 bg-blue-50' },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'activity', count: 1, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'general', name: 'General Medicine', icon: 'shield-plus', count: 1, color: 'text-teal-600 bg-teal-50' },
];

const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Sharma',
    title: 'MBBS, MD, DM (Cardiology) - Senior Consultant',
    specialty: 'cardiology',
    specialtyName: 'Cardiology',
    avatar: 'user',
    rating: 4.9,
    reviewsCount: 182,
    experienceYears: 16,
    fee: 1200, // In Indian Rupees ₹
    hospital: 'Apollo Hospitals, Indraprastha, New Delhi',
    about: 'Dr. Rajesh Sharma is a leading Cardiologist with over 16 years of expertise in preventive cardiology, hypertension, coronary angioplasty, and heart failure management.',
    education: 'AIIMS New Delhi (MBBS, MD), Sanjay Gandhi PGIMS (DM)',
    languages: ['Hindi', 'English', 'Punjabi'],
    consultationTypes: ['in-person', 'video'],
    featured: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Nair',
    title: 'MBBS, MD, DM (Neurology) - Consultant Neurologist',
    specialty: 'neurology',
    specialtyName: 'Neurology',
    avatar: 'user',
    rating: 4.85,
    reviewsCount: 145,
    experienceYears: 12,
    fee: 1500, // In Indian Rupees ₹
    hospital: 'Fortis Memorial Research Institute, Gurugram',
    about: 'Specializes in migraine management, stroke rehabilitation, peripheral neuropathy, epilepsy, and cognitive neurological disorders.',
    education: 'Christian Medical College (CMC) Vellore, NIMHANS Bengaluru',
    languages: ['English', 'Hindi', 'Malayalam'],
    consultationTypes: ['in-person', 'video'],
    featured: true
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Sen',
    title: 'MBBS, MD (Pediatrics) - Child Care Specialist',
    specialty: 'pediatrics',
    specialtyName: 'Pediatrics',
    avatar: 'user',
    rating: 4.95,
    reviewsCount: 240,
    experienceYears: 14,
    fee: 800, // In Indian Rupees ₹
    hospital: 'Rainbow Children\'s Hospital, Banjara Hills, Hyderabad',
    about: 'Warm, compassionate pediatric care for newborns, toddlers, and adolescents. Special focus on child immunization, nutrition, and growth milestones.',
    education: 'KMC Manipal (MBBS), Lady Hardinge Medical College (MD)',
    languages: ['Hindi', 'English', 'Bengali', 'Telugu'],
    consultationTypes: ['in-person', 'video'],
    featured: true
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikram Malhotra',
    title: 'MBBS, MD (Dermatology & Venereology)',
    specialty: 'dermatology',
    specialtyName: 'Dermatology',
    avatar: 'user',
    rating: 4.88,
    reviewsCount: 190,
    experienceYears: 11,
    fee: 900, // In Indian Rupees ₹
    hospital: 'Max Super Speciality Hospital, Saket, New Delhi',
    about: 'Expert clinical and cosmetic dermatologist specializing in chronic acne, eczema, psoriasis, hair loss therapies, and laser skin treatments.',
    education: 'Maulana Azad Medical College (MAMC), Delhi University',
    languages: ['Hindi', 'English'],
    consultationTypes: ['in-person', 'video'],
    featured: true
  },
  {
    id: 'doc-5',
    name: 'Dr. Suresh Patel',
    title: 'MBBS, MS (Orthopedics) - Joint Replacement Specialist',
    specialty: 'orthopedics',
    specialtyName: 'Orthopedics',
    avatar: 'user',
    rating: 4.78,
    reviewsCount: 115,
    experienceYears: 18,
    fee: 1100, // In Indian Rupees ₹
    hospital: 'Manipal Hospital, HAL Airport Road, Bengaluru',
    about: 'Specializes in robotic knee & hip replacement, sports arthroscopy, spinal alignments, and complex bone fracture surgeries.',
    education: 'BJ Medical College Ahmedabad, Royal College of Surgeons (UK)',
    languages: ['English', 'Hindi', 'Gujarati', 'Kannada'],
    consultationTypes: ['in-person'],
    featured: false
  },
  {
    id: 'doc-6',
    name: 'Dr. Arvind Mehta',
    title: 'MBBS, MD (Internal Medicine) - Physician',
    specialty: 'general',
    specialtyName: 'General Medicine',
    avatar: 'user',
    rating: 4.82,
    reviewsCount: 210,
    experienceYears: 20,
    fee: 600, // In Indian Rupees ₹
    hospital: 'Medanta - The Medicity, Sector 38, Gurugram',
    about: 'Comprehensive primary health care for adults and seniors. Expert in diabetes management, thyroid disorders, and seasonal infections.',
    education: 'King George\'s Medical University (KGMU), Lucknow',
    languages: ['Hindi', 'English'],
    consultationTypes: ['in-person', 'video'],
    featured: false
  },
  {
    id: 'doc-7',
    name: 'Dr. Sunita Kulkarni',
    title: 'MBBS, MD, DNB (Cardiology) - Cardiologist',
    specialty: 'cardiology',
    specialtyName: 'Cardiology',
    avatar: 'user',
    rating: 4.9,
    reviewsCount: 130,
    experienceYears: 15,
    fee: 1400, // In Indian Rupees ₹
    hospital: 'Lilavati Hospital & Research Centre, Bandra, Mumbai',
    about: 'Dedicated interventional cardiologist with expertise in female cardiac health, pacemakers, and non-invasive echo imaging.',
    education: 'Grant Government Medical College & Sir JJ Group of Hospitals, Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    consultationTypes: ['in-person', 'video'],
    featured: false
  },
  {
    id: 'doc-8',
    name: 'Dr. Rohan Kapoor',
    title: 'MBBS, MD (Dermatology) - Pediatric Dermatologist',
    specialty: 'dermatology',
    specialtyName: 'Dermatology',
    avatar: 'user',
    rating: 4.86,
    reviewsCount: 105,
    experienceYears: 10,
    fee: 950, // In Indian Rupees ₹
    hospital: 'Kokilaben Dhirubhai Ambani Hospital, Andheri, Mumbai',
    about: 'Specializes in childhood skin conditions, birthmarks, atopic dermatitis, and allergic skin sensitivities with gentle, child-friendly care.',
    education: 'Seth GS Medical College & KEM Hospital, Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    consultationTypes: ['in-person', 'video'],
    featured: false
  }
];

const DEFAULT_SLOTS = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'],
  evening: ['04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM']
};

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getUpcomingDays(count = 7) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      dateKey: formatDateKey(d),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    });
  }
  return days;
}

function getInitialAppointments() {
  const todayKey = formatDateKey(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  return [
    {
      id: 'APT-1001',
      doctorId: 'doc-1',
      doctorName: 'Dr. Rajesh Sharma',
      doctorSpecialty: 'Cardiology',
      doctorAvatar: INITIAL_DOCTORS[0].avatar,
      patientName: 'Aarav Sharma',
      patientEmail: 'aarav.sharma@example.in',
      patientPhone: '+91 98765 43210',
      patientAge: 32,
      date: todayKey,
      slot: '10:30 AM',
      consultationType: 'in-person',
      symptoms: 'Routine cardiovascular checkup and mild chest tightness after morning walking.',
      fee: 1200,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    },
    {
      id: 'APT-1002',
      doctorId: 'doc-1',
      doctorName: 'Dr. Rajesh Sharma',
      doctorSpecialty: 'Cardiology',
      doctorAvatar: INITIAL_DOCTORS[0].avatar,
      patientName: 'Kavita Verma',
      patientEmail: 'kavita.verma@example.in',
      patientPhone: '+91 91234 56789',
      patientAge: 45,
      date: tomorrowKey,
      slot: '02:00 PM',
      consultationType: 'video',
      symptoms: 'High blood pressure medication review.',
      fee: 1200,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    },
    {
      id: 'APT-1003',
      doctorId: 'doc-2',
      doctorName: 'Dr. Priya Nair',
      doctorSpecialty: 'Neurology',
      doctorAvatar: INITIAL_DOCTORS[1].avatar,
      patientName: 'Aarav Sharma',
      patientEmail: 'aarav.sharma@example.in',
      patientPhone: '+91 98765 43210',
      patientAge: 32,
      date: '2026-09-10',
      slot: '11:00 AM',
      consultationType: 'video',
      symptoms: 'Recurring tension headaches and poor sleep quality.',
      fee: 1500,
      status: 'Completed',
      bookedAt: new Date().toISOString()
    }
  ];
}

const DataStore = {
  getDoctors() {
    try {
      const saved = localStorage.getItem('pulsecare_doctors_inr');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading doctors from localStorage:', e);
    }
    return INITIAL_DOCTORS;
  },

  getDoctorById(id) {
    try {
      const list = this.getDoctors();
      if (!Array.isArray(list) || list.length === 0) {
        return INITIAL_DOCTORS[0];
      }
      const found = list.find(d => d && d.id === id);
      return found || list[0] || INITIAL_DOCTORS[0];
    } catch (e) {
      return INITIAL_DOCTORS[0];
    }
  },

  getSpecialties() {
    return SPECIALTIES;
  },

  getAppointments() {
    try {
      const saved = localStorage.getItem('pulsecare_appointments_inr');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      const initial = getInitialAppointments();
      try {
        localStorage.setItem('pulsecare_appointments_inr', JSON.stringify(initial));
      } catch (e) {}
      return initial;
    } catch (e) {
      console.warn('Error reading appointments from localStorage:', e);
      const initial = getInitialAppointments();
      try {
        localStorage.setItem('pulsecare_appointments_inr', JSON.stringify(initial));
      } catch (err) {}
      return initial;
    }
  },

  isSlotBooked(doctorId, dateKey, slotTime) {
    try {
      const appointments = this.getAppointments();
      return appointments.some(
        apt => apt &&
               apt.doctorId === doctorId &&
               apt.date === dateKey &&
               apt.slot === slotTime &&
               apt.status !== 'Cancelled'
      );
    } catch (e) {
      return false;
    }
  },

  bookAppointment(data) {
    try {
      const appointments = this.getAppointments();
      const newAppointment = {
        ...data,
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        status: 'Confirmed',
        bookedAt: new Date().toISOString()
      };
      appointments.unshift(newAppointment);
      localStorage.setItem('pulsecare_appointments_inr', JSON.stringify(appointments));
      return newAppointment;
    } catch (e) {
      console.error('Failed to book appointment:', e);
      return data;
    }
  },

  cancelAppointment(appointmentId) {
    try {
      const appointments = this.getAppointments();
      const updated = appointments.map(apt => 
        (apt && apt.id === appointmentId) ? { ...apt, status: 'Cancelled' } : apt
      );
      localStorage.setItem('pulsecare_appointments_inr', JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  updateAppointmentStatus(appointmentId, newStatus) {
    try {
      const appointments = this.getAppointments();
      const updated = appointments.map(apt => 
        (apt && apt.id === appointmentId) ? { ...apt, status: newStatus } : apt
      );
      localStorage.setItem('pulsecare_appointments_inr', JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  getCurrentRole() {
    try {
      const role = localStorage.getItem('pulsecare_role_inr');
      return (typeof role === 'string' && role.trim()) ? role : 'patient';
    } catch (e) {
      return 'patient';
    }
  },

  setCurrentRole(role) {
    try {
      localStorage.setItem('pulsecare_role_inr', String(role || 'patient'));
    } catch (e) {}
  },

  resetAllData() {
    try {
      localStorage.removeItem('pulsecare_appointments_inr');
      localStorage.removeItem('pulsecare_doctors_inr');
      localStorage.removeItem('pulsecare_role_inr');
      localStorage.removeItem('pulsecare_theme');
    } catch (e) {}
  }
};

// Theme Manager for Dark Mode Support
const ThemeManager = {
  getTheme() {
    return localStorage.getItem('pulsecare_theme') || 'light';
  },
  setTheme(theme) {
    localStorage.setItem('pulsecare_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
};

// Initialize theme on load
if (ThemeManager.getTheme() === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Explicitly attach to window for global access across all pages
window.DataStore = DataStore;
window.ThemeManager = ThemeManager;
window.formatDateKey = formatDateKey;
window.getUpcomingDays = getUpcomingDays;
window.SPECIALTIES = SPECIALTIES;
window.INITIAL_DOCTORS = INITIAL_DOCTORS;
window.DEFAULT_SLOTS = DEFAULT_SLOTS;
