document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize variables
    const navbar = document.querySelector('.navbar');
    const tryNowBtn = document.getElementById('try-now-btn');
    const contactForm = document.getElementById('contact-form');
    
    // Intersection Observer for lazy loading images
    const lazyImages = document.querySelectorAll('.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('animated');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px'
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Navbar color change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for Try Now button
    tryNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Smooth scrolling for all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Contact form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        
        // If form is valid, show success message
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submission data:', formData);
        
        // Clear form
        this.reset();
        this.classList.remove('was-validated');
        
        // Show success alert
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
    });
    
    // Function to show alerts
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert the alert before the form
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
    
    // Initialize Lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300
        });
    }
    
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Close navbar when clicking outside of it
    document.addEventListener('click', function(e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show') && !e.target.closest('.navbar')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

    
        // Salon Configuration Data
        const SALON_CONFIG = {
            name: "HABIB Beauty Salon",
            address: "governorpet, Vijayawada, Andhra Pradesh, India",
            phone: "+91 - 9876543210",
            email: "habibsalon@gmail.com",
            hours: {
                "Monday": "9:00 AM - 7:00 PM",
                "Tuesday": "9:00 AM - 7:00 PM",
                "Wednesday": "9:00 AM - 7:00 PM",
                "Thursday": "9:00 AM - 8:00 PM",
                "Friday": "9:00 AM - 8:00 PM",
                "Saturday": "8:00 AM - 6:00 PM",
                "Sunday": "10:00 AM - 5:00 PM"
            },
            services: [
                { name: "Haircut & Styling", price: "$45-85", duration: "60 min" },
                { name: "Hair Coloring", price: "$80-150", duration: "120 min" },
                { name: "Facial Treatment", price: "$60-120", duration: "75 min" },
                { name: "Manicure", price: "$25-45", duration: "45 min" },
                { name: "Pedicure", price: "$35-55", duration: "60 min" },
                { name: "Eyebrow Threading", price: "$15-25", duration: "20 min" },
                { name: "Makeup Application", price: "$50-100", duration: "45 min" },
                { name: "Bridal Package", price: "$200-400", duration: "180 min" }
            ],
            // Replace with your actual Google Apps Script Web App URL
            googleScriptUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
        };

        // DOM Elements
        const chatbotButton = document.getElementById('chatbotButton');
        const chatWindow = document.getElementById('chatWindow');
        const closeBtn = document.getElementById('closeBtn');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        // Chat State
        let isBookingFlow = false;
        let bookingData = {};
        let availableSlots = [];

        // Initialize Chat
        function initializeChat() {
            addBotMessage("Hello! 👋 Welcome to " + SALON_CONFIG.name + "! I'm your beauty assistant.");
            
            setTimeout(() => {
                addBotMessage("I can help you with:", [
                    "Book an appointment 📅",
                    "View our services 💅",
                    "Check our hours 🕐",
                    "Get contact info 📞",
                    "View prices 💰"
                ]);
            }, 1000);
        }

        // Event Listeners
        chatbotButton.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);
        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Toggle Chat Window
        function toggleChat() {
            const isOpen = chatWindow.classList.contains('open');
            
            if (isOpen) {
                chatWindow.classList.remove('open');
            } else {
                chatWindow.classList.add('open');
                messageInput.focus();
                
                // Initialize chat on first open
                if (chatMessages.children.length === 0) {
                    initializeChat();
                }
            }
        }

        // Send Message
        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            addUserMessage(message);
            messageInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Process message after delay
            setTimeout(() => {
                hideTypingIndicator();
                processUserMessage(message);
            }, 1000 + Math.random() * 1000);
        }

        // Add User Message
        function addUserMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            messageDiv.innerHTML = `
                <div class="message-content">${escapeHtml(message)}</div>
            `;
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Add Bot Message
        function addBotMessage(message, quickReplies = null) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            
            let quickReplyHtml = '';
            if (quickReplies) {
                quickReplyHtml = `
                    <div class="quick-replies">
                        ${quickReplies.map(reply => 
                            `<button class="quick-reply-btn" onclick="handleQuickReply('${escapeHtml(reply)}')">${reply}</button>`
                        ).join('')}
                    </div>
                `;
            }
            
            messageDiv.innerHTML = `
                <div class="bot-avatar"></div>
                <div class="message-content">
                    ${message}
                    ${quickReplyHtml}
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Add Booking Form
        function addBookingForm() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            messageDiv.innerHTML = `
                <div class="bot-avatar"></div>
                <div class="message-content">
                    <div class="booking-form">
                        <h4>📅 Book Your Appointment</h4>
                        <div class="form-group">
                            <label>Your Name:</label>
                            <input type="text" id="customerName" placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label>Phone Number:</label>
                            <input type="tel" id="customerPhone" placeholder="Enter your phone number">
                        </div>
                        <div class="form-group">
                            <label>Service:</label>
                            <select id="selectedService">
                                <option value="">Select a service</option>
                                ${SALON_CONFIG.services.map(service => 
                                    `<option value="${service.name}">${service.name} - ${service.price}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Preferred Date:</label>
                            <input type="date" id="appointmentDate" min="${getMinDate()}">
                        </div>
                        <div class="form-group">
                            <label>Preferred Time:</label>
                            <select id="appointmentTime">
                                <option value="">Select date first</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" onclick="submitBooking()">Book Appointment</button>
                            <button class="btn btn-secondary" onclick="cancelBooking()">Cancel</button>
                        </div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            scrollToBottom();

            // Add event listener for date change
            document.getElementById('appointmentDate').addEventListener('change', updateTimeSlots);
        }

        // Process User Message (Simple AI Logic)
        function processUserMessage(message) {
            const lowerMessage = message.toLowerCase();
            
            if (isBookingFlow) {
                handleBookingFlow(message);
                return;
            }

            // Service-related queries
            if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
                showServices();
            }
            // Pricing queries
            else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
                showPrices();
            }
            // Hours queries
            else if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
                showHours();
            }
            // Contact queries
            else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('address') || lowerMessage.includes('location')) {
                showContact();
            }
            // Booking queries
            else if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
                startBookingFlow();
            }
            // Greeting
            else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
                addBotMessage("Hello! 😊 How can I help you today?", [
                    "Book an appointment 📅",
                    "View services 💅",
                    "Check hours 🕐",
                    "Get contact info 📞"
                ]);
            }
            // Thank you
            else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
                addBotMessage("You're welcome! 😊 Is there anything else I can help you with?", [
                    "Book appointment 📅",
                    "View services 💅",
                    "No, I'm good ✨"
                ]);
            }
            // Default response
            else {
                addBotMessage("I'd be happy to help! I can assist you with:", [
                    "Book an appointment 📅",
                    "View our services 💅",
                    "Check our hours 🕐",
                    "Get contact info 📞",
                    "View prices 💰"
                ]);
            }
        }

        // Handle Quick Reply
        function handleQuickReply(reply) {
            addUserMessage(reply);
            
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                processUserMessage(reply);
            }, 800);
        }

        // Show Services
        function showServices() {
            let servicesHtml = "<strong>Our Services:</strong><br><br>";
            servicesHtml += '<div class="services-grid">';
            
            SALON_CONFIG.services.forEach(service => {
                servicesHtml += `
                    <div class="service-item">
                        <strong>${service.name}</strong>
                        <div>${service.price}</div>
                        <div style="font-size: 0.8rem; color: #666;">${service.duration}</div>
                    </div>
                `;
            });
            
            servicesHtml += '</div>';
            
            addBotMessage(servicesHtml, ["Book an appointment 📅", "Check prices 💰", "View hours 🕐"]);
        }

        // Show Prices
        function showPrices() {
            let pricesHtml = "<strong>💰 Our Pricing:</strong><br><br>";
            
            SALON_CONFIG.services.forEach(service => {
                pricesHtml += `<strong>${service.name}:</strong> ${service.price}<br>`;
            });
            
            pricesHtml += "<br><em>*Prices may vary based on hair length and complexity</em>";
            
            addBotMessage(pricesHtml, ["Book an appointment 📅", "View services 💅"]);
        }

        // Show Hours
        function showHours() {
            let hoursHtml = "<strong>🕐 Opening Hours:</strong><br><br>";
            
            Object.entries(SALON_CONFIG.hours).forEach(([day, hours]) => {
                hoursHtml += `<strong>${day}:</strong> ${hours}<br>`;
            });
            
            addBotMessage(hoursHtml, ["Book an appointment 📅", "Get contact info 📞"]);
        }

        // Show Contact
        function showContact() {
            const contactHtml = `
                <strong>📞 Contact Information:</strong><br><br>
                <strong>Address:</strong><br>${SALON_CONFIG.address}<br><br>
                <strong>Phone:</strong> ${SALON_CONFIG.phone}<br>
                <strong>Email:</strong> ${SALON_CONFIG.email}
            `;
            
            addBotMessage(contactHtml, ["Book an appointment 📅", "View services 💅"]);
        }

        // Start Booking Flow
        function startBookingFlow() {
            isBookingFlow = true;
            addBotMessage("Perfect! I'll help you book an appointment. Let me get some details from you.");
            
            setTimeout(() => {
                addBookingForm();
            }, 1000);
        }

        // Cancel Booking
        function cancelBooking() {
            isBookingFlow = false;
            bookingData = {};
            addBotMessage("No problem! Your booking has been cancelled. Is there anything else I can help you with?", [
                "View services 💅",
                "Check hours 🕐",
                "Get contact info 📞"
            ]);
        }

        // Get minimum date (today)
        function getMinDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        }

        // Update Time Slots
        function updateTimeSlots() {
            const dateInput = document.getElementById('appointmentDate');
            const timeSelect = document.getElementById('appointmentTime');
            
            if (!dateInput.value) {
                timeSelect.innerHTML = '<option value="">Select date first</option>';
                return;
            }
            
            // Generate available time slots (9 AM to 6 PM, every 30 minutes)
            const timeSlots = [];
            for (let hour = 9; hour < 18; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    timeSlots.push(timeString);
                }
            }
            
            timeSelect.innerHTML = '<option value="">Select a time</option>';
            timeSlots.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = formatTime(time);
                timeSelect.appendChild(option);
            });
        }

        // Format time for display
        function formatTime(time24) {
            const [hours, minutes] = time24.split(':');
            const hour12 = hours % 12 || 12;
            const ampm = hours < 12 ? 'AM' : 'PM';
            return `${hour12}:${minutes} ${ampm}`;
        }

        // Submit Booking
        async function submitBooking() {
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const service = document.getElementById('selectedService').value;
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            
            // Validation
            if (!name || !phone || !service || !date || !time) {
                addBotMessage("⚠️ Please fill in all fields to complete your booking.");
                return;
            }
            
            // Show loading message
            addBotMessage("⏳ Processing your appointment...");
            
            try {
                // Send to Google Sheets
                const response = await fetch(SALON_CONFIG.googleScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'book',
                        name: name,
                        phone: phone,
                        service: service,
                        date: date,
                        time: time,
                        status: 'Confirmed'
                    })
                });
                
                if (response.ok) {
                    // Success
                    const confirmationHtml = `
                        <strong>✅ Appointment Confirmed!</strong><br><br>
                        <strong>Name:</strong> ${name}<br>
                        <strong>Service:</strong> ${service}<br>
                        <strong>Date:</strong> ${formatDate(date)}<br>
                        <strong>Time:</strong> ${formatTime(time)}<br><br>
                        We'll send you a confirmation text shortly. Thank you for choosing ${SALON_CONFIG.name}!
                    `;
                    
                    addBotMessage(confirmationHtml, ["Book another appointment 📅", "View services 💅"]);
                } else {
                    throw new Error('Booking failed');
                }
                
            } catch (error) {
                // Fallback - show confirmation anyway (for demo purposes)
                const confirmationHtml = `
                    <strong>✅ Appointment Booked!</strong><br><br>
                    <strong>Name:</strong> ${name}<br>
                    <strong>Service:</strong> ${service}<br>
                    <strong>Date:</strong> ${formatDate(date)}<br>
                    <strong>Time:</strong> ${formatTime(time)}<br><br>
                    <em>Note: Google Sheets integration requires setup. Your appointment details have been recorded locally for this demo.</em><br><br>
                    Thank you for choosing ${SALON_CONFIG.name}!
                `;
                
                addBotMessage(confirmationHtml, ["Book another appointment 📅", "View services 💅", "Get contact info 📞"]);
            }
            
            // Reset booking flow
            isBookingFlow = false;
            bookingData = {};
        }

        // Format date for display
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // Show/Hide Typing Indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="bot-avatar"></div>
                <div class="message-content">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            scrollToBottom();
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Scroll to bottom
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Escape HTML
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Handle booking flow responses
        function handleBookingFlow(message) {
            addBotMessage("I see you're in the booking process. Please use the form above to complete your appointment booking, or say 'cancel' to exit.");
        }

        // Google Sheets Integration Functions
        async function checkAvailability(date, time) {
            try {
                const response = await fetch(SALON_CONFIG.googleScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'checkAvailability',
                        date: date,
                        time: time
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    return data.available;
                } else {
                    return true; // Assume available if can't check
                }
            } catch (error) {
                console.error('Error checking availability:', error);
                return true; // Assume available if error
            }
        }

        async function getBookings() {
            try {
                const response = await fetch(SALON_CONFIG.googleScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'getBookings'
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    return data.bookings || [];
                } else {
                    return [];
                }
            } catch (error) {
                console.error('Error getting bookings:', error);
                return [];
            }
        }

        // Advanced AI-like responses with more personality
        const aiResponses = {
            compliments: [
                "You're going to look absolutely stunning! ✨",
                "Great choice! That's one of our most popular services! 💅",
                "Perfect! I can already picture how amazing you'll look! 😍"
            ],
            encouragements: [
                "Don't worry, our expert stylists will take great care of you! 💕",
                "You're in the best hands - our team is incredible! 👏",
                "Trust me, you're going to love the results! ⭐"
            ],
            seasonal: [
                "This season's trends are going to look perfect on you! 🌸",
                "What a perfect time to treat yourself! 🌟",
                "You deserve this pampering session! 💖"
            ]
        };

        function getRandomResponse(category) {
            const responses = aiResponses[category];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Enhanced message processing with more AI-like behavior
        function processAdvancedMessage(message) {
            const lowerMessage = message.toLowerCase();
            
            // Detect emotions and respond accordingly
            if (lowerMessage.includes('nervous') || lowerMessage.includes('scared') || lowerMessage.includes('worried')) {
                addBotMessage("I understand you might feel a bit nervous - that's completely normal! " + getRandomResponse('encouragements'));
                return;
            }
            
            if (lowerMessage.includes('beautiful') || lowerMessage.includes('pretty') || lowerMessage.includes('gorgeous')) {
                addBotMessage(getRandomResponse('compliments') + " What service are you interested in today?");
                return;
            }
            
            if (lowerMessage.includes('special occasion') || lowerMessage.includes('wedding') || lowerMessage.includes('party')) {
                addBotMessage("How exciting! Special occasions call for special treatments! ✨ Our bridal and event packages are perfect for making you shine. Would you like to see our special occasion services?", ["Yes, show me! 💍", "Book bridal package 👰", "View all services 💅"]);
                return;
            }
        }

        // Initialize advanced features
        function initAdvancedFeatures() {
            // Add some personality to the initial greeting
            const personalityGreetings = [
                "ready to make you look absolutely fabulous",
                "here to help you shine bright",
                "excited to help you look and feel amazing",
                "ready to bring out your inner goddess"
            ];
            
            const randomGreeting = personalityGreetings[Math.floor(Math.random() * personalityGreetings.length)];
            // This would replace the standard greeting when implementing
        }

        // Call initialization
        document.addEventListener('DOMContentLoaded', function() {
            initAdvancedFeatures();
        });

        // Add some easter eggs for fun
        function handleEasterEggs(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('magic') || lowerMessage.includes('fairy')) {
                addBotMessage("✨ Abracadabra! ✨ While I can't do real magic, our stylists work absolute magic with hair and makeup! Want to see some of our magical transformations?", ["Show me services! 💫", "Book appointment 📅"]);
                return true;
            }
            
            if (lowerMessage.includes('princess') || lowerMessage.includes('queen')) {
                addBotMessage("👑 Every woman is a queen, and queens deserve royal treatment! Let me help you find the perfect service to make you feel like royalty!", ["Royal treatment please! 👸", "View services 💅"]);
                return true;
            }
            
            return false;
        }

        // Enhanced processUserMessage with easter eggs
        const originalProcessUserMessage = processUserMessage;
        processUserMessage = function(message) {
            // Check for easter eggs first
            if (handleEasterEggs(message)) {
                return;
            }
            
            // Check for advanced responses
            processAdvancedMessage(message);
            
            // Fall back to original processing
            originalProcessUserMessage(message);
        };

        // Add some CSS animations for better UX
        const style = document.createElement('style');
        style.textContent = `
            .service-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
                transition: all 0.2s ease;
            }
            
            .message-content {
                position: relative;
                overflow: hidden;
            }
            
            .message-content::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shine 3s ease-in-out infinite;
            }
            
            @keyframes shine {
                0% { left: -100%; }
                50% { left: 100%; }
                100% { left: 100%; }
            }
            
            .quick-reply-btn {
                position: relative;
                overflow: hidden;
            }
            
            .quick-reply-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(33, 150, 243, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .quick-reply-btn:hover::before {
                width: 300px;
                height: 300px;
            }
        `;
        document.head.appendChild(style);
    
