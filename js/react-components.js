// ==========================================================================
// SHARED REACT 18 COMPONENTS (Written in pure standard JS - Zero CORS issues)
// ==========================================================================

(function() {
  const e = React.createElement;

  // 1. DynamicIcon Component (React-safe: Lucide manages inner HTML, React manages outer span)
  function DynamicIcon(props) {
    const { name, className = "w-5 h-5", wrapperClassName = "", ...rest } = props;
    const spanRef = React.useRef(null);

    React.useEffect(function() {
      if (spanRef.current) {
        spanRef.current.innerHTML = '<i data-lucide="' + name + '" class="' + className + '"></i>';
        if (window.lucide && window.lucide.createIcons) {
          window.lucide.createIcons({ root: spanRef.current });
        }
      }
    }, [name, className]);

    return e('span', {
      ref: spanRef,
      className: 'inline-flex items-center justify-center ' + wrapperClassName,
      ...rest
    });
  }

  // 2. ReactNavbar Component
  function ReactNavbar(props) {
    const activePage = props.activePage;

    const [theme, setTheme] = React.useState(function() {
      return (window.ThemeManager && window.ThemeManager.getTheme) ? window.ThemeManager.getTheme() : 'light';
    });

    const [currentRole, setCurrentRole] = React.useState(function() {
      var s = window.DataStore;
      var role = (s && s.getCurrentRole) ? s.getCurrentRole() : 'patient';
      if (activePage === 'doctor-dashboard') {
        var urlParams = new URLSearchParams(window.location.search);
        var docId = urlParams.get('id') || ((typeof role === 'string' && role.startsWith('doc-')) ? role : 'doc-1');
        if (s && s.setCurrentRole) {
          s.setCurrentRole(docId);
        }
        return docId;
      }
      return role;
    });
    const [upcomingCount, setUpcomingCount] = React.useState(0);

    React.useEffect(function() {
      try {
        var s = window.DataStore;
        if (s && s.getAppointments) {
          var appointments = s.getAppointments();
          if (Array.isArray(appointments)) {
            var count = appointments.filter(function(a) {
              return a && a.status === 'Confirmed' && a.patientName === 'Aarav Sharma';
            }).length;
            setUpcomingCount(count);
          }
        }
      } catch(e) {}
    }, []);

    const handleRoleChange = function(event) {
      var selected = event.target.value;
      var s = window.DataStore;
      if (s && s.setCurrentRole) {
        s.setCurrentRole(selected);
      }
      setCurrentRole(selected);
      if (selected.startsWith('doc-')) {
        window.location.href = 'doctor-dashboard.html?id=' + selected;
      } else {
        window.location.href = 'appointments.html';
      }
    };

    const handleDoctorPortalClick = function() {
      try {
        var s = window.DataStore;
        if (s && s.setCurrentRole) {
          var r = s.getCurrentRole ? s.getCurrentRole() : '';
          if (!r || !r.startsWith('doc-')) {
            s.setCurrentRole('doc-1');
          }
        }
      } catch(err) {}
    };

    const handleThemeToggle = function() {
      if (window.ThemeManager && window.ThemeManager.toggleTheme) {
        var next = window.ThemeManager.toggleTheme();
        setTheme(next);
      }
    };

    return e('header', { className: 'sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200' },
      e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        e('div', { className: 'flex items-center justify-between h-16 sm:h-20' },
          
          // Brand Logo
          e('a', { href: 'index.html', className: 'flex items-center gap-3 select-none group' },
            e('div', { className: 'w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform' },
              e(DynamicIcon, { name: 'heart-pulse', className: 'w-6 h-6 stroke-[2.5]' })
            ),
            e('div', null,
              e('span', { className: 'text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1' },
                'Pulse', e('span', { className: 'text-teal-600 dark:text-teal-400' }, 'Care')
              ),
              e('span', { className: 'block text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 -mt-1' },
                'India Healthcare'
              )
            )
          ),

          // Desktop Nav Links
          e('nav', { className: 'hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 text-sm font-medium' },
            e('a', {
              href: 'index.html',
              className: 'px-4 py-2 rounded-full transition-all ' + (activePage === 'home' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
            }, 'Home'),
            e('a', {
              href: 'doctors.html',
              className: 'px-4 py-2 rounded-full transition-all ' + (activePage === 'doctors' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
            }, 'Find Doctors'),
            e('a', {
              href: 'appointments.html',
              className: 'px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ' + (activePage === 'appointments' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
            },
              e('span', null, 'My Appointments'),
              upcomingCount > 0 ? e('span', { className: 'w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold' }, upcomingCount) : null
            ),
            e('a', {
              href: 'doctor-dashboard.html',
              onClick: handleDoctorPortalClick,
              className: 'px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ' + (activePage === 'doctor-dashboard' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
            },
              e(DynamicIcon, { name: 'stethoscope', className: 'w-4 h-4 text-teal-600 dark:text-teal-400 pointer-events-none' }),
              e('span', { className: 'pointer-events-none' }, 'Doctor Portal')
            )
          ),

          // Right Controls: Role Switcher Dropdown, Dark Mode Toggle & Book Visit
          e('div', { className: 'flex items-center gap-2 sm:gap-3' },
            
            // Dark Mode Toggle Button
            e('button', {
              onClick: handleThemeToggle,
              type: 'button',
              title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
              className: 'p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:text-teal-600 dark:hover:text-amber-300 transition-all cursor-pointer flex items-center justify-center'
            },
              e(DynamicIcon, {
                name: theme === 'dark' ? 'sun' : 'moon',
                className: 'w-4 h-4 pointer-events-none'
              })
            ),

            // Role Dropdown
            e('div', { className: 'flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs' },
              e('span', { className: 'text-slate-500 dark:text-slate-400 font-medium hidden sm:inline' }, 'Role:'),
              e('select', {
                value: currentRole,
                onChange: handleRoleChange,
                className: 'bg-transparent font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer'
              },
                e('option', { value: 'patient', className: 'dark:bg-slate-800 dark:text-white' }, '👤 Patient (Aarav Sharma)'),
                e('option', { value: 'doc-1', className: 'dark:bg-slate-800 dark:text-white' }, '🩺 Dr. Rajesh Sharma (Cardiology)'),
                e('option', { value: 'doc-2', className: 'dark:bg-slate-800 dark:text-white' }, '🧠 Dr. Priya Nair (Neurology)'),
                e('option', { value: 'doc-3', className: 'dark:bg-slate-800 dark:text-white' }, '👶 Dr. Ananya Sen (Pediatrics)'),
                e('option', { value: 'doc-4', className: 'dark:bg-slate-800 dark:text-white' }, '✨ Dr. Vikram Malhotra (Dermatology)')
              )
            ),

            e('a', {
              href: 'doctors.html',
              className: 'hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-600/20 transition-all active:scale-95'
            },
              e(DynamicIcon, { name: 'calendar-plus', className: 'w-4 h-4 pointer-events-none' }),
              e('span', null, 'Book Visit')
            )
          )

        )
      ),

      // Mobile Bottom Bar
      e('div', { className: 'md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 px-3 text-[11px] font-medium' },
        e('a', { href: 'index.html', className: 'flex flex-col items-center ' + (activePage === 'home' ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-500 dark:text-slate-400') },
          e(DynamicIcon, { name: 'home', className: 'w-5 h-5 mb-0.5 pointer-events-none' }), 'Home'
        ),
        e('a', { href: 'doctors.html', className: 'flex flex-col items-center ' + (activePage === 'doctors' ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-500 dark:text-slate-400') },
          e(DynamicIcon, { name: 'search', className: 'w-5 h-5 mb-0.5 pointer-events-none' }), 'Doctors'
        ),
        e('a', { href: 'appointments.html', className: 'flex flex-col items-center relative ' + (activePage === 'appointments' ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-500 dark:text-slate-400') },
          e(DynamicIcon, { name: 'calendar', className: 'w-5 h-5 mb-0.5 pointer-events-none' }),
          'Visits',
          upcomingCount > 0 ? e('span', { className: 'absolute top-0 right-3 w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] flex items-center justify-center font-bold' }, upcomingCount) : null
        ),
        e('a', {
          href: 'doctor-dashboard.html',
          onClick: handleDoctorPortalClick,
          className: 'flex flex-col items-center cursor-pointer ' + (activePage === 'doctor-dashboard' ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-500 dark:text-slate-400')
        },
          e(DynamicIcon, { name: 'stethoscope', className: 'w-5 h-5 mb-0.5 pointer-events-none' }), 'Doctor'
        ),
        e('button', {
          onClick: handleThemeToggle,
          type: 'button',
          className: 'flex flex-col items-center text-slate-500 dark:text-amber-400 cursor-pointer'
        },
          e(DynamicIcon, { name: theme === 'dark' ? 'sun' : 'moon', className: 'w-5 h-5 mb-0.5 pointer-events-none' }),
          theme === 'dark' ? 'Light' : 'Dark'
        )
      )
    );
  }

  // 3. ReactFooter Component
  function ReactFooter() {
    const handleReset = function() {
      if (confirm('Reset all sample appointments and doctor data back to default?')) {
        var s = window.DataStore;
        if (s && s.resetAllData) {
          s.resetAllData();
        }
        alert('Data reset successfully. Refreshing...');
        window.location.reload();
      }
    };

    return e('footer', { className: 'bg-slate-900 dark:bg-slate-950 text-slate-400 text-sm mt-auto border-t border-slate-800 dark:border-slate-900 transition-colors duration-200' },
      e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12' },
        e('div', { className: 'grid grid-cols-1 md:grid-cols-4 gap-8 mb-8' },
          
          e('div', { className: 'space-y-3' },
            e('div', { className: 'flex items-center gap-2 text-white font-bold text-lg' },
              e('div', { className: 'w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white' },
                e(DynamicIcon, { name: 'heart-pulse', className: 'w-5 h-5' })
              ),
              e('span', null, 'PulseCare India')
            ),
            e('p', { className: 'text-slate-400 text-xs leading-relaxed' },
              'Book consultations with top medical specialists in New Delhi, Mumbai, Bengaluru, Hyderabad, and Chennai.'
            )
          ),

          e('div', null,
            e('h4', { className: 'text-white font-semibold mb-3' }, 'Popular Specialties'),
            e('ul', { className: 'space-y-2 text-xs' },
              e('li', null, e('a', { href: 'doctors.html?specialty=cardiology', className: 'hover:text-white' }, 'Cardiologists (Delhi & Mumbai)')),
              e('li', null, e('a', { href: 'doctors.html?specialty=pediatrics', className: 'hover:text-white' }, 'Pediatricians & Child Care')),
              e('li', null, e('a', { href: 'doctors.html?specialty=dermatology', className: 'hover:text-white' }, 'Dermatologists & Skin Care')),
              e('li', null, e('a', { href: 'doctors.html?specialty=neurology', className: 'hover:text-white' }, 'Neurology Specialists'))
            )
          ),

          e('div', null,
            e('h4', { className: 'text-white font-semibold mb-3' }, 'Quick Navigation'),
            e('ul', { className: 'space-y-2 text-xs' },
              e('li', null, e('a', { href: 'index.html', className: 'hover:text-white' }, 'Home Page')),
              e('li', null, e('a', { href: 'doctors.html', className: 'hover:text-white' }, 'Find Doctors')),
              e('li', null, e('a', { href: 'appointments.html', className: 'hover:text-white' }, 'My Appointments')),
              e('li', null, e('a', { href: 'doctor-dashboard.html', className: 'hover:text-white' }, 'Doctor Practice Portal'))
            )
          ),

          e('div', { className: 'space-y-3' },
            e('h4', { className: 'text-white font-semibold' }, 'Demo Data Controls'),
            e('p', { className: 'text-xs text-slate-400' }, 'All appointments are stored in browser LocalStorage.'),
            e('button', {
              onClick: handleReset,
              className: 'px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer'
            },
              e(DynamicIcon, { name: 'refresh-cw', className: 'w-3.5 h-3.5' }),
              e('span', null, 'Reset Sample Data')
            )
          )

        ),

        e('div', { className: 'pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4' },
          e('p', null, '© 2026 PulseCare Healthcare Systems India. Built with React.js & Tailwind CSS.'),
          e('div', { className: 'flex items-center gap-4' },
            e('span', null, 'NABH Accredited'),
            e('span', null, '•'),
            e('span', null, 'All Prices in Indian Rupees (₹)')
          )
        )
      )
    );
  }

  // Expose components globally on window
  window.DynamicIcon = DynamicIcon;
  window.ReactNavbar = ReactNavbar;
  window.ReactFooter = ReactFooter;
})();
