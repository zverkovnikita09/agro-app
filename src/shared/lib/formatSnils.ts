export const formatSnils = (snils: string): string=>{
  if(!/^\d{11}$/.test(snils)){
    return snils;
  }

  const firstPart = snils.slice(0, 3);
  const secondPart = snils.slice(3, 6);
  const thirdPart = snils.slice(6, 9);
  const lastTwoDigit = snils.slice(9)

  return `${firstPart}-${secondPart}-${thirdPart} ${lastTwoDigit}`
}