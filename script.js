document.addEventListener('DOMContentLoaded', () => {
    // 0. WhatsApp Configuration (Optional: Set your phone number here e.g. "919876543210")
    const whatsappPhoneNumber = ""; // Leave empty for standard wa.me redirect, or put phone number with country code

    // 1. New Arrival Modal Pop-up Logic
    const newArrivalModal = document.getElementById('newArrivalModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalShopBtn = document.getElementById('modalShopBtn');

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
    }, 1000);

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

    // 3. Dynamic WhatsApp Order Booking Buttons
    const orderButtons = document.querySelectorAll('.btn-whatsapp-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
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
        });
    });
});
