export function formatDate(inputDate) {
    const months = [
        'Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
    ];
  
    const date = new Date(inputDate);
  
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  const originalDate = "2023-11-27T15:42:50.887003Z";
  const formattedDate = formatDate(originalDate);
  console.log(formattedDate);