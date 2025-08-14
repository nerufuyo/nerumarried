import { format, parseISO, differenceInDays } from 'date-fns';

export class DateUtils {
  static formatDate(dateString: string, formatString: string = 'MMMM dd, yyyy'): string {
    try {
      const date = parseISO(dateString);
      return format(date, formatString);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  static getDaysUntil(dateString: string): number {
    try {
      const targetDate = parseISO(dateString);
      const today = new Date();
      return differenceInDays(targetDate, today);
    } catch (error) {
      console.error('Error calculating days until:', error);
      return 0;
    }
  }

  static formatTime(timeString: string): string {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString;
    }
  }

  static createCalendarUrl(eventDetails: {
    title: string;
    startDate: string;
    startTime: string;
    endTime: string;
    location: string;
    description?: string;
  }): string {
    const { title, startDate, startTime, endTime, location, description } = eventDetails;
    
    const formatDateTime = (date: string, time: string): string => {
      const dateTime = new Date(`${date}T${time}`);
      return dateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDateTime(startDate, startTime);
    const end = formatDateTime(startDate, endTime);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${start}/${end}`,
      location,
      details: description || ''
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
}
