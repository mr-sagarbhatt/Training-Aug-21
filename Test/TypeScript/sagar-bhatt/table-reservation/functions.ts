// * GENERATE TOKEN
function generateToken(): number {
  const token = Math.floor(Math.random() * 100000000);
  return token;
}
function monthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}
export { generateToken, monthDiff };
