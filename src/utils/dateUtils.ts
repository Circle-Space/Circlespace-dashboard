// returns date in format YYYY-MM-DD
export const getISORepresentation = (date: Date) => {
  return new Date(date).toISOString().substring(0, 10);
};

export const formatDate = (date: any) => {
  if (typeof date === 'string') {
    return date.split('T')[0];
  } else if (date instanceof Date) {
    return date.toISOString().split('T')[0]; // If it's a Date object, convert to string and then extract the date part
  } else {
    return '';
  }
};

export const formatStringDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: any) => {
  if (!date) return '';

  if (typeof date === 'string') {
    date = new Date(date);
  } else if (!(date instanceof Date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
