document.addEventListener('DOMContentLoaded', () => {

    // 1. Remove Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1200);

    // 2. Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    // Check locally saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        if(window.impactChartInstance) updateChartColors(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    }

    // 3. Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger Counters when visible
                if (entry.target.classList.contains('impact-counters')) {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .fade-in, .slide-in-right, .impact-counters').forEach(el => observer.observe(el));

    // 4. Counter Animation logic
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 50; 
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
    }

    // 5. Chart.js Initialization
    const ctx = document.getElementById('impactChart');
    if (ctx) {
        window.impactChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Health Queries Processed',
                    data: [120, 190, 300, 500, 800, 1200],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    function updateChartColors(theme) {
        const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
        const textColor = theme === 'dark' ? '#cbd5e1' : '#1e293b';
        if(window.impactChartInstance) {
            window.impactChartInstance.options.scales.x.ticks.color = textColor;
            window.impactChartInstance.options.scales.y.ticks.color = textColor;
            window.impactChartInstance.options.scales.y.grid.color = gridColor;
            window.impactChartInstance.update();
        }
    }

    // 6. Presentation Mode (Fullscreen API)
    const presentBtn = document.getElementById('presentationModeBtn');
    if (presentBtn) {
        presentBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }

    // 7. Live Demo WhatsApp Mockup Logic
    window.fillDemoInput = function(text) {
        const input = document.getElementById('mainChatInput');
        input.value = text;
        document.getElementById('mainChatSend').click();
    };

    const mainChatSend = document.getElementById('mainChatSend');
    const mainChatInput = document.getElementById('mainChatInput');
    const mainChatArea = document.getElementById('mainChatArea');
    const mainTypingIndicator = document.getElementById('mainTypingIndicator');

    if (mainChatSend && mainChatInput) {
        mainChatSend.addEventListener('click', () => handleMainChat(mainChatInput.value));
        mainChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleMainChat(mainChatInput.value); });
    }

    function handleMainChat(text) {
        if (!text.trim()) return;
        
        // Add User Message
        appendMessage(mainChatArea, text, 'user', new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        mainChatInput.value = '';
        
        // Show Typing
        mainTypingIndicator.classList.remove('hidden');
        mainChatArea.scrollTop = mainChatArea.scrollHeight;

        // Simulate AI process
        setTimeout(() => {
            mainTypingIndicator.classList.add('hidden');
            const reply = getBotReply(text);
            appendMessage(mainChatArea, reply, 'bot', new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }, 1500);
    }

    // 8. Floating Chatbot Logic
    const floatingBtn = document.getElementById('floatingChatBtn');
    const floatChatWindow = document.getElementById('floatingChatWindow');
    const closeFloatChat = document.getElementById('closeFloatingChat');
    const floatInput = document.getElementById('floatChatInput');
    const floatSend = document.getElementById('floatChatSend');
    const floatBody = document.getElementById('floatChatBody');

    floatingBtn.addEventListener('click', () => {
        floatChatWindow.classList.toggle('hidden');
    });
    closeFloatChat.addEventListener('click', () => {
        floatChatWindow.classList.add('hidden');
    });

    floatSend.addEventListener('click', () => handleFloatChat(floatInput.value));
    floatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleFloatChat(floatInput.value); });

    function handleFloatChat(text) {
        if(!text.trim()) return;
        appendMessage(floatBody, text, 'user');
        floatInput.value = '';
        setTimeout(() => {
            appendMessage(floatBody, getBotReply(text), 'bot');
        }, 1000);
    }

    // Helpers
    function appendMessage(container, text, sender, time='') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        msgDiv.innerHTML = `<span class="msg-text">${text}</span>` + (time ? `<span class="msg-time">${time}</span>` : '');
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    function getBotReply(query) {
        const q = query.toLowerCase();
        if (q.includes('dengue')) return 'Common dengue symptoms include sudden high fever, severe headaches, pain behind the eyes, joint and muscle pain, and skin rash. Please visit a doctor if symptoms persist.';
        if (q.includes('vaccine') || q.includes('vaccination')) return 'Based on standard schedules, Hepatitis B & OPV drops are given at birth. Pentavalent at 6, 10, 14 weeks. Please provide age for exact schedule.';
        if (q.includes('burn')) return 'First aid for minor burns: Cool the burn under cool (not cold) running water for 10-15 mins. Do NOT apply ice, butter, or ointments. Loosely cover with a sterile pad.';
        return 'I am processing your query against the Government Health Database. Could you please provide more details?';
    }

});
