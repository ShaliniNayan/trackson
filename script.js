document.addEventListener('DOMContentLoaded', () => {
    // 0. WhatsApp Configuration (Optional: Set your phone number here e.g. "919876543210")
    const whatsappPhoneNumber = ""; // Leave empty for standard wa.me redirect, or put phone number with country code

    // 1. New Arrival Modal Pop-up Logic
    const newArrivalModal = document.getElementById('newArrivalModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Automatically trigger pop-up shortly after website load
    setTimeout(() => {
        if (newArrivalModal) {
            newArrivalModal.classList.add('active');
        }
    }, 800);

    const closeModal = () => {
        if (newArrivalModal) {
            newArrivalModal.classList.remove('active');
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Close on overlay backdrop click
    if (newArrivalModal) {
        newArrivalModal.addEventListener('click', (e) => {
            if (e.target === newArrivalModal) {
                closeModal();
            }
        });
    }

    // 2. WhatsApp Floating Widget & Auto-open Chat Box
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    const whatsappChatBox = document.getElementById('whatsappChatBox');
    const closeWhatsappChatBtn = document.getElementById('closeWhatsappChatBtn');

    // Automatically open WhatsApp chat box on site open
    setTimeout(() => {
        if (whatsappChatBox) {
            whatsappChatBox.classList.add('active');
        }
    }, 1200);

    if (whatsappFloatBtn && whatsappChatBox) {
        whatsappFloatBtn.addEventListener('click', () => {
            whatsappChatBox.classList.toggle('active');
        });
    }

    if (closeWhatsappChatBtn && whatsappChatBox) {
        closeWhatsappChatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappChatBox.classList.remove('active');
        });
    }

    // 3. INTERACTIVE PRODUCT COLOR SWATCH SELECTION
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const swatches = card.querySelectorAll('.swatch');
        const img = card.querySelector('.card-img');
        const badge = card.querySelector('.color-badge');
        const orderBtn = card.querySelector('.btn-whatsapp-order');
        const baseTitle = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Sportswear Item';

        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                // Remove active state from sibling swatches
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');

                const colorName = swatch.getAttribute('data-color-name') || 'Default';
                const imgSrc = swatch.getAttribute('data-img');
                const filterVal = swatch.getAttribute('data-filter') || 'none';

                // Smooth fade transition for image swap/filter
                img.style.transition = 'opacity 0.2s ease, filter 0.3s ease, transform 0.4s ease';
                img.style.opacity = '0.4';

                setTimeout(() => {
                    if (imgSrc) {
                        img.src = imgSrc;
                    }
                    
                    if (filterVal && filterVal !== 'none') {
                        img.style.filter = filterVal;
                    } else {
                        img.style.filter = 'none';
                    }

                    if (badge) {
                        badge.textContent = colorName;
                        badge.classList.add('pulse-badge');
                        setTimeout(() => badge.classList.remove('pulse-badge'), 500);
                    }

                    if (orderBtn) {
                        orderBtn.setAttribute('data-product', `${baseTitle} (${colorName})`);
                    }

                    img.style.opacity = '1';
                }, 180);
            });
        });
    });

    // 4. MODAL COLOR SWATCH SELECTION
    const modalSwatches = document.querySelectorAll('.modal-swatches .swatch');
    const modalImg = document.getElementById('modalImg');
    const modalColorBadge = document.getElementById('modalColorBadge');
    const modalShopBtn = document.getElementById('modalShopBtn');

    if (modalSwatches.length > 0 && modalImg) {
        modalSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                modalSwatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');

                const colorName = swatch.getAttribute('data-color-name') || 'Gold Edition';
                const imgSrc = swatch.getAttribute('data-img');
                const filterVal = swatch.getAttribute('data-filter') || 'none';

                modalImg.style.transition = 'opacity 0.2s ease, filter 0.3s ease';
                modalImg.style.opacity = '0.4';

                setTimeout(() => {
                    if (imgSrc) {
                        modalImg.src = imgSrc;
                    }

                    if (filterVal && filterVal !== 'none') {
                        modalImg.style.filter = filterVal;
                    } else {
                        modalImg.style.filter = 'none';
                    }

                    if (modalColorBadge) {
                        modalColorBadge.textContent = colorName;
                    }

                    if (modalShopBtn) {
                        modalShopBtn.setAttribute('data-product', `Gold Elite Track Jacket (${colorName})`);
                    }

                    modalImg.style.opacity = '1';
                }, 180);
            });
        });
    }

    // 5. COLOR FILTER BAR LOGIC
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedColor = btn.getAttribute('data-filter-color');

            cards.forEach(card => {
                if (selectedColor === 'all') {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    // Check if card has swatch for selected color
                    const matchingSwatch = card.querySelector(`.swatch[data-color="${selectedColor}"]`);
                    if (matchingSwatch) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeInCard 0.4s ease forwards';
                        // Automatically trigger swatch click to switch to that color view!
                        matchingSwatch.click();
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 6. Dynamic WhatsApp Order Booking Event Listener
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.btn-whatsapp-order');
        if (button) {
            const productName = button.getAttribute('data-product') || 'Sportswear Item';
            const price = button.getAttribute('data-price') || '';

            const message = `Hi Trackson Team! 👋 I would like to book an order for the *${productName}* (${price}). Please let me know the availability and payment details!`;
            
            const targetPhone = whatsappPhoneNumber ? whatsappPhoneNumber.replace(/[^0-9]/g, '') : '';
            const baseUrl = targetPhone ? `https://wa.me/${targetPhone}` : `https://wa.me/`;
            const finalUrl = `${baseUrl}?text=${encodeURIComponent(message)}`;

            window.open(finalUrl, '_blank');

            // If inside modal, close modal after clicking
            if (button.id === 'modalShopBtn') {
                closeModal();
            }
        }
    });

    // 7. WhatsApp Custom Message Input Box Handler
    const whatsappInput = document.getElementById('whatsappCustomMessage');
    const sendWhatsappCustomBtn = document.getElementById('sendWhatsappCustomBtn');

    const sendCustomWhatsappMessage = () => {
        if (!whatsappInput) return;
        const userText = whatsappInput.value.trim();
        const textToSend = userText 
            ? userText 
            : "Hi Trackson Team! 👋 I have an inquiry about your sportswear products.";
        
        const targetPhone = whatsappPhoneNumber ? whatsappPhoneNumber.replace(/[^0-9]/g, '') : '';
        const baseUrl = targetPhone ? `https://wa.me/${targetPhone}` : `https://wa.me/`;
        const finalUrl = `${baseUrl}?text=${encodeURIComponent(textToSend)}`;

        window.open(finalUrl, '_blank');
        whatsappInput.value = '';
    };

    if (sendWhatsappCustomBtn) {
        sendWhatsappCustomBtn.addEventListener('click', sendCustomWhatsappMessage);
    }

    if (whatsappInput) {
        whatsappInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendCustomWhatsappMessage();
            }
        });
    }
});


