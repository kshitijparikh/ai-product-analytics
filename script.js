document.addEventListener("DOMContentLoaded", function() {
    
    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- CHART.JS DASHBOARD PLACEHOLDERS ---
    
    // Common Chart.js styling for Dark SaaS UI
    Chart.defaults.color = '#737373';
    Chart.defaults.font.family = "'Inter', sans-serif";
    const gridOptions = {
        color: '#262626',
        drawBorder: false,
    };

    // 1. Line Chart (Growth & Retention)
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    
    // Gradient for line chart area
    let gradientLine = ctxLine.createLinearGradient(0, 0, 0, 400);
    gradientLine.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // Tailwind accent blue
    gradientLine.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Active Users',
                data: [12000, 15000, 14000, 19000, 22000, 27000, 32104],
                borderColor: '#3b82f6',
                backgroundColor: gradientLine,
                borderWidth: 2,
                pointBackgroundColor: '#141414',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0a0a0a',
                    titleColor: '#fff',
                    bodyColor: '#e5e5e5',
                    borderColor: '#262626',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: gridOptions, beginAtZero: true }
            }
        }
    });

    // 2. Bar Chart (Onboarding Funnel Drop-off)
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Visited', 'Signed Up', 'Profile Set', 'Activated'],
            datasets: [{
                label: 'Users',
                data: [100, 45, 25, 12],
                backgroundColor: [
                    '#3b82f6', // Blue
                    '#6366f1', // Indigo
                    '#8b5cf6', // Violet
                    '#a855f7'  // Purple
                ],
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0a0a0a',
                    borderColor: '#262626',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: gridOptions, max: 100, ticks: { callback: function(value){return value+"%"} } }
            }
        }
    });
});

// --- SMART EMAIL ROUTING ---
function handleEmailClick(event) {
    event.preventDefault();
    
    // REPLACE THIS with your actual email address
    const email = "your.email@example.com"; 
    
    // Check if the user is on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Triggers the phone's native mail app (Gmail app, Apple Mail, etc.)
        window.location.href = `mailto:${email}`;
    } else {
        // Opens the Gmail web client directly to the compose screen in a new tab
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
        window.open(gmailWebUrl, '_blank');
    }
}

