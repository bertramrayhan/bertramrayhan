/**
 * Utility functions untuk contact form multi-language
 */

import { getTranslation } from '../data/translations.js';

/**
 * Generate contact form fields berdasarkan bahasa
 * @param {string} language - Language code
 */
export function generateContactForm(language = 'id') {
    const textFieldContainer = document.getElementById('textfield-form');
    const textAreaContainer = document.getElementById('textarea-form');
    const submitContainer = document.getElementById('submit-container');

    // Clear existing content
    if (textFieldContainer) textFieldContainer.innerHTML = '';
    if (textAreaContainer) textAreaContainer.innerHTML = '';
    if (submitContainer) submitContainer.innerHTML = '';

    // Generate name and email fields
    if (textFieldContainer) {
        textFieldContainer.innerHTML = `
            <div class="input-box">
                <label for="user_name">${getTranslation(language, 'form.name.label')}</label>
                <input type="text" id="user_name" name="user_name" placeholder="${getTranslation(language, 'form.name.placeholder')}" required>
            </div>
            <div class="input-box">
                <label for="user_email">${getTranslation(language, 'form.email.label')}</label>
                <input type="email" id="user_email" name="user_email" placeholder="${getTranslation(language, 'form.email.placeholder')}" required>
            </div>
        `;
    }

    // Generate message field
    if (textAreaContainer) {
        textAreaContainer.innerHTML = `
            <div class="input-box">
                <label for="message">${getTranslation(language, 'form.message.label')}</label>
                <textarea id="message" name="message" placeholder="${getTranslation(language, 'form.message.placeholder')}" required></textarea>
            </div>
        `;
    }

    // Generate submit button
    if (submitContainer) {
        submitContainer.innerHTML = `
            <button type="submit" class="primary-button">
                ${getTranslation(language, 'form.submit')}
            </button>
        `;
    }
}
