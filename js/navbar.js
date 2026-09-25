// ==========================================================================
// SHARED NAVBAR & FOOTER COMPONENT (Injected into every page)
// ==========================================================================

function renderNavbar(activePage) {
  const currentRole = DataStore.getCurrentRole();
  const appointments = DataStore.getAppointments();
  const upcomingCount = appointments.filter(
    a => a.status === 'Confirmed' && a.patientName === 'Alex Morgan'
  ).length;

  const headerHtml = `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Brand Logo -->
          <a href="index.html" class="flex items-center gap-3 select-none group">
            <div class="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <i data-lucide="heart-pulse" class="w-6 h-6 stroke-[2.5]"></i>
            </div>
            <div>
              <span class="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1">
                Pulse<span class="text-teal-600">Care</span>
              </span>
              <span class="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                Healthcare Booking
              </span>
            </div>
          </a>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 text-sm font-medium">
            <a href="index.html" class="px-4 py-2 rounded-full transition-all ${
              activePage === 'home' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }">
              Home
            </a>
            <a href="doctors.html" class="px-4 py-2 rounded-full transition-all ${
              activePage === 'doctors' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }">
              Find Doctors
            </a>
            <a href="appointments.html" class="px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              activePage === 'appointments' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }">
              <span>My Appointments</span>
              ${upcomingCount > 0 ? `<span class="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">${upcomingCount}</span>` : ''}
            </a>
            <a href="doctor-dashboard.html" class="px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              activePage === 'doctor-dashboard' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }">
              <i data-lucide="stethoscope" class="w-4 h-4"></i>
              <span>Doctor Portal</span>
            </a>
          </nav>

          <!-- Right Role Switcher -->
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span class="text-slate-500 font-medium hidden sm:inline">Role:</span>
              <select id="roleSwitcher" class="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer">
                <option value="patient" ${currentRole === 'patient' ? 'selected' : ''}>👤 Patient (Alex Morgan)</option>
                <option value="doc-1" ${currentRole === 'doc-1' ? 'selected' : ''}>🩺 Dr. Sarah Johnson (Cardiology)</option>
                <option value="doc-2" ${currentRole === 'doc-2' ? 'selected' : ''}>🧠 Dr. Marcus Chen (Neurology)</option>
                <option value="doc-3" ${currentRole === 'doc-3' ? 'selected' : ''}>👶 Dr. Elena Rodriguez (Pediatrics)</option>
              </select>
            </div>

            <a href="doctors.html" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-600/20 transition-all active:scale-95">
              <i data-lucide="calendar-plus" class="w-4 h-4"></i>
              <span>Book Visit</span>
            </a>
          </div>

        </div>
      </div>

      <!-- Mobile Bottom Navigation Bar -->
      <div class="md:hidden flex items-center justify-around border-t border-slate-200 bg-white py-2 px-3 text-[11px] font-medium">
        <a href="index.html" class="flex flex-col items-center ${activePage === 'home' ? 'text-teal-600' : 'text-slate-500'}">
          <i data-lucide="home" class="w-5 h-5 mb-0.5"></i>
          Home
        </a>
        <a href="doctors.html" class="flex flex-col items-center ${activePage === 'doctors' ? 'text-teal-600' : 'text-slate-500'}">
          <i data-lucide="search" class="w-5 h-5 mb-0.5"></i>
          Doctors
        </a>
        <a href="appointments.html" class="flex flex-col items-center relative ${activePage === 'appointments' ? 'text-teal-600' : 'text-slate-500'}">
          <i data-lucide="calendar" class="w-5 h-5 mb-0.5"></i>
          Visits
          ${upcomingCount > 0 ? `<span class="absolute top-0 right-3 w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] flex items-center justify-center font-bold">${upcomingCount}</span>` : ''}
        </a>
        <a href="doctor-dashboard.html" class="flex flex-col items-center ${activePage === 'doctor-dashboard' ? 'text-teal-600' : 'text-slate-500'}">
          <i data-lucide="stethoscope" class="w-5 h-5 mb-0.5"></i>
          Doctor
        </a>
      </div>
    </header>
  `;

  const navContainer = document.getElementById('navbar-container');
  if (navContainer) {
    navContainer.innerHTML = headerHtml;
  }

  // Handle Role Switcher Change
  const roleSelect = document.getElementById('roleSwitcher');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      DataStore.setCurrentRole(selected);
      if (selected.startsWith('doc-')) {
        window.location.href = 'doctor-dashboard.html';
      } else {
        window.location.href = 'appointments.html';
      }
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderFooter() {
  const footerHtml = `
    <footer class="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-white font-bold text-lg">
              <div class="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <i data-lucide="heart-pulse" class="w-5 h-5"></i>
              </div>
              <span>PulseCare Health</span>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed">
              Connecting patients with accredited medical specialists across top clinics and hospitals. Fast, reliable, and secure online bookings.
            </p>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-3">Popular Specialties</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="doctors.html?specialty=cardiology" class="hover:text-white">Cardiology Specialists</a></li>
              <li><a href="doctors.html?specialty=pediatrics" class="hover:text-white">Pediatrics & Child Care</a></li>
              <li><a href="doctors.html?specialty=dermatology" class="hover:text-white">Dermatology & Skin</a></li>
              <li><a href="doctors.html?specialty=neurology" class="hover:text-white">Neurology Consultations</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-3">Quick Navigation</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="index.html" class="hover:text-white">Home Page</a></li>
              <li><a href="doctors.html" class="hover:text-white">Doctor Directory</a></li>
              <li><a href="appointments.html" class="hover:text-white">My Appointments</a></li>
              <li><a href="doctor-dashboard.html" class="hover:text-white">Doctor Portal</a></li>
            </ul>
          </div>

          <div class="space-y-3">
            <h4 class="text-white font-semibold">Demo Data Management</h4>
            <p class="text-xs text-slate-400">
              All bookings and status changes are stored in your browser's LocalStorage.
            </p>
            <button
              id="resetDataBtn"
              class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              Reset Sample Data
            </button>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 PulseCare Healthcare Systems. Built with HTML, JS, Tailwind & LocalStorage.</p>
          <div class="flex items-center gap-4">
            <span class="hover:text-slate-400">HIPAA Compliant</span>
            <span>•</span>
            <span class="hover:text-slate-400">Secure Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHtml;
  }

  const resetBtn = document.getElementById('resetDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all appointments and doctor availability back to default?')) {
        DataStore.resetAllData();
        alert('Data has been reset. Refreshing page...');
        window.location.reload();
      }
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
