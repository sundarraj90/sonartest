import moment from 'moment';

export function arrayToMatrix<T>(
  list: T[],
  elementsPerSubArray: number,
): T[][] {
  const matrix: T[][] = [];
  let i;
  let k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementsPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }

  return matrix;
}

export function getOperatingSystem(): string {
  let OSName = 'Unknown OS';
  if (navigator.appVersion.includes('Win')) OSName = 'Windows';
  if (navigator.appVersion.includes('Mac')) OSName = 'MacOS';
  if (navigator.appVersion.includes('X11')) OSName = 'UNIX';
  if (navigator.appVersion.includes('Linux')) OSName = 'Linux';
  return OSName;
}

export function dateFormater(dateString: string): string {
  let result = '-';
  if (dateString !== '') {
    const d = new Date(
      new Date(new Date(dateString)).getTime() -
        new Date(new Date()).getTimezoneOffset() * -60000,
    );
    result = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }
  return result;
}

export function compYearFormater(dateString: string): string {
  let result = '-';
  if (dateString !== '') {
    const d = new Date(
      new Date(new Date(dateString)).getTime() -
        new Date(new Date()).getTimezoneOffset() * -60000,
    );
    result = `${d.getMonth() < 10 ? d.getFullYear() : d.getFullYear() + 1}`;
  }
  return result;
}

export function endDateFormater(dateString: string): string {
  let result = '-';
  if (dateString !== '') {
    const d = new Date(
      new Date(new Date(dateString)).getTime() -
        new Date(new Date()).getTimezoneOffset() * -60000 -
        60000 * 24 * 60,
    );
    result = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }
  return result;
}

export function addOneYearFormater(dateString: string): string {
  let result = '-';
  if (dateString !== '') {
    const fullYear =
      new Date(
      new Date(new Date(dateString)).getTime() -
          new Date(new Date()).getTimezoneOffset() * -60000,
    ).getFullYear() + 1;

    const addDate = new Date(
      new Date(new Date(dateString)).getTime() -
        new Date(new Date()).getTimezoneOffset() * -60000,
    ).setFullYear(fullYear);
    result = moment(addDate).format('YYYY-MM-DD');
  }
  return result;
}

export function invalidDateChecker(dateString: string): boolean {
  return moment(
    moment(dateString).format('MM/DD/YYYY'),
    'MM/DD/YYYY',
    true,
  ).isValid();
}
