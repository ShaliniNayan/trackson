document.addEventListener('DOMContentLoaded', () => {
    // 1. WhatsApp Configuration & Cross-Device Reliable Sending
    const whatsappPhoneNumber = "919899565707";

    const sendWhatsAppMessage = (messageText) => {
        const cleanPhone = whatsappPhoneNumber ? whatsappPhoneNumber.replace(/[^0-9]/g, '') : '919899565707';
        const encodedMsg = encodeURIComponent(messageText);

        // Official WhatsApp API endpoint works reliably across desktop browsers, WhatsApp Web, and mobile apps
        const primaryUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`;

        try {
            const win = window.open(primaryUrl, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                window.location.href = primaryUrl;
            }
        } catch (e) {
            window.location.href = primaryUrl;
        }
    };

    // 2. New Arrival Modal Pop-up Logic
    const newArrivalModal = document.getElementById('newArrivalModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

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

    if (newArrivalModal) {
        newArrivalModal.addEventListener('click', (e) => {
            if (e.target === newArrivalModal) {
                closeModal();
            }
        });
    }

    // 3. Interactive Color Selection & Dynamic Image Switching
    const colorSwatches = document.querySelectorAll('.swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const parentContainer = swatch.closest('.card') || swatch.closest('.modal-card');
            if (!parentContainer) return;

            // Update active swatch state
            const siblingSwatches = parentContainer.querySelectorAll('.swatch');
            siblingSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            const colorName = swatch.getAttribute('data-color') || '';
            const imgPath = swatch.getAttribute('data-img');
            const imgFilter = swatch.getAttribute('data-filter') || 'none';

            // Find target elements in card/modal
            const targetImg = parentContainer.querySelector('.card-img') || parentContainer.querySelector('.modal-img');
            const colorNameBadge = parentContainer.querySelector('.color-name');
            const orderBtn = parentContainer.querySelector('.btn-whatsapp-order');

            if (targetImg && imgPath) {
                targetImg.src = imgPath;
                targetImg.style.filter = imgFilter;
            }

            if (colorNameBadge) {
                colorNameBadge.textContent = colorName;
            }

            if (orderBtn) {
                orderBtn.setAttribute('data-color', colorName);
            }
        });
    });

    // 4. WhatsApp Floating Widget & Auto-open Chat Box
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    const whatsappChatBox = document.getElementById('whatsappChatBox');
    const closeWhatsappChatBtn = document.getElementById('closeWhatsappChatBtn');

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

    // Hero Notice banner click trigger
    const heroNotice = document.querySelector('.whatsapp-order-notice');
    if (heroNotice) {
        heroNotice.style.cursor = 'pointer';
        heroNotice.addEventListener('click', () => {
            sendWhatsAppMessage("Hi Trackson Team! 👋 I would like to inquire about ordering sportswear products.");
        });
    }

    // Custom Typed WhatsApp Chat Box Message
    const whatsappCustomMessageInput = document.getElementById('whatsappCustomMessageInput');
    const sendCustomWhatsappMsgBtn = document.getElementById('sendCustomWhatsappMsgBtn');

    const handleSendCustomMessage = () => {
        if (!whatsappCustomMessageInput) return;
        const userMsg = whatsappCustomMessageInput.value.trim();
        const finalMsg = userMsg || "Hi Trackson Team! 👋 I would like to inquire about your sportswear products.";
        sendWhatsAppMessage(finalMsg);
        whatsappCustomMessageInput.value = '';
    };

    if (sendCustomWhatsappMsgBtn) {
        sendCustomWhatsappMsgBtn.addEventListener('click', handleSendCustomMessage);
    }

    if (whatsappCustomMessageInput) {
        whatsappCustomMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendCustomMessage();
            }
        });
    }

    // 5. Dynamic WhatsApp Order Booking Buttons
    const orderButtons = document.querySelectorAll('.btn-whatsapp-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product') || 'Sportswear Item';
            const price = button.getAttribute('data-price') || '';
            const color = button.getAttribute('data-color') || '';
            const category = button.getAttribute('data-category') || '';

            const colorDetail = color ? ` (Color: ${color})` : '';
            const categoryDetail = category ? ` [${category}]` : '';
            const message = `Hi Trackson Team! 👋 I would like to book an order for *${productName}*${colorDetail}${categoryDetail} (${price}). Please let me know availability and payment details!`;

            sendWhatsAppMessage(message);

            if (button.id === 'modalShopBtn') {
                closeModal();
            }
        });
    });
});
