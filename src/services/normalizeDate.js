export default function normalizeDate(utcDate) {
    const daysOfWeek = [ 'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado' ];
    const monthOfYear = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
    ];
    const date = new Date(utcDate);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const daysOfDiference = diff / (1000 * 60 * 60 * 24);
    if (daysOfDiference < 1) return 'hoje';
    if (daysOfDiference < 2) return 'ontem';
    if (daysOfDiference < 3) return 'anteontem';
    const weekDay = daysOfWeek[ date.getDay() ];
    const day = date.getDate();
    const month = monthOfYear[ date.getMonth() ];
    const year = date.getFullYear();
    return `${weekDay}, ${day} de ${month} de ${year}`;
}