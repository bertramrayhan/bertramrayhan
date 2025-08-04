export function setContactForm(translationsForm) {
    if (!translationsForm) {
        console.error("Data terjemahan untuk form tidak tersedia.");
        return;
    }

    // Helper function di dalam setContactForm untuk mendapatkan nilai
    const getNestedValue = (key) => {
        return key.split('.').reduce((obj, k) => obj?.[k], translationsForm);
    };

    // Terjemahkan semua elemen di dalam form yang memiliki atribut data-translate
    const formWrapper = document.getElementById('contact-form-wrapper');

    // Terjemahkan label
    formWrapper.querySelectorAll('[data-translate-label]').forEach(el => {
        const key = el.dataset.translateLabel;
        const text = getNestedValue(key);
        if (text) el.textContent = text;
    });

    // Terjemahkan placeholder
    formWrapper.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder;
        const text = getNestedValue(key);
        if (text) el.placeholder = text;
    });

    // Terjemahkan tombol submit
    const submitBtn = formWrapper.querySelector('[data-translate-submit]');
    if (submitBtn) {
        const key = submitBtn.dataset.translateSubmit;
        const text = getNestedValue(key);
        if (text) submitBtn.textContent = text;
    }
}