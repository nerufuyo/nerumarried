export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
  }

  static isValidName(name: string): boolean {
    return name.trim().length >= 2;
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  static validateRSVPForm(data: {
    name: string;
    email: string;
    phone: string;
    attendance: string;
    guestCount: number;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidName(data.name)) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!this.isValidEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!this.isValidPhone(data.phone)) {
      errors.push('Please enter a valid phone number');
    }

    if (!data.attendance) {
      errors.push('Please select your attendance status');
    }

    if (data.guestCount < 1 || data.guestCount > 10) {
      errors.push('Guest count must be between 1 and 10');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
